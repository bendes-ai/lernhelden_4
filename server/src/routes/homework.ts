import { Router } from 'express';
import multer from 'multer';
import { extractTextFromImage } from '../services/ocr.js';
import { detectSubject, generateExercises } from '../services/mistral.js';
import { buildFlashcardSet } from '../services/flashcards.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Kein Bild empfangen.' });
    }

    const text = await extractTextFromImage(req.file.buffer);

    if (!text || text.length < 10) {
      return res.status(422).json({ error: 'Es konnte kein Text aus dem Bild erkannt werden. Bitte mache ein deutlicheres Foto.' });
    }

    const subject = await detectSubject(text);
    const [exercises, flashcards] = await Promise.all([
      generateExercises(text),
      buildFlashcardSet(text)
    ]);

    res.json({ text, subject, exercises, flashcards });
  } catch (err) {
    console.error('[homework/upload] Fehler:', err);
    res.status(500).json({ error: 'Bei der Verarbeitung ist ein Fehler aufgetreten.' });
  }
});

export default router;
