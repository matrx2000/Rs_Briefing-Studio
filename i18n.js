// R's Briefing Studio — UI translation loader
// Loads i18n.xml at runtime. Falls back to the inline copy below when fetch is
// blocked (file:// URLs in Chrome). Both copies must stay in sync.
(function () {
  const FALLBACK_XML = `<?xml version="1.0" encoding="UTF-8"?>
<translations>
  <string key="ui.switch"><en>Switch</en><de>Wechseln</de><it>Cambia</it><hr>Promijeni</hr></string>
  <string key="ui.darkmode"><en>☾ Dark</en><de>☾ Dunkel</de><it>☾ Scuro</it><hr>☾ Tamno</hr></string>
  <string key="ui.lightmode"><en>☀ Light</en><de>☀ Hell</de><it>☀ Chiaro</it><hr>☀ Svijetlo</hr></string>
  <string key="ui.textsize"><en>UI Text size</en><de>UI-Textgröße</de><it>Dimensione testo UI</it><hr>Veličina teksta UI</hr></string>
  <string key="ui.sheettextsize"><en>Sheet text size</en><de>Blatt-Textgröße</de><it>Dimensione testo foglio</it><hr>Veličina teksta lista</hr></string>
  <string key="ui.tools"><en>Formatting</en><de>Formatierung</de><it>Formattazione</it><hr>Formatiranje</hr></string>
  <string key="ui.docProperties"><en>Document properties</en><de>Dokumenteigenschaften</de><it>Proprietà documento</it><hr>Svojstva dokumenta</hr></string>
  <string key="ui.appSettings"><en>App settings</en><de>App-Einstellungen</de><it>Impostazioni app</it><hr>Postavke aplikacije</hr></string>
  <string key="ui.typography"><en>Typography</en><de>Typografie</de><it>Tipografia</it><hr>Tipografija</hr></string>
  <string key="ui.fs.h1"><en>Title (H1)</en><de>Titel (H1)</de><it>Titolo (H1)</it><hr>Naslov (H1)</hr></string>
  <string key="ui.fs.h2"><en>Headline (H2)</en><de>Überschrift (H2)</de><it>Intestazione (H2)</it><hr>Naslov (H2)</hr></string>
  <string key="ui.fs.h3"><en>Subhead (H3)</en><de>Unterüberschrift (H3)</de><it>Sottotitolo (H3)</it><hr>Podnaslov (H3)</hr></string>
  <string key="ui.fs.body"><en>Body / paragraph</en><de>Fließtext / Absatz</de><it>Testo / paragrafo</it><hr>Tekst / odlomak</hr></string>
  <string key="ui.releaseNotes"><en>Release notes</en><de>Versionshinweise</de><it>Note di rilascio</it><hr>Bilješke o izdanju</hr></string>
  <string key="ui.refreshPreview"><en>Refresh preview</en><de>Vorschau aktualisieren</de><it>Aggiorna anteprima</it><hr>Osvježi pregled</hr></string>
  <string key="ui.papersize"><en>Paper size</en><de>Papierformat</de><it>Formato carta</it><hr>Format papira</hr></string>
  <string key="ui.sampletext"><en>Sample text</en><de>Beispieltext</de><it>Testo di esempio</it><hr>Primjer teksta</hr></string>
  <string key="ui.saveproject"><en>Save Project</en><de>Projekt speichern</de><it>Salva progetto</it><hr>Spremi projekt</hr></string>
  <string key="ui.loadproject"><en>Load Project</en><de>Projekt laden</de><it>Carica progetto</it><hr>Učitaj projekt</hr></string>
  <string key="ui.printpdf"><en>Print / PDF</en><de>Drucken / PDF</de><it>Stampa / PDF</it><hr>Ispis / PDF</hr></string>
  <string key="ui.exportmd"><en>Export .md</en><de>.md exportieren</de><it>Esporta .md</it><hr>Izvezi .md</hr></string>
  <string key="ui.exportmode"><en>Export mode</en><de>Exportmodus</de><it>Modalità di esportazione</it><hr>Način izvoza</hr></string>
  <string key="ui.mode.print"><en>Print</en><de>Druck</de><it>Stampa</it><hr>Ispis</hr></string>
  <string key="ui.mode.markdown"><en>Markdown</en><de>Markdown</de><it>Markdown</it><hr>Markdown</hr></string>
  <string key="ui.md.hint"><en>Wiki-flavoured Markdown · paste into a wiki page that supports macros.</en><de>Wiki-Markdown · in eine Wiki-Seite mit Makro-Unterstützung einfügen.</de><it>Markdown per wiki · incolla in una pagina wiki che supporta le macro.</it><hr>Markdown za wiki · zalijepi u wiki stranicu koja podržava makronaredbe.</hr></string>
  <string key="ui.md.stripImages"><en>Strip embedded images</en><de>Eingebettete Bilder entfernen</de><it>Rimuovi immagini incorporate</it><hr>Ukloni ugrađene slike</hr></string>
  <string key="ui.md.copy"><en>Copy</en><de>Kopieren</de><it>Copia</it><hr>Kopiraj</hr></string>
  <string key="ui.template"><en>Template</en><de>Vorlage</de><it>Modello</it><hr>Predložak</hr></string>
  <string key="ui.about"><en>About</en><de>Über</de><it>Informazioni</it><hr>O aplikaciji</hr></string>
  <string key="ui.language"><en>Language</en><de>Sprache</de><it>Lingua</it><hr>Jezik</hr></string>
  <string key="mode.executive"><en>Executive Reporting</en><de>Führungsberichte</de><it>Reportistica direzionale</it><hr>Izvršno izvještavanje</hr></string>
  <string key="mode.engineering"><en>Engineering Reporting</en><de>Technische Berichterstattung</de><it>Reportistica ingegneristica</it><hr>Inženjersko izvještavanje</hr></string>
  <string key="switch.executiveDesc"><en>Decision-focused for leadership</en><de>Entscheidungsorientiert für Führungskräfte</de><it>Orientato alle decisioni per la leadership</it><hr>Usmjereno na odluke za vodstvo</hr></string>
  <string key="switch.engineeringDesc"><en>Technical depth for reviewers</en><de>Technische Tiefe für Prüfer</de><it>Approfondimento tecnico per i revisori</it><hr>Tehnička dubina za recenzente</hr></string>
  <string key="mode.executiveTooltip"><en>For decision-makers under time pressure. Page 1: bottom line, headline number, 5 Ws + H, pros / cons, timeline, the ask. Page 2: context and depth. Designed to be skimmed in 90 seconds.</en><de>Für Entscheidungsträger unter Zeitdruck. Seite 1: Kernaussage, Schlüsselzahl, 5 Ws + H, Pro / Contra, Zeitplan, der Antrag. Seite 2: Kontext und Tiefe. Zum Überfliegen in 90 Sekunden konzipiert.</de><it>Per chi prende decisioni sotto pressione. Pagina 1: bottom line, numero chiave, 5 Ws + H, pro / contro, tempistica, la richiesta. Pagina 2: contesto e profondità. Pensato per essere letto in 90 secondi.</it><hr>Za donositelje odluka pod vremenskim pritiskom. Stranica 1: ključna poruka, ključna brojka, 5 Ws + H, prednosti / nedostaci, vremenski plan, traženje. Stranica 2: kontekst i dubina. Dizajnirano za čitanje u 90 sekundi.</hr></string>
  <string key="mode.engineeringTooltip"><en>For technical reviewers. Page 1: proposal, effort, what changes (before / after), cost &amp; value, trade-offs, risks, open questions, the ask. Page 2: detailed considerations, stakeholders, alternatives, supporting data.</en><de>Für technische Prüfer. Seite 1: Vorschlag, Aufwand, was sich ändert (vorher / nachher), Kosten und Nutzen, Abwägungen, Risiken, offene Fragen, der Antrag. Seite 2: detaillierte Überlegungen, Beteiligte, Alternativen, Belege.</de><it>Per revisori tecnici. Pagina 1: proposta, impegno, cosa cambia (prima / dopo), costo e valore, compromessi, rischi, domande aperte, la richiesta. Pagina 2: considerazioni dettagliate, stakeholder, alternative, dati di supporto.</it><hr>Za tehničke recenzente. Stranica 1: prijedlog, napor, što se mijenja (prije / poslije), trošak i vrijednost, kompromisi, rizici, otvorena pitanja, traženje. Stranica 2: detaljna razmatranja, dionici, alternative, podaci za potporu.</hr></string>
  <string key="switch.home"><en>Home</en><de>Start</de><it>Home</it><hr>Početna</hr></string>
  <string key="switch.homeDesc"><en>Project picker / load existing</en><de>Projektauswahl / vorhandenes laden</de><it>Selettore progetto / carica esistente</it><hr>Odabir projekta / učitaj postojeći</hr></string>
  <string key="section.meta"><en>Meta</en><de>Meta</de><it>Meta</it><hr>Meta</hr></string>
  <string key="section.bluf"><en>Bottom line up front</en><de>Kernaussage zuerst</de><it>Conclusione in apertura</it><hr>Glavna poruka odmah</hr></string>
  <string key="section.metric"><en>Headline metric</en><de>Schlagzahl</de><it>Metrica chiave</it><hr>Glavna metrika</hr></string>
  <string key="section.commentary"><en>Commentary</en><de>Kommentar</de><it>Commento</it><hr>Komentar</hr></string>
  <string key="section.fivewh"><en>5 Ws + H</en><de>5 Ws + H</de><it>5 W + H</it><hr>5 P + K</hr></string>
  <string key="section.pros"><en>Pros (2–4)</en><de>Pro (2–4)</de><it>Pro (2–4)</it><hr>Za (2–4)</hr></string>
  <string key="section.cons"><en>Cons (2–4)</en><de>Kontra (2–4)</de><it>Contro (2–4)</it><hr>Protiv (2–4)</hr></string>
  <string key="section.timeline"><en>Timeline (4 phases)</en><de>Zeitplan (4 Phasen)</de><it>Cronologia (4 fasi)</it><hr>Vremenska linija (4 faze)</hr></string>
  <string key="section.cta"><en>The Ask / CTA</en><de>Die Bitte / CTA</de><it>La richiesta / CTA</it><hr>Zahtjev / CTA</hr></string>
  <string key="section.context"><en>Page 2 — Context</en><de>Seite 2 — Kontext</de><it>Pagina 2 — Contesto</it><hr>Stranica 2 — Kontekst</hr></string>
  <string key="section.proposal"><en>Technical proposal</en><de>Technischer Vorschlag</de><it>Proposta tecnica</it><hr>Tehnički prijedlog</hr></string>
  <string key="section.effort"><en>Effort</en><de>Aufwand</de><it>Sforzo</it><hr>Trud</hr></string>
  <string key="section.changes"><en>What changes</en><de>Was sich ändert</de><it>Cosa cambia</it><hr>Što se mijenja</hr></string>
  <string key="section.costvalue"><en>Cost &amp; value</en><de>Kosten &amp; Wert</de><it>Costo e valore</it><hr>Trošak i vrijednost</hr></string>
  <string key="section.tradeoffs"><en>Trade-offs</en><de>Abwägungen</de><it>Compromessi</it><hr>Kompromisi</hr></string>
  <string key="section.risks"><en>Risks</en><de>Risiken</de><it>Rischi</it><hr>Rizici</hr></string>
  <string key="section.questions"><en>Open questions</en><de>Offene Fragen</de><it>Domande aperte</it><hr>Otvorena pitanja</hr></string>
  <string key="section.decision"><en>The ask / decision</en><de>Anliegen / Entscheidung</de><it>Richiesta / decisione</it><hr>Zahtjev / odluka</hr></string>
  <string key="section.engcontext"><en>Page 2 — Technical context</en><de>Seite 2 — Technischer Kontext</de><it>Pagina 2 — Contesto tecnico</it><hr>Stranica 2 — Tehnički kontekst</hr></string>
  <string key="modal.sampleTitle"><en>Load sample text?</en><de>Beispieltext laden?</de><it>Caricare il testo di esempio?</it><hr>Učitati primjer teksta?</hr></string>
  <string key="modal.cancel"><en>Cancel</en><de>Abbrechen</de><it>Annulla</it><hr>Odustani</hr></string>
  <string key="modal.confirm"><en>Replace with sample</en><de>Mit Beispiel ersetzen</de><it>Sostituisci con esempio</it><hr>Zamijeni primjerom</hr></string>
  <string key="ui.zoomin"><en>Zoom in</en><de>Vergrößern</de><it>Ingrandisci</it><hr>Povećaj</hr></string>
  <string key="ui.zoomout"><en>Zoom out</en><de>Verkleinern</de><it>Riduci</it><hr>Smanji</hr></string>
  <string key="ui.zoomreset"><en>Click to reset to 100%</en><de>Klicken zum Zurücksetzen auf 100%</de><it>Clic per ripristinare al 100%</it><hr>Klikni za vraćanje na 100%</hr></string>
  <string key="ui.zoomfit"><en>Fit</en><de>Anpassen</de><it>Adatta</it><hr>Prilagodi</hr></string>
  <string key="ui.tools"><en>Tools</en><de>Werkzeuge</de><it>Strumenti</it><hr>Alati</hr></string>
  <string key="ui.preferences"><en>Preferences</en><de>Einstellungen</de><it>Preferenze</it><hr>Postavke</hr></string>
  <string key="ui.group.project"><en>Project</en><de>Projekt</de><it>Progetto</it><hr>Projekt</hr></string>
  <string key="ui.group.output"><en>Output</en><de>Ausgabe</de><it>Output</it><hr>Izlaz</hr></string>
  <string key="expand.open"><en>Open in editor</en><de>Im Editor öffnen</de><it>Apri nell'editor</it><hr>Otvori u uređivaču</hr></string>
  <string key="expand.close"><en>Close</en><de>Schließen</de><it>Chiudi</it><hr>Zatvori</hr></string>
  <string key="expand.done"><en>Done</en><de>Fertig</de><it>Fatto</it><hr>Gotovo</hr></string>
  <string key="expand.title"><en>Edit</en><de>Bearbeiten</de><it>Modifica</it><hr>Uredi</hr></string>
  <string key="expand.hint"><en>Esc to cancel · Ctrl+Enter to save</en><de>Esc zum Abbrechen · Strg+Eingabe zum Speichern</de><it>Esc per annullare · Ctrl+Invio per salvare</it><hr>Esc za odustajanje · Ctrl+Enter za spremanje</hr></string>
  <string key="index.hero"><en>One page. One decision. Ninety seconds.</en><de>Eine Seite. Eine Entscheidung. Neunzig Sekunden.</de><it>Una pagina. Una decisione. Novanta secondi.</it><hr>Jedna stranica. Jedna odluka. Devedeset sekundi.</hr></string>
  <string key="index.eyebrow"><en>Start a briefing</en><de>Briefing starten</de><it>Inizia un briefing</it><hr>Pokreni izvještaj</hr></string>
  <string key="index.lede"><en>Choose the briefing type that matches your audience. Each project can be saved to a file and reopened later. Your work also auto-saves to this browser.</en><de>Wählen Sie den Briefing-Typ, der zu Ihrem Publikum passt. Jedes Projekt kann in einer Datei gespeichert und später wieder geöffnet werden. Ihre Arbeit wird zudem automatisch in diesem Browser gespeichert.</de><it>Scegli il tipo di briefing più adatto al tuo pubblico. Ogni progetto può essere salvato in un file e riaperto in seguito. Il lavoro viene anche salvato automaticamente in questo browser.</it><hr>Odaberi vrstu izvještaja koja odgovara tvojoj publici. Svaki projekt može se spremiti u datoteku i kasnije ponovno otvoriti. Tvoj rad također se automatski sprema u ovaj preglednik.</hr></string>
  <string key="index.cardExecTitle"><en>New Executive Level Report</en><de>Neuer Bericht auf Führungsebene</de><it>Nuovo report direzionale</it><hr>Novi izvještaj izvršne razine</hr></string>
  <string key="index.cardEngTitle"><en>New Engineering Report</en><de>Neuer technischer Bericht</de><it>Nuovo report ingegneristico</it><hr>Novi inženjerski izvještaj</hr></string>
  <string key="index.cardOpenTitle"><en>Open existing project</en><de>Vorhandenes Projekt öffnen</de><it>Apri progetto esistente</it><hr>Otvori postojeći projekt</hr></string>
  <string key="index.cardExecDesc"><en>For executive readers. Decision-focused: bottom line, headline metric, 5 Ws + H, pros / cons, timeline, the ask. Bento layout, A4 or A3 portrait.</en><de>Für Führungskräfte. Entscheidungsorientiert: Kernaussage, Schlagzahl, 5 Ws + H, Pro / Kontra, Zeitplan, das Anliegen. Bento-Layout, A4 oder A3 Hochformat.</de><it>Per dirigenti. Orientato alla decisione: conclusione, metrica chiave, 5 W + H, pro / contro, cronologia, la richiesta. Layout Bento, A4 o A3 verticale.</it><hr>Za izvršne čitatelje. Usmjereno na odluku: glavna poruka, glavna metrika, 5 P + K, za / protiv, vremenska linija, zahtjev. Bento raspored, A4 ili A3 portret.</hr></string>
  <string key="index.cardEngDesc"><en>For engineering reviewers. Technical proposal, effort, what changes (before/after), cost &amp; value, trade-offs, risks, open questions, the ask.</en><de>Für technische Prüfer. Technischer Vorschlag, Aufwand, was sich ändert (vorher/nachher), Kosten &amp; Wert, Abwägungen, Risiken, offene Fragen, das Anliegen.</de><it>Per revisori tecnici. Proposta tecnica, sforzo, cosa cambia (prima/dopo), costo e valore, compromessi, rischi, domande aperte, la richiesta.</it><hr>Za inženjerske recenzente. Tehnički prijedlog, trud, što se mijenja (prije/poslije), trošak i vrijednost, kompromisi, rizici, otvorena pitanja, zahtjev.</hr></string>
  <string key="index.cardOpenDesc"><en>Load a previously saved &lt;code&gt;.json&lt;/code&gt; project file. Routes you to the matching editor automatically.</en><de>Laden Sie eine zuvor gespeicherte &lt;code&gt;.json&lt;/code&gt;-Projektdatei. Sie werden automatisch zum passenden Editor weitergeleitet.</de><it>Carica un file di progetto &lt;code&gt;.json&lt;/code&gt; salvato in precedenza. Vieni indirizzato automaticamente all’editor corrispondente.</it><hr>Učitaj prethodno spremljenu &lt;code&gt;.json&lt;/code&gt; projektnu datoteku. Automatski vas usmjerava na odgovarajući uređivač.</hr></string>
  <string key="index.tip"><en>Tip: every briefing is two portrait pages (A4 by default, A3 optional) — page 1 is the dashboard you read in 90 seconds, page 2 is the depth that backs it up.</en><de>Tipp: Jedes Briefing besteht aus zwei Hochformatseiten (standardmäßig A4, optional A3) — Seite 1 ist das Dashboard, das Sie in 90 Sekunden lesen, Seite 2 die Tiefe, die es untermauert.</de><it>Suggerimento: ogni briefing è composto da due pagine verticali (A4 di default, A3 opzionale) — la pagina 1 è il dashboard che leggi in 90 secondi, la pagina 2 è la profondità che la sostiene.</it><hr>Savjet: svaki izvještaj sastoji se od dvije portretne stranice (A4 zadano, A3 opcionalno) — stranica 1 je nadzorna ploča koju pročitate u 90 sekundi, stranica 2 je dubina koja ju podupire.</hr></string>
  <string key="index.start"><en>Start →</en><de>Starten →</de><it>Inizia →</it><hr>Započni →</hr></string>
  <string key="index.choose"><en>Choose file →</en><de>Datei wählen →</de><it>Scegli file →</it><hr>Odaberi datoteku →</hr></string>
  <string key="index.overflowTip"><en>If your text spills past the page edge, that’s not a bug — it’s the format pushing you to be more precise so everything fits on two pages.</en><de>Wenn Ihr Text über den Seitenrand hinausragt, ist das kein Fehler — es ist das Format, das Sie zu präziseren Formulierungen zwingt, damit alles auf zwei Seiten passt.</de><it>Se il testo esce dai margini della pagina, non è un bug — è il formato che ti spinge a essere più preciso affinché tutto entri in due pagine.</it><hr>Ako tekst izlazi izvan rubova stranice, to nije bug — to je format koji vas tjera na precizniju komunikaciju kako bi sve stalo na dvije stranice.</hr></string>
  <string key="about.overflowTitle"><en>If text overflows, that’s a feature</en><de>Wenn Text überläuft, ist das Absicht</de><it>Se il testo deborda, è una funzionalità</it><hr>Ako tekst prelazi okvire, to je značajka</hr></string>
  <string key="about.overflowBody"><en>The app never truncates or auto-shrinks. Spillover is the app telling you the idea isn’t tight enough yet — cut adjectives, pick the one number that matters, and edit until everything fits on two pages.</en><de>Die App kürzt oder skaliert nichts automatisch. Überlauf ist das Signal, dass die Idee noch nicht knapp genug ist — Adjektive streichen, die eine entscheidende Zahl auswählen und kürzen, bis alles auf zwei Seiten passt.</de><it>L’app non taglia né riduce automaticamente. Lo straripamento ti dice che l’idea non è ancora abbastanza concisa — taglia gli aggettivi, scegli l’unico numero che conta e riscrivi finché tutto entra in due pagine.</it><hr>Aplikacija ništa ne reže niti automatski smanjuje. Prelijevanje vam govori da ideja još nije dovoljno sažeta — izbacite pridjeve, odaberite jedan broj koji je važan i uređujte dok sve ne stane na dvije stranice.</hr></string>

  <string key="field.title"><en>Title</en><de>Titel</de><it>Titolo</it><hr>Naslov</hr></string>
  <string key="field.subtitle"><en>Subtitle (italic serif accent)</en><de>Untertitel (kursiver Serif-Akzent)</de><it>Sottotitolo (corsivo serif)</it><hr>Podnaslov (kurzivni serif)</hr></string>
  <string key="field.preparedby"><en>Prepared by</en><de>Erstellt von</de><it>A cura di</it><hr>Pripremio</hr></string>
  <string key="field.author"><en>Author</en><de>Autor</de><it>Autore</it><hr>Autor</hr></string>
  <string key="field.audience"><en>Audience</en><de>Zielgruppe</de><it>Pubblico</it><hr>Publika</hr></string>
  <string key="field.date"><en>Date</en><de>Datum</de><it>Data</it><hr>Datum</hr></string>
  <string key="field.decisionby"><en>Decision by</en><de>Entscheidung bis</de><it>Decisione entro</it><hr>Odluka do</hr></string>
  <string key="field.readtime"><en>Read time</en><de>Lesezeit</de><it>Tempo di lettura</it><hr>Vrijeme čitanja</hr></string>
  <string key="field.readtimeNote"><en>· auto from content</en><de>· automatisch aus Inhalt</de><it>· auto dal contenuto</it><hr>· automatski iz sadržaja</hr></string>
  <string key="field.companyName"><en>Company name</en><de>Firmenname</de><it>Nome azienda</it><hr>Naziv tvrtke</hr></string>
  <string key="field.shownInFooter"><en>· shown in footer</en><de>· in der Fußzeile angezeigt</de><it>· mostrato nel piè di pagina</it><hr>· prikazano u podnožju</hr></string>
  <string key="field.confidential"><en>Mark document &lt;strong&gt;Confidential&lt;/strong&gt; in the footer</en><de>Dokument als &lt;strong&gt;Vertraulich&lt;/strong&gt; in der Fußzeile markieren</de><it>Marca il documento come &lt;strong&gt;Riservato&lt;/strong&gt; nel piè di pagina</it><hr>Označi dokument kao &lt;strong&gt;Povjerljivo&lt;/strong&gt; u podnožju</hr></string>
  <string key="field.confidentialNote"><en>· for NDA-covered material</en><de>· für NDA-geschütztes Material</de><it>· per materiale soggetto a NDA</it><hr>· za materijale obuhvaćene NDA-om</hr></string>
  <string key="field.sectionlabel"><en>Section label</en><de>Abschnittslabel</de><it>Etichetta sezione</it><hr>Oznaka sekcije</hr></string>
  <string key="field.sectionlabelNote"><en>· small uppercase tag above the title</en><de>· kleine Großbuchstaben-Markierung über dem Titel</de><it>· piccola etichetta in maiuscolo sopra il titolo</it><hr>· mala oznaka velikim slovima iznad naslova</hr></string>
  <string key="field.headline"><en>Headline</en><de>Schlagzeile</de><it>Titolo principale</it><hr>Naslov</hr></string>
  <string key="field.headlineEmphasis"><en>Substring to italicize</en><de>Teilstring zum Kursivieren</de><it>Parte da mettere in corsivo</it><hr>Dio za kurziv</hr></string>
  <string key="field.supporting"><en>Supporting sentence</en><de>Erläuternder Satz</de><it>Frase di supporto</it><hr>Potkrepljujuća rečenica</hr></string>
  <string key="field.label"><en>Label</en><de>Bezeichnung</de><it>Etichetta</it><hr>Oznaka</hr></string>
  <string key="field.value"><en>Value</en><de>Wert</de><it>Valore</it><hr>Vrijednost</hr></string>
  <string key="field.unit"><en>Unit</en><de>Einheit</de><it>Unità</it><hr>Jedinica</hr></string>
  <string key="field.caption"><en>Caption</en><de>Bildunterschrift</de><it>Didascalia</it><hr>Opis</hr></string>
  <string key="field.image"><en>Image</en><de>Bild</de><it>Immagine</it><hr>Slika</hr></string>
  <string key="field.imagePosition"><en>Image position</en><de>Bildposition</de><it>Posizione immagine</it><hr>Položaj slike</hr></string>
  <string key="field.imageFit"><en>Image fit</en><de>Bildgröße</de><it>Adattamento immagine</it><hr>Prilagodba slike</hr></string>
  <string key="field.heading"><en>Heading</en><de>Überschrift</de><it>Intestazione</it><hr>Naslov</hr></string>
  <string key="field.paragraph1"><en>Paragraph 1</en><de>Absatz 1</de><it>Paragrafo 1</it><hr>Odlomak 1</hr></string>
  <string key="field.paragraph2"><en>Paragraph 2</en><de>Absatz 2</de><it>Paragrafo 2</it><hr>Odlomak 2</hr></string>
  <string key="field.optional"><en>· optional</en><de>· optional</de><it>· opzionale</it><hr>· opcionalno</hr></string>
  <string key="field.buttonText"><en>Button text</en><de>Button-Text</de><it>Testo del pulsante</it><hr>Tekst gumba</hr></string>
  <string key="field.reviewers"><en>Reviewers needed</en><de>Benötigte Prüfer</de><it>Revisori necessari</it><hr>Potrebni recenzenti</hr></string>
  <string key="field.stage"><en>Confidence stage</en><de>Konfidenzstufe</de><it>Livello di confidenza</it><hr>Razina pouzdanosti</hr></string>
  <string key="field.stageNote"><en>· sets reader expectations</en><de>· legt Lesererwartungen fest</de><it>· definisce le aspettative del lettore</it><hr>· postavlja očekivanja čitatelja</hr></string>
  <string key="field.evidence"><en>Evidence</en><de>Beleg</de><it>Evidenza</it><hr>Dokaz</hr></string>

  <string key="hint.meta.exec"><en>Set the audience first — every other field is written for them. The decision-by date should be a real deadline; vague deadlines invite vague replies.</en><de>Definieren Sie zuerst die Zielgruppe — jedes andere Feld wird für sie geschrieben. Das Entscheidungsdatum sollte eine echte Frist sein; vage Fristen führen zu vagen Antworten.</de><it>Definisci prima il pubblico — tutti gli altri campi sono scritti per loro. La data di decisione deve essere una scadenza reale; scadenze vaghe portano a risposte vaghe.</it><hr>Prvo definirajte publiku — svako drugo polje pišete za njih. Datum odluke mora biti pravi rok; nejasni rokovi vode do nejasnih odgovora.</hr></string>
  <string key="hint.meta.eng"><en>Audience determines vocabulary. Confidence stage sets reader expectations: don't claim Validated unless the data is in.</en><de>Die Zielgruppe bestimmt das Vokabular. Die Konfidenzstufe legt die Erwartungen fest: behaupten Sie nicht "Validiert", solange die Daten nicht vorliegen.</de><it>Il pubblico determina il lessico. Il livello di confidenza definisce le aspettative del lettore: non dichiarare "Validato" se i dati non sono pronti.</it><hr>Publika određuje vokabular. Razina pouzdanosti postavlja očekivanja: ne tvrdite "Validirano" ako podaci nisu spremni.</hr></string>
  <string key="hint.bluf"><en>The reader has 90 seconds. The headline must state the decision you want, with the headline number embedded. Supporting sentence (≤1150 chars) answers "why this, why now".</en><de>Der Leser hat 90 Sekunden. Die Schlagzeile muss die gewünschte Entscheidung mit der Kernzahl enthalten. Der erläuternde Satz (≤1150 Zeichen) beantwortet "warum das, warum jetzt".</de><it>Il lettore ha 90 secondi. Il titolo deve esprimere la decisione voluta con il numero chiave. La frase di supporto (≤1150 caratteri) risponde a "perché questo, perché ora".</it><hr>Čitatelj ima 90 sekundi. Naslov mora navesti odluku koju želite, s glavnom brojkom. Potkrepljujuća rečenica (≤1150 znakova) odgovara na "zašto ovo, zašto sada".</hr></string>
  <string key="hint.metric"><en>ONE number that captures the "so what". Pick the metric that, if wrong, kills the proposal. Keep value short.</en><de>EINE Zahl, die die Kernaussage erfasst. Wählen Sie die Kennzahl, die — wenn falsch — den Vorschlag zerstört. Halten Sie den Wert kurz.</de><it>UN numero che riassume il "quindi cosa". Scegli la metrica che, se errata, fa cadere la proposta. Tieni il valore breve.</it><hr>JEDAN broj koji obuhvaća poantu. Odaberite metriku koja, ako je pogrešna, ruši cijeli prijedlog. Vrijednost neka bude kratka.</hr></string>
  <string key="hint.commentary"><en>Optional 1–2 short paragraphs framing the decision. Use sparingly — page 1 is for skimming, not narrative.</en><de>Optional 1–2 kurze Absätze zur Einordnung. Sparsam einsetzen — Seite 1 ist zum Überfliegen, nicht zum Erzählen.</de><it>Opzionale: 1–2 brevi paragrafi che inquadrano la decisione. Usa con parsimonia — la pagina 1 è da scorrere, non da narrare.</it><hr>Opcionalno 1–2 kratka odlomka za uokvirivanje odluke. Koristite štedljivo — stranica 1 je za prelijetanje, ne za pripovijedanje.</hr></string>
  <string key="hint.fivewh"><en>Facts, not arguments. One short clause per cell. If a cell needs a full sentence, you're explaining — move that to page 2.</en><de>Fakten, keine Argumente. Ein kurzer Satz pro Feld. Wenn ein Feld einen ganzen Satz braucht, erklären Sie — verschieben Sie das auf Seite 2.</de><it>Fatti, non argomentazioni. Una breve proposizione per cella. Se serve una frase intera, sposta su pagina 2.</it><hr>Činjenice, ne argumenti. Jedna kratka rečenica po polju. Ako polju treba cijela rečenica, premjestite to na stranicu 2.</hr></string>
  <string key="hint.pros"><en>Rank by importance and stop at 4. Write each as an outcome the reader can verify, not a feature.</en><de>Nach Wichtigkeit ordnen, bei 4 aufhören. Schreiben Sie jeden als überprüfbares Ergebnis, nicht als Funktion.</de><it>Ordina per importanza, fermati a 4. Scrivi ogni voce come risultato verificabile, non come caratteristica.</it><hr>Poredajte po važnosti i stanite na 4. Svaku stavku napišite kao provjerljiv ishod, ne kao značajku.</hr></string>
  <string key="hint.cons"><en>Name the real risks, not strawmen. The reader trusts your pros only as much as they trust your cons. Mitigations belong on page 2.</en><de>Benennen Sie echte Risiken, keine Strohmänner. Maßnahmen gehören auf Seite 2.</de><it>Indica i rischi reali, non fantocci. Le mitigazioni vanno a pagina 2.</it><hr>Navedite stvarne rizike, ne lažne. Mjere ublažavanja idu na stranicu 2.</hr></string>
  <string key="hint.timeline"><en>4 phases, one line each. Use real months or sprint names. The progress bar shows where you are right now.</en><de>4 Phasen, jeweils eine Zeile. Echte Monate oder Sprint-Namen. Die Fortschrittsleiste zeigt, wo Sie jetzt stehen.</de><it>4 fasi, una riga ciascuna. Mesi o nomi di sprint reali. La barra mostra dove sei adesso.</it><hr>4 faze, po jedna linija. Stvarni mjeseci ili imena sprintova. Traka napretka pokazuje gdje ste sada.</hr></string>
  <string key="hint.cta"><en>ONE decision, ONE deadline. If you can't state the ask in a short sentence, you don't know what you're asking for.</en><de>EINE Entscheidung, EINE Frist. Wenn Sie das Anliegen nicht kurz formulieren können, wissen Sie nicht, was Sie wollen.</de><it>UNA decisione, UNA scadenza. Se non sai esprimere la richiesta in una frase breve, non sai cosa stai chiedendo.</it><hr>JEDNA odluka, JEDAN rok. Ako zahtjev ne možete reći u jednoj kratkoj rečenici, ne znate što tražite.</hr></string>
  <string key="hint.context"><en>Read time ~3–5 min. Depth on demand: only readers who need the full story open this.</en><de>Lesezeit ~3–5 Min. Tiefe auf Abruf: nur Leser, die die ganze Geschichte brauchen, öffnen diese Seite.</de><it>Tempo di lettura ~3–5 min. Approfondimento on-demand: solo chi vuole la storia completa apre questa pagina.</it><hr>Vrijeme čitanja ~3–5 min. Detalji na zahtjev: samo čitatelji kojima treba cijela priča otvaraju ovu stranicu.</hr></string>
  <string key="hint.proposal"><en>State the change and the success criterion in one line. Avoid implementation detail — that's for page 2.</en><de>Beschreiben Sie die Änderung und das Erfolgskriterium in einer Zeile. Implementierungsdetails gehören auf Seite 2.</de><it>Esprimi il cambiamento e il criterio di successo in una riga. I dettagli implementativi vanno a pagina 2.</it><hr>Iznesite promjenu i kriterij uspjeha u jednom retku. Implementacijski detalji idu na stranicu 2.</hr></string>
  <string key="hint.effort"><en>Pick ONE primary unit (hours, days, weeks, months, quarters, or years). Be honest about evidence.</en><de>Wählen Sie EINE Haupteinheit. Seien Sie ehrlich beim Beleg.</de><it>Scegli UNA unità principale. Sii onesto sull'evidenza.</it><hr>Odaberite JEDNU primarnu jedinicu. Iskreno označite dokaz.</hr></string>
  <string key="hint.changes"><en>Before / after pairs the reader can verify in production. Use real metrics, not vibes.</en><de>Vor-/Nachher-Paare, die der Leser in der Produktion überprüfen kann. Echte Metriken, keine Vermutungen.</de><it>Coppie prima/dopo verificabili in produzione. Metriche reali, non sensazioni.</it><hr>Parovi prije/poslije koje čitatelj može provjeriti u produkciji. Stvarne metrike, ne dojmovi.</hr></string>
  <string key="hint.costvalue"><en>Numbers if possible, with evidence tags. Stack costs first (one-off, then recurring), then value.</en><de>Wenn möglich Zahlen, mit Beleg-Tags. Erst Kosten, dann Wert.</de><it>Se possibile, numeri con tag di evidenza. Prima i costi, poi il valore.</it><hr>Ako je moguće, brojevi s oznakama dokaza. Prvo troškovi, zatim vrijednost.</hr></string>
  <string key="hint.tradeoffs"><en>List the 2–3 paths actually considered. Mark the chosen one.</en><de>Listen Sie die tatsächlich geprüften 2–3 Wege auf. Markieren Sie den gewählten.</de><it>Elenca le 2–3 strade davvero considerate. Marca quella scelta.</it><hr>Navedite 2–3 puta koja ste stvarno razmotrili. Označite odabrani.</hr></string>
  <string key="hint.risks"><en>Category + level + one-line note + evidence tag. List only the risks a reviewer would raise.</en><de>Kategorie + Stufe + Notiz + Beleg-Tag. Listen Sie nur die Risiken auf, die ein Prüfer ansprechen würde.</de><it>Categoria + livello + nota + tag di evidenza. Elenca solo i rischi che un revisore solleverebbe.</it><hr>Kategorija + razina + bilješka + oznaka dokaza. Navedite samo rizike koje bi recenzent postavio.</hr></string>
  <string key="hint.questions"><en>Things you genuinely need the reviewer to decide. Each should block the decision until answered.</en><de>Dinge, bei denen Sie tatsächlich die Entscheidung des Prüfers brauchen.</de><it>Cose per cui ti serve davvero la decisione del revisore.</it><hr>Stvari za koje vam stvarno treba odluka recenzenta.</hr></string>
  <string key="hint.decision"><en>Approve / reject framing, with reviewers named. Button text is the deadline.</en><de>Genehmigen/Ablehnen-Rahmen, mit benannten Prüfern.</de><it>Inquadramento approva/rifiuta con revisori nominati.</it><hr>Okvir odobri/odbij s imenovanim recenzentima.</hr></string>
  <string key="hint.engcontext"><en>Depth that backs page 1: motivation, design, dependencies, testing, rollout, rollback, monitoring, references.</en><de>Tiefe als Untermauerung von Seite 1.</de><it>Approfondimento a supporto della pagina 1.</it><hr>Dubina koja podupire stranicu 1.</hr></string>

  <string key="modal.sampleWhat"><en>&lt;strong&gt;What this does:&lt;/strong&gt; fills every field with placeholder content.</en><de>&lt;strong&gt;Was passiert:&lt;/strong&gt; alle Felder werden mit Platzhalter-Inhalt gefüllt.</de><it>&lt;strong&gt;Cosa fa:&lt;/strong&gt; riempie tutti i campi con contenuto di esempio.</it><hr>&lt;strong&gt;Što ovo radi:&lt;/strong&gt; ispunjava sva polja primjerom sadržaja.</hr></string>
  <string key="modal.sampleWhen"><en>&lt;strong&gt;When it's useful:&lt;/strong&gt; seeing the layout fully populated, checking how long text wraps, or starting fresh with a structured outline you can then edit.</en><de>&lt;strong&gt;Wann es nützlich ist:&lt;/strong&gt; das Layout komplett zu sehen, Textumbruch zu prüfen oder mit einer strukturierten Vorlage neu zu starten.</de><it>&lt;strong&gt;Quando è utile:&lt;/strong&gt; vedere il layout completo, controllare il ritorno a capo del testo o partire da una struttura modificabile.</it><hr>&lt;strong&gt;Kada je korisno:&lt;/strong&gt; vidjeti raspored u potpunosti, provjeriti prelamanje teksta ili započeti iz strukturiranog obrasca koji možete uređivati.</hr></string>
  <string key="modal.sampleWarn"><en>&lt;strong&gt;Heads up:&lt;/strong&gt; this replaces every field with sample text and clears the uploaded image. Anything you haven't saved as a project file will be lost. To keep your current work, click Cancel and use &lt;em&gt;Save Project&lt;/em&gt; first.</en><de>&lt;strong&gt;Achtung:&lt;/strong&gt; alle Felder werden ersetzt und das hochgeladene Bild gelöscht. Nicht gespeicherte Arbeit geht verloren. Klicken Sie zuerst auf &lt;em&gt;Projekt speichern&lt;/em&gt;.</de><it>&lt;strong&gt;Attenzione:&lt;/strong&gt; tutti i campi vengono sostituiti e l'immagine caricata cancellata. Salva prima con &lt;em&gt;Salva progetto&lt;/em&gt;.</it><hr>&lt;strong&gt;Pažnja:&lt;/strong&gt; sva polja bit će zamijenjena, a učitana slika izbrisana. Najprije kliknite &lt;em&gt;Spremi projekt&lt;/em&gt;.</hr></string>
</translations>`;

  const LANGUAGES = ['en', 'de', 'it', 'hr'];
  const LANG_NAMES = { en: 'English', de: 'Deutsch', it: 'Italiano', hr: 'Hrvatski' };
  const LANG_FLAGS = { en: 'EN', de: 'DE', it: 'IT', hr: 'HR' };

  function buildDict(xmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'application/xml');
    if (doc.querySelector('parsererror')) return null;
    const dict = {};
    doc.querySelectorAll('string[key]').forEach(el => {
      const k = el.getAttribute('key');
      dict[k] = {};
      Array.from(el.children).forEach(child => {
        dict[k][child.tagName.toLowerCase()] = child.textContent;
      });
    });
    return dict;
  }

  function detectInitialLang() {
    const stored = localStorage.getItem('briefing-lang');
    if (stored && LANGUAGES.includes(stored)) return stored;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGUAGES.includes(nav) ? nav : 'en';
  }

  function applyTranslations(lang) {
    if (!window.I18N || !window.I18N.dict) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const text = window.I18N.t(el.getAttribute('data-i18n'), lang);
      if (el.children.length === 0) {
        el.textContent = text;
      } else {
        const tn = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
        if (tn) tn.textContent = text;
        else el.insertBefore(document.createTextNode(text), el.firstChild);
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = window.I18N.t(el.getAttribute('data-i18n-placeholder'), lang);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = window.I18N.t(el.getAttribute('data-i18n-title'), lang);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = window.I18N.t(el.getAttribute('data-i18n-html'), lang);
    });
    document.documentElement.lang = lang;
    localStorage.setItem('briefing-lang', lang);
    window.I18N.current = lang;
    window.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));
  }

  // Try to fetch the canonical i18n.xml; fall back to embedded copy on file://.
  const init = (xmlText) => {
    let dict = buildDict(xmlText);
    if (!dict) dict = buildDict(FALLBACK_XML);
    window.I18N = {
      languages: LANGUAGES,
      languageNames: LANG_NAMES,
      languageFlags: LANG_FLAGS,
      current: detectInitialLang(),
      dict,
      t(key, lang) {
        lang = lang || this.current || 'en';
        const entry = this.dict[key];
        if (!entry) return key;
        return entry[lang] || entry.en || key;
      },
      apply(lang) { applyTranslations(lang); }
    };
    applyTranslations(window.I18N.current);
  };

  fetch('i18n.xml').then(r => r.ok ? r.text() : Promise.reject())
    .then(init)
    .catch(() => init(FALLBACK_XML));
})();
