//
//  promptCoach.ts
//
//
//  Created by Bernd Trißler.
//
import { Router } from 'express';
import { generatePromptCoachResponse } from '../services/mistral.js';

const router = Router();

router.post('/generieren', async (req, res) => {
  try {
    const { wunsch } = req.body;
    if (!wunsch || typeof wunsch !== 'string' || wunsch.trim().length < 3) {
      return res.status(400).json({ error: 'Bitte schreibe deinen Wunsch mit mindestens 3 Zeichen.' });
    }
    if (wunsch.trim().length > 300) {
      return res.status(400).json({ error: 'Bitte kürze deinen Wunsch auf maximal 300 Zeichen.' });
    }
    const ergebnis = await generatePromptCoachResponse(wunsch.trim());
    res.json(ergebnis);
  } catch (err) {
    console.error('[promptCoach/generieren] Fehler:', err);
    res.status(500).json({ error: 'Bei der Verarbeitung ist ein Fehler aufgetreten.' });
  }
});

export default router;
