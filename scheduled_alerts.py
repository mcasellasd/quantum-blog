import asyncio
import os
import json
from datetime import datetime, timedelta
import httpx
from legal_mcp import cercar_boe_recent, cercar_dogc_recent, fetch_boe_recent_raw, fetch_dogc_recent_raw, collect_items

async def fetch_boe_for_date(client, date_obj):
    """
    Fetches the BOE summary for a specific date and returns structured items.
    """
    headers = {"Accept": "application/json"}
    date_str = date_obj.strftime("%Y%m%d")
    url = f"https://boe.es/datosabiertos/api/boe/sumario/{date_str}"
    try:
        response = await client.get(url, headers=headers, follow_redirects=True)
        if response.status_code == 200:
            payload = response.json()
            if payload.get("status", {}).get("code") == "200" and "data" in payload:
                raw_items = collect_items(payload)
                return {
                    "date": date_obj.strftime("%d/%m/%Y"),
                    "items": [
                        {
                            "id": item.get("identificador"),
                            "title": item.get("titulo"),
                            "url_pdf": item.get("url_pdf", {}).get("texto") if isinstance(item.get("url_pdf"), dict) else "",
                            "url_html": item.get("url_html", "")
                        } for item in raw_items[:10]
                    ]
                }
    except Exception as e:
        print(f"Error fetching BOE for {date_str}: {e}")
    return None

async def generate_daily_alerts():
    today_str = datetime.now().strftime("%d/%m/%Y")
    print(f"Generating daily legislative alerts with history for {today_str}...")
    
    # 1. Fetching DOGC and grouping by date
    dogc_raw = await fetch_dogc_recent_raw(limit=80)
    dogc_by_date = {}
    for item in dogc_raw.get("items", []):
        raw_date = item.get("data_de_publicaci_del_diari")
        if not raw_date:
            continue
        try:
            # SODA dates look like "2026-05-19T00:00:00.000"
            dt = datetime.fromisoformat(raw_date.replace("Z", ""))
            date_str = dt.strftime("%d/%m/%Y")
        except Exception:
            date_str = today_str
            
        if date_str not in dogc_by_date:
            dogc_by_date[date_str] = []
            
        dogc_by_date[date_str].append({
            "title": item.get("t_tol_de_la_norma"),
            "type": item.get("rang_de_norma"),
            "year": item.get("any"),
            "date": item.get("data_de_publicaci_del_diari"),
            "vigencia": item.get("vig_ncia_de_la_norma"),
            "id": item.get("n_mero_de_control"),
            "url_html": item.get("format_html", {}).get("url") if isinstance(item.get("format_html"), dict) else "",
            "url_pdf": item.get("format_pdf", {}).get("url") if isinstance(item.get("format_pdf"), dict) else ""
        })

    # 2. Fetching BOE for the last 8 calendar days in parallel
    async with httpx.AsyncClient(timeout=12.0) as client:
        tasks = []
        for i in range(8):
            check_date = datetime.now() - timedelta(days=i)
            tasks.append(fetch_boe_for_date(client, check_date))
        
        boe_results = await asyncio.gather(*tasks)
        active_boe_days = [r for r in boe_results if r is not None]

    # 3. Assembling History dictionary
    history = {}
    all_dates = set(dogc_by_date.keys())
    for boe_day in active_boe_days:
        all_dates.add(boe_day["date"])
        
    sorted_dates = sorted(list(all_dates), key=lambda d: datetime.strptime(d, "%d/%m/%Y"), reverse=True)
    # Take the top 5 active dates
    sorted_dates = sorted_dates[:5]
    
    for date_str in sorted_dates:
        boe_items = []
        for boe_day in active_boe_days:
            if boe_day["date"] == date_str:
                boe_items = boe_day["items"]
                break
                
        history[date_str] = {
            "boe": {
                "date": date_str,
                "items": boe_items
            },
            "dogc": {
                "items": dogc_by_date.get(date_str, [])
            }
        }

    latest_date = sorted_dates[0] if sorted_dates else today_str
    latest_payload = history.get(latest_date, {
        "boe": {"date": latest_date, "items": []},
        "dogc": {"items": []}
    })

    # 4. JSON Payload
    json_payload = {
        "last_updated": datetime.now().isoformat(),
        "date_str": latest_date,
        "boe": latest_payload["boe"],
        "dogc": latest_payload["dogc"],
        "history": history,
        "dates": sorted_dates
    }

    # 5. Markdown Report Content
    boe_summary = await cercar_boe_recent(limit=10)
    dogc_summary = await cercar_dogc_recent(limit=10)
    
    report = [
        f"# 🔔 Informe de Vigilància Legislativa — {today_str}",
        f"Aquest informe ha estat generat de forma automàtica per la tasca programada d'Antigravity el {datetime.now().strftime('%d/%m/%Y a les %H:%M:%S')}.",
        "",
        f"### 📅 Historial de dies actius indexats: {', '.join(sorted_dates)}",
        "",
        "---",
        "",
        "## 🇪🇸 Resum de Publicacions del BOE (Darrera edició)",
        boe_summary,
        "",
        "---",
        "",
        "## 🐱 Resum de Publicacions del DOGC (Dades Obertes - Recents)",
        dogc_summary,
        "",
        "---",
        "",
        "👉 *Pots consultar aquestes disposicions en temps real o modificar els criteris d'alerta reconfigurant la tasca programada o executant el cercador MCP.*"
    ]

    workspace_path = "/Users/marccasellas/Desktop/docus2024/DOCUS 2026/quantum-blog"
    output_md = os.path.join(workspace_path, "latest_alerts.md")
    output_json = os.path.join(workspace_path, "latest_alerts.json")
    
    # Save files
    with open(output_md, "w", encoding="utf-8") as f:
        f.write("\n".join(report))
    print(f"Informe de vigilància legislativa generat a: {output_md}")
    
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(json_payload, f, ensure_ascii=False, indent=2)
    print(f"Dades JSON per a la web guardades a: {output_json}")

if __name__ == "__main__":
    asyncio.run(generate_daily_alerts())
