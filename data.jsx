// Content for the site — kept as a global window.SITE so other files can reach it.

window.SITE_NAME = "Ius Quanticum";

window.SITE = {
  posts: [
    {
      slug: "criteri-abans-euforia",
      date: "2026-05-10",
      readMin: 8,
      title: "Criteri abans d'eufòria: com parlar de tecnologia sense repetir propaganda",
      dek: "Una nota inaugural sobre el to del projecte: menys entusiasme automàtic, més precisió conceptual i més disciplina en l'ús de paraules com innovació, eficiència o disrupció.",
      tags: ["criteri", "tecnologia", "mètode"],
      body: [
        { type: "p", text: "Ius Quanticum neix d'una incomoditat bastant simple: una part del discurs públic sobre tecnologia s'ha tornat incapaç de distingir entre descripció, promesa i propaganda. El problema no és només retòric. Quan aquestes tres capes es confonen, també es degrada la manera com juristes, institucions i equips tècnics prenen decisions." },
        { type: "p", text: "Aquest espai no vol competir en velocitat. Vol competir en densitat, en precisió i en capacitat de posar ordre allà on ara hi ha massa eslògans. El ritme serà lent perquè la tesi del projecte és lenta: abans d'automatitzar llenguatges i processos, convé entendre què diem exactament quan els descrivim." },
        { type: "h2", text: "El problema no és la novetat" },
        { type: "p", text: "La novetat importa. El que no funciona és tractar-la com una virtut autosuficient. En dret, en governança i en cultura institucional, una novetat només és rellevant quan modifica una pràctica, redistribueix poder o altera un criteri de responsabilitat. Tot el que no faci això és, com a màxim, soroll." },
        { type: "quote", text: "La pregunta útil no és què pot fer una tecnologia, sinó què obliga a repensar quan s'insereix dins d'una pràctica real." },
        { type: "h2", text: "Quin serà el mètode" },
        { type: "p", text: "El blog treballarà amb un principi simple: separar capa tècnica, capa institucional i capa narrativa. Si una eina promet eficiència, cal preguntar de quina eficiència parla, sobre quin procés, amb quin cost de verificació i amb quina pèrdua de context." },
        { type: "list", items: ["Descriure la tecnologia sense inflar-la.", "Descriure la institució sense idealitzar-la.", "Descriure el conflicte entre totes dues sense resoldre'l massa aviat."] },
        { type: "p", text: "Aquesta serà la línia editorial inicial. No per prudència ornamental, sinó perquè la prudència ben entesa continua sent una forma de lucidesa." },
      ],
    },
    {
      slug: "llenguatge-public-models",
      date: "2026-04-21",
      readMin: 10,
      title: "Models, llenguatge públic i la temptació de delegar massa aviat",
      dek: "Quan una institució adopta un model generatiu, el primer que externalitza no és una tasca: és un criteri de redacció, d'èmfasi i de silenci.",
      tags: ["ai", "institucions", "llenguatge"],
      body: [
        { type: "p", text: "Els models generatius no només produeixen text. També imposen una forma de frase, una manera d'ordenar l'ambigüitat i una determinada tolerància a la vaguetat. Això és especialment sensible en entorns on el llenguatge no és accessori, sinó constitutiu: administració, regulació, contractació, compliance." },
        { type: "h2", text: "Automatitzar no és neutralitzar" },
        { type: "p", text: "Quan un equip diu que vol automatitzar la redacció d'informes, sovint està simplificant una decisió molt més profunda: quina part del judici considera substituïble i quina part continua exigint autoria humana real." },
        { type: "p", text: "L'error habitual és pensar que la supervisió posterior compensa qualsevol problema d'origen. No és així. Un text produït massa aviat per un model ja arriba carregat d'inèrcies: estructura, to, omissions plausibles i una falsa sensació de suficiència." },
        { type: "h2", text: "Què cal preservar" },
        { type: "list", items: ["Traçabilitat de qui decideix què s'escriu.", "Capacitat d'explicar per què una formulació concreta és la correcta.", "Temps suficient per detectar si l'eina ha convertit una hipòtesi en una aparença de conclusió."] },
        { type: "p", text: "A curt termini, la qüestió central no serà si els models escriuen bé. Serà si les institucions continuen sabent distingir entre un text acceptable i un text responsable." },
      ],
    },
    {
      slug: "projectes-pensar-en-public",
      date: "2026-03-12",
      readMin: 7,
      title: "Per què mantenir un laboratori de projectes petits",
      dek: "Els projectes d'Ius Quanticum no són productes tancats. Són instruments per pensar en públic i per provar si una intuïció suporta contacte amb una interfície, una base de dades o una rutina de lectura real.",
      tags: ["projectes", "editorial", "prototips"],
      body: [
        { type: "p", text: "La millor manera de detectar si una idea és només elegant sobre el paper és obligar-la a adoptar una forma operativa. Una pantalla, un esquema, un flux de consulta o un arxiu navegable tenen una virtut severa: eliminen grandiloqüència." },
        { type: "p", text: "Per això el laboratori no serà un aparador de productes ni una col·lecció de promeses vagues. Serà una zona de prova. Algunes peces quedaran a mig fer. D'altres serviran només per descartar una intuïció. Això és un resultat, no un fracàs." },
        { type: "h2", text: "Què hi trobaràs" },
        { type: "list", items: ["Arxius i repertoris per llegir millor.", "Petites eines d'orientació o classificació.", "Kits de treball per ordenar preguntes abans de prendre decisions." ] },
        { type: "p", text: "La regla és simple: si una peça no ajuda a veure millor el problema, no mereix quedar-se al laboratori." },
      ],
    },
    {
      slug: "dret-ritme-lent",
      date: "2026-02-02",
      readMin: 6,
      title: "El dret necessita un ritme lent, fins i tot quan la tecnologia accelera",
      dek: "Un apunt breu sobre per què la velocitat d'adopció no pot ser l'únic criteri per valorar canvis institucionals seriosos.",
      tags: ["dret", "temps", "governança"],
      body: [
        { type: "p", text: "L'argument de la velocitat és seductor perquè sembla obvi: si el canvi tècnic és ràpid, la resposta institucional també hauria de ser-ho. Però aquesta deducció només funciona quan el valor central és adaptar-se de pressa. En dret, sovint el valor central és un altre: decidir bé sota pressió, amb garanties i amb memòria." },
        { type: "p", text: "Un ritme lent no és una nostàlgia. És una tecnologia institucional en si mateixa. Serveix per detectar costos diferits, fer visibles els casos marginals i resistir aquella varietat de solució precipitada que després es presenta com a inevitabilitat." },
        { type: "quote", text: "No tot el que arriba abans mereix governar abans." },
        { type: "p", text: "Aquesta web parteix d'aquesta intuïció. No per frenar-ho tot, sinó per seleccionar millor què convé accelerar i què convé sotmetre a més context." },
      ],
    },
  ],

  projects: [
    {
      slug: "arxiu-senyals",
      name: "Arxiu de Senyals",
      tagline: "Un repertori comentat de conceptes, casos i fragments per seguir com canvia el llenguatge tecnològic dins del dret.",
      status: "beta",
      year: "2026",
      stack: "Astro · SQLite · JavaScript",
      kind: "arxiu",
      summary: "Una base de lectura per seguir metàfores, paraules de moda i canvis de to en documents, decisions i textos públics.",
      angle: "No busca exhaustivitat. Busca traçabilitat i criteri editorial.",
      output: "Fitxes breus, enllaços, anotacions i rutes de lectura per detectar patrons de discurs.",
      questions: [
        "Com es pot etiquetar sense simplificar massa aviat?",
        "Quina unitat de lectura és realment útil: paraula, passatge o document complet?",
        "Quan una anotació deixa d'aclarir i comença a condicionar la lectura?"
      ],
    },
    {
      slug: "protocol-lectura",
      name: "Protocol de Lectura",
      tagline: "Un kit de treball per ordenar discussions sobre IA, automatització i responsabilitat abans que es converteixin en slogans.",
      status: "live",
      year: "2026",
      stack: "Markdown · Pandoc · CSS print",
      kind: "kit",
      summary: "Plantilles i preguntes per fer sessions de lectura crítica amb equips jurídics, públics o editorials.",
      angle: "La peça central no és el document final, sinó la qualitat de les preguntes que obliga a formular.",
      output: "Guies breus, fulls de treball i versions imprimibles per a reunions o seminaris interns.",
      questions: [
        "Quina promesa exacta fa una eina?",
        "Quin cost amaga la seva adopció?",
        "Qui pot impugnar una decisió presa amb el seu suport?"
      ],
    },
    {
      slug: "cartografia-arguments",
      name: "Cartografia d'Arguments",
      tagline: "Un prototip per visualitzar tensions recurrents entre eficiència, control i responsabilitat en debats reguladors.",
      status: "concept",
      year: "2026",
      stack: "TypeScript · D3 · JSON",
      kind: "prototip",
      summary: "Una interfície experimental per veure com els mateixos arguments reapareixen amb vocabulari nou en contextos diferents.",
      angle: "Serveix més per orientar una lectura que no pas per tancar una conclusió.",
      output: "Mapes relacionals, recorreguts guiats i capes de context per a discussions llargues.",
      questions: [
        "Es pot visualitzar el desacord sense domesticar-lo?",
        "Quin grau d'abstracció ajuda i quin distorsiona?",
        "Com es manté la utilitat pública d'un mapa sense convertir-lo en doctrina?"
      ],
    },
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
