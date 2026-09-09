# Restrukturierungsplan: Lerntechniken-Seite

## 1. Ziel
Die Lerntechniken-Seite soll drei Nutzerbeduerfnisse klar trennen: Verstehen, Ausprobieren (Beispiel), Anwenden (eigene Inhalte).

## 2. Einstiegsebene "Welche Technik passt zu mir?"
Kurzer Filter: Fach, verfuegbare Zeit, Lernziel (kurzfristig vs. langfristig). Ergebnis: 1-3 empfohlene Techniken statt einer langen Liste.

## 3. Technik-Karten mit drei Reitern
1. "Warum funktioniert das?" - kurzer Forschungsbeleg.
2. "Beispiel ausprobieren" - interaktive Demo mit sichtbarem Beispieldaten-Badge und Button "Mit eigenem Thema starten".
3. "Fuer welches Fach/Ziel geeignet" - Chips aus faecherMapping.js.

## 4. Einheitlicher Demo-Modus
Globaler Zustand `demoMode: boolean` statt technikspezifischer Einzel-Loesungen. Badge zeigt an, dass Beispieldaten aktiv sind; Reset-Button verfuegbar.

## 5. Forschungsbasis (Auswahl)
- Active Recall / Practice Testing: hoechste Effektstaerke fuer Fakten, Vokabeln, Pruefungsvorbereitung (Dunlosky et al. 2013).
- Spaced Repetition: beste Wirkung fuer Langzeitbehalten grosser Stoffmengen und Sprachen.
- Interleaved Practice: deutlich wirksamer als Blocklernen bei Mathematik/Physik-Aufgabentypen.
- Feynman-Technik: geeignet fuer komplexe Konzepte und muendliche Pruefungsvorbereitung.
- Pomodoro-Technik: hilfreich gegen Prokrastination bei Routineaufgaben, weniger geeignet fuer Deep-Work.

## 6. Kombinationsvorschlaege
Neues Datenfeld `combinesWellWith: []` in data/lerntechniken.js, um z. B. Active Recall + Spaced Repetition als Kombi vorzuschlagen.

## 7. Fortschrittsspeicherung (Ausbaustufe)
Sobald eigene Inhalte statt Demo-Daten genutzt werden, Ergebnisse speichern (Anknuepfung an server/src/routes) fuer spaetere Spaced-Repetition-Erinnerungen.

## 8. Naechste Schritte
1. Lerntechniken.jsx in kleinere Komponenten pro Technik aufteilen.
2. demoMode-State und Badge-Komponente einheitlich einfuehren.
3. Fach-Filter aus faecherMapping.js in die Einstiegsebene heben.
4. combinesWellWith-Feld in data/lerntechniken.js ergaenzen.
