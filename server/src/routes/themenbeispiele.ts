//
//  themenbeispiele.ts
//  
//
//  Created by Bernd Trißler on 06.07.26.
//
import { Router } from 'express';
import { generateThemeExamples } from '../services/mistral.js';

const router = Router();

router.post('/generieren', async (req, res) => {
  try {
    const { thema, techniken } = req.body;
    if (!thema || typeof thema !== 'string' || thema.trim().length < 2) {
      return res.status(400).json({ error: 'Bitte gib ein gültiges Thema ein.' });
    }
    if (!Array.isArray(techniken) || techniken.length === 0) {
      return res.status(400).json({ error: 'Keine Techniken übergeben.' });
    }
    const beispiele = await generateThemeExamples(thema.trim(), techniken);
    res.json({ beispiele });
  } catch (err) {
    console.error('[themenbeispiele/generieren] Fehler:', err);
    res.status(500).json({ error: 'Bei der Verarbeitung ist ein Fehler aufgetreten.' });
  }
});

export default router;

