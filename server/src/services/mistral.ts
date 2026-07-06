import { Mistral } from '@mistralai/mistralai';
import dotenv from 'dotenv';
dotenv.config();

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

export async function detectSubject(text: string): Promise<string> {
  const response = await client.chat.complete({
    model: 'mistral-small-latest',
    messages: [
      {
        role: 'user',
        content: `Analysiere den folgenden Text aus einer Hausaufgabe und nenne NUR das Schulfach (z. B. Mathematik, Deutsch, Biologie, Geschichte, Englisch, Sonstiges). Antworte mit einem einzigen Wort.\n\nText: ${text}`
      }
    ]
  });
  const content = response.choices?.[0]?.message?.content;
  return typeof content === 'string' ? content.trim() : 'Sonstiges';
}

export async function generateExercises(text: string): Promise<string[]> {
  const response = await client.chat.complete({
    model: 'mistral-small-latest',
    messages: [
      {
        role: 'user',
        content: `Erstelle 5 kurze Übungsaufgaben (nummeriert) basierend auf folgendem Schulstoff. Antworte NUR mit einer nummerierten Liste, keine Einleitung.\n\nText: ${text}`
      }
    ]
  });
  const content = response.choices?.[0]?.message?.content;
  const raw = typeof content === 'string' ? content : '';
  return raw
    .split('\n')
    .map(line => line.replace(/^\d+[\.\)]\s*/, '').trim())
    .filter(Boolean);
}

export async function generateFlashcards(text: string): Promise<{ front: string; back: string }[]> {
  const response = await client.chat.complete({
    model: 'mistral-small-latest',
    messages: [
      {
        role: 'user',
        content: `Erstelle 5 Karteikarten (Frage/Antwort) im JSON-Format basierend auf folgendem Schulstoff. Antworte NUR mit einem JSON-Array wie folgt: [{"front":"Frage","back":"Antwort"}]. Text: ${text}`
      }
    ]
  });
  const content = response.choices?.[0]?.message?.content;
  const raw = typeof content === 'string' ? content : '[]';
  try {
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch {
    return [];
  }
}
export async function generateFlashcardsFromImage(buffer: Buffer): Promise<{ front: string; back: string }[]> {
  const base64Image = buffer.toString('base64');

  const response = await client.chat.complete({
    model: 'pixtral-12b-2409',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Erkenne auf diesem Foto alle Vokabelpaare oder Frage/Antwort-Paare (z. B. Wort und Übersetzung, Begriff und Definition). Antworte NUR mit einem JSON-Array wie folgt, ohne Erklärung: [{"front":"Frage oder Wort","back":"Antwort oder Übersetzung"}]'
          },
          {
            type: 'image_url',
            imageUrl: `data:image/jpeg;base64,${base64Image}`
          }
        ]
      }
    ]
  });

  const content = response.choices?.[0]?.message?.content;
  const raw = typeof content === 'string' ? content : '[]';
  try {
    const jsonMatch = raw.match(/\\[[\\s\\S]\*\\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch {
    return [];
  }
}
export async function generateThemeExamples(thema: string, techniken: { id: string; name: string; kurzbeschreibung: string }[]): Promise<Record<string, string[]>> {
  const techListe = techniken.map(t => `- ${t.id}: ${t.name} (${t.kurzbeschreibung})`).join('\n');

  const response = await client.chat.complete({
    model: 'mistral-small-latest',
    messages: [
      {
        role: 'user',
        content: `Thema: "${thema}"\n\nHier ist eine Liste von Lerntechniken:\n${techListe}\n\nErstelle für JEDE Technik genau 3 konkrete, kurze Beispielaufgaben, wie man das Thema "${thema}" mit dieser Technik lernen könnte. Antworte NUR mit einem JSON-Objekt, bei dem die Schlüssel die Technik-IDs sind und die Werte Arrays mit 3 Beispiel-Strings, z. B.:\n{"loci":["Beispiel 1","Beispiel 2","Beispiel 3"],"mindmap":["...","...","..."]}`
      }
    ]
  });

  const content = response.choices?.[0]?.message?.content;
  const raw = typeof content === 'string' ? content : '{}';
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : {};
  } catch {
    return {};
  }
}
