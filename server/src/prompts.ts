// Zentrale Prompt-Vorlagen für zukünftige Erweiterungen.
// Aktuell werden die Prompts direkt in services/mistral.ts verwendet.

export const SUBJECT_DETECTION_PROMPT = (text: string) =>
  `Analysiere den folgenden Text aus einer Hausaufgabe und nenne NUR das Schulfach (z. B. Mathematik, Deutsch, Biologie, Geschichte, Englisch, Sonstiges). Antworte mit einem einzigen Wort.\n\nText: ${text}`;

export const EXERCISE_GENERATION_PROMPT = (text: string) =>
  `Erstelle 5 kurze Übungsaufgaben (nummeriert) basierend auf folgendem Schulstoff. Antworte NUR mit einer nummerierten Liste, keine Einleitung.\n\nText: ${text}`;

export const FLASHCARD_GENERATION_PROMPT = (text: string) =>
  `Erstelle 5 Karteikarten (Frage/Antwort) im JSON-Format basierend auf folgendem Schulstoff. Antworte NUR mit einem JSON-Array wie folgt: [{"front":"Frage","back":"Antwort"}]. Text: ${text}`;
