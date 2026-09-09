// data/lerntechniken.js
// Überarbeitet: Aufgabenziel-Struktur ergänzt (Schritte, Selbstcheck, evidenceLevel, naechsterSchritt),
// vier evidenzbasierte Kernstrategien ergänzt (Active Recall, Spaced Practice, Interleaving, Worked Examples).
// evidenceLevel: 'hoch' = Kernstrategie (breit belegt), 'merkhilfe' = Gedächtnishilfe, 'organisation' = Fokus/Struktur.

export const LERNTECHNIKEN = [
  { id:'active-recall', name:'Active Recall (freier Abruf)', emoji:'🔁', masterfaehigkeiten:['strukturieren','reduzieren'],
    kurzbeschreibung:'Buch schließen, Wissen aus dem Gedächtnis abrufen, danach mit Vorlage vergleichen und korrigieren.',
    aufwand:'einfach', evidenceLevel:'hoch', zeitMin:10,
    aufgabentypen:['vokabeln','fakten','textverstaendnis','pruefungsvorbereitung'],
    wannNicht:'als einziger Schritt bei komplexen Rechenverfahren – dort zuerst Worked Examples nutzen',
    schritte:[
      'Lies oder lerne den Abschnitt einmal aufmerksam.',
      'Schließe das Material und schreibe alles auf, woran du dich erinnerst.',
      'Öffne das Material und vergleiche – markiere Lücken und Fehler in einer zweiten Farbe.',
      'Wiederhole den Abruf zu den markierten Lücken nach einer kurzen Pause.'
    ],
    beispielaufgaben:['Nach dem Lesen eines Kapitels 5 Minuten alles aufschreiben, was hängen geblieben ist.','Vor der nächsten Lernsitzung zuerst abfragen statt neu zu lesen.','Nach einem Video die Kernaussagen frei nacherzählen.'],
    selbstcheck:'Kannst du die 3 wichtigsten Punkte in eigenen Worten nennen, ohne nachzusehen?',
    tipp:'Der Lerneffekt entsteht beim Abrufen selbst – nicht beim erneuten Lesen!',
    naechsterSchritt:'Wiederhole den Abruf morgen und in einer Woche erneut (Spaced Practice).' },

  { id:'spaced-practice', name:'Spaced Practice (verteiltes Wiederholen)', emoji:'📅', masterfaehigkeiten:['strukturieren'],
    kurzbeschreibung:'Statt an einem Abend alles zu pauken, verteilst du Wiederholungen über mehrere Tage oder Wochen.',
    aufwand:'einfach', evidenceLevel:'hoch', zeitMin:5,
    aufgabentypen:['vokabeln','fakten','pruefungsvorbereitung'],
    wannNicht:'wenn nur wenige Stunden bis zur Prüfung bleiben – dann gezielt priorisieren statt neu zu planen',
    schritte:[
      'Lege fest, wann du den Stoff sicher können willst (z. B. Prüfungstermin).',
      'Plane eine erste Wiederholung nach 1 Tag, eine zweite nach ca. 1 Woche.',
      'Wiederhole jeweils mit Active Recall, nicht durch reines Lesen.',
      'Verlängere den Abstand, wenn ein Punkt sicher sitzt; verkürze ihn bei Unsicherheit.'
    ],
    beispielaufgaben:['Vokabeln an Tag 1, Tag 3 und Tag 10 erneut abfragen.','Mathe-Formeln über 3 Wochen verteilt statt an einem Abend üben.','Karteikarten in Fächern führen und nur fällige Karten wiederholen.'],
    selbstcheck:'Kannst du den Stoff auch nach einigen Tagen ohne erneutes Lesen noch abrufen?',
    tipp:'Kurze, wiederholte Sitzungen schlagen eine einzelne lange Lernsession.',
    naechsterSchritt:'Trage den nächsten Wiederholungstermin in deinen Kalender ein.' },

  { id:'interleaving', name:'Interleaving (gemischtes Üben)', emoji:'🔀', masterfaehigkeiten:['strukturieren','verknuepfen'],
    kurzbeschreibung:'Verschiedene, ähnliche Aufgabentypen gemischt statt blockweise üben – gut um sie sicher zu unterscheiden.',
    aufwand:'mittel', evidenceLevel:'hoch', zeitMin:20,
    aufgabentypen:['prozesse','pruefungsvorbereitung'],
    wannNicht:'beim ersten Kennenlernen eines einzelnen neuen Verfahrens oder bei reinem Vokabellernen',
    schritte:[
      'Wähle 3–4 ähnliche Aufgabentypen aus (z. B. verschiedene Bruchrechen-Aufgaben).',
      'Mische die Reihenfolge, statt Typ für Typ nacheinander zu üben.',
      'Benenne vor jeder Aufgabe kurz, welches Verfahren du wählst und warum.',
      'Vergleiche am Ende Fehler zwischen den Aufgabentypen.'
    ],
    beispielaufgaben:['Textaufgaben zu Addition, Subtraktion und Multiplikation gemischt üben.','Physik: Aufgaben zu Kraft, Energie und Impuls durcheinander lösen.','Grammatikregeln verschiedener Zeitformen gemischt anwenden.'],
    selbstcheck:'Erkennst du sofort, welches Verfahren eine neue, unbekannte Aufgabe verlangt?',
    tipp:'Es fühlt sich beim Üben schwerer an – das ist gewollt und verbessert das spätere Behalten.',
    naechsterSchritt:'Prüfe in der nächsten Sitzung erneut gemischte Aufgaben ohne Vorsortierung.' },

  { id:'worked-examples', name:'Ausgearbeitete Beispiele (Worked Examples)', emoji:'📐', masterfaehigkeiten:['strukturieren','verknuepfen'],
    kurzbeschreibung:'Eine bereits gelöste Aufgabe Schritt für Schritt nachvollziehen und erklären, bevor du selbst rechnest.',
    aufwand:'mittel', evidenceLevel:'hoch', zeitMin:15,
    aufgabentypen:['prozesse'],
    wannNicht:'wenn du das Verfahren schon sicher beherrschst – dann direkt eigenständig üben',
    schritte:[
      'Lies die gelöste Beispielaufgabe Zeile für Zeile.',
      'Erkläre dir laut, warum jeder Schritt erlaubt ist.',
      'Löse eine ähnliche Aufgabe, bei der die letzten Schritte fehlen (Fading).',
      'Löse danach eine komplette Aufgabe ganz ohne Vorlage.'
    ],
    beispielaufgaben:['Gelöste Bruchgleichung Schritt für Schritt erklären, dann eine ähnliche selbst zu Ende rechnen.','Physik-Musterlösung nachvollziehen, danach Variante mit anderen Werten lösen.','Grammatik-Beispielsatz analysieren, danach eigenen Satz nach demselben Muster bilden.'],
    selbstcheck:'Kannst du einer Mitschülerin erklären, warum Schritt 3 notwendig ist?',
    tipp:'Besonders wirksam für Einsteiger:innen – mit wachsender Sicherheit lieber direkt selbst rechnen.',
    naechsterSchritt:'Löse morgen eine Transferaufgabe ganz ohne Vorlage.' },

  { id:'loci', name:'Loci-Technik', emoji:'🏠', masterfaehigkeiten:['visualisieren','verknuepfen'],
    kurzbeschreibung:'Du gehst in Gedanken durch ein bekanntes Haus und platzierst Infos als verrückte Bilder.',
    aufwand:'mittel', evidenceLevel:'merkhilfe', zeitMin:15,
    aufgabentypen:['vokabeln','fakten','prozesse'],
    wannNicht:'für tiefes Verständnis von Zusammenhängen – dort eher Mind-Map oder Selbsterklärung nutzen',
    schritte:[
      'Wähle einen dir vertrauten Weg oder ein Haus mit 5–10 festen Stationen.',
      'Verbinde jede Information mit einer Station als möglichst verrücktes Bild.',
      'Gehe den Weg gedanklich mehrmals ab und rufe die Bilder ab.',
      'Prüfe ohne Vorlage, ob du in beide Richtungen (Station → Info und Info → Station) abrufen kannst.'
    ],
    beispielaufgaben:['Platziere 10 Vokabeln als Bilder in deinem Zuhause – hole sie in Gedanken ab.','Lege die 5 Planeten entlang deines Schulweges ab.','Merke dir Experiment-Schritte in verschiedenen Räumen.'],
    selbstcheck:'Kannst du alle Stationen in der richtigen Reihenfolge ohne Hilfe abrufen?',
    tipp:'Je verrückter und bunter deine Bilder, desto besser bleiben sie im Gedächtnis!',
    naechsterSchritt:'Rufe die Route morgen erneut ab, bevor du neue Inhalte ergänzt.' },

  { id:'mindmap', name:'Mind Maps', emoji:'🕸️', masterfaehigkeiten:['visualisieren','strukturieren','verknuepfen'],
    kurzbeschreibung:'Schreibe ein Hauptthema in die Mitte und zeichne Äste mit Unterthemen.',
    aufwand:'einfach', evidenceLevel:'organisation', zeitMin:10,
    aufgabentypen:['fakten','textverstaendnis','referat'],
    wannNicht:'als alleinige Prüfungsvorbereitung ohne anschließenden Abruf',
    schritte:[
      'Lies das Material einmal mit einer Leitfrage im Kopf.',
      'Schließe das Material und schreibe das Hauptthema in die Mitte eines Blattes.',
      'Ergänze Äste mit Unterthemen aus dem Gedächtnis.',
      'Öffne das Material, korrigiere in einer zweiten Farbe und erkläre jede Verbindung laut.'
    ],
    beispielaufgaben:['Klimawandel-Mind-Map mit Ästen für Ursachen, Folgen, Lösungen.','Referat über Dinosaurier als Mind Map planen.','Text lesen, danach Mind Map aus dem Gedächtnis.'],
    selbstcheck:'Kannst du die Karte am nächsten Tag ohne Vorlage rekonstruieren?',
    tipp:'Nutze Farben und kleine Zeichnungen für jeden Ast!',
    naechsterSchritt:'Erkläre die Karte laut einer zweiten Person, ohne daraufzuschauen.' },

  { id:'schluesselwort', name:'Schlüsselwortmethode', emoji:'🔑', masterfaehigkeiten:['verknuepfen','visualisieren'],
    kurzbeschreibung:'Suche für ein fremdes Wort ein ähnlich klingendes deutsches Wort und baue daraus ein Bild.',
    aufwand:'einfach', evidenceLevel:'merkhilfe', zeitMin:5,
    aufgabentypen:['vokabeln'],
    wannNicht:'für Wörter ohne griffigen Klang-Zwilling',
    schritte:[
      'Suche ein deutsches Wort, das ähnlich klingt wie das fremde Wort.',
      'Baue ein möglichst absurdes Bild, das beide Wörter verbindet.',
      'Rufe zuerst nur das Bild ab, dann Klangwort und Bedeutung.',
      'Prüfe nach einigen Stunden erneut ohne Bild-Hilfe.'
    ],
    beispielaufgaben:['"carrot" klingt wie "Karosse" – Prinzessin in Karotten-Kutsche!','Für 5 Vokabeln je ein Klang-Zwillingswort finden.','3 schwierige Fachbegriffe mit dieser Methode lernen.'],
    selbstcheck:'Erinnerst du dich an die Bedeutung, wenn du nur das Fremdwort siehst – ohne ans Bild zu denken?',
    tipp:'Je witziger das Bild, desto besser merkst du dir das Wort!',
    naechsterSchritt:'Frage dich morgen die Vokabeln ohne Bildhilfe erneut ab.' },

  { id:'fuenf-schritt', name:'5-Schritt-Lesetechnik', emoji:'📖', masterfaehigkeiten:['strukturieren','reduzieren'],
    kurzbeschreibung:'Überfliegen → Fragen → Lesen → Abrufen → Wiederholen.',
    aufwand:'mittel', evidenceLevel:'hoch', zeitMin:20,
    aufgabentypen:['textverstaendnis','pruefungsvorbereitung'],
    wannNicht:'bei sehr kurzen Texten, wo der Aufwand nicht lohnt',
    schritte:[
      'Überfliege Überschriften, Bilder und Zusammenfassung.',
      'Formuliere aus den Überschriften Fragen an den Text.',
      'Lies aufmerksam und suche Antworten auf deine Fragen.',
      'Schließe den Text und fasse ihn frei in 3 Sätzen zusammen.',
      'Wiederhole die Zusammenfassung nach einem Tag ohne den Text.'
    ],
    beispielaufgaben:['Sachtext in 5 Schritten erarbeiten, danach 3-Satz-Zusammenfassung.','Versuchsanleitung in 5 Schritten lesen und erklären.','Prüfungskapitel mit dieser Technik vorbereiten.'],
    selbstcheck:'Kannst du deine 3-Satz-Zusammenfassung am nächsten Tag ohne den Text wiederholen?',
    tipp:'Die 5 Schritte: Überfliegen → Fragen → Lesen → Abrufen → Wiederholen.',
    naechsterSchritt:'Vergleiche deine Zusammenfassung morgen erneut mit dem Text.' },

  { id:'konzentrationsanker', name:'Lernstart-Ritual (Konzentrationsanker)', emoji:'⚓', masterfaehigkeiten:['spannung'],
    kurzbeschreibung:'Ein persönliches Ritual, das dir hilft, schneller in den Lernmodus zu kommen.',
    aufwand:'einfach', evidenceLevel:'organisation', zeitMin:5,
    aufgabentypen:['pruefungsvorbereitung','vokabeln','fakten'],
    wannNicht:'als Ersatz für Abruf- oder Wiederholungsstrategien – es unterstützt nur den Einstieg',
    schritte:[
      'Wähle eine kurze, immer gleiche Handlung (Geste, Getränk, Musikstück).',
      'Führe sie unmittelbar vor jeder Lernsitzung aus.',
      'Beginne direkt danach mit der eigentlichen Lernaufgabe.',
      'Wiederhole das Ritual konsequent über mehrere Wochen.'
    ],
    beispielaufgaben:['3× Daumen und Zeigefinger drücken vor dem Lernen.','Immer dieselbe Musik beim Vokabellernen spielen.','Bestimmtes Getränk nur beim Lernen trinken.'],
    selbstcheck:'Fällt dir der Einstieg ins Lernen nach einigen Wochen leichter als vorher?',
    tipp:'Das Ritual ersetzt keine Lerntechnik – es hilft nur beim Start.',
    naechsterSchritt:'Kombiniere das Ritual direkt mit Active Recall oder Karteikarten.' },

  { id:'kette', name:'Kettenmethode', emoji:'⛓️', masterfaehigkeiten:['verknuepfen','visualisieren'],
    kurzbeschreibung:'Verbinde Begriffe wie Kettenglieder in einer verrückten Geschichte.',
    aufwand:'einfach', evidenceLevel:'merkhilfe', zeitMin:10,
    aufgabentypen:['vokabeln','fakten'],
    wannNicht:'bei mehr als ca. 10–12 Begriffen in einer Kette – dann lieber Loci nutzen',
    schritte:[
      'Wähle die Begriffe, die du in Reihenfolge lernen willst.',
      'Verbinde je zwei benachbarte Begriffe mit einem verrückten Bild.',
      'Erzähle die ganze Kette laut als Geschichte.',
      'Rufe die Kette rückwärts und aus der Mitte heraus ab.'
    ],
    beispielaufgaben:['10 Vokabeln als Kettengeschichte verbinden.','Die 5 Ozeane in einem Ketten-Satz.','Experiment-Phasen als Kettengeschichte.'],
    selbstcheck:'Kannst du die Kette auch beginnend in der Mitte fehlerfrei fortsetzen?',
    tipp:'Die Geschichte kann und soll so verrückt wie möglich sein!',
    naechsterSchritt:'Wiederhole die Kette am nächsten Tag ohne erneutes Erzählen der Geschichte.' },

  { id:'highfive', name:'High-Five-Methode', emoji:'✋', masterfaehigkeiten:['reduzieren','strukturieren'],
    kurzbeschreibung:'Genau 5 Kernpunkte – einen pro Finger.',
    aufwand:'einfach', evidenceLevel:'organisation', zeitMin:10,
    aufgabentypen:['fakten','referat','pruefungsvorbereitung'],
    wannNicht:'wenn ein Thema nicht sinnvoll auf 5 Punkte reduzierbar ist',
    schritte:[
      'Sammle alle möglichen wichtigen Punkte zum Thema.',
      'Wähle die 5 wichtigsten aus und ordne sie je einem Finger zu.',
      'Übe, jeden Punkt nur mit Hilfe des Fingers frei zu erklären.',
      'Prüfe ohne Finger, ob du alle 5 Punkte nennen kannst.'
    ],
    beispielaufgaben:['Klimawandel: Daumen=Ursache, Zeigefinger=Folge, ...','Referat: 5 Pflichtpunkte festlegen.','Mathe: 5 wichtigste Formeln an Fingern.'],
    selbstcheck:'Kannst du alle 5 Punkte auch ohne auf die Hand zu schauen aufzählen?',
    tipp:'Wenn du mehr als 5 Punkte hast, überlege: Was ist wirklich das Wichtigste?',
    naechsterSchritt:'Erkläre die 5 Punkte morgen in freier Rede vor jemandem.' },

  { id:'karteikasten', name:'Karteikartensystem', emoji:'📇', masterfaehigkeiten:['strukturieren','reduzieren'],
    kurzbeschreibung:'Vorne Frage, hinten Antwort – mit Karteikasten lernst du gezielt nur, was du noch nicht kannst.',
    aufwand:'mittel', evidenceLevel:'hoch', zeitMin:15,
    aufgabentypen:['vokabeln','fakten','pruefungsvorbereitung'],
    wannNicht:'für komplexe Rechenverfahren ohne begleitendes Worked-Example-Training',
    schritte:[
      'Schreibe vorne eine echte Frage, hinten eine kurze Antwort in eigenen Worten.',
      'Sieh nur die Vorderseite an und antworte laut oder schriftlich, bevor du umdrehst.',
      'Vergleiche erst danach mit der Rückseite und markiere sicher/unsicher/falsch.',
      'Wiederhole unsichere Karten häufiger, sichere Karten seltener (Fächer-System).'
    ],
    beispielaufgaben:['Vokabeln: Vorne Englisch, hinten Deutsch.','Mathe-Formeln mit Beispiel auf Rückseite.','Biologie-Fachbegriffe mit eigener Erklärung.'],
    selbstcheck:'Erklärst du dir die Karte in eigenen Worten, bevor du die Rückseite ansiehst?',
    tipp:'Entscheidend ist der Abruf vor dem Umdrehen – nicht das Medium (Papier oder App).',
    naechsterSchritt:'Beginne die nächste Sitzung mit den zuletzt unsicheren Karten.' },

  { id:'mnemo', name:'Mnemo-Techniken', emoji:'🧠', masterfaehigkeiten:['verknuepfen','spannung'],
    kurzbeschreibung:'Eselsbrücken, Akronyme und Reime für schwierige Dinge.',
    aufwand:'einfach', evidenceLevel:'merkhilfe', zeitMin:5,
    aufgabentypen:['fakten','vokabeln','pruefungsvorbereitung'],
    wannNicht:'für Inhalte, die echtes Verständnis statt Reihenfolge erfordern',
    schritte:[
      'Identifiziere die Reihenfolge oder Liste, die du merken willst.',
      'Bilde aus den Anfangsbuchstaben einen Satz, Reim oder ein Akronym.',
      'Sprich den Merksatz laut mehrmals.',
      'Prüfe, ob du daraus die vollständige Originalliste ableiten kannst.'
    ],
    beispielaufgaben:['"Mein Vater erklärt mir jeden Sonntag unsere neun Planeten" = Planetenreihenfolge.','Rap für Wochentage auf Englisch.','Kreisumfang 2πr: "Zwei Piraten rennen".'],
    selbstcheck:'Kannst du aus dem Merksatz die komplette Originalliste korrekt ableiten?',
    tipp:'Je witziger oder absurder der Satz, desto besser!',
    naechsterSchritt:'Rufe den Merksatz und die Originalliste nach 2 Tagen erneut ab.' },

  { id:'paarchecks', name:'WissensPAARty', emoji:'👫', masterfaehigkeiten:['spannung','verknuepfen'],
    kurzbeschreibung:'Lernen mit einem Partner – gegenseitig abfragen und erklären.',
    aufwand:'einfach', evidenceLevel:'hoch', zeitMin:15,
    aufgabentypen:['vokabeln','fakten','pruefungsvorbereitung'],
    wannNicht:'wenn kein Lernpartner verfügbar ist – dann Active Recall allein nutzen',
    schritte:[
      'Bereitet beide je 5–10 Fragen zum Stoff vor.',
      'Fragt euch abwechselnd ab, ohne die Antwort vorzusagen.',
      'Gebt euch direktes Feedback und erklärt Fehler in eigenen Worten.',
      'Tauscht am Ende die Rollen Lehrer:in und Schüler:in.'
    ],
    beispielaufgaben:['Vokabel-Blitz zu zweit.','Quiz-Battle: Jeder schreibt 5 Fragen.','Rollenspiel: Lehrer und Schüler tauschen.'],
    selbstcheck:'Kannst du eine Frage deines Partners beantworten, ohne dass er nachhelfen muss?',
    tipp:'Auch Eltern, Geschwister oder Großeltern können mitspielen!',
    naechsterSchritt:'Wiederholt die schwierigsten Fragen in der nächsten gemeinsamen Sitzung.' },

  { id:'koerperliste', name:'Körperliste', emoji:'🧍', masterfaehigkeiten:['visualisieren','verknuepfen'],
    kurzbeschreibung:'Dein Körper wird zur Merkhilfe – Infos werden Körperstellen zugewiesen.',
    aufwand:'einfach', evidenceLevel:'merkhilfe', zeitMin:10,
    aufgabentypen:['vokabeln','prozesse','fakten'],
    wannNicht:'für mehr als etwa 10 Elemente – dann lieber Loci verwenden',
    schritte:[
      'Wähle 8–10 feste Körperstellen in fester Reihenfolge.',
      'Ordne jeder Stelle eine Information zu und berühre sie dabei.',
      'Gehe die Reihenfolge mehrmals ab und rufe die Infos ab.',
      'Prüfe den Abruf auch ohne tatsächliches Berühren.'
    ],
    beispielaufgaben:['10 Vokabeln an Körperstellen verteilen.','Experiment-Schritte: Stirn=Hypothese usw.','5 Kontinente auf 5 Körperstellen.'],
    selbstcheck:'Kannst du die Liste auch ohne Berühren der Körperstellen korrekt abrufen?',
    tipp:'Berühre die Stelle IMMER beim Lernen UND beim Abrufen!',
    naechsterSchritt:'Wiederhole die Liste am nächsten Tag aus dem Gedächtnis.' },

  { id:'spickzettel', name:'Spickzettel', emoji:'📋', masterfaehigkeiten:['reduzieren','strukturieren'],
    kurzbeschreibung:'Erstelle einen Spickzettel, den du NIE nutzt – das Erstellen ist der Lerneffekt!',
    aufwand:'einfach', evidenceLevel:'organisation', zeitMin:15,
    aufgabentypen:['pruefungsvorbereitung','fakten'],
    wannNicht:'als alleinige Vorbereitung ohne anschließenden Abruf ohne Zettel',
    schritte:[
      'Sammle alle Formeln, Begriffe oder Fakten, die du für wichtig hältst.',
      'Reduziere die Auswahl so lange, bis alles auf eine DIN-A6-Karte passt.',
      'Erkläre dir jeden Punkt auf dem Zettel laut, ohne ihn abzulesen.',
      'Lege den Zettel weg und prüfe deinen Abruf ohne Vorlage.'
    ],
    beispielaufgaben:['Alles Wichtige auf DIN A6.','Mathe: Formeln + Beispiele.','Geografie: 5 Fakten zu einem Land.'],
    selbstcheck:'Kannst du den Inhalt des Zettels vollständig ohne ihn anzusehen wiedergeben?',
    tipp:'Das Erstellen des Spickzettels ist wichtiger als der Zettel selbst!',
    naechsterSchritt:'Prüfe den Abruf am Prüfungstag noch einmal kurz ohne den Zettel.' }
];

export const AUFGABENTYP_TECHNIKEN = {
  vokabeln: ['active-recall','spaced-practice','loci','schluesselwort','kette','paarchecks','koerperliste','karteikasten','mnemo','spickzettel'],
  fakten: ['active-recall','mindmap','loci','konzentrationsanker','kette','koerperliste','mnemo','spickzettel','highfive'],
  prozesse: ['worked-examples','interleaving','loci','fuenf-schritt','koerperliste'],
  textverstaendnis: ['active-recall','fuenf-schritt','mindmap'],
  referat: ['mindmap','highfive'],
  pruefungsvorbereitung: ['spaced-practice','interleaving','fuenf-schritt','konzentrationsanker','karteikasten','paarchecks','spickzettel','mnemo','highfive']
};

// Hinweis: PRAEFERENZ_TECHNIKEN (Zuordnung nach "Lerntypen") wurde bewusst entfernt.
// Es gibt keine belastbare wissenschaftliche Evidenz für die "Meshing-Hypothese"
// (Lernstil-Instruktion verbessert Lernerfolg) – die Empfehlung erfolgt ausschließlich
// über Lernziel, Aufgabentyp, Vorwissen und verfügbare Zeit (siehe Lerntechniken.jsx).
