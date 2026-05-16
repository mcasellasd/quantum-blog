// lab.jsx — projects index + project detail

function LabIndex({ navigate }) {
  const marks = ["circles", "waves", "ket", "grid"];
  const projects = window.SITE.projects;
  const featured = projects.find((p) => p.slug === "trobar-article") || projects[0];
  const ecosystemSlugs = ["dretvisual-clars", "viajusta", "feed-juridic"];
  const ecosystem = projects.filter((p) => ecosystemSlugs.includes(p.slug));
  const counts = window.SITE.projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="page-content shell">
      <SectionHead
        eyebrow={`Projectes · ${window.SITE.projects.length.toString().padStart(2, "0")} peces`}
        title="Lab acadèmic d'un estudiant de dret amb IA."
        blurb="Un espai de prova per convertir dubtes jurídics en eines reals de lectura, orientació i context. La suite Què diu la llei integra cerca, temàtiques i Hermes en un únic projecte."
        aux={<div className="eyebrow stack-top-md"><span className="dot">●</span>&nbsp; {(counts.live || 0).toString().padStart(2, "0")} live · {(counts.beta || 0).toString().padStart(2, "0")} beta · {(counts.concept || 0).toString().padStart(2, "0")} concept</div>}
      />

      <section className="lab-feature" onClick={() => navigate(`/lab/${featured.slug}`)}>
        <div className="head">
          <span>/ peça destacada · {featured.year}</span>
          <span className={`status ${featured.status}`}>{featured.status}</span>
        </div>
        <h3>{featured.name}</h3>
        <p className="desc">{featured.tagline}</p>
        <div className="stack">— {featured.stack}</div>
      </section>

      <section className="lab-cluster-wrap">
        <div className="lab-cluster">
          <div className="lab-cluster-head">
            <h4>Ecosistema vinculat</h4>
            <span>{ecosystem.length} projectes</span>
          </div>
          <div className={`lab-grid ${ecosystem.length < 2 ? "lab-grid-compact" : ""}`}>
            {ecosystem.map((p, i) => (
              <article key={p.slug} className="lab-card" onClick={() => navigate(`/lab/${p.slug}`)}>
                <div className="head">
                  <span>/ satèl·lit · {p.year}</span>
                  <span className={`status ${p.status}`}>{p.status}</span>
                </div>
                <div className="viz"><MiniMark kind={marks[(i + 2) % marks.length]} /></div>
                <h3>{p.name}</h3>
                <p className="desc">{p.tagline}</p>
                <div className="stack">— {p.stack}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell lab-note-section">
        <div className="eyebrow"><span className="dot">●</span>&nbsp; Nota de projecte</div>
        <h2 className="h2 lab-note-title">
          Aquest lab acadèmic no ven certeses: documenta aprenentatge jurídic assistit per IA.
        </h2>
        <div className="lab-note-grid">
          <p className="lab-note-copy">
            Neix des d'una mirada d'estudiant de dret: primer entendre bé la norma, després dissenyar una eina que redueixi fricció de lectura.
          </p>
          <p className="lab-note-copy">
            La IA s'utilitza com a suport pedagògic i de context. No substitueix assessorament professional ni decisió jurídica qualificada.
          </p>
          <p className="lab-note-copy">
            Cada iteració es publica en obert amb límits explícits, perquè sigui auditable, discutible i millorable per la comunitat jurídica.
          </p>
        </div>
      </section>
    </main>
  );
}

function ProjectDetail({ slug, navigate }) {
  const p = window.SITE.projects.find(x => x.slug === slug) || window.SITE.projects[0];
  const statusLabel = p.status === "live"
    ? "Live — disponible per a ús o lectura"
    : p.status === "beta"
      ? "Beta — en prova editorial"
      : "Concept — estructura encara oberta";

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, [slug]);

  return (
    <main className="page-content shell">
      <a href="#/lab" onClick={(e)=>{e.preventDefault();navigate("/lab");}}
         className="back-link back-link-spaced">
        ← tots els projectes
      </a>

      <section className="project-hero">
        <div>
          <div className="eyebrow project-eyebrow">
            <span className="dot">●</span>&nbsp; / projectes · {p.year} · {p.kind}
          </div>
          <h1 className="h-display project-title">
            {p.name}
          </h1>
          <p className="lede project-lede">{p.tagline}</p>
        </div>
        <div className="project-meta">
          <div className="field"><span className="k">Estat</span><span className="v">{statusLabel}</span></div>
          <div className="field"><span className="k">Inici</span><span className="v">{p.year}</span></div>
          <div className="field"><span className="k">Stack</span><span className="v">{p.stack}</span></div>
          <div className="field"><span className="k">Llicència</span><span className="v">Definició pendent segons cada peça</span></div>
          <div className="actions">
            {p.url ? (
              <a className="btn" href={p.url} target="_blank" rel="noopener noreferrer">Obrir mòdul ↗</a>
            ) : (
              <button className="btn" type="button">Obrir mòdul ↗</button>
            )}
            {p.url ? (
              <a className="btn ghost" href={p.url} target="_blank" rel="noopener noreferrer">Font ↗</a>
            ) : (
              <button className="btn ghost" type="button">Font ↗</button>
            )}
            <button className="btn ghost">Context</button>
          </div>
        </div>
      </section>

      <section className="project-body">
        <h2>Què fa</h2>
        <p>
          {p.name} parteix d'una intuïció molt concreta: una idea només comença a ser útil quan accepta prendre forma i exposar les seves limitacions. Per això aquesta peça es presenta com un instrument de lectura o treball, no com una promesa abstracta.
        </p>
        <p>
          {p.summary} {p.angle}
        </p>

        <div className="sketch">
          <div className="sketch-layout">
            <svg viewBox="0 0 240 160" className="sketch-graphic">
              {/* mock distribution */}
              <line x1="20" y1="140" x2="220" y2="140" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="0.6" />
              {[0.6, 0.85, 1.1, 1.35, 1.6, 1.85, 2.1, 2.35].map((x, i) => {
                const h = [10, 30, 55, 90, 70, 38, 20, 8][i];
                return <rect key={i} x={20 + i * 24} y={140 - h} width="18" height={h} fill="var(--accent)" opacity={0.2 + h/120} />;
              })}
              <text x="20" y="155" fontSize="8" fontFamily="JetBrains Mono, monospace" fill="var(--muted)">cluster A</text>
              <text x="190" y="155" fontSize="8" fontFamily="JetBrains Mono, monospace" fill="var(--muted)">cluster H</text>
              <line x1="92" y1="20" x2="92" y2="140" stroke="var(--ink)" strokeOpacity="0.4" strokeDasharray="2 2" />
              <text x="96" y="28" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="var(--ink)">mode</text>
            </svg>
            <div>
              <div className="sketch-label">Vista prèvia</div>
              <p className="sketch-copy">
                {p.output}
              </p>
            </div>
          </div>
        </div>

        <h2>Com s'ha de llegir</h2>
        <p>
          Les fitxes de projecte són curtes expressament. El valor no és presentar una arquitectura completa, sinó deixar clar quin problema es vol atacar, amb quin llenguatge i amb quins límits assumits des del principi.
        </p>

        <h2>Preguntes obertes</h2>
        <ul className="project-question-list">
          {p.questions.map((question, index) => <li key={index}>{question}</li>)}
        </ul>
      </section>
    </main>
  );
}

Object.assign(window, { LabIndex, ProjectDetail });
