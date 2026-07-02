import { Mistral } from '@mistralai/mistralai';
import dotenv from 'dotenv';
dotenv.config();

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

export async function extractTextFromImage(buffer: Buffer): Promise<string> {
  const base64Image = buffer.toString('base64');

  const response = await client.chat.complete({
    model: 'pixtral-12b-2409',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Transkribiere den gesamten Text (auch handschriftlich) aus diesem Foto einer Hausaufgabe exakt und vollständig. Antworte NUR mit dem erkannten Text, ohne Einleitung oder Kommentar.'
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
  return typeof content === 'string' ? content.trim() : '';
}
