// glossari.jsx — Interactive Schema based on Quantum Computing & The Law

function Accordion({ title, children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={() => setOpen(!open)}>
        <h4>{title}</h4>
        <span>{open ? "−" : "+"}</span>
      </div>
      {open && <div className="accordion-content">{children}</div>}
    </div>
  );
}

function SectionIntro() {
  return (
    <div className="section-body">
      <h2>I. Introducció</h2>
      <p>La computació quàntica és una tecnologia transformadora que explota els principis de la mecànica quàntica per realitzar certs càlculs exponencialment més ràpid que els ordinadors clàssics.</p>
      <div className="glossari-card-grid">
        <div className="glossari-card">
          <h4>🎯 Oportunitats</h4>
          <p>Avanços sense precedents en criptografia, descobriment de fàrmacs, ciència de materials i optimització.</p>
        </div>
        <div className="glossari-card">
          <h4>⚠️ Desafiaments Legals</h4>
          <p>Propietat intel·lectual, seguretat de dades, regulació i consideracions ètiques.</p>
        </div>
        <div className="glossari-card">
          <h4>🔐 Amenaça Criptogràfica</h4>
          <p>L'algorisme de Shor (1994) pot trencar els sistemes de xifrat actuals com RSA.</p>
        </div>
      </div>
      <h3>Àrees Crítiques de l'Anàlisi</h3>
      <ul className="key-points">
        <li>Propietat intel·lectual (IP) i patents quàntiques</li>
        <li>Seguretat de dades i criptografia post-quàntica</li>
        <li>Regulació i governança adaptativa</li>
        <li>Impactes socials i consideracions ètiques</li>
      </ul>
    </div>
  );
}

function SectionFoundations() {
  return (
    <div className="section-body">
      <h2>II. Fonaments Tècnics</h2>
      <Accordion title="1. Principis Bàsics de la Computació Quàntica">
        <ul className="key-points">
          <li><strong>Superposició:</strong> Permet que els qubits existeixin en múltiples estats simultàniament.</li>
          <li><strong>Entrellat (Entanglement):</strong> Correlació instantània entre partícules a qualsevol distància.</li>
          <li><strong>Interferència:</strong> Manipulació de probabilitats per cancel·lar camins incorrectes i reforçar els correctes.</li>
        </ul>
      </Accordion>
      <Accordion title="2. Comparació amb Computació Clàssica">
        <p>A diferència dels bits clàssics (0 o 1), els qubits utilitzen l'espai d'estats quàntic per processar informació de manera massivament paral·lela.</p>
      </Accordion>
      <Accordion title="3. Avantatges Potencials">
        <ul className="key-points">
          <li>Simulació de sistemes quàntics naturals (química/biologia).</li>
          <li>Resolució de problemes d'optimització complexos.</li>
          <li>Càlcul matemàtic d'alta velocitat per a bases de dades massives.</li>
        </ul>
      </Accordion>
    </div>
  );
}

function SectionIP() {
  return (
    <div className="section-body">
      <h2>III. Propietat Intel·lectual</h2>
      <h3>Desafiaments en la Patent d'Algorismes Quàntics</h3>
      <Accordion title="Problemes Principals">
        <ul className="key-points">
          <li><strong>Naturalesa abstracta:</strong> Dificultat per distingir entre lleis de la natura i invents patentables.</li>
          <li><strong>Novetat i activitat inventiva:</strong> Com avaluar la no-obvietat en un camp tan nou.</li>
          <li><strong>Divulgació suficient:</strong> Com descriure un invent que depèn d'arquitectures de hardware encara en evolució.</li>
        </ul>
      </Accordion>
      <div className="glossari-card-grid">
        <div className="glossari-card">
          <h4>⚖️ Equilibri</h4>
          <p>Entre incentivar la creació de coneixement i promoure la seva difusió.</p>
        </div>
        <div className="glossari-card">
          <h4>🔄 Reformes Necessàries</h4>
          <p>Llenguatge estàndard, guies d'examen i unitats especialitzades.</p>
        </div>
      </div>
    </div>
  );
}

