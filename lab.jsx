// lab.jsx — projects index + project detail

function LabIndex({ navigate }) {
  const marks = ["circles", "waves", "ket", "grid"];
  const counts = window.SITE.projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="page-content shell">
      <SectionHead
        eyebrow={`Projectes · ${window.SITE.projects.length.toString().padStart(2, "0")} peces`}
        title="Projectes petits, útils i deliberadament provisionals."
        blurb="Aquí les idees es posen sota pressió. No com a producte final, sinó com a arxiu, kit o prototip que obliga a aclarir què val la pena mantenir i què s'ha de descartar."
        aux={<div className="eyebrow stack-top-md"><span className="dot">●</span>&nbsp; {(counts.live || 0).toString().padStart(2, "0")} live · {(counts.beta || 0).toString().padStart(2, "0")} beta · {(counts.concept || 0).toString().padStart(2, "0")} concept</div>}
      />
      <section className="lab-grid">
        {window.SITE.projects.map((p, i) => (
          <article key={p.slug} className="lab-card" onClick={() => navigate(`/lab/${p.slug}`)}>
            <div className="head">
              <span>/ projecte · {p.year}</span>
              <span className={`status ${p.status}`}>{p.status}</span>
            </div>
            <div className="viz"><MiniMark kind={marks[i % marks.length]} /></div>
            <h3>{p.name}</h3>
            <p className="desc">{p.tagline}</p>
            <div className="stack">— {p.stack}</div>
          </article>
        ))}
      </section>

      <section className="shell lab-note-section">
        <div className="eyebrow"><span className="dot">●</span>&nbsp; Nota de projecte</div>
        <h2 className="h2 lab-note-title">
          El laboratori no és un estudi de producte ni una promesa de <em className="accent-emphasis">scaling</em>.
        </h2>
        <div className="lab-note-grid">
          <p className="lab-note-copy">
            No és una startup. Aquestes peces no busquen finançament ni rondes. Busquen forma, fricció i claredat.
          </p>
          <p className="lab-note-copy">
            No està acabat. La majoria de projectes són prou estables per pensar amb ells, però no prou tancats per presentar-los com a solució definitiva.
          </p>
          <p className="lab-note-copy">
            No és una caixa negra. Tot el que no contingui material sensible o dependent de context privat es podrà obrir, revisar o reformular.
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
            <button className="btn">Obrir ↗</button>
            <button className="btn ghost">Font ↗</button>
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
