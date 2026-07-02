import Tesseract from 'tesseract.js';
import sharp from 'sharp';

export async function extractTextFromImage(buffer: Buffer): Promise<string> {
  const processed = await sharp(buffer)
    .grayscale()
    .normalize()
    .resize({ width: 1600, withoutEnlargement: false })
    .toBuffer();

  const { data } = await Tesseract.recognize(processed, 'deu+eng');
  return (data.text || '').trim();
}
