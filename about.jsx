// about.jsx

function About({ navigate }) {
  const cv = {
    Education: [
      { yr: "2020–24", what: "S.J.D., Yale Law School", em: "Tesi sobre obsolescència criptogràfica en contractes de llarga durada." },
      { yr: "2017–19", what: "LL.M., Stanford Law School", em: "CodeX Fellow." },
      { yr: "2014–16", what: "M.Sc. Quantum Information, ETH Zürich", em: "Tesi sobre intercanvi de claus basat en graelles." },
      { yr: "2009–13", what: "LL.B., Universidade de Lisboa", em: "" },
    ],
    Affiliations: [
      { yr: "2024 –", what: "Investigador vinculat, Berkman Klein Center for Internet & Society", em: "" },
      { yr: "2023 –", what: "Visiting scholar, Stanford CodeX", em: "Grup de treball dret i tecnologia." },
      { yr: "2022 –", what: "Of counsel, Ferreira Pinto & Associados", em: "Lisboa · litigis tecnològics." },
    ],
    Service: [
      { yr: "2025 –", what: "Consell editorial, Journal of Empirical Legal Studies", em: "" },
      { yr: "2024 –", what: "Comitè de programa, We Robot", em: "" },
      { yr: "2023 –", what: "Avaluació anònima, Harv. J.L. & Tech. · Berk. Tech. L.J.", em: "" },
    ],
  };

  return (
    <main className="page-content shell">
      <div className="about-hero">
        <div>
          <div className="eyebrow"><span className="dot">●</span>&nbsp; Sobre · actualitzat el maig de 2026</div>
          <h1 className="h-display stack-top-sm">
            Un projecte editorial amb forma de quadern de treball.
          </h1>
          <div className="bio">
            <p>
              Ius Quanticum és una web en construcció que combina assaig, projectes i materials de recerca. La seva ambició és senzilla: parlar amb més precisió sobre tecnologia, dret i llenguatge públic sense caure ni en el to promocional ni en la solemnitat buida.
            </p>
            <p>
              Ara mateix l'objectiu no és mostrar una biografia tancada, sinó deixar clar el marc editorial. Les seccions centrals són Blog i Projectes; la resta de parts del web quedaran obertes però encara en desenvolupament.
            </p>
            <p>
              Quan aquest espai tingui contingut personal definitiu, aquí hi haurà una versió més completa del perfil, el context i els canals de contacte.
            </p>
          </div>
        </div>
        <div className="photo">
          <div className="ph-label">portrait · placeholder</div>
          {/* simple silhouette placeholder */}
          <svg viewBox="0 0 240 320" className="portrait-placeholder" preserveAspectRatio="xMidYMid slice">
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
        <h6>Coses que no faré</h6>
        <div className="cv-rows">
          <div className="cv-row"><span className="yr">—</span><span className="what">Fer d'expert per la banda d'un argument que no he treballat públicament.</span></div>
          <div className="cv-row"><span className="yr">—</span><span className="what">Redactar textos promocionals amb el meu nom.</span></div>
          <div className="cv-row"><span className="yr">—</span><span className="what">Recomanar eines que no hagi fet servir prou temps com per saber-ne els límits.</span></div>
          <div className="cv-row"><span className="yr">—</span><span className="what">Signar un NDA abans d'una primera conversa.</span></div>
        </div>
      </section>

      <section className="contact-block">
        <div>
          <div className="eyebrow"><span className="dot">●</span>&nbsp; Contacte</div>
          <h2 className="h2 about-contact-title">Correu lent, però real.</h2>
          <p className="pitch about-contact-copy">
            El correu és l'únic canal que es revisa cada dia. La resta pot trigar una mica més, però s'acaba responent amb criteri.
          </p>
        </div>
        <div className="channels">
          <a href="mailto:hello@example.org"><span>hola@iusquanticum.cat</span><span className="arr">↗</span></a>
          <a href="#"><span>Signal · sota petició</span><span className="arr">↗</span></a>
          <a href="#"><span>Arxiu · textos i esborranys</span><span className="arr">↗</span></a>
          <a href="#"><span>GitHub · projecte</span><span className="arr">↗</span></a>
          <a href="#"><span>Mastodon · aviat</span><span className="arr">↗</span></a>
          <a href="#"><span>PGP · pendent</span><span className="arr">↗</span></a>
        </div>
      </section>
    </main>
  );
}

window.About = About;