function SectionSecurity() {
  return (
    <div className="section-body">
      <h2>IV. Seguretat de Dades</h2>
      <h3>Amenaça als Mètodes de Xifrat Actuals</h3>
      <Accordion title="El Problema: Algorisme de Shor">
        <p>Els sistemes de xifrat actuals (RSA, ECC) es basen en problemes matemàtics considerats intractables per a ordinadors clàssics.</p>
        <ul className="key-points">
          <li>Factorització d'enters grans (RSA).</li>
          <li>Logaritmes discrets (ECC/Diffie-Hellman).</li>
        </ul>
      </Accordion>
      <Accordion title="Risc de 'Forward Secrecy'">
        <p>Dades xifrades avui poden ser emmagatzemades i desxifrades més tard (Harvest Now, Decrypt Later) quan existeixin ordinadors quàntics prou potents.</p>
      </Accordion>
      <h3>Proteccions Legals en l'Era Quàntica</h3>
      <div className="glossari-card-grid">
        <div className="glossari-card">
          <h4>🔐 Criptografia Post-Quàntica (PQC)</h4>
          <p>Sistemes resistents a atacs quàntics: lattice-based, hash-based signatures.</p>
        </div>
        <div className="glossari-card">
          <h4>📋 Actualització Legal</h4>
          <p>GDPR i CCPA no aborden específicament amenaces quàntiques directament.</p>
        </div>
      </div>
    </div>
  );
}

function SectionRegulation() {
  return (
    <div className="section-body">
      <h2>V. Panorama Regulatorio</h2>
      <div className="glossari-card-grid">
        <div className="glossari-card">
          <h4>🇺🇸 Estats Units</h4>
          <p>National Quantum Initiative Act (2018): programa coordinat i associacions públic-privades.</p>
        </div>
        <div className="glossari-card">
          <h4>🇪🇺 Unió Europea</h4>
          <p>Quantum Flagship (€1B) i enfocament en consideracions ètiques i socials.</p>
        </div>
        <div className="glossari-card">
          <h4>🇨🇳 Xina</h4>
          <p>Inversió massiva ($15.3B) i prioritat nacional per al 2030.</p>
        </div>
      </div>
      <h3>Recomanacions Futures</h3>
      <ul className="key-points">
        <li>Desenvolupar regulacions específiques per a tecnologies quàntiques.</li>
        <li>Fomentar la cooperació internacional i estàndards globals.</li>
        <li>Promoure la participació multi-stakeholder.</li>
        <li>Enfatitzar l'adaptabilitat basada en principis.</li>
      </ul>
    </div>
  );
}

function SectionEthics() {
  return (
    <div className="section-body">
      <h2>VI. Consideracions Ètiques</h2>
      <div className="glossari-card-grid">
        <div className="glossari-card">
          <h4>🔓 Privacitat</h4>
          <p>Impacte en la privacitat individual i la seguretat nacional.</p>
        </div>
        <div className="glossari-card">
          <h4>📊 Bretxa Quàntica</h4>
          <p>Risc d'aprofundir les desigualtats socials i econòmiques existents.</p>
        </div>
        <div className="glossari-card">
          <h4>⚔️ Usos Militars</h4>
          <p>Dilemes sobre vigilància, manipulació i equilibri de poder.</p>
        </div>
      </div>
    </div>
  );
}

function SectionFuture() {
  return (
    <div className="section-body">
      <h2>VII. Perspectiva Futura</h2>
      <h3>Canvis en la Pràctica Legal</h3>
      <ul className="key-points">
        <li><strong>Legal Analytics Quàntiques:</strong> Projeccions precises de resultats judicials.</li>
        <li><strong>Anàlisi de Contractes:</strong> Revisió ultraràpida de documentació complexa.</li>
        <li><strong>E-Discovery:</strong> Identificació eficient de proves en volums massius de dades.</li>
      </ul>
    </div>
  );
}

