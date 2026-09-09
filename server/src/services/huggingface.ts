const HF_API_URL = 'https://router.huggingface.co/hf-inference/models';

export interface NerEntity {
  entity_group: string;
  word: string;
  score: number;
}

export async function erkenneNamenPerModell(text: string): Promise<NerEntity[]> {
  const token = process.env.HF_API_TOKEN;
  const model = process.env.HF_NER_MODEL || 'dslim/bert-base-NER';

  if (!token) {
    console.warn('[huggingface] Kein HF_API_TOKEN gesetzt, Modellprüfung wird übersprungen.');
    return [];
  }

  try {
    const response = await fetch(`${HF_API_URL}/${model}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: text })
    });

    if (!response.ok) {
      console.warn('[huggingface] Modellantwort nicht ok:', response.status);
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data
      .filter((e: any) => e && typeof e.entity_group === 'string')
      .map((e: any) => ({
        entity_group: e.entity_group,
        word: e.word,
        score: e.score
      }));
  } catch (err) {
    console.warn('[huggingface] Fehler beim Modellaufruf:', err);
    return [];
  }
}
