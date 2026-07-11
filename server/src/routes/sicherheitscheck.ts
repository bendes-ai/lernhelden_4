import { Router } from 'express';

const router = Router();

type TrefferArt =
  | 'E-Mail'
  | 'Telefonnummer'
  | 'Adresse'
  | 'Voller Name'
  | 'Schule'
  | 'Passwort'
  | 'Benutzername'
  | 'Link';

function pruefeSicherheit(text: string) {
  const input = text.trim();
  const lower = input.toLowerCase();
  const treffer = new Set<TrefferArt>();

  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const telefonRegex = /(\+?\d[\d\s/()-]{6,}\d)/;
  const urlRegex = /\b(?:https?:\/\/|www\.)\S+\b/i;
  const plzOrtRegex = /\b\d{5}\s+[A-Za-zÄÖÜäöüß]{2,}\b/;
  const strasseRegex = /\b([A-Za-zÄÖÜäöüß.-]+(?:straße|strasse|weg|gasse|allee|platz))\s+\d+[a-zA-Z]?\b/i;

  if (emailRegex.test(input)) treffer.add('E-Mail');
  if (telefonRegex.test(input)) treffer.add('Telefonnummer');
  if (urlRegex.test(input)) treffer.add('Link');
  if (plzOrtRegex.test(input) || strasseRegex.test(input)) treffer.add('Adresse');

  const schulWoerter = [
    'meine schule',
    'unsere schule',
    'ich gehe auf die',
    'ich bin in der schule',
    'gymnasium',
    'realschule',
    'mittelschule',
    'grundschule',
    'hauptschule'
  ];
  if (schulWoerter.some(w => lower.includes(w))) treffer.add('Schule');

  const passwortWoerter = [
    'mein passwort',
    'mein kennwort',
    'mein login',
    'mein benutzername',
    'mein account',
    'meine zugangsdaten'
  ];
  if (passwortWoerter.some(w => lower.includes(w))) {
    treffer.add('Passwort');
  }

  if (lower.includes('benutzername')) treffer.add('Benutzername');

  const nameMuster = [
    /ich heiße\s+[A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+)+/i,
    /mein name ist\s+[A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+)+/i,
    /\b[A-ZÄÖÜ][a-zäöüß]+\s+[A-ZÄÖÜ][a-zäöüß]+\b/
  ];
  if (
    nameMuster.some(r => r.test(input)) &&
    (lower.includes('ich heiße') || lower.includes('mein name ist'))
  ) {
    treffer.add('Voller Name');
  }

  const stufe =
    treffer.has('Passwort') || treffer.has('Adresse') || treffer.has('Telefonnummer') || treffer.has('E-Mail')
      ? 'kritisch'
      : treffer.size > 0
      ? 'warnung'
      : 'ok';

  let warnung = 'Sieht gut aus. Bitte verrate trotzdem keine privaten Daten.';
  if (stufe === 'warnung') {
    warnung = 'Vorsicht: Bitte schreibe lieber keine privaten Daten wie deinen Namen oder deine Schule.';
  }
  if (stufe === 'kritisch') {
    warnung = 'Stopp: Bitte entferne private Daten wie Adresse, Telefonnummer, E-Mail oder Passwort.';
  }

  return {
    safe: treffer.size === 0,
    stufe,
    warnung,
    treffer: Array.from(treffer)
  };
}

router.post('/', async (req, res) => {
  try {
    const { text } = req.body;

    if (typeof text !== 'string') {
      return res.status(400).json({ error: 'Bitte sende einen Text zur Prüfung.' });
    }

    if (text.trim().length === 0) {
      return res.json({
        safe: true,
        stufe: 'ok',
        warnung: 'Schreib zuerst etwas in das Feld.',
        treffer: []
      });
    }

    const ergebnis = pruefeSicherheit(text);
    return res.json(ergebnis);
  } catch (err) {
    console.error('[sicherheitscheck] Fehler:', err);
    return res.status(500).json({ error: 'Bei der Sicherheitsprüfung ist ein Fehler aufgetreten.' });
  }
});

export default router;
