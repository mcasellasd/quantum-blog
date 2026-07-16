// research.jsx — Daily Editorial Digest (Actualitat)

function Research({ navigate }) {
  const items = (window.SITE.actualitat || []).slice().sort((a, b) => b.date.localeCompare(a.date));
  const recaps = window.SITE.dailyRecaps || {};
  const biblio = window.SITE.biblioteca || { intro: "", groups: [] };
  const biblioRefCount = biblio.groups.reduce((n, g) => n + g.refs.length, 0);

  const [activeDate, setActiveDate] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [onlyUrgent, setOnlyUrgent] = React.useState(false);
  const [activeProfile, setActiveProfile] = React.useState("corporate"); // 'corporate' | 'public' | 'judicial'
  
  // States for live legislative feed integration
  const [activeTab, setActiveTab] = React.useState("ia"); // 'ia' | 'editorial' | 'bulletins'
  const [alertsData, setAlertsData] = React.useState(null);
  const [selectedAlertsDate, setSelectedAlertsDate] = React.useState("");
  const [loadingAlerts, setLoadingAlerts] = React.useState(false);
  const [alertsError, setAlertsError] = React.useState(null);

  React.useEffect(() => {
    if ((activeTab === "bulletins" || activeTab === "ia") && !alertsData) {
      setLoadingAlerts(true);
      fetch("latest_alerts.json")
        .then(res => {
          if (!res.ok) throw new Error("No s'han pogut carregar les alertes.");
          return res.json();
        })
        .then(data => {
          setAlertsData(data);
          if (data.dates && data.dates.length > 0) {
            setSelectedAlertsDate(data.dates[0]);
          }
          setLoadingAlerts(false);
        })
        .catch(err => {
          setAlertsError(err.message);
          setLoadingAlerts(false);
        });
    }
  }, [activeTab, alertsData]);

  // Dynamic filtering of items
  const filteredItems = items.filter((item) => {
    // 1. Only Urgent filter
    const matchesUrgent = !onlyUrgent || item.urgency === "alta";

    // 2. Search filter (title, summary, why, source, category)
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const matchesSearch = normalizedQuery === "" || 
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.summary.toLowerCase().includes(normalizedQuery) ||
      item.why.toLowerCase().includes(normalizedQuery) ||
      item.source.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery);
      
    return matchesUrgent && matchesSearch;
  });

  // Get unique dates from the filtered items
  const filteredDates = Array.from(new Set(filteredItems.map((item) => item.date)));

  // Determine which date is currently active (defaults to latest available after filtering)
  const effectiveDate = filteredDates.includes(activeDate)
    ? activeDate
    : (filteredDates[0] || "");

  // Get recap and signals for the active day
  const activeRecap = recaps[effectiveDate] || null;
  const activeSignals = filteredItems.filter((i) => i.date === effectiveDate);

  // High urgency counts
  const totalUrgentCount = items.filter((i) => i.urgency === "alta").length;

  const handleResetFilters = () => {
    setActiveDate("");
    setSearchQuery("");
    setOnlyUrgent(false);
  };

  const getUrgencyIcon = (urgency) => {
    return urgency === "alta" ? "⚡" : "🔍";
  };

  return (
    <main className="page-content shell">
      <SectionHead
        eyebrow="Actualitat · Recap editorial diari"
        title="Senyals i Breus de Compliment Diaris"
        blurb="L'anàlisi estratègica del sector legal-tech simplificada en un resum diari d'impacte. Navega per jornades, visualitza la pressió reguladora del dia i consulta les accions i riscos específics segons la teva especialitat laboral."
        aux={
          <div className="research-metrics">
            <span>entrades <b>{items.length}</b></span>
            <span>dies actius <b>{Array.from(new Set(items.map(i => i.date))).length}</b></span>
            <span>alerts clau <b>{totalUrgentCount}</b></span>
          </div>
        }
      />

      {/* Modern Tab Selector */}
      <div className="research-tab-selector">
        <button 
          className={`research-tab-btn ${activeTab === "ia" ? "active" : ""}`}
          onClick={() => setActiveTab("ia")}
        >
          ✦ IA i Dret (LexIA)
        </button>
        <button 
          className={`research-tab-btn ${activeTab === "editorial" ? "active" : ""}`}
          onClick={() => setActiveTab("editorial")}
        >
          ✍️ Recap Editorial Diari
        </button>
        <button 
          className={`research-tab-btn ${activeTab === "bulletins" ? "active" : ""}`}
          onClick={() => setActiveTab("bulletins")}
        >
          📡 Monitor de Diaris Oficials (BOE / DOGC)
        </button>
        <button
          className={`research-tab-btn ${activeTab === "biblio" ? "active" : ""}`}
          onClick={() => setActiveTab("biblio")}
        >
          📚 Biblioteca de Fonaments
        </button>
      </div>

      {activeTab === "ia" ? (
        <div className="lexia-container">
          <div className="lexia-header-panel">
            <div className="lexia-kicker">✦ Dret al dIA · Intel·ligència Artificial i Dret Digital</div>
            <h2 className="lexia-main-title">Seguiment de novetats sobre IA i Dret</h2>
            <p className="lexia-intro">Monitoratge diari de novetats jurídiques relacionades amb la IA, l'automatització i la regulació tecnològica, analitzades per IA i filtrades per rellevància jurídica.</p>
            {alertsData && (
              <div className="lexia-meta">
                <span>Darrera actualització: <b>{alertsData.last_updated ? new Date(alertsData.last_updated).toLocaleString("ca-ES") : "N/D"}</b></span>
                <span>Total alertes IA: <b>{alertsData.lexia ? alertsData.lexia.length : 0}</b></span>
              </div>
            )}
          </div>

          <div className="lexia-feed">
            {loadingAlerts && (
              <div className="empty-results-box">
                <div className="spinner"></div>
                <p>Carregant dades del monitor d'IA i Dret...</p>
              </div>
            )}

            {alertsError && (
              <div className="empty-results-box">
                <p>⚠️ {alertsError}</p>
              </div>
            )}

            {alertsData && alertsData.lexia && alertsData.lexia.length > 0 ? (
              <div className="lexia-grid">
                {alertsData.lexia.map((item, idx) => (
                  <article key={idx} className={`lexia-item premium-card ${item.urgencia === "alta" ? "urgent-card" : ""}`}>
                    <div className="lexia-item-head">
                      <div className="lexia-badges">
                        <span className={`lexia-cat-badge is-${item.categoria}`}>{item.categoria}</span>
                        {item.urgencia === "alta" && <span className="lexia-urgent-badge">urgent</span>}
                      </div>
                      <span className="lexia-date">{item.data ? formatDate(item.data) : ""}</span>
                    </div>
                    <h3 className="lexia-title">{item.titol}</h3>
                    <p className="lexia-summary">{item.resum_executiu}</p>
                    
                    {item.impacte_practic && (
                      <div className="lexia-impact">
                        <span className="lexia-label">Impacte pràctic</span>
                        <p>{item.impacte_practic}</p>
                      </div>
                    )}

                    <div className="lexia-tags">
                      {(item.paraules_clau || []).map(kw => (
                        <span key={kw} className="lexia-tag">#{kw}</span>
                      ))}
                    </div>

                    <div className="lexia-footer">
                      <span className="lexia-source">Font: <b>{item.font_web || item.font}</b></span>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="lexia-link">
                          Veure font original ↗
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              !loadingAlerts && (
                <div className="empty-results-box">
                  <h3>No hi ha alertes d'IA disponibles</h3>
                  <p>No s'han trobat novetats sobre intel·ligència artificial en el monitor encara.</p>
                </div>
              )
            )}
          </div>
        </div>
      ) : activeTab === "editorial" ? (
        <>
          {/* Modern Control Center */}
          <div className="news-control-center">
            {/* Search Bar */}
            <div className="news-search-wrapper">
              <svg viewBox="0 0 24 24" className="search-icon"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/></svg>
              <input
                type="text"
                className="news-search-input"
                placeholder="Cerca per text, norma o font a tot l'historial..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="search-clear-btn" onClick={() => setSearchQuery("")}>×</button>
              )}
            </div>

            {/* Filters Toggle */}
            <div className="news-filters-row">
              <button 
                className={`urgent-toggle-btn ${onlyUrgent ? "active" : ""}`}
                onClick={() => setOnlyUrgent(!onlyUrgent)}
              >
                {onlyUrgent ? <span className="blink-dot">●</span> : null}
                ⚠️ Només alerts urgents
              </button>
            </div>
          </div>

          {filteredDates.length > 0 ? (
            <div className="news-digest-layout">
              {/* Timeline Sidebar Navigation */}
              <aside className="news-sidebar-timeline">
                <h4 className="sidebar-title">Historial de Digests</h4>
                <div className="news-timeline-nav">
                  {filteredDates.map((date) => {
                    const isSelected = date === effectiveDate;
                    const hasUrgentInDay = items.some(item => item.date === date && item.urgency === "alta");
                    const recapTheme = recaps[date]?.theme || "Digest de la jornada";
                    
                    return (
                      <button 
                        key={date} 
                        className={`timeline-date-btn ${isSelected ? "active" : ""}`}
                        onClick={() => setActiveDate(date)}
                      >
                        <div className="date-badge">
                          <span className="date-text">{formatDate(date)}</span>
                          {hasUrgentInDay && <span className="pulsing-bullet">●</span>}
                        </div>
                        <span className="date-theme-teaser">{recapTheme}</span>
                        <div className="btn-indicator-line" />
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Main Digest Panel */}
              <div className="news-digest-main">
                {activeRecap ? (
                  <section className="day-digest-section">
                    {/* Theme Header */}
                    <div className="digest-header">
                      <div className="digest-meta-row">
                        <span className="digest-date-stamp">{formatDate(effectiveDate)}</span>
                        <span className={`regulatory-pressure-badge is-${activeRecap.urgency}`}>
                          pressió reguladora: <b>{activeRecap.pressureLabel}</b>
                        </span>
                      </div>
                      <h2 className="digest-main-title">{activeRecap.theme}</h2>
                    </div>

                    {/* Briefing Box */}
                    <div className="briefing-card">
                      <h5 className="briefing-kicker">El resum en 1 minut</h5>
                      <p className="briefing-summary-text">{activeRecap.summary}</p>
                      
                      {/* Visual pressure meter */}
                      <div className="pressure-meter-wrapper">
                        <div className="pressure-meter-label">
                          <span>Nivell d'activitat jurídica i tecnològica</span>
                          <span>{activeRecap.pressureValue}%</span>
                        </div>
                        <div className="pressure-meter-track">
                          <div 
                            className={`pressure-meter-fill is-${activeRecap.urgency}`}
                            style={{ width: `${activeRecap.pressureValue}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Interactive Strategic Impact Analyst */}
                    <div className="impact-analyst-panel">
                      <div className="analyst-header">
                        <span className="analyst-kicker">Analista d'impacte legal-tech</span>
                        <h4 className="analyst-title">Implicacions pràctiques i derivades de compliance</h4>
                        <p className="analyst-intro">Selecciona el teu perfil professional per conèixer les teves tasques:</p>
                      </div>

                      {/* Profile selector tabs */}
                      <div className="analyst-tabs">
                        <button 
                          className={activeProfile === "corporate" ? "active" : ""}
                          onClick={() => setActiveProfile("corporate")}
                        >
                          🏢 Advocacia Corporativa & In-house
                        </button>
                        <button 
                          className={activeProfile === "public" ? "active" : ""}
                          onClick={() => setActiveProfile("public")}
                        >
                          🏛️ Sector Públic & Govern
                        </button>
                        <button 
                          className={activeProfile === "judicial" ? "active" : ""}
                          onClick={() => setActiveProfile("judicial")}
                        >
                          ⚖️ Acadèmia & Magistratura
                        </button>
                      </div>

                      {/* Dynamic profile insights view */}
                      <div className="analyst-insights-content">
                        {activeRecap.profiles[activeProfile] && (
                          <div className="impact-insights-grid">
                            {/* Recommended Actions */}
                            <div className="insight-block actions-block">
                              <h6 className="insight-block-title">
                                <span className="insight-icon">✓</span> Accions Recomanades
                              </h6>
                              <ul className="insight-list">
                                {activeRecap.profiles[activeProfile].actions.map((act, index) => (
                                  <li key={index}>{act}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Risks and Compliance */}
                            <div className="insight-block risk-block">
                              <h6 className="insight-block-title">
                                <span className="insight-icon">⚠️</span> Risc & Compliance
                              </h6>
                              <p className="insight-text-content">
                                {activeRecap.profiles[activeProfile].risk}
                              </p>
                            </div>

                            {/* Opportunities */}
                            <div className="insight-block opportunity-block">
                              <h6 className="insight-block-title">
                                <span className="insight-icon">✨</span> Focus d'Oportunitat
                              </h6>
                              <p className="insight-text-content">
                                {activeRecap.profiles[activeProfile].opportunity}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* News Signals for this Day */}
                    <div className="day-signals-container">
                      <h4 className="signals-title">Detall dels Senyals i Fonts Oficials</h4>
                      <div className="signals-list">
                        {activeSignals.map((item, idx) => (
                          <article key={idx} className={`actualitat-item premium-card ${item.urgency === "alta" ? "urgent-card" : ""}`}>
                            <div className="actualitat-kicker">
                              <span className="actualitat-cat">{item.category}</span>
                              <span className={`actualitat-urgency-badge ${item.urgency === "alta" ? "is-high" : "is-standard"}`}>
                                {item.urgency === "alta" && <span className="pulsing-bullet">●</span>}
                                {item.urgency === "alta" ? "alerta urgent" : "seguiment"}
                              </span>
                            </div>
                            <h3 className="actualitat-title">{item.title}</h3>
                            <p className="actualitat-summary">{item.summary}</p>
                            
                            <div className="actualitat-why-box">
                              <span className="why-kicker">Per què importa</span>
                              <p className="actualitat-why-text">{item.why}</p>
                            </div>
                            
                            <div className="actualitat-meta">
                              <span className="meta-source">font: <b>{item.source}</b></span>
                              <a href={item.url} target="_blank" rel="noopener noreferrer" className="meta-source-link">
                                anar al document original ↗
                              </a>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </section>
                ) : (
                  <div className="empty-results-box">
                    <h3>Digest no configurat</h3>
                    <p>No s'han pogut carregar les metadades editorials per al dia {effectiveDate}.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="empty-results-box">
              <h3>Cap resultat trobat</h3>
              <p>No hi ha digests o senyals de notícies que coincideixin amb els filtres actius o la teva cerca.</p>
              <button className="reset-filters-btn" onClick={handleResetFilters}>Restablir tots els filtres</button>
            </div>
          )}
        </>
      ) : activeTab === "biblio" ? (
        /* Foundations Library Tab Content */
        <div className="lexia-container">
          <div className="lexia-header-panel">
            <div className="lexia-kicker">📚 Biblioteca de Fonaments · Programa de recerca</div>
            <h2 className="lexia-main-title">Quantum-inspired tensor networks i raonament jurídic</h2>
            <p className="lexia-intro">{biblio.intro}</p>
            <div className="lexia-meta">
              <span>línies de recerca <b>{biblio.groups.length}</b></span>
              <span>referències verificades <b>{biblioRefCount}</b></span>
            </div>
          </div>

          {biblio.groups.map((group) => (
            <section key={group.id} style={{ marginTop: "36px" }}>
              <h3 className="monitor-column-title">{group.line}</h3>
              <p className="lexia-intro" style={{ maxWidth: "72ch" }}>{group.why}</p>
              <div className="lexia-grid" style={{ marginTop: "16px" }}>
                {group.refs.map((ref) => (
                  <article key={ref.title} className="lexia-item premium-card">
                    <div className="lexia-item-head">
                      <div className="lexia-badges">
                        <span className="lexia-cat-badge">{group.line}</span>
                      </div>
                      <span className="lexia-date">{ref.year}</span>
                    </div>
                    <h3 className="lexia-title">{ref.title}</h3>
                    <p className="lexia-summary"><b>{ref.authors}</b></p>
                    <div className="lexia-impact">
                      <span className="lexia-label">Per què és útil per al projecte</span>
                      <p>{ref.note}</p>
                    </div>
                    <div className="lexia-footer">
                      <span className="lexia-source">{ref.venue}</span>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="lexia-link">
                        Veure font original ↗
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* Bulletins Live Monitor Tab Content */
        <div className="live-monitor-container">
          <div className="live-monitor-meta">
            <span className="live-monitor-meta-text">
              📡 Estat del canal: <b>En servei (Actualitzat per Antigravity a les 9:00 AM)</b>
            </span>
            {alertsData && (
              <span className="live-monitor-meta-text">
                📅 Darrera publicació indexada: <b>{alertsData.date_str}</b>
              </span>
            )}
          </div>

          {/* Legislative Date Selector */}
          {alertsData && alertsData.dates && alertsData.dates.length > 0 && (
            <div className="legislative-date-selector">
              <span className="selector-label">📅 Selecciona la data de publicació oficial:</span>
              <div className="legislative-date-buttons">
                {alertsData.dates.map((date) => (
                  <button
                    key={date}
                    className={`leg-date-btn ${selectedAlertsDate === date ? "active" : ""}`}
                    onClick={() => setSelectedAlertsDate(date)}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loadingAlerts && (
            <div className="empty-results-box">
              <h3>Carregant dades del monitor legislatiu...</h3>
              <p>Connectant amb el magatzem de publicacions recents del BOE i del DOGC...</p>
            </div>
          )}

          {alertsError && (
            <div className="empty-results-box">
              <h3>⚠️ Error en carregar el monitor</h3>
              <p>{alertsError}</p>
            </div>
          )}

          {alertsData && (
            (() => {
              const activeAlerts = (alertsData.history && selectedAlertsDate && alertsData.history[selectedAlertsDate])
                ? alertsData.history[selectedAlertsDate]
                : alertsData;
              
              return (
                <div className="live-monitor-grid">
                  {/* BOE Column */}
                  <div className="monitor-column">
                    <h3 className="monitor-column-title">
                      🏛️ Boletín Oficial del Estado (BOE)
                    </h3>
                    <div className="monitor-column-desc">Sumari oficial ({selectedAlertsDate || activeAlerts.boe.date || activeAlerts.date_str})</div>
                    
                    <div className="monitor-card-list">
                      {activeAlerts.boe.items && activeAlerts.boe.items.length > 0 ? (
                        activeAlerts.boe.items.map((item, idx) => (
                          <div key={idx} className="monitor-card">
                            <div className="monitor-card-header">
                              <span className="monitor-badge monitor-badge-boe">Estat</span>
                              <span className="monitor-card-id">{item.id}</span>
                            </div>
                            <h4 className="monitor-card-title">{item.title}</h4>
                            <div className="monitor-card-links">
                              {item.url_html && (
                                <a href={item.url_html} target="_blank" rel="noopener noreferrer" className="monitor-link">
                                  Original HTML ↗
                                </a>
                              )}
                              {item.url_pdf && (
                                <a href={item.url_pdf} target="_blank" rel="noopener noreferrer" className="monitor-link">
                                  Original PDF ↗
                                </a>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="empty-results-box" style={{ padding: "30px" }}>
                          <p>No s'ha trobat cap publicació del BOE per a aquesta data.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* DOGC Column */}
                  <div className="monitor-column">
                    <h3 className="monitor-column-title">
                      🐱 Diari Oficial (DOGC)
                    </h3>
                    <div className="monitor-column-desc">Generalitat de Catalunya · Dades Obertes ({selectedAlertsDate || "Recents"})</div>
                    
                    <div className="monitor-card-list">
                      {activeAlerts.dogc.items && activeAlerts.dogc.items.length > 0 ? (
                        activeAlerts.dogc.items.map((item, idx) => {
                          const dataPubStr = item.date ? new Date(item.date).toLocaleDateString("ca-ES") : "N/D";
                          return (
                            <div key={idx} className="monitor-card">
                              <div className="monitor-card-header">
                                <span className="monitor-badge monitor-badge-dogc">{item.type || "Norma"}</span>
                                <span className="monitor-card-id">{item.id ? `Control: ${item.id}` : "N/D"}</span>
                              </div>
                              <h4 className="monitor-card-title">{item.title}</h4>
                              <div className="monitor-card-meta">
                                <span>📅 {dataPubStr}</span>
                                <span>
                                  <span className="vigencia-dot" />
                                  {item.vigencia || "Vigent"}
                                </span>
                              </div>
                              <div className="monitor-card-links">
                                {item.url_html && (
                                  <a href={item.url_html} target="_blank" rel="noopener noreferrer" className="monitor-link">
                                    Portal Jurídic HTML ↗
                                  </a>
                                )}
                                {item.url_pdf && (
                                  <a href={item.url_pdf} target="_blank" rel="noopener noreferrer" className="monitor-link">
                                    Portal Jurídic PDF ↗
                                  </a>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="empty-results-box" style={{ padding: "30px" }}>
                          <p>No s'ha trobat cap publicació del DOGC per a aquesta data.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}

      {/* Footer Info */}
      <section className="research-footer-grid">
        <div>
          <h6 className="research-foot-title">Metodologia de digest i curació assistida</h6>
          <p className="research-foot-copy">
            Analitzem alertes normatives i tecno-legals del BOE, DOGC, DOUE i revistes científiques. Un model especialitzat processa la documentació original per sintetitzar les implicacions de negoci i compliment legal per cada perfil professional, evitant el soroll i facilitant accions preventives.
          </p>
        </div>
        <div>
          <h6 className="research-foot-title">Exempció de responsabilitat</h6>
          <p className="research-foot-copy">
            Aquest digest és un servei d'informació, seguiment i radar. Els resums, alertes d'urgència i anàlisis d'impacte són valoracions editorials i no substitueixen cap assessorament jurídic formal ni la lectura obligatòria de les disposicions publicades als diaris oficials.
          </p>
        </div>
      </section>
    </main>
  );
}

window.Research = Research;