function SectionConclusion() {
  return (
    <div className="section-body">
      <h2>VIII. Conclusió</h2>
      <p>La computació quàntica està evolucionant ràpidament i la comunitat legal s'enfronta a oportunitats i desafiaments sense precedents.</p>
      <div style={{ padding: '24px', background: 'var(--paper-2)', borderLeft: '4px solid var(--accent)', margin: '32px 0' }}>
         <p style={{ fontStyle: 'italic', margin: 0 }}><strong>🎯 Missatge Central:</strong> Els professionals legals poden exercir un paper vital en la configuració del futur quàntic, assegurant que aquesta tecnologia es desenvolupi respectant l'estat de dret i els drets individuals.</p>
      </div>
    </div>
  );
}

function Glossari({ navigate }) {
  const [activeSection, setActiveSection] = React.useState("intro");

  const sections = [
    { id: "intro", label: "📖 Introducció", icon: "📖" },
    { id: "foundations", label: "🔬 Fonaments", icon: "🔬" },
    { id: "ip", label: "💡 Propietat Intel·lectual", icon: "💡" },
    { id: "security", label: "🔒 Seguretat", icon: "🔒" },
    { id: "regulation", label: "⚖️ Regulació", icon: "⚖️" },
    { id: "ethics", label: "🤔 Ètica", icon: "🤔" },
    { id: "future", label: "🚀 Futur", icon: "🚀" },
    { id: "conclusion", label: "🎯 Conclusió", icon: "🎯" },
  ];

  return (
    <main className="page-content shell">
      <SectionHead
        eyebrow="Recursos · Esquema Interactiu"
        title="Quantum Computing & The Law"
        blurb="Explorant les implicacions legals del salt quàntic. Basat en l'article de Kasim Balarabe (Jindal Global Law School, 2025)."
      />

      <div className="glossari-container stack-top-md">
        <nav className="glossari-nav">
          {sections.map(s => (
            <button
              key={s.id}
              className={`nav-tab ${activeSection === s.id ? "active" : ""}`}
              onClick={() => setActiveSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="glossari-content stack-top-md">
          {activeSection === "intro" && <SectionIntro />}
          {activeSection === "foundations" && <SectionFoundations />}
          {activeSection === "ip" && <SectionIP />}
          {activeSection === "security" && <SectionSecurity />}
          {activeSection === "regulation" && <SectionRegulation />}
          {activeSection === "ethics" && <SectionEthics />}
          {activeSection === "future" && <SectionFuture />}
          {activeSection === "conclusion" && <SectionConclusion />}
        </div>
      </div>

      <style>{`
        .glossari-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--rule);
        }
        .nav-tab {
          padding: 8px 16px;
          border-radius: 4px;
          border: 1px solid var(--rule);
          background: transparent;
          color: var(--ink-2);
          font-family: var(--f-mono);
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-tab:hover {
          background: var(--paper-2);
          border-color: var(--rule-strong);
        }
        .nav-tab.active {
          background: var(--ink);
          color: var(--paper);
          border-color: var(--ink);
        }
        .glossari-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin: 24px 0;
        }
        .glossari-card {
          padding: 24px;
          border: 1px solid var(--rule);
          background: var(--paper-2);
          transition: transform 0.2s ease;
        }
        .glossari-card h4 {
          font-family: var(--f-display);
          font-size: 20px;
          margin: 0 0 12px 0;
          color: var(--accent-ink);
        }
        .glossari-card p {
          font-size: 15px;
          margin: 0;
          color: var(--ink-2);
        }
        .accordion-item {
          border-bottom: 1px solid var(--rule);
        }
        .accordion-header {
          padding: 16px 0;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .accordion-header h4 {
          margin: 0;
          font-size: 18px;
          font-weight: 500;
        }
        .accordion-content {
          padding: 0 0 16px 0;
          color: var(--ink-2);
        }
        .key-points {
          list-style: none;
          padding: 0;
          margin: 16px 0;
        }
        .key-points li {
          padding-left: 24px;
          position: relative;
          margin-bottom: 8px;
        }
        .key-points li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: var(--accent);
        }
        .section-body h2 {
          font-family: var(--f-display);
          font-size: 32px;
          margin-bottom: 24px;
        }
        .section-body h3 {
          font-family: var(--f-serif);
          font-size: 22px;
          margin: 32px 0 16px 0;
          border-bottom: 1px solid var(--rule);
          padding-bottom: 8px;
        }
      `}</style>
    </main>
  );
}

window.Glossari = Glossari;
