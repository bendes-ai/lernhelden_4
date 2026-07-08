//
//  faecherMapping.js
//  
//
//  Created by Bernd Trißler on 07.07.26.
//
import { LERNTECHNIKEN, AUFGABENTYP_TECHNIKEN } from './lerntechniken.js';

// Ordnet Schulfächer typischen Aufgabentypen zu (siehe AUFGABENTYP_TECHNIKEN in lerntechniken.js).
// Techniken werden LIVE aus lerntechniken.js gezogen – kein hartcodierter Duplikat-Text.
export const FAECHER_MAPPING = [
  { fach: 'Mathe', emoji: '🔢', farbe: '#6C63FF', aufgabentypen: ['prozesse', 'fakten'] },
  { fach: 'Deutsch', emoji: '📚', farbe: '#FF6584', aufgabentypen: ['textverstaendnis', 'referat'] },
  { fach: 'Fremdsprachen', emoji: '🌍', farbe: '#43E97B', aufgabentypen: ['vokabeln'] }
];

export function technikenFuerFach(fach, maxAnzahl = 3) {
  const ids = new Set();
  fach.aufgabentypen.forEach(at => {
    (AUFGABENTYP_TECHNIKEN[at] || []).forEach(id => ids.add(id));
  });
  return LERNTECHNIKEN.filter(t => ids.has(t.id)).slice(0, maxAnzahl);
}

