// blog.jsx — index + article detail

function BlogIndex({ navigate }) {
  const allTags = ["all", ...Array.from(new Set(window.SITE.posts.flatMap(p => p.tags)))];
  const [filter, setFilter] = React.useState("all");

  const posts = window.SITE.posts.filter(p => filter === "all" || p.tags.includes(filter));

  return (
    <main className="page-content shell">
      <SectionHead
        eyebrow="Blog · 014 essays"
        title="Field notes from the seam."
        blurb="Long-form essays on quantum information, applied machine learning, and the slow work of fitting them into legal doctrine. Published when finished, not on a schedule."
      />
      <div className="blog-filters">
        {allTags.map(t => (
          <button key={t} className={filter === t ? "on" : ""} onClick={() => setFilter(t)}>
            {t === "all" ? "all" : `#${t}`}
          </button>
        ))}
        <span style={{ marginLeft: "auto", color: "var(--muted)", alignSelf: "center" }}>{posts.length} of {window.SITE.posts.length}</span>
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
           style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.05em", color: "var(--muted)", textTransform: "uppercase" }}>
          ← all essays
        </a>
        <header className="article-head">
          <div className="eyebrow"><span className="dot">●</span>&nbsp; Essay · {post.tags.map(t => `#${t}`).join("  ")}</div>
          <h1 className="title">{post.title}</h1>
          <p className="dek">{post.dek}</p>
          <div className="article-meta">
            <span>{formatDate(post.date)}</span>
            <span>{post.readMin} min</span>
            <span>v1.0</span>
          </div>
        </header>
      </div>

      <article className="read article-body">
        {/* Body — kept in JSX so we can use figures and dropcaps */}
        <p>
          There is a quiet asymmetry sitting in the corner of every modern e-discovery dispute,
          and almost nobody has been forced to argue about it yet. A party that runs an unstructured
          search across a custodian's mailbox is, in effect, performing an unsorted database
          lookup — the canonical problem that Grover's algorithm answers in &radic;N rather than N
          queries. The asymmetry is not large in absolute terms. It is, however, large in legal terms,
          because <em>proportionality is a ratio</em>, and ratios are exactly what speedups change.
        </p>

        <p>
          The argument I want to make is narrow. It is not that quantum search will be available to litigants
          tomorrow, or that Rule 26 needs amending today. It is that the burden of demonstrating reasonableness
          in search — the demonstration we have been doing with TAR, with seed sets, with sampled recall —
          presumes a particular cost curve, and that curve is the first thing to bend when a counterparty has access
          to non-classical retrieval.
        </p>

        <h2>The custodian as oracle</h2>
        <p>
          Recall, briefly, what Grover does. Given a function <code>f(x)</code> that returns 1 on the
          unique input we want and 0 elsewhere, classical search finds the marked element in <code>O(N)</code>
          queries. Grover's algorithm finds it in <code>O(&radic;N)</code>. The trick is the
          construction of an oracle: a quantum circuit that, in superposition, marks the answer.
        </p>

        <blockquote>
          A custodian's mailbox is the cleanest oracle in litigation. It already returns 1 on a marked input
          (the responsive document) and 0 on the rest. The only obstacle to treating it that way is that we have
          not, until recently, asked anyone to.
        </blockquote>

        <figure>
          <strong>Worked example.</strong> Consider a custodian with N = 10<sup>6</sup> documents and a
          responsiveness rate of 0.4%. A linear scan touches every document. A Grover-bounded search touches
          roughly 10<sup>3</sup>. The cost curve we sign off on in proportionality briefing is built on the
          former. Nothing in Rule 26(b)(1) tells a judge what to do when the latter is on the table.
          <figcaption>A 1,000× reduction is conservative; the relevant overheads are I/O and embedding, not the search itself.</figcaption>
        </figure>

        <h2>Three doctrinal responses</h2>

        <p>
          Courts have, broadly, three ways to respond when one side has a structurally cheaper search.
          The first is to treat the asymmetry as an evidentiary problem: shift the burden of production
          and let counsel argue about cost. The second is to treat it as a discovery-management problem:
          design protocols that are <em>method-neutral</em> and require both sides to commit to a recall floor.
          The third — the most interesting, and the one I want to dwell on — is to treat it as a
          <em>jurisprudential</em> problem about what counts as a "reasonable search."
        </p>

        <h3>1. The evidentiary route</h3>
        <p>
          The path of least resistance. Federal courts already entertain cost-shifting under
          Zubulake, and a counterparty's superior retrieval merely tilts the existing balance. The
          weakness is that cost-shifting was built for production volume, not for retrieval method.
          A producing party with quantum search may produce <em>less</em>, faster, with higher
          confidence, and the cost-shift framework has nothing useful to say about that.
        </p>

        <h3>2. The protocol route</h3>
        <p>
          Far more promising. Method-neutral protocols — already common in TAR disputes — can be
          re-specified in terms of a recall floor at a stated confidence interval, with the
          search algorithm itself left open. This pushes the problem back onto statisticians,
          which is where it should have been all along.
        </p>

        <h3>3. The jurisprudential route</h3>
        <p>
          Here the bench has to decide whether "reasonable search" is a procedural or a substantive
          concept. If procedural, then any method that meets the protocol counts. If substantive,
          then a method that is cheaper for one party than the other may, by virtue of that asymmetry,
          fail the reasonableness test. I think the substantive reading is wrong, but it is going
          to be argued — and argued well — by the first party caught out by an opponent with
          better retrieval.
        </p>

        <h2>What to do this year</h2>
        <p>
          Almost nothing, technically. But there are three small moves that practitioners can
          make now without claiming any of this is imminent:
        </p>

        <ol>
          <li>Stop drafting ESI protocols in method-specific language. Speak in recall floors.</li>
          <li>Include a quiet provision in any protective order that addresses retrieval-method asymmetry — it costs nothing and prevents the worst arguments later.</li>
          <li>If you are a judge: when the issue reaches you, ask for a recall floor, not a method.</li>
        </ol>

        <p>
          None of this is novel. All of it is overdue. What is genuinely new is that the asymmetry has
          a name, a runtime, and — for the first time in litigation history — a falsifiable bound. The law
          has handled bounds before; it will handle this one.
        </p>

        <div className="article-footnotes">
          <ol>
            <li>Grover, L. (1996). A fast quantum mechanical algorithm for database search. <em>STOC '96.</em></li>
            <li>See <em>Zubulake v. UBS Warburg LLC</em>, 217 F.R.D. 309 (S.D.N.Y. 2003), and progeny.</li>
            <li>For the recall-floor framing, see Grossman &amp; Cormack, &ldquo;Continuous Active Learning&rdquo; (2016).</li>
            <li>Cf. Vasconcelos &amp; Halász (2026), <em>Stanford J.L. &amp; Tech.</em> 28(2), 211 — companion paper.</li>
          </ol>
        </div>
      </article>

      <nav className="shell" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, padding: "32px 0 80px", borderTop: "1px solid var(--rule)" }}>
        <div>
          {prev && (
            <a href={`#/blog/${prev.slug}`} onClick={(e)=>{e.preventDefault();navigate(`/blog/${prev.slug}`);}}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>← Newer essay</div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 22, marginTop: 8, letterSpacing: "-0.01em" }}>{prev.title}</div>
            </a>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          {next && (
            <a href={`#/blog/${next.slug}`} onClick={(e)=>{e.preventDefault();navigate(`/blog/${next.slug}`);}}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Older essay →</div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 22, marginTop: 8, letterSpacing: "-0.01em" }}>{next.title}</div>
            </a>
          )}
        </div>
      </nav>
    </main>
  );
}

Object.assign(window, { BlogIndex, Article });
