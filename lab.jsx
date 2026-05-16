// lab.jsx — projects index + project detail

function LabIndex({ navigate }) {
  const marks = ["circles", "waves", "ket", "grid"];
  return (
    <main className="page-content shell">
      <SectionHead
        eyebrow="Lab · 04 projects"
        title="Working tools, prototypes, broken pieces."
        blurb="The blog argues. The lab tries. Small, opinionated software that tests whether the arguments survive contact with real case law, real contracts, real cryptography."
        aux={<div className="eyebrow" style={{ marginTop: 24 }}><span className="dot">●</span>&nbsp; 02 live · 01 beta · 01 concept</div>}
      />
      <section className="lab-grid">
        {window.SITE.projects.map((p, i) => (
          <article key={p.slug} className="lab-card" onClick={() => navigate(`/lab/${p.slug}`)}>
            <div className="head">
              <span>/ project · {p.year}</span>
              <span className={`status ${p.status}`}>{p.status}</span>
            </div>
            <div className="viz"><MiniMark kind={marks[i % marks.length]} /></div>
            <h3>{p.name}</h3>
            <p className="desc">{p.tagline}</p>
            <div className="stack">— {p.stack}</div>
          </article>
        ))}
      </section>

      <section className="shell" style={{ padding: "56px 0 80px" }}>
        <div className="eyebrow"><span className="dot">●</span>&nbsp; Lab notebook</div>
        <h2 className="h2" style={{ marginTop: 16, maxWidth: "22ch" }}>
          A short note on what the lab is <em style={{ fontStyle: "italic", color: "var(--accent-ink)" }}>not</em>.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, marginTop: 32, maxWidth: 920 }}>
          <p style={{ margin: 0, color: "var(--ink-2)" }}>
            Not a startup. None of these are funded, none of them are hiring, none of them are about to be acquired. They are essays in code.
          </p>
          <p style={{ margin: 0, color: "var(--ink-2)" }}>
            Not finished. Most of the things here are between half-built and barely-built. If a thing reaches v1.0 in the lab, it usually leaves.
          </p>
          <p style={{ margin: 0, color: "var(--ink-2)" }}>
            Not closed source. Everything that does not contain client material is on GitHub. The kits below ship as Pandoc-readable Markdown so a paralegal can run them on a laptop.
          </p>
        </div>
      </section>
    </main>
  );
}

function ProjectDetail({ slug, navigate }) {
  const p = window.SITE.projects.find(x => x.slug === slug) || window.SITE.projects[0];

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, [slug]);

  return (
    <main className="page-content shell">
      <a href="#/lab" onClick={(e)=>{e.preventDefault();navigate("/lab");}}
         style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.05em", color: "var(--muted)", textTransform: "uppercase", display: "inline-block", marginTop: 16 }}>
        ← all projects
      </a>

      <section className="project-hero">
        <div>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            <span className="dot">●</span>&nbsp; / lab · {p.year} · {p.kind}
          </div>
          <h1 className="h-display" style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1, fontFamily: "var(--f-mono)", letterSpacing: "-0.02em" }}>
            {p.name}
          </h1>
          <p className="lede" style={{ marginTop: 20, maxWidth: "32ch" }}>{p.tagline}</p>
        </div>
        <div className="project-meta">
          <div className="field"><span className="k">Status</span><span className="v">{p.status === "live" ? "Live — open to the public" : p.status === "beta" ? "Beta — invite only" : "Concept — design only"}</span></div>
          <div className="field"><span className="k">Started</span><span className="v">{p.year}</span></div>
          <div className="field"><span className="k">Stack</span><span className="v">{p.stack}</span></div>
          <div className="field"><span className="k">License</span><span className="v">MIT · CC-BY 4.0 for prose</span></div>
          <div className="actions">
            <button className="btn">Open ↗</button>
            <button className="btn ghost">Source ↗</button>
            <button className="btn ghost">Read paper</button>
          </div>
        </div>
      </section>

      <section className="project-body">
        <h2>What it does</h2>
        <p>
          {p.name} is a small piece of software that takes the central idea of the companion essay
          ("{window.SITE.posts[0].title}") and tries to render it falsifiable. Instead of returning a
          ranked list of cases, it returns a probability distribution over precedential clusters, with
          an explicit confidence interval drawn from the model's posterior.
        </p>
        <p>
          The interesting part is not the retrieval model — those are commodities — but the way the
          interface refuses to collapse the distribution. You see the spread. You see the second-most-likely
          reading of the question. You see, in other words, the disagreement that a flat ranked list hides.
        </p>

        <div className="sketch">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 24, alignItems: "center" }}>
            <svg viewBox="0 0 240 160" style={{ width: "100%", height: "auto" }}>
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
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Output preview</div>
              <p style={{ fontFamily: "var(--f-serif)", fontSize: 16, margin: "10px 0 0", color: "var(--ink)", lineHeight: 1.5 }}>
                The user's query lands in cluster D with probability 0.41 (CI 95% [0.34, 0.49]).
                The next-most-likely reading sits in cluster C, with non-negligible mass in B and E.
                The model is uncertain. It says so.
              </p>
            </div>
          </div>
        </div>

        <h2>How to read this</h2>
        <p>
          The lab pages are short on purpose. The full motivation lives in the companion essay; the full
          mechanics live in the paper. If you want to use the tool, the button at the top of the page is
          the real entry point. If you want to break it, the source button leads somewhere I would
          rather you broke it than a court did.
        </p>

        <h2>Open questions</h2>
        <ul style={{ fontSize: 18, lineHeight: 1.6, paddingLeft: 22 }}>
          <li>How should the interface present a distribution to a judge under time pressure?</li>
          <li>What does <em>calibration</em> mean when the ground truth is itself contested?</li>
          <li>Can the same posterior be used in cross-examination, or does that violate FRE 702?</li>
        </ul>
      </section>
    </main>
  );
}

Object.assign(window, { LabIndex, ProjectDetail });
