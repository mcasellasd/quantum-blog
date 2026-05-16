// Content for the site — kept as a global window.SITE so other files can reach it.

window.SITE_NAME = "Ius Quanticum";

window.SITE = {
  posts: [
    {
      slug: "ia-classica-a-revolucio-quantica-sector-legal",
      date: "2026-05-16",
      readMin: 12,
      title: "De la IA clàssica a la Revolució Quàntica: Què necessita saber el sector legal?",
      dek: "Explicació de qubits, superposició i Quantum Machine Learning per entendre què canvia, què no canvia i com afecta la pràctica jurídica en els pròxims anys.",
      tags: ["ia quàntica", "computació clàssica", "jurisprudència"],
      body: [
        { type: "p", text: "Per al sector legal, la diferència entre IA clàssica i IA quàntica no és un detall tècnic. És una diferència de model computacional, de ritme d'aprenentatge i de cost de processament davant de problemes que avui considerem massa cars o massa lents." },
        { type: "h2", text: "De què parlem quan diem qubit" },
        { type: "p", text: "Un bit clàssic només pot ser 0 o 1. Un qubit pot estar en superposició, és a dir, en una combinació d'estats fins al moment de mesura. Això no vol dir màgia jurídica ni prediccions perfectes. Vol dir que alguns tipus de càlcul poden explorar espais de solució de manera radicalment diferent." },
        { type: "h2", text: "Quantum Machine Learning en context legal" },
        { type: "p", text: "Quantum Machine Learning (QML) no substituirà demà els fluxos d'anàlisi legal. Però pot aportar avantatges en classificació, optimització i detecció de patrons en entorns on la dimensió del problema es dispara. El punt clau per a un in-house counsel no és implementar QML avui, sinó entendre quines decisions estratègiques quedaran condicionades per aquesta transició." },
        { type: "list", items: ["Quins tipus de dades legals són candidats reals a acceleració quàntica.", "Quin risc de lock-in tecnològic existeix en cada proveïdor.", "Quina traçabilitat probatòria haurà de mantenir-se per sostenir jurisprudència futura."] },
        { type: "quote", text: "La pregunta no és quan arribarà la quàntica al dret, sinó quines decisions estem prenent avui com si no hagués d'arribar." },
        { type: "p", text: "Aquest article és conceptual: fixa vocabulari mínim i marc de decisió per a partners legals i equips de compliance que necessiten orientar pressupost, talent i governança amb anticipació." },
      ],
    },
    {
      slug: "ia-als-tribunals-avui-justicia-predictiva",
      date: "2026-05-08",
      readMin: 11,
      title: "La IA als Tribunals avui: De l'automatització de tasques a la justícia predictiva",
      dek: "Anàlisi de l'estat actual amb exemples com VIOGÉN i COMPAS, i del debat ètic i regulatori sobre biaix, transparència i responsabilitat judicial.",
      tags: ["justícia predictiva", "ia als tribunals", "compas"],
      body: [
        { type: "p", text: "La IA ja és als tribunals, però no de la manera espectacular que sovint es ven. Primer ha entrat per la via de l'automatització de tasques: classificació documental, triatge d'expedients i suport en la priorització de casos." },
        { type: "h2", text: "Dos casos que cal entendre" },
        { type: "p", text: "VIOGÉN il·lustra la lògica de sistemes de suport a valoració de risc en context de violència de gènere. COMPAS va obrir, especialment als EUA, una discussió estructural sobre biaix algorítmic, opacitat i dret de defensa quan la decisió humana es recolza en una puntuació automatitzada." },
        { type: "h2", text: "D'on surt la fricció" },
        { type: "list", items: ["Dificultat per explicar la lògica del model en sala.", "Dependència de dades històriques que poden consolidar desigualtats.", "Confusió entre eina de suport i eina de decisió." ] },
        { type: "p", text: "Per a jutges i reguladors, el debat real no és si prohibir tota IA judicial, sinó definir amb precisió en quines fases processals és admissible, amb quines garanties d'auditoria i amb quin estàndard de contradicció efectiva." },
        { type: "quote", text: "La justícia predictiva només és legítima quan la predicció no substitueix el deure de motivar." },
        { type: "p", text: "Aquest article és d'anàlisi: ordena riscos, usos actuals i decisions de governança perquè els equips jurídics distingeixin entre implementació útil i adopció acrítica." },
      ],
    },
    {
      slug: "fi-instruccions-interminables-ediscovery-quantica",
      date: "2026-04-27",
      readMin: 13,
      title: "La fi de les instruccions interminables: L'e-Discovery impulsat per la quàntica",
      dek: "Tutorial pràctic per entendre com l'algorisme de Grover pot accelerar l'exploració de bases de dades desestructurades en litigis i investigacions internes.",
      tags: ["e-discovery", "algorisme grover", "búsqueda quàntica"],
      body: [
        { type: "p", text: "L'e-discovery clàssic pateix quan la informació és massiva, heterogènia i poc estructurada. El cost no és només computacional: també és processal, perquè cada iteració de recerca i depuració allarga terminis i incrementa risc de disputa probatòria." },
        { type: "h2", text: "Què aporta Grover" },
        { type: "p", text: "L'algorisme de Grover és una tècnica de cerca quàntica per reduir el nombre de consultes necessàries en determinats tipus de problemes no estructurats. No resol tot l'e-discovery, però pot reduir la càrrega en fases específiques de localització i filtrat inicial." },
        { type: "h2", text: "Guia de decisió per equips legals" },
        { type: "list", items: ["Identifica quina part del flux de recerca és realment no estructurada.", "Separa fase de triatge tècnic i fase de validació jurídica humana.", "Defineix una política de traçabilitat: query, transformacions i criteri de rellevància." ] },
        { type: "p", text: "Per a in-house counsel i partners, la clau és pragmàtica: començar per pilots acotats, amb mètriques de temps, costos i qualitat probatòria comparables amb el mètode clàssic." },
        { type: "quote", text: "En e-discovery, velocitat sense auditabilitat és només risc més ràpid." },
        { type: "p", text: "Aquest article és tutorial: prioritza com implementar decisions i com evitar que la promesa tècnica col·lapsi en discussió processal." },
      ],
    },
    {
      slug: "descollapsar-jutjats-qaoa-gestio-agendes",
      date: "2026-04-11",
      readMin: 10,
      title: "Descol·lapsar els jutjats: L'Algorisme QAOA i la gestió d'agendes judicials",
      dek: "Com QAOA pot abordar el problema combinatori de coordinar jutges, sales, advocats i finestres processals en calendaris judicials de màxima pressió.",
      tags: ["qaoa", "optimització quàntica", "calendari judicial"],
      body: [
        { type: "p", text: "La gestió d'agendes judicials és un problema d'optimització amb restriccions múltiples: disponibilitat de jutges, sales, advocats, terminis legals, preferències de procediment i incidències sobrevingudes. Quan aquest volum creix, els sistemes clàssics tendeixen a degradar-se ràpidament." },
        { type: "h2", text: "Per què QAOA és rellevant" },
        { type: "p", text: "QAOA (Quantum Approximate Optimization Algorithm) és una aproximació pensada per problemes combinatoris complexos. En calendari judicial no promet perfecció, però sí la possibilitat de trobar solucions de millor qualitat dins de finestres temporals útils per a operació real." },
        { type: "h2", text: "On és l'oportunitat institucional" },
        { type: "list", items: ["Reducció de conflictes d'agenda de darrera hora.", "Millor ús de sales i recursos administratius.", "Menys ajornaments evitables i més previsibilitat processal." ] },
        { type: "p", text: "Per a managers de jutjats i CIOs, l'estratègia recomanable és començar amb simulació híbrida: modelar restriccions reals, comparar contra heurístiques actuals i desplegar progressivament per jurisdicció o tipus d'assumpte." },
        { type: "quote", text: "El valor d'un calendari judicial no és només omplir franges, sinó reduir friccions processals sense perdre garanties." },
        { type: "p", text: "Aquest article és d'oportunitat: proposa un full de ruta per a modernització operativa sense confondre innovació amb experimentació descontrolada." },
      ],
    },
  ],

  projects: [
    {
      slug: "trobar-article",
      name: "Trobar un Article",
      tagline: "Cerca per número d'article, títol o text legal i accedeix directament a la disposició rellevant.",
      status: "live",
      year: "2026",
      stack: "Motor de cerca jurídica · Índex d'articles · Navegació per codis",
      kind: "eina",
      url: "https://quediulallei.cat/",
      summary: "Mòdul central de lectura estructurada per trobar ràpidament articles dins dels codis jurídics disponibles.",
      angle: "Prioritza accés clar i directe, sense obligar la persona usuària a dominar sigles o arquitectura normativa prèvia.",
      output: "Resultats per article, coincidència textual i accés immediat a la norma completa.",
      questions: [
        "Com prioritzar resultats sense perdre precisió jurídica?",
        "Quin pes donar al text literal davant del context normatiu?",
        "Com mostrar relacions entre articles sense sobrecarregar la lectura?"
      ],
    },
    {
      slug: "orientacio-tematica",
      name: "Orienta't per Temàtica",
      tagline: "Quan tens el problema però no saps quina norma consultar, et proposa codis i articles inicials.",
      status: "beta",
      year: "2026",
      stack: "Taxonomia jurídica · Recomanador per matèries · Flux guiat",
      kind: "orientació",
      url: "https://quediulallei.cat/",
      summary: "Passarel·la de descoberta per començar des del dubte i arribar a la norma adequada en menys passos.",
      angle: "Pensa en problemes reals (filiació, successions, garanties, societats) i no en classificacions acadèmiques abstractes.",
      output: "Rutes temàtiques, recomanacions d'articles i enllaços als codis rellevants.",
      questions: [
        "Com evitar recomanacions massa genèriques?",
        "Com distingir orientació pedagògica d'assessorament jurídic?",
        "Com mantenir cobertura equilibrada entre àmbits materials?"
      ],
    },
    {
      slug: "hermes-comprensio",
      name: "Hermes",
      tagline: "Espai d'exploració guiada per comprendre millor una norma amb resum, context i exemples.",
      status: "live",
      year: "2026",
      stack: "IA assistida · Prompting legal · Revisió humana",
      kind: "assistència",
      url: "https://quediulallei.cat/",
      summary: "Mòdul d'interpretació assistida pensat per augmentar l'autonomia en la lectura jurídica, no per substituir professionals.",
      angle: "Manté un enfocament pedagògic: explica, contextualitza i adverteix límits abans de suggerir conclusions.",
      output: "Resums orientatius, exemples d'aplicació i preguntes de verificació.",
      questions: [
        "Com garantir que el llenguatge sigui clar sense simplificar en excés?",
        "Com mostrar incertesa interpretativa de manera transparent?",
        "Com reforçar el disclaimer de no-consultori en cada interacció?"
      ],
    },
    {
      slug: "jurisprudencia-doctrina",
      name: "Jurisprudència i Doctrina",
      tagline: "Connexió entre articles normatius, sentències i publicacions acadèmiques relacionades.",
      status: "concept",
      year: "2026",
      stack: "Indexació documental · Enllaçat semàntic · Curadoria",
      kind: "repositori",
      url: "https://quediulallei.cat/codi-consum",
      summary: "Capa complementària per contrastar text legal amb pràctica jurisprudencial i debat doctrinal.",
      angle: "Especialment útil quan una disposició requereix context aplicatiu per ser realment entesa.",
      output: "Fitxes d'articles amb sentències vinculades i referències acadèmiques.",
      questions: [
        "Quin criteri d'inclusió de sentències evita biaixos?",
        "Com es presenta doctrina contradictòria sense confondre l'usuari?",
        "Com actualitzar enllaços i cites sense degradar confiança?"
      ],
    },
    {
      slug: "dretvisual-clars",
      name: "DretVisual & Clar",
      tagline: "Biblioteca visual d'apunts, esquemes i vídeos per estudiar dret espanyol i català amb alta densitat i navegació per branques.",
      status: "live",
      year: "2026",
      stack: "Vídeos · Visuals interactius · Mòduls docents",
      kind: "biblioteca",
      url: "https://dretvisual.quediulallei.cat/",
      summary: "Projecte d'aprenentatge jurídic visual amb itineraris per penal, civil, administratiu, constitucional, processal, financer i mercantil.",
      angle: "Combina formats audiovisuals i esquemes perquè la persona usuària pugui memoritzar i entendre estructura normativa en menys temps.",
      output: "Graella de matèries, accés a vídeos, visuals i mòduls especialitzats.",
      questions: [
        "Com mantenir rigor doctrinal en formats ultra-breus?",
        "Com harmonitzar actualització normativa amb contingut audiovisual?",
        "Com enllaçar estudi memorístic amb comprensió aplicativa?"
      ],
    },
    {
      slug: "viajusta",
      name: "ViaJusta",
      tagline: "Explica el teu problema i obtén un camí processal general per orientar els primers passos.",
      status: "live",
      year: "2026",
      stack: "Orientació processal · Flux de casos · Disclaimer legal",
      kind: "orientador",
      url: "https://viajusta.vercel.app/",
      summary: "Eina d'orientació inicial per casos freqüents com acomiadaments, fiances, multes, comissions abusives o accidents.",
      angle: "Posa el focus en seqüència d'actuació i no en resposta jurídica tancada, mantenint el límit de no-consultori.",
      output: "Camí processal orientatiu i enllaços a recursos complementaris.",
      questions: [
        "Com evitar que una ruta orientativa es llegeixi com consell definitiu?",
        "Com ajustar rutes a diferències territorials i competencials?",
        "Com recollir casos límit sense saturar la interfície?"
      ],
    },
    {
      slug: "feed-juridic",
      name: "Feed Jurídic",
      tagline: "Portada editorial connectada a novetats jurídiques amb context, radar i accés directe a fonts originals.",
      status: "live",
      year: "2026",
      stack: "Feed de novetats · Radar sectorial · Digest",
      kind: "monitor",
      url: "https://feedjuridic.vercel.app/index.html",
      summary: "Canal de seguiment diari amb senyals del dia, resum executiu, focus sectorial i traçabilitat de font.",
      angle: "No es limita a titulars: contextualitza moviments i permet filtrar per categories i canals.",
      output: "Dashboard de novetats, digest i radar recent amb enllaços de verificació.",
      questions: [
        "Com garantir qualitat de context quan el volum de novetats augmenta?",
        "Quina jerarquia editorial minimitza soroll i maximitza rellevància?",
        "Com detectar urgències sense amplificar alarmisme?"
      ],
    },
  ],

  actualitat: [
    {
      date: "2026-05-16",
      title: "La Generalitat destina cinc milions d'euros a formació en IA per a treballadors públics",
      category: "administratiu",
      source: "Regio7",
      urgency: "normal",
      summary: "La notícia apunta a una aposta institucional per capacitació en IA dins l'administració. El punt jurídic rellevant és la governança d'ús: protocols, responsabilitat de decisió humana i traçabilitat de processos assistits.",
      why: "Impacta contractació pública, procediment administratiu i qualitat del servei públic digital.",
      url: "https://www.regio7.cat/arreu-catalunya-espanya-mon/2026/05/16/generalitat-destina-cinc-milions-euros-formacio-intelligencia-artificial-funcionaris-catalunya-salvador-illa-ia-microsoft-130286894.html"
    },
    {
      date: "2026-05-15",
      title: "DOGC publica nous moviments normatius en tramitació digital",
      category: "regulatori",
      source: "DOGC",
      urgency: "normal",
      summary: "La tendència consolida la digitalització procedimental i obliga a revisar terminis, notificació electrònica i prova de recepció. El resum IA prioritza els canvis que poden afectar litigi o compliance a curt termini.",
      why: "Convé anticipar impacte en obligacions formals i en estratègia de resposta processal.",
      url: "https://dogc.gencat.cat/"
    },
    {
      date: "2026-05-14",
      title: "Debat sobre transparència algorítmica en serveis públics i resolucions assistides",
      category: "ia i dret",
      source: "Parlament",
      urgency: "alta",
      summary: "Els actors institucionals reclamen criteris mínims d'explicabilitat en eines de suport a decisió. El resum IA destaca riscos de biaix, opacitat contractual i necessitat de control extern independent.",
      why: "Pot generar noves exigències de supervisió i auditoria en administracions i proveïdors.",
      url: "https://www.parlament.cat/"
    }
  ],

  papers: [
    {
      title: "Línia editorial en preparació",
      authors: "Ius Quanticum",
      venue: "Secció en construcció",
      year: 2026,
      links: ["aviat"],
      cit: "—",
    },
  ],

  workingPapers: [
    {
      title: "Notes de recerca i materials oberts",
      authors: "Ius Quanticum",
      venue: "En desenvolupament progressiu",
      year: 2026,
      links: ["aviat"],
      cit: "—",
    },
  ],

  talks: [
    { when: "2026", what: "Recerca i intervencions encara no publicades", where: "Secció en construcció" },
  ],
};
