// home.jsx — landing page

function Home({ navigate }) {
  const posts = window.SITE.posts;
  const latest = posts[0];

  // Build a "dispatch" feed mixing recent posts + projects + papers
  const dispatch = [
    ...posts.slice(0, 3).map(p => ({ date: p.date, kind: "essay", title: p.title, ext: `${p.readMin} min`, go: () => navigate(`/blog/${p.slug}`) })),
    { date: "2026-04-02", kind: "project", title: window.SITE.projects[0].name + " — beta opened to 30 readers", ext: "lab", go: () => navigate(`/lab/${window.SITE.projects[0].slug}`) },
    { date: "2026-03-20", kind: "paper", title: window.SITE.papers[0].title, ext: "SJLT", go: () => navigate("/research") },
    { date: "2026-03-04", kind: "talk", title: "Discovery After Grover — Stanford FutureLaw", ext: "keynote", go: () => navigate("/research") },
  ].sort((a, b) => b.date.localeCompare(a.date));

  const sections = [
    { num: "01", title: "Blog", path: "/blog", desc: "Essays and field-notes on quantum, AI, and where legal practice bends to meet them." },
    { num: "02", title: "Lab", path: "/lab", desc: "Working tools — small, opinionated, occasionally broken — that test the ideas in the blog." },
    { num: "03", title: "Research", path: "/research", desc: "Published papers, working drafts, talks. The slow lane." },
    { num: "04", title: "About", path: "/about", desc: "Who, why, and the contact channels that I actually read." },
  ];

  return (
    <main className="page-content">
      <section className="shell hero">
        <div>
          <div className="eyebrow"><span className="dot">●</span>&nbsp; Notebook · Lab · Archive · Index 2026</div>
          <h1 className="h-display" style={{ marginTop: 18 }}>
            Reading the law<br/>against the <em>grain</em><br/>of probability.
          </h1>
          <p className="lede">
            A working journal at the seam between quantum information, machine learning, and legal practice — read by lawyers who don't quite trust the engineers, and engineers who don't quite trust the lawyers.
          </p>
          <div className="hero-meta">
            <span><b>{window.SITE.posts.length}</b> essays</span>
            <span><b>{window.SITE.projects.length}</b> lab projects</span>
            <span><b>{window.SITE.papers.length}</b> publications</span>
            <span>Last updated <b>{formatDate(latest.date)}</b></span>
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
            <div className="arrow">→ enter</div>
          </article>
        ))}
      </section>

      <section className="shell latest">
        <div>
          <div className="label">Latest essay</div>
          <div className="essay-meta" style={{ marginTop: 8 }}>{formatDate(latest.date)} · {latest.readMin} min</div>
        </div>
        <div onClick={() => navigate(`/blog/${latest.slug}`)} style={{ cursor: "pointer" }}>
          <h2 className="essay-title">{latest.title}</h2>
          <p className="essay-dek">{latest.dek}</p>
          <div className="essay-meta" style={{ marginTop: 16 }}>{latest.tags.map(t => `#${t}`).join("  ")}</div>
        </div>
        <div>
          <MiniMark kind="ket" />
          <div style={{ marginTop: 12, fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.04em" }}>
            ⊕ essay 014 of an ongoing series
          </div>
        </div>
      </section>

      <section className="shell dispatch">
        <h2 className="h2">Recent dispatches</h2>
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
