// blog.jsx — index + article detail

function renderPostBlock(block, key) {
  if (block.type === "h2") {
    return <h2 key={key}>{block.text}</h2>;
  }
  if (block.type === "quote") {
    return <blockquote key={key}>{block.text}</blockquote>;
  }
  if (block.type === "list") {
    return (
      <ul key={key} className="article-list">
        {block.items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    );
  }
  return <p key={key}>{block.text}</p>;
}

function BlogIndex({ navigate }) {
  const allTags = ["all", ...Array.from(new Set(window.SITE.posts.flatMap(p => p.tags)))];
  const [filter, setFilter] = React.useState("all");

  const posts = window.SITE.posts.filter(p => filter === "all" || p.tags.includes(filter));

  return (
    <main className="page-content shell">
      <SectionHead
        eyebrow={`Blog · ${window.SITE.posts.length.toString().padStart(2, "0")} textos`}
        title="Articles sobre tecnologia, IA i quàntica aplicada al dret."
        blurb="Articles que tradueixen canvis tecnològics en criteri jurídic útil: què passa, per què importa i com afecta decisions reals en dret, IA i computació quàntica."
      />
      <div className="blog-filters">
        {allTags.map(t => (
          <button key={t} className={filter === t ? "on" : ""} onClick={() => setFilter(t)}>
            {t === "all" ? "tot" : `#${t}`}
          </button>
        ))}
        <span className="blog-filter-count">{posts.length} de {window.SITE.posts.length}</span>
      </div>
      <div className="blog-list">
        {posts.map(p => (
          <article key={p.slug} className="blog-item" onClick={() => navigate(`/blog/${p.slug}`)}>
            <span className="date">{formatDate(p.date)}</span>
            <div>
              <h3 className="blog-item-title">{p.title}</h3>
              <p className="dek">{p.dek}</p>
              <div className="tags">{p.tags.map(t => `#${t}`).join("   ")}</div>
            </div>
            <span className="read">{p.readMin} min →</span>
          </article>
        ))}
      </div>
    </main>
  );
}

function Article({ slug, navigate }) {
  const post = window.SITE.posts.find(p => p.slug === slug) || window.SITE.posts[0];
  const idx = window.SITE.posts.findIndex(p => p.slug === post.slug);
  const next = window.SITE.posts[idx + 1];
  const prev = window.SITE.posts[idx - 1];

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, [slug]);

  return (
    <main className="page-content">
      <div className="shell">
        <a href="#/blog" onClick={(e)=>{e.preventDefault();navigate("/blog");}}
           className="back-link">
          ← tots els textos
        </a>
        <header className="article-head">
          <div className="eyebrow"><span className="dot">●</span>&nbsp; Text · {post.tags.map(t => `#${t}`).join("  ")}</div>
          <h1 className="title">{post.title}</h1>
          <p className="dek">{post.dek}</p>
          <div className="article-meta">
            <span>{formatDate(post.date)}</span>
            <span>{post.readMin} min</span>
            <span>esborrany públic</span>
          </div>
        </header>
      </div>

      <article className="read article-body">
        {post.body.map((block, index) => renderPostBlock(block, index))}
      </article>

      <nav className="shell article-nav">
        <div>
          {prev && (
            <a href={`#/blog/${prev.slug}`} onClick={(e)=>{e.preventDefault();navigate(`/blog/${prev.slug}`);}}>
              <div className="article-nav-label">← text més recent</div>
              <div className="article-nav-title">{prev.title}</div>
            </a>
          )}
        </div>
        <div className="article-nav-next">
          {next && (
            <a href={`#/blog/${next.slug}`} onClick={(e)=>{e.preventDefault();navigate(`/blog/${next.slug}`);}}>
              <div className="article-nav-label">text anterior →</div>
              <div className="article-nav-title">{next.title}</div>
            </a>
          )}
        </div>
      </nav>
    </main>
  );
}

Object.assign(window, { BlogIndex, Article });
