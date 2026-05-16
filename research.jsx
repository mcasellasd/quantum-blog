// research.jsx — formal pubs + working papers + talks

function Research({ navigate }) {
  const [tab, setTab] = React.useState("published");
  const tabs = [
    { id: "published", label: "Published", n: window.SITE.papers.length },
    { id: "working", label: "Working papers", n: window.SITE.workingPapers.length },
    { id: "talks", label: "Talks", n: window.SITE.talks.length },
  ];

  const list = tab === "published" ? window.SITE.papers
              : tab === "working" ? window.SITE.workingPapers
              : null;

  return (
    <main className="page-content shell">
      <SectionHead
        eyebrow="Research · the slow lane"
        title="Published work, drafts in progress, and talks."
        blurb="Peer-reviewed papers, in-progress manuscripts, and the talks they came out of. Citations are auto-scraped quarterly; broken DOIs get a polite email."
        aux={
          <div style={{ display: "flex", gap: 32, marginTop: 24, fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.04em" }}>
            <span>h-index <b style={{ color: "var(--ink)" }}>9</b></span>
            <span>citations <b style={{ color: "var(--ink)" }}>241</b></span>
            <span>ORCID <b style={{ color: "var(--ink)" }}>0000-0001-…</b></span>
          </div>
        }
      />

      <div className="research-tabs">
        {tabs.map(t => (
          <button key={t.id} className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>
            {t.label} <span style={{ opacity: 0.55 }}>· {t.n}</span>
          </button>
        ))}
      </div>

      {list && (
        <section style={{ padding: "8px 0 64px" }}>
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
        <section style={{ padding: "8px 0 64px" }}>
          {window.SITE.talks.map((t, i) => (
            <article key={i} className="talk-item">
              <span className="when">{t.when}</span>
              <span className="what">{t.what}</span>
              <span className="where">{t.where}</span>
            </article>
          ))}
        </section>
      )}

      <section style={{ padding: "32px 0 80px", borderTop: "1px solid var(--rule)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <div>
          <h6 style={{ fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 12px" }}>Citing this work</h6>
          <p style={{ margin: 0, fontSize: 15, color: "var(--ink-2)", maxWidth: "40ch" }}>
            BibTeX is linked next to every entry. If you cite a working paper, please use the version number — drafts revise often, and I would rather you cite v0.3 than guess.
          </p>
        </div>
        <div>
          <h6 style={{ fontFamily: "var(--f-mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 12px" }}>Working with me</h6>
          <p style={{ margin: 0, fontSize: 15, color: "var(--ink-2)", maxWidth: "40ch" }}>
            Co-authorship on quantum / AI / legal topics is welcome from anyone with a working draft. I do not co-author position pieces. See <a href="#/about" onClick={(e)=>{e.preventDefault();navigate("/about");}} style={{ borderBottom: "1px solid var(--rule-strong)" }}>about</a> for contact channels.
          </p>
        </div>
      </section>
    </main>
  );
}

window.Research = Research;
