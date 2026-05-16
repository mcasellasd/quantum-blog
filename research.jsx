// research.jsx — formal pubs + working papers + talks

function Research({ navigate }) {
  const [tab, setTab] = React.useState("published");
  const tabs = [
    { id: "published", label: "Publicat", n: window.SITE.papers.length },
    { id: "working", label: "En curs", n: window.SITE.workingPapers.length },
    { id: "talks", label: "Xerrades", n: window.SITE.talks.length },
  ];

  const list = tab === "published" ? window.SITE.papers
              : tab === "working" ? window.SITE.workingPapers
              : null;

  return (
    <main className="page-content shell">
      <SectionHead
        eyebrow="Recerca · secció en construcció"
        title="Materials, línies de treball i referències en curs."
        blurb="Aquesta secció quedarà com un arxiu de materials llargs, papers, notes de recerca i xerrades. Ara mateix només hi ha la carcassa i alguns marcadors provisionals."
        aux={<div className="research-metrics"><span>h-index <b>9</b></span><span>cites <b>241</b></span><span>ORCID <b>0000-0001-…</b></span></div>}
      />

      <div className="research-tabs">
        {tabs.map(t => (
          <button key={t.id} className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>
            {t.label} <span className="tab-count">· {t.n}</span>
          </button>
        ))}
      </div>

      {list && (
        <section className="research-section-pad">
          {list.map((paper, i) => (
            <article key={i} className="pub-item">
              <div className="num">[{String(list.length - i).padStart(2, "0")}]</div>
              <div>
                <h3 className="pub-title">{paper.title}</h3>
                <div className="authors">{paper.authors}</div>
                <div className="venue">{paper.venue}</div>
                <div className="links">
                  {paper.links.map(l => <a key={l} href="#">{l}</a>)}
                </div>
              </div>
              <div className="cit">{paper.cit}</div>
            </article>
          ))}
        </section>
      )}

      {tab === "talks" && (
        <section className="research-section-pad">
          {window.SITE.talks.map((t, i) => (
            <article key={i} className="talk-item">
              <span className="when">{t.when}</span>
              <span className="what">{t.what}</span>
              <span className="where">{t.where}</span>
            </article>
          ))}
        </section>
      )}

      <section className="research-footer-grid">
        <div>
          <h6 className="research-foot-title">Citar aquest material</h6>
          <p className="research-foot-copy">
            Quan aquesta secció tingui contingut definitiu hi haurà referències i versions clares. Si cites un esborrany, fes servir sempre el número de versió.
          </p>
        </div>
        <div>
          <h6 className="research-foot-title">Treballar amb mi</h6>
          <p className="research-foot-copy">
            Per ara aquesta pàgina només indica que la recerca és una línia oberta, no un inventari tancat. Si vols contactar, ves a la secció <a href="#/about" onClick={(e)=>{e.preventDefault();navigate("/about");}} className="inline-link">Sobre</a>.
          </p>
        </div>
      </section>
    </main>
  );
}

window.Research = Research;
