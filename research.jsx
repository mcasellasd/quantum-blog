// research.jsx — actualitat feed resumida amb IA

function Research({ navigate }) {
  const items = (window.SITE.actualitat || []).slice().sort((a, b) => b.date.localeCompare(a.date));
  const categories = ["tot", ...Array.from(new Set(items.map((i) => i.category)))];
  const [tab, setTab] = React.useState("tot");
  const tabs = [
    ...categories.map((category) => ({
      id: category,
      label: category === "tot" ? "Tot" : category,
      n: category === "tot" ? items.length : items.filter((i) => i.category === category).length,
    })),
  ];

  const list = tab === "tot" ? items : items.filter((i) => i.category === tab);
  const urgentCount = items.filter((i) => i.urgency === "alta").length;

  return (
    <main className="page-content shell">
      <SectionHead
        eyebrow="Actualitat · feed resumit amb IA"
        title="Context, no només titulars."
        blurb="Portada d'actualitat jurídica amb resum assistit per IA, lectura ràpida i enllaç directe a la font original. Pensat per detectar senyals útils abans de decidir què cal llegir a fons."
        aux={<div className="research-metrics"><span>entrades <b>{items.length}</b></span><span>urgents <b>{urgentCount}</b></span><span>mode <b>resum IA</b></span></div>}
      />

      <div className="research-tabs">
        {tabs.map(t => (
          <button key={t.id} className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>
            {t.label} <span className="tab-count">· {t.n}</span>
          </button>
        ))}
      </div>

      <section className="research-section-pad">
        {list.map((item, i) => (
          <article key={i} className="actualitat-item">
            <div className="actualitat-kicker">
              <span className="when">{formatDate(item.date)}</span>
              <span className="actualitat-cat">{item.category}</span>
              <span className={`actualitat-urgency ${item.urgency === "alta" ? "is-high" : ""}`}>{item.urgency === "alta" ? "urgent" : "seguiment"}</span>
            </div>
            <h3 className="actualitat-title">{item.title}</h3>
            <p className="actualitat-summary">{item.summary}</p>
            <p className="actualitat-why"><b>Per què importa:</b> {item.why}</p>
            <div className="actualitat-meta">
              <span>font: {item.source}</span>
              <a href={item.url} target="_blank" rel="noopener noreferrer">veure font ↗</a>
            </div>
          </article>
        ))}
      </section>

      <section className="research-footer-grid">
        <div>
          <h6 className="research-foot-title">Metodologia de resum</h6>
          <p className="research-foot-copy">
            Cada entrada parteix de la font original i passa per una capa de resum assistit amb IA. L'objectiu és orientar lectura, no tancar interpretacions ni substituir verificació jurídica.
          </p>
        </div>
        <div>
          <h6 className="research-foot-title">Límits i avís</h6>
          <p className="research-foot-copy">
            Aquest feed és orientatiu. En matèria sensible, sempre cal contrastar text legal i criteri professional. Si vols context del projecte, ves a <a href="#/about" onClick={(e)=>{e.preventDefault();navigate("/about");}} className="inline-link">Sobre</a>.
          </p>
        </div>
      </section>
    </main>
  );
}

window.Research = Research;
