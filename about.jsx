// about.jsx

function About({ navigate }) {
  const cv = {
    Education: [
      { yr: "2020–24", what: "S.J.D., Yale Law School", em: "Dissertation: Cryptographic obsolescence in long-tail contracts." },
      { yr: "2017–19", what: "LL.M., Stanford Law School", em: "CodeX Fellow." },
      { yr: "2014–16", what: "M.Sc. Quantum Information, ETH Zürich", em: "Thesis on lattice-based key exchange." },
      { yr: "2009–13", what: "LL.B., Universidade de Lisboa", em: "" },
    ],
    Affiliations: [
      { yr: "2024 –", what: "Affiliated researcher, Berkman Klein Center for Internet & Society", em: "" },
      { yr: "2023 –", what: "Visiting scholar, Stanford CodeX", em: "Quantum & Law working group." },
      { yr: "2022 –", what: "Of counsel, Ferreira Pinto & Associados", em: "Lisbon · technology disputes." },
    ],
    Service: [
      { yr: "2025 –", what: "Editorial board, Journal of Empirical Legal Studies", em: "" },
      { yr: "2024 –", what: "Programme committee, We Robot", em: "" },
      { yr: "2023 –", what: "Peer review, Harv. J.L. & Tech. · Berk. Tech. L.J.", em: "" },
    ],
  };

  return (
    <main className="page-content shell">
      <div className="about-hero">
        <div>
          <div className="eyebrow"><span className="dot">●</span>&nbsp; About · last revised May 2026</div>
          <h1 className="h-display" style={{ marginTop: 18 }}>
            A <em>lawyer</em> who reads cryptography papers, or a researcher who keeps a bar number — depending on the room.
          </h1>
          <div className="bio">
            <p>
              I work at the seam between quantum information, machine learning, and legal practice. The day-job is partly academic
              and partly applied: I write papers, I run a small lab of prototype tools, and I take a narrow caseload in technology
              disputes when something I want to write about is sitting in a court file.
            </p>
            <p>
              My research has, over the last decade, tracked a particular conviction: that the legal system is structurally bad
              at noticing when its assumptions about <em>cost</em> stop being true. Quantum information and modern machine learning
              both quietly bend those cost curves. The interesting questions are about how doctrine survives the bend.
            </p>
            <p>
              I am Lisbon-based, currently visiting at Stanford CodeX, and I read in Portuguese, English, French, and — slowly — German.
              I am happy to be wrong about anything on this site; please write to me when I am.
            </p>
          </div>
        </div>
        <div className="photo">
          <div className="ph-label">portrait · placeholder</div>
          {/* simple silhouette placeholder */}
          <svg viewBox="0 0 240 320" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="silh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--paper-2)" />
                <stop offset="100%" stopColor="var(--rule)" />
              </linearGradient>
            </defs>
            <rect width="240" height="320" fill="url(#silh)" />
            <circle cx="120" cy="120" r="56" fill="var(--rule-strong)" opacity="0.6" />
            <path d="M40 320 Q40 200 120 200 Q200 200 200 320 Z" fill="var(--rule-strong)" opacity="0.6" />
            <circle cx="200" cy="60" r="3" fill="var(--accent)" />
            <circle cx="200" cy="60" r="10" fill="none" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="0.6" />
            <circle cx="200" cy="60" r="18" fill="none" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="0.6" />
          </svg>
        </div>
      </div>

      {Object.entries(cv).map(([k, rows]) => (
        <section key={k} className="cv-grid">
          <h6>{k}</h6>
          <div className="cv-rows">
            {rows.map((r, i) => (
              <div key={i} className="cv-row">
                <span className="yr">{r.yr}</span>
                <span className="what">{r.what}{r.em && <em>{r.em}</em>}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="cv-grid">
        <h6>Things I will not</h6>
        <div className="cv-rows">
          <div className="cv-row"><span className="yr">—</span><span className="what">Expert-witness for the side of an argument I have not published on.</span></div>
          <div className="cv-row"><span className="yr">—</span><span className="what">Ghost-write op-eds or LinkedIn posts in my name.</span></div>
          <div className="cv-row"><span className="yr">—</span><span className="what">Endorse a product I have not used in anger for at least six months.</span></div>
          <div className="cv-row"><span className="yr">—</span><span className="what">Sign an NDA before a first conversation.</span></div>
        </div>
      </section>

      <section className="contact-block">
        <div>
          <div className="eyebrow"><span className="dot">●</span>&nbsp; Reach out</div>
          <h2 className="h2" style={{ marginTop: 14 }}>Slow correspondent, but a real one.</h2>
          <p className="pitch" style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 16 }}>
            Email is the only channel I read every day. Everything else gets answered eventually, with the diligence one might apply to a 19th-century letter.
          </p>
        </div>
        <div className="channels">
          <a href="mailto:hello@example.org"><span>hello@vasconcelos.law</span><span className="arr">↗</span></a>
          <a href="#"><span>Signal · on request</span><span className="arr">↗</span></a>
          <a href="#"><span>SSRN · papers + drafts</span><span className="arr">↗</span></a>
          <a href="#"><span>GitHub · @lvasconcelos</span><span className="arr">↗</span></a>
          <a href="#"><span>Mastodon · @mv@law.social</span><span className="arr">↗</span></a>
          <a href="#"><span>PGP · 0x9F8E…22C1</span><span className="arr">↗</span></a>
        </div>
      </section>
    </main>
  );
}

window.About = About;
