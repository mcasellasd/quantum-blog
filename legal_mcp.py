# /// script
# dependencies = [
#   "mcp",
#   "httpx",
# ]
# ///

from mcp.server.fastmcp import FastMCP
import httpx
from datetime import datetime, timedelta

# Inicialitzem el servidor FastMCP amb metadades clares
mcp = FastMCP("LegalTech Spain & Catalonia")

def collect_items(node):
    """
    Recorre recursivament qualsevol estructura de dades (diccionaris o llistes)
    i extreu tots els objectes que continguin un 'identificador' i un 'titulo'
    (format estàndard d'ítems del BOE).
    """
    items = []
    if isinstance(node, list):
        for child in node:
            items.extend(collect_items(child))
    elif isinstance(node, dict):
        if "identificador" in node and "titulo" in node:
            items.append(node)
        else:
            for value in node.values():
                items.extend(collect_items(value))
    return items

async def fetch_boe_recent_raw(paraula_clau: str = None, limit: int = 15) -> dict:
    """
    Realitza la consulta a l'API del BOE i retorna les dades estructurades.
    """
    headers = {"Accept": "application/json"}
    now = datetime.now()
    
    target_date_str = None
    data_payload = None
    
    async with httpx.AsyncClient(timeout=12.0) as client:
        for i in range(6):
            check_date = now - timedelta(days=i)
            date_str = check_date.strftime("%Y%m%d")
            url = f"https://boe.es/datosabiertos/api/boe/sumario/{date_str}"
            
            try:
                response = await client.get(url, headers=headers, follow_redirects=True)
                if response.status_code == 200:
                    payload = response.json()
                    if payload.get("status", {}).get("code") == "200" and "data" in payload:
                        target_date_str = check_date.strftime("%d/%m/%Y")
                        data_payload = payload
                        break
            except Exception:
                continue
                
        if not data_payload:
            return {"date": None, "items": [], "error": "No s'ha pogut trobar cap edició recent activa del BOE a la plataforma de Dades Obertes."}
            
        try:
            raw_items = collect_items(data_payload)
            if not raw_items:
                return {"date": target_date_str, "items": []}
                
            # Filtrem per paraula clau si s'escau
            if paraula_clau:
                paraula_clau_lc = paraula_clau.lower()
                filtered_items = [
                    it for it in raw_items 
                    if paraula_clau_lc in it.get("titulo", "").lower() or paraula_clau_lc in it.get("identificador", "").lower()
                ]
            else:
                filtered_items = raw_items
                
            return {"date": target_date_str, "items": filtered_items[:limit], "total": len(filtered_items)}
        except Exception as e:
            return {"date": target_date_str, "items": [], "error": str(e)}

@mcp.tool()
async def cercar_boe_recent(paraula_clau: str = None, limit: int = 15) -> str:
    """
    Consulta el sumari oficial de la darrera edició disponible del BOE (Boletín Oficial del Estado)
    des de la seva API oficial de Dades Obertes. Permet cercar/filtrar per paraula clau.
    
    Args:
        paraula_clau: Opcional. Filtra les disposicions pel text indicat (cerca no sensible a majúscules).
        limit: Nombre màxim de disposicions a retornar (per defecte 15).
    """
    res = await fetch_boe_recent_raw(paraula_clau, limit)
    if "error" in res and not res.get("date"):
        return f"❌ {res['error']}"
        
    target_date_str = res["date"]
    filtered_items = res["items"]
    total_matches = res.get("total", len(filtered_items))
    
    if not filtered_items:
        return f"ℹ️ No s'ha trobat cap disposició al sumari del BOE per a la data {target_date_str}."
        
    output = [
        f"## 🏛️ Sumari del BOE ({target_date_str})",
        f"S'han trobat **{total_matches}** disposicions oficials" + (f" que coincideixen amb '{paraula_clau}'." if paraula_clau else "."),
        ""
    ]
    
    for idx, item in enumerate(filtered_items):
        identificador = item.get("identificador", "N/D")
        titulo = item.get("titulo", "Sense títol")
        url_pdf = item.get("url_pdf", {})
        url_pdf_link = url_pdf.get("texto", "") if isinstance(url_pdf, dict) else ""
        url_html = item.get("url_html", "")
        
        item_markdown = f"{idx + 1}. **[{identificador}]** {titulo}"
        links = []
        if url_pdf_link:
            links.append(f"[PDF]({url_pdf_link})")
        if url_html:
            links.append(f"[HTML]({url_html})")
            
        if links:
            item_markdown += f" — " + " | ".join(links)
        
        output.append(item_markdown)
        
    if total_matches > limit:
        output.append(f"\n*...i {total_matches - limit} disposicions més (limitat a {limit}). Pots refinar la cerca afegint una 'paraula_clau'.*")
        
    return "\n".join(output)

