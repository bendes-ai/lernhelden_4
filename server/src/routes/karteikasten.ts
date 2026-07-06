//
//  karteikasten.ts
//  
//
//  Created by Bernd Trißler on 06.07.26.
//
import { Router } from 'express';
import multer from 'multer';
import { generateFlashcardsFromImage } from '../services/mistral.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Kein Bild empfangen.' });
    }
    const flashcards = await generateFlashcardsFromImage(req.file.buffer);
    if (!flashcards.length) {
      return res.status(422).json({ error: 'Es konnten keine Karteikarten erkannt werden. Bitte mache ein deutlicheres Foto.' });
    }
    res.json({ flashcards });
  } catch (err) {
    console.error('[karteikasten/upload] Fehler:', err);
    res.status(500).json({ error: 'Bei der Verarbeitung ist ein Fehler aufgetreten.' });
  }
});

export default router;

