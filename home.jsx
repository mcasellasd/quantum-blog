

// home.jsx — landing page



function Home({ navigate }) {

  const posts = window.SITE.posts;
  const latest = posts[0];

  // Build a compact dispatch feed mixing recent posts + projects + placeholders.
  const dispatch = [
    ...posts.slice(0, 3).map(p => ({ date: p.date, kind: "text", title: p.title, ext: `${p.readMin} min`, go: () => navigate(`/blog/${p.slug}`) })),
    { date: "2026-04-18", kind: "projecte", title: `${window.SITE.projects[0].name} entra en beta editorial`, ext: "lab", go: () => navigate(`/lab/${window.SITE.projects[0].slug}`) },
    { date: "2026-05-15", kind: "actualitat", title: "Portada d'actualitat legal resumida amb IA i fonts traçables", ext: "feed", go: () => navigate("/actualitat") },
    { date: "2026-03-01", kind: "projecte", title: `${window.SITE.projects[1].name} publica la primera versió imprimible`, ext: "kit", go: () => navigate(`/lab/${window.SITE.projects[1].slug}`) },
  ].sort((a, b) => b.date.localeCompare(a.date));

  const sections = [
    { num: "01", title: "Blog", path: "/blog", desc: "Assajos i notes sobre dret, tecnologia, llenguatge públic i criteri institucional." },
    { num: "02", title: "Projectes", path: "/lab", desc: "Arxius, kits i prototips petits per provar idees en forma operativa." },
    { num: "03", title: "Actualitat", path: "/actualitat", desc: "Feed resumit amb IA: senyals del dia, context útil i enllaç directe a les fonts originals." },
    { num: "04", title: "Sobre", path: "/about", desc: "Context del projecte, posició editorial i canals de contacte quan arribi el moment." },
  ];

  return (
    <main className="page-content">
      <section className="shell hero">
        <div>
          <div className="eyebrow"><span className="dot">●</span>&nbsp; Quadern · Projectes · Arxiu · Edició 2026</div>
          <h1 className="h-display stack-top-sm">
            Dret. Tecnologia. Quàntica. IA.
          </h1>
          <p className="lede">
            Ius Quanticum és un espai de pedagogia i experimentació acadèmica en català sobre dret i les noves tecnologies. Un espai d'exploració en obert on es publiquen notícies, projectes i materials de recerca en procés. 
          </p>
          <div className="hero-meta">
            <span><b>{window.SITE.posts.length}</b> textos oberts</span>
            <span><b>{window.SITE.projects.length}</b> projectes en curs</span>
            <span><b>2</b> seccions encara en construcció</span>
            <span>Actualitzat el <b>{formatDate(latest.date)}</b></span>
          </div>
        </div>
        <div className="hero-art">
          <QuantumMark size="100%" />
        </div>
      </section>

      <section className="home-sections">
        {sections.map((s, i) => (
          <article key={s.path} className="home-section-card" onClick={() => navigate(s.path)}>
            <div className="num">/ {s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="arrow">→ entrar</div>
          </article>
        ))}
      </section>

      <section className="shell home-lab-banner" onClick={() => navigate("/lab")}>
        <div className="home-lab-banner-kicker">Lab · Projectes en obert</div>
        <div className="home-lab-banner-main">
          <h2>Prototips jurídics amb IA per passar de la idea a l'eina.</h2>
          <p>Explora experiments actius, metodologies i recursos aplicats per entendre com la tecnologia transforma la pràctica del dret.</p>
        </div>
        <div className="home-lab-banner-cta">Entrar al lab →</div>
      </section>

      <section className="shell latest">
        <div>
          <div className="label">Text destacat</div>
          <div className="essay-meta stack-top-xs">{formatDate(latest.date)} · {latest.readMin} min</div>
        </div>
        <div className="clickable-block" onClick={() => navigate(`/blog/${latest.slug}`)}>
          <h2 className="essay-title">{latest.title}</h2>
          <p className="essay-dek">{latest.dek}</p>
          <div className="essay-meta stack-top-sm">{latest.tags.map(t => `#${t}`).join("  ")}</div>
        </div>
        <div>
          <MiniMark kind="ket" />
          <div className="latest-series-note">
            ⊕ primera sèrie editorial en curs
          </div>
        </div>
      </section>

      <section className="shell dispatch">
        <h2 className="h2">Moviments recents</h2>
        <div className="dispatch-rows">
          {dispatch.map((d, i) => (
            <div key={i} className="dispatch-row" onClick={d.go}>
              <span className="date">{formatDate(d.date)}</span>
              <span className="kind">{d.kind}</span>
              <span className="title">{d.title}</span>
              <span className="ext">{d.ext} →</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

window.Home = Home;