async def fetch_dogc_recent_raw(paraula_clau: str = None, rang: str = None, limit: int = 10) -> list:
    """
    Consulta l'API de Dades Obertes del DOGC i retorna les dades raw.
    """
    url = "https://analisi.transparenciacatalunya.cat/resource/n6hn-rmy7.json"
    
    params = {
        "$limit": min(limit, 50),
        "$order": "data_de_publicaci_del_diari DESC"
    }
    
    if rang:
        params["rang_de_norma"] = rang
        
    if paraula_clau:
        params["$q"] = paraula_clau
        
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(url, params=params, follow_redirects=True)
            if response.status_code != 200:
                return {"items": [], "error": f"Error de connexió (Codi {response.status_code})"}
            data = response.json()
            return {"items": data if isinstance(data, list) else []}
        except Exception as e:
            return {"items": [], "error": str(e)}

@mcp.tool()
async def cercar_dogc_recent(paraula_clau: str = None, rang: str = None, limit: int = 10) -> str:
    """
    Consulta l'API oficial de Dades Obertes de la Generalitat de Catalunya per cercar normatives
    recentment publicades al DOGC (Diari Oficial de la Generalitat de Catalunya) i el seu estat de vigència.
    
    Args:
        paraula_clau: Opcional. Cerca textual per paraula clau a tota la norma (p. ex., 'ciberseguretat', 'habitatge').
        rang: Opcional. Filtra per rang de la norma (p. ex., 'Llei', 'Decret', 'Ordre', 'Resolució').
        limit: Nombre màxim de normatives a retornar (per defecte 10, màxim 50).
    """
    res = await fetch_dogc_recent_raw(paraula_clau, rang, limit)
    if "error" in res:
        return f"❌ {res['error']}"
        
    data = res["items"]
    if not data:
        return "ℹ️ No s'ha trobat cap normativa al DOGC amb els filtres sol·licitats."
        
    output = [
        "## 🏛️ Darreres Normes del DOGC (Dades Obertes)",
        "Normativa recent publicada per la Generalitat de Catalunya:",
        ""
    ]
    
    for idx, item in enumerate(data):
        titol = item.get("t_tol_de_la_norma", "Sense títol")
        rang_norma = item.get("rang_de_norma", "Norma")
        any_norma = item.get("any", "")
        num_control = item.get("n_mero_de_control", "")
        data_pub = item.get("data_de_publicaci_del_diari", "")
        vigencia = item.get("vig_ncia_de_la_norma", "Vigent")
        
        if data_pub:
            try:
                data_pub_dt = datetime.fromisoformat(data_pub.replace("Z", ""))
                data_pub_str = data_pub_dt.strftime("%d/%m/%Y")
            except Exception:
                data_pub_str = data_pub
        else:
            data_pub_str = "N/D"
            
        status_icon = "🛡️" if vigencia.lower() == "vigent" else "⚠️"
        
        links = []
        format_html = item.get("format_html", {})
        if isinstance(format_html, dict) and "url" in format_html:
            links.append(f"[HTML]({format_html['url']})")
        
        format_pdf = item.get("format_pdf", {})
        if isinstance(format_pdf, dict) and "url" in format_pdf:
            links.append(f"[PDF]({format_pdf['url']})")
            
        links_str = " | ".join(links) if links else ""
        links_suffix = f" — {links_str}" if links_str else ""
        
        output.append(f"{idx + 1}. **{status_icon} {rang_norma} ({any_norma})** - Publicat el {data_pub_str}")
        output.append(f"   *Títol:* {titol}")
        if num_control or vigencia:
            output.append(f"   *Estat:* {vigencia} | *Control:* {num_control}{links_suffix}")
        output.append("")
        
    return "\n".join(output)

if __name__ == "__main__":
    mcp.run()
