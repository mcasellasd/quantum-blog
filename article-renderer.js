// article-renderer.js — Renderitza pàgines individuals d'articles
// Deps: data.js (window.SITE accessible)

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ca-ES", { year: "numeric", month: "short", day: "numeric" });
}

function renderPostBlock(block) {
  if (block.type === "h2") {
    return `<h2>${block.text}</h2>`;
  }
  if (block.type === "quote") {
    return `<blockquote>${block.text}</blockquote>`;
  }
  if (block.type === "list") {
    const items = block.items.map(item => `<li>${item}</li>`).join("");
    return `<ul class="article-list">${items}</ul>`;
  }
  // p (default)
  return `<p>${block.text}</p>`;
}

function renderHeader() {
  return `
    <div class="site-header">
      <a href="index.html" class="brand brand-link">
        <div class="name"><span class="mark" />${window.SITE_NAME || "Ius Quanticum"}</div>
        <div class="tag">dret · tecnologia · criteri</div>
      </a>
      <nav class="nav">
        <a href="index.html">Inici</a>
        <a href="blog-index.html" class="active">Blog</a>
        <a href="lab.html">Projectes</a>
        <a href="research.html">Actualitat</a>
        <a href="about.html">Sobre</a>
      </nav>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div>
        <h6>Colofó</h6>
        <p class="colophon">
          Ius Quanticum és un quadern de treball sobre dret, tecnologia i llenguatge públic.
          Manté una forma editorial deliberada: ritme lent, criteri fort i projectes en procés.
        </p>
      </div>
      <div>
        <h6>Enllaços</h6>
        <ul>
          <li><a href="index.html">Inici</a></li>
          <li><a href="blog-index.html">Blog</a></li>
          <li><a href="lab.html">Projectes</a></li>
          <li><a href="research.html">Actualitat</a></li>
          <li><a href="about.html">Sobre</a></li>
        </ul>
      </div>
      <div>
        <h6>Social</h6>
        <ul>
          <li><a href="https://x.com/iusquanticum" target="_blank">Twitter/X</a></li>
          <li><a href="https://github.com/iusquanticum" target="_blank">GitHub</a></li>
        </ul>
      </div>
      <div>
        <h6>Drets</h6>
        <ul>
          <li><a href="#">Avís Legal</a></li>
          <li><a href="#">Privacitat</a></li>
        </ul>
      </div>
    </footer>
  `;
}

function renderArticle(slug) {
  if (!window.SITE || !window.SITE.posts) {
    console.error("window.SITE.posts not found.");
    const mainEl = document.getElementById("main");
    if (mainEl) mainEl.innerHTML = "<p style='padding: 40px; text-align: center;'>Error: Article data not loaded.</p>";
    return;
  }

  const post = window.SITE.posts.find(p => p.slug === slug);
  if (!post) {
    const mainEl = document.getElementById("main");
    if (mainEl) mainEl.innerHTML = "<p style='padding: 40px; text-align: center;'>Article no trobat.</p>";
    return;
  }

  const idx = window.SITE.posts.findIndex(p => p.slug === slug);
  const next = window.SITE.posts[idx + 1];
  const prev = window.SITE.posts[idx - 1];

  const headerEl = document.getElementById("header");
  if (headerEl) headerEl.innerHTML = renderHeader();
  
  const bodyHTML = post.body.map(block => renderPostBlock(block)).join("");
  const tagsHTML = post.tags.map(t => `#${t}`).join("  ");
  
  let navHTML = "";
  if (prev) navHTML += `<a href="article-${idx}.html" class="prev">← ${prev.title}</a>`;
  if (next) navHTML += `<a href="article-${idx + 2}.html" class="next">${next.title} →</a>`;

  const mainHTML = `
    <div class="shell">
      <a href="blog-index.html" class="back-link">← tots els textos</a>
      <header class="article-head">
        <div class="eyebrow"><span class="dot">●</span>&nbsp; Text · ${tagsHTML}</div>
        <h1 class="title">${post.title}</h1>
        <p class="dek">${post.dek}</p>
        <div class="article-meta">
          <span>${formatDate(post.date)}</span>
          <span>${post.readMin} min</span>
          <span>esborrany públic</span>
        </div>
      </header>
    </div>
    <article class="article-body read">
      ${bodyHTML}
    </article>
    <div class="article-nav shell">
      ${navHTML}
    </div>
  `;

  const mainEl = document.getElementById("main");
  if (mainEl) mainEl.innerHTML = mainHTML;
  
  const footerEl = document.getElementById("footer");
  if (footerEl) footerEl.innerHTML = renderFooter();
  window.scrollTo({ top: 0 });
}

function renderBlogIndex() {
  if (!window.SITE || !window.SITE.posts) {
    console.error("window.SITE.posts not found.");
    return;
  }

  const headerEl = document.getElementById("header");
  if (headerEl) headerEl.innerHTML = renderHeader();

  const postsHTML = window.SITE.posts.map((p, idx) => {
    const articleFile = `article-${idx + 1}.html`;
    const tagsHTML = p.tags.map(t => `#${t}`).join("   ");
    return `
      <article class="blog-item" onclick="window.location.href='${articleFile}';" style="cursor: pointer;">
        <span class="date">${formatDate(p.date)}</span>
        <div>
          <h3 class="blog-item-title">${p.title}</h3>
          <p class="dek">${p.dek}</p>
          <div class="tags">${tagsHTML}</div>
        </div>
        <span class="read">${p.readMin} min →</span>
      </article>
    `;
  }).join("");

  const mainHTML = `
    <div class="shell">
      <section>
        <div class="eyebrow"><span class="dot">●</span>&nbsp; Blog · ${window.SITE.posts.length.toString().padStart(2, "0")} textos</div>
        <h1 class="h-display">Articles sobre tecnologia, IA i quàntica aplicada al dret.</h1>
        <p style="font-style: italic; color: var(--muted); margin-top: 20px; max-width: 680px;">Articles que tradueixen canvis tecnològics en criteri jurídic útil: què passa, per què importa i com afecta decisions reals en dret, IA i computació quàntica.</p>
      </section>
      <div class="blog-list">
        ${postsHTML}
      </div>
    </div>
  `;

  const mainEl = document.getElementById("main");
  if (mainEl) mainEl.innerHTML = mainHTML;
  const footerEl = document.getElementById("footer");
  if (footerEl) footerEl.innerHTML = renderFooter();
  window.scrollTo({ top: 0 });
}

// Wait for window.SITE to be loaded before rendering
function waitForSite(callback, maxAttempts = 100) {
  let attempts = 0;
  const checkInterval = setInterval(() => {
    if (window.SITE && window.SITE.posts) {
      clearInterval(checkInterval);
      callback();
    } else if (++attempts >= maxAttempts) {
      clearInterval(checkInterval);
      console.error("window.SITE not loaded after " + (maxAttempts * 100) + "ms");
      if (document.getElementById("main")) {
        document.getElementById("main").innerHTML = "<p style='padding: 40px; text-align: center; color: red;'>Error: Article data failed to load. Please refresh the page.</p>";
      }
    }
  }, 100);
}

// Initialize for blog-index
if (window.location.pathname.includes("blog-index")) {
  waitForSite(renderBlogIndex);
}
