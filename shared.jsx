// shared.jsx — Header, Footer, common visual bits.

function QuantumMark({ size = 360, animate = true }) {
  // concentric arcs + an orbit dot — sparing quantum motif
  const id = React.useId();
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={animate ? "quantum-mark is-animated" : "quantum-mark"}>
      <defs>
        <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.20" />
          <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill={`url(#g-${id})`} />
      {[88, 70, 52, 34, 18].map((r, i) => (
        <circle
          key={r}
          cx="100" cy="100" r={r}
          fill="none"
          stroke="var(--ink)"
          strokeOpacity={0.08 + i * 0.04}
          strokeWidth="0.5"
        />
      ))}
      {/* probability cloud — small dots */}
      {Array.from({ length: 38 }).map((_, i) => {
        const a = (i * 137.5) * Math.PI / 180;
        const r = 18 + (i % 4) * 16;
        const x = 100 + Math.cos(a) * r;
        const y = 100 + Math.sin(a) * r;
        return (
          <circle key={i} cx={x} cy={y} r={i % 7 === 0 ? 1.4 : 0.8}
            fill="var(--ink)" opacity={0.18 + (i % 5) * 0.06} />
        );
      })}
      {/* orbit + orbiter */}
      <ellipse cx="100" cy="100" rx="80" ry="32" fill="none"
        stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.4"
        transform="rotate(28 100 100)" />
      <g className={animate ? "quantum-mark-orbit is-animated" : "quantum-mark-orbit"}>
        <circle cx="180" cy="100" r="3.4" fill="var(--accent)" transform="rotate(28 100 100)" />
      </g>
      <circle cx="100" cy="100" r="3" fill="var(--ink)" />
      <style>{`@keyframes orbit { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

function MiniMark({ kind = "circles" }) {
  if (kind === "circles") {
    return (
      <svg viewBox="0 0 56 56" width="56" height="56">
        {[26, 20, 14, 8].map((r, i) => (
          <circle key={r} cx="28" cy="28" r={r} fill="none"
            stroke="var(--ink)" strokeOpacity={0.12 + i * 0.07} strokeWidth="0.6" />
        ))}
        <circle cx="28" cy="28" r="2" fill="var(--accent)" />
      </svg>
    );
  }
  if (kind === "waves") {
    return (
      <svg viewBox="0 0 56 56" width="56" height="56">
        {[0,1,2,3].map(i => (
          <path key={i} d={`M 4 ${20 + i*6} Q 16 ${10 + i*6}, 28 ${20 + i*6} T 52 ${20 + i*6}`}
            fill="none" stroke="var(--accent)" strokeOpacity={0.6 - i*0.12} strokeWidth="0.7" />
        ))}
      </svg>
    );
  }
  if (kind === "grid") {
    return (
      <svg viewBox="0 0 56 56" width="56" height="56">
        {[0,1,2,3,4].map(i => (
          <line key={`h${i}`} x1="4" y1={8 + i*10} x2="52" y2={8 + i*10} stroke="var(--ink)" strokeOpacity="0.15" strokeWidth="0.5" />
        ))}
        {[0,1,2,3,4].map(i => (
          <line key={`v${i}`} x1={8 + i*10} y1="4" x2={8 + i*10} y2="52" stroke="var(--ink)" strokeOpacity="0.15" strokeWidth="0.5" />
        ))}
        <circle cx="28" cy="28" r="3" fill="var(--accent)" />
      </svg>
    );
  }
  // ket
  return (
    <svg viewBox="0 0 56 56" width="56" height="56">
      <text x="10" y="38" fontFamily="Newsreader, serif" fontStyle="italic" fontSize="28" fill="var(--ink)">|ψ⟩</text>
      <circle cx="46" cy="14" r="3" fill="var(--accent)" />
    </svg>
  );
}

// Map top-level routes to entry HTML files so each section has a real bookmarkable URL
const PAGE_FILES = {
  "/": "index.html",
  "/blog": "blog.html",
  "/lab": "lab.html",
  "/actualitat": "research.html",
  "/research": "research.html",
  "/about": "about.html",
};

function Header({ route, navigate }) {
  const link = (path, label) => {
    const active = route === path || (path !== "/" && route.startsWith(path));
    const file = PAGE_FILES[path];
    return (
      <a href={file}
         className={active ? "active" : ""}
         onClick={(e) => {
           // If we're already on the right entry page, just navigate in-app to avoid full reload.
           const here = window.location.pathname.split("/").pop() || "index.html";
           if (here === file) {
             e.preventDefault();
             navigate(path);
           }
         }}>
        {label}
      </a>
    );
  };
  return (
    <header className="site-header">
      <a href="index.html" className="brand brand-link">
        <div className="name"><span className="mark" />{window.SITE_NAME || "Ius Quanticum"}</div>
        <div className="tag">dret · tecnologia · criteri</div>
      </a>
      <nav className="nav">
        {link("/", "Inici")}
        {link("/blog", "Blog")}
        {link("/lab", "Projectes")}
        {link("/actualitat", "Actualitat")}
        {link("/about", "Sobre")}
      </nav>
    </header>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div>
        <h6>Colofó</h6>
        <p className="colophon">
          Ius Quanticum és un quadern de treball sobre dret, tecnologia i llenguatge públic.
          Manté una forma editorial deliberada: ritme lent, criteri fort i projectes en procés.
        </p>
      </div>
      <div>
        <h6>Seccions</h6>
        <ul>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="lab.html">Projectes</a></li>
          <li><a href="research.html">Actualitat</a></li>
          <li><a href="about.html">Sobre</a></li>
        </ul>
      </div>
      <div>
        <h6>Seguiment</h6>
        <ul>
          <li><a href="#">Canal RSS</a></li>
          <li><a href="#">Notes periòdiques</a></li>
          <li><a href="#">Materials de treball</a></li>
        </ul>
      </div>
      <div>
        <h6>Presència</h6>
        <ul>
          <li><a href="#">Contacte</a></li>
          <li><a href="#">GitHub</a></li>
          <li><a href="#">Perfil acadèmic</a></li>
          <li><a href="#">Xarxes</a></li>
        </ul>
      </div>
    </footer>
  );
}

function SectionHead({ eyebrow, title, blurb, aux }) {
  return (
    <div className="section-head">
      <div>
        <div className="eyebrow"><span className="dot">●</span>&nbsp; {eyebrow}</div>
        <h1 className="h1 section-head-title">{title}</h1>
      </div>
      <div>
        {blurb && <p className="blurb">{blurb}</p>}
        {aux}
      </div>
    </div>
  );
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("ca-ES", { month: "short", day: "numeric", year: "numeric" });
}

Object.assign(window, { QuantumMark, MiniMark, Header, Footer, SectionHead, formatDate });
