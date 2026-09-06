import React, { useState, useMemo } from 'react';
import { LERNTECHNIKEN } from '../data/lerntechniken.js';
import { MASTERFAEHIGKEITEN } from '../data/masterfaehigkeiten.js';
import Karteikasten from '../components/Karteikasten.jsx';

const API_BASE = 'https://lernheldenserver.onrender.com';

const LERNZIELE = [
  { id: 'behalten', label: '🧠 Etwas auswendig lernen', aufgabentypen: ['vokabeln', 'fakten'] },
  { id: 'verstehen', label: '📖 Etwas verstehen', aufgabentypen: ['textverstaendnis'] },
  { id: 'loesen', label: '🔢 Aufgaben lösen', aufgabentypen: ['prozesse'] },
  { id: 'unterscheiden', label: '🔀 Ähnliches unterscheiden', aufgabentypen: ['prozesse', 'fakten'] },
  { id: 'praesentieren', label: '🎤 Erklären / präsentieren', aufgabentypen: ['referat'] },
  { id: 'pruefung', label: '📝 Für eine Prüfung planen', aufgabentypen: ['pruefungsvorbereitung'] }
];

const AUFGABENTYPEN = [
  {id:'alle',label:'🔍 Alle Techniken'},{id:'vokabeln',label:'🔤 Vokabeln'},{id:'fakten',label:'📌 Fakten'},
  {id:'prozesse',label:'🔬 Prozesse'},{id:'textverstaendnis',label:'📖 Texte'},{id:'referat',label:'🎤 Referate'},{id:'pruefungsvorbereitung',label:'📝 Prüfungen'}
];

const FAECHER = [
  { id:'sprachen', label:'🔤 Sprachen / Vokabeln', aufgabentyp:'vokabeln' },
  { id:'mathe', label:'🔢 Mathematik', aufgabentyp:'prozesse' },
  { id:'naturwissenschaften', label:'🔬 Naturwissenschaften', aufgabentyp:'prozesse' },
  { id:'deutsch', label:'📖 Deutsch / Text', aufgabentyp:'textverstaendnis' },
  { id:'geschichte', label:'📌 Geschichte / Fakten', aufgabentyp:'fakten' },
  { id:'referat', label:'🎤 Referat vorbereiten', aufgabentyp:'referat' },
  { id:'pruefung', label:'📝 Prüfung allgemein', aufgabentyp:'pruefungsvorbereitung' }
];

const VORWISSEN = [
  { id:'neu', label:'🌱 Neu für mich' },
  { id:'teilweise', label:'🌿 Teilweise verstanden' },
  { id:'gelernt', label:'🌳 Schon gelernt, will festigen' }
];

const ZEITOPTIONEN = [5, 10, 15, 20, 30, 60];

const THEMEN_VORSCHLAEGE = [
  'Deutsche Flüsse','Europäische Bergketten','Internationale Berge',
  'Französische Vokabeln','Zweiter Weltkrieg','Photosynthese','Bruchrechnen'
];

const GEWICHTE = { ziel: 0.4, vorwissen: 0.15, zeit: 0.10, arbeitsform: 0.10, aufgabentyp: 0.25 };

function scoreTechnik(t, { aufgabentyp, zeit, vorwissen }) {
  let score = 0;
  if (aufgabentyp && t.aufgabentypen?.includes(aufgabentyp)) score += GEWICHTE.aufgabentyp + GEWICHTE.ziel;
  if (zeit && t.zeitMin <= zeit) score += GEWICHTE.zeit;
  else if (zeit) score -= 0.15;
  if (vorwissen === 'neu' && t.evidenceLevel === 'hoch') score += GEWICHTE.vorwissen;
  if (t.evidenceLevel === 'hoch') score += 0.05;
  return score;
}

export default function Lerntechniken() {
  const [filter, setFilter] = useState('alle');
  const [open, setOpen] = useState(null);
  const [ziel, setZiel] = useState(null);
  const [fach, setFach] = useState(null);
  const [zeit, setZeit] = useState(null);
  const [vorwissen, setVorwissen] = useState(null);
  const [thema, setThema] = useState('');
  const [themaEingabe, setThemaEingabe] = useState('');
  const [themenBeispiele, setThemenBeispiele] = useState({});
  const [ladeThema, setLadeThema] = useState(false);
  const [themaFehler, setThemaFehler] = useState('');
  const [themaStatus, setThemaStatus] = useState('idle');

  const mfColors = Object.fromEntries(MASTERFAEHIGKEITEN.map(m => [m.id, m.farbe]));
  const mfEmoji = Object.fromEntries(MASTERFAEHIGKEITEN.map(m => [m.id, m.emoji]));

  const visible = filter==='alle' ? LERNTECHNIKEN : LERNTECHNIKEN.filter(t => t.aufgabentypen?.includes(filter));

  const abgeleiteterAufgabentyp = useMemo(() => {
    const fachTyp = FAECHER.find(f => f.id === fach)?.aufgabentyp;
    const zielTypen = LERNZIELE.find(z => z.id === ziel)?.aufgabentypen || [];
    if (fachTyp && zielTypen.includes(fachTyp)) return fachTyp;
    return zielTypen[0] || fachTyp || null;
  }, [ziel, fach]);

  const empfehlung = useMemo(() => {
    if (!abgeleiteterAufgabentyp) return [];
    return LERNTECHNIKEN
      .map(t => ({ t, score: scoreTechnik(t, { aufgabentyp: abgeleiteterAufgabentyp, zeit, vorwissen }) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(x => x.t);
  }, [abgeleiteterAufgabentyp, zeit, vorwissen]);

  function begruendung(t) {
    const gruende = [];
    if (abgeleiteterAufgabentyp && t.aufgabentypen?.includes(abgeleiteterAufgabentyp)) {
      gruende.push('passt zu deinem Lernziel');
    }
    if (zeit && t.zeitMin <= zeit) gruende.push(`in ${zeit} Min. durchführbar`);
    if (t.evidenceLevel === 'hoch') gruende.push('breit wissenschaftlich belegt');
    return gruende.join(' · ');
  }

  async function themaAnwenden(gewaehltesThema) {
    const finalesThema = (gewaehltesThema ?? themaEingabe).trim();
    if (finalesThema.length < 2) {
      setThemaFehler('Bitte gib ein Thema mit mindestens 2 Zeichen ein.');
      return;
    }
    setLadeThema(true);
    setThemaStatus('loading');
    setThemaFehler('');
    try {
      const techniken = LERNTECHNIKEN.map(t => ({ id: t.id, name: t.name, kurzbeschreibung: t.kurzbeschreibung }));
      const res = await fetch(`${API_BASE}/api/themenbeispiele/generieren`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thema: finalesThema, techniken })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler beim Generieren der Beispiele.');
      const beispiele = data.beispiele || {};
      setThemenBeispiele(beispiele);
      setThema(finalesThema);
      setThemaStatus(Object.keys(beispiele).length >= LERNTECHNIKEN.length ? 'success' : 'partial');
    } catch (err) {
      setThemaFehler(err.message);
      setThemaStatus('error');
    } finally {
      setLadeThema(false);
    }
  }

  function themaZuruecksetzen() {
    setThema('');
    setThemenBeispiele({});
    setThemaEingabe('');
    setThemaStatus('idle');
  }

  function beispielQuelle(t) {
    if (thema && themenBeispiele[t.id]) {
      return { beispiele: themenBeispiele[t.id], label: `📚 Auf dein Thema "${thema}" angepasst (KI-generiert – bitte prüfen)` };
    }
    if (thema && !themenBeispiele[t.id] && themaStatus !== 'loading') {
      return { beispiele: t.beispielaufgaben, label: '📚 Demo-Beispiel (für dieses Thema noch nicht verfügbar)' };
    }
    return { beispiele: t.beispielaufgaben, label: '📚 Demo-Beispiel' };
  }

  return (
    <div className="section">
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <div style={{ fontSize:'3.5rem', marginBottom:'0.5rem' }}>🧠</div>
          <h1 className="section-title">{LERNTECHNIKEN.length} Lerntechniken entdecken</h1>
          <p className="section-subtitle">Wähle dein Lernziel – wir zeigen dir Schritt für Schritt, wie du vorgehst.</p>
          <p style={{ fontSize:'0.85rem', color:'var(--color-text-light)', maxWidth:600, margin:'0.5rem auto 0' }}>
            ℹ️ Nach Lernziel statt Lerntyp ausgewählt: Wir empfehlen Techniken nach dem, was du tun willst (z. B. Vokabeln merken vs. Text verstehen) – nicht nach angeblichen „Lerntypen", für die es keine belastbare wissenschaftliche Grundlage gibt.
          </p>
        </div>

        <div className="card" style={{ marginBottom:'1.5rem', padding:'1.5rem' }}>
          <h3 style={{ fontWeight:800, marginBottom:'1rem' }}>1️⃣ Was möchtest du heute schaffen?</h3>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
            {LERNZIELE.map(z => (
              <button key={z.id} className="btn" onClick={() => setZiel(z.id)}
                style={{ background:ziel===z.id?'linear-gradient(135deg,#6C63FF,#8B5CF6)':'white', color:ziel===z.id?'white':'var(--color-text)', border:'2px solid', borderColor:ziel===z.id?'transparent':'#E5E7EB', fontSize:'0.9rem' }}>
                {z.label}
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginBottom:'1.5rem', padding:'1.5rem' }}>
          <h3 style={{ fontWeight:800, marginBottom:'0.5rem' }}>2️⃣ Eigenes Thema eingeben (optional)</h3>
          <p style={{ fontSize:'0.85rem', color:'var(--color-text-light)', marginBottom:'0.75rem' }}>
            Gib ein aktuelles Lernthema ein – alle Beispiele unten werden dann darauf zugeschnitten. Ohne Eingabe siehst du geprüfte Demo-Beispiele.
          </p>

          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'0.75rem' }}>
            {THEMEN_VORSCHLAEGE.map(v => (
              <button key={v} className="btn" onClick={() => { setThemaEingabe(v); themaAnwenden(v); }}
                style={{ background:'white', border:'2px solid #E5E7EB', fontSize:'0.8rem' }}>
                {v}
              </button>
            ))}
          </div>

          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            <input
              type="text"
              value={themaEingabe}
              onChange={e => setThemaEingabe(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && themaAnwenden()}
              placeholder="z. B. Bruchrechnen, Französische Revolution..."
              style={{ flex:'1 1 250px', padding:'0.6rem 1rem', borderRadius:'50px', border:'2px solid #E5E7EB', fontSize:'0.9rem' }}
            />
            <button className="btn" onClick={() => themaAnwenden()} disabled={ladeThema}
              style={{ background:'linear-gradient(135deg,#6C63FF,#8B5CF6)', color:'white' }}>
              {ladeThema ? 'Wird erstellt...' : '✨ Beispiele erstellen'}
            </button>
            {thema && (
              <button className="btn" onClick={themaZuruecksetzen} style={{ background:'transparent', border:'2px solid #E5E7EB' }}>
                Zurücksetzen
              </button>
            )}
          </div>

          {themaFehler && (
            <p style={{ color:'#EF4444', fontSize:'0.85rem', marginTop:'0.5rem' }}>
              ⚠️ {themaFehler} – wir zeigen dir stattdessen die Demo-Beispiele.
            </p>
          )}
          {thema && !ladeThema && themaStatus === 'success' && (
            <p style={{ marginTop:'0.75rem', fontSize:'0.85rem', fontWeight:700, color:'var(--color-primary)' }}>
              ✅ Aktuelles Thema: {thema} – alle Beispiele wurden angepasst.
            </p>
          )}
          {thema && !ladeThema && themaStatus === 'partial' && (
            <p style={{ marginTop:'0.75rem', fontSize:'0.85rem', fontWeight:700, color:'#B45309' }}>
              ⚠️ Aktuelles Thema: {thema} – für einige Techniken zeigen wir noch Demo-Beispiele.
            </p>
          )}
        </div>

        <div className="card" style={{ marginBottom:'2.5rem', padding:'1.5rem' }}>
          <h3 style={{ fontWeight:800, marginBottom:'1rem' }}>3️⃣ Passende Technik finden</h3>

          <p style={{ fontSize:'0.85rem', color:'var(--color-text-light)', marginBottom:'0.5rem' }}>Fach oder Materialart:</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'1rem' }}>
            {FAECHER.map(f => (
              <button key={f.id} className="btn" onClick={() => setFach(f.id)}
                style={{ background:fach===f.id?'linear-gradient(135deg,#6C63FF,#8B5CF6)':'white', color:fach===f.id?'white':'var(--color-text)', border:'2px solid', borderColor:fach===f.id?'transparent':'#E5E7EB', fontSize:'0.85rem' }}>
                {f.label}
              </button>
            ))}
          </div>

          <p style={{ fontSize:'0.85rem', color:'var(--color-text-light)', marginBottom:'0.5rem' }}>Wie gut kennst du den Stoff schon?</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'1rem' }}>
            {VORWISSEN.map(v => (
              <button key={v.id} className="btn" onClick={() => setVorwissen(v.id)}
                style={{ background:vorwissen===v.id?'linear-gradient(135deg,#6C63FF,#8B5CF6)':'white', color:vorwissen===v.id?'white':'var(--color-text)', border:'2px solid', borderColor:vorwissen===v.id?'transparent':'#E5E7EB', fontSize:'0.85rem' }}>
                {v.label}
              </button>
            ))}
          </div>

          <p style={{ fontSize:'0.85rem', color:'var(--color-text-light)', marginBottom:'0.5rem' }}>Wie viel Zeit hast du?</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
            {ZEITOPTIONEN.map(z => (
              <button key={z} className="btn" onClick={() => setZeit(z)}
                style={{ background:zeit===z?'linear-gradient(135deg,#6C63FF,#8B5CF6)':'white', color:zeit===z?'white':'var(--color-text)', border:'2px solid', borderColor:zeit===z?'transparent':'#E5E7EB', fontSize:'0.85rem' }}>
                {z} Min.
              </button>
            ))}
          </div>

          {empfehlung.length > 0 && (
            <div style={{ marginTop:'1.5rem', paddingTop:'1.5rem', borderTop:'1px solid #F3F4F6' }}>
              <h4 style={{ fontWeight:800, marginBottom:'0.75rem' }}>✨ Empfohlen für dich:</h4>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem' }}>
                {empfehlung.map((t, i) => (
                  <div key={t.id} className="card" style={{ flex:'1 1 220px', padding:'1rem', cursor:'pointer', borderTop:`4px solid ${mfColors[t.masterfaehigkeiten[0]]||'#6C63FF'}`, position:'relative' }}
                    onClick={() => { setFilter('alle'); setOpen(t.id); document.getElementById(`technik-${t.id}`)?.scrollIntoView({ behavior:'smooth', block:'center' }); }}>
                    {i === 0 && <span style={{ position:'absolute', top:'-0.5rem', right:'0.75rem', background:'#6C63FF', color:'white', fontSize:'0.65rem', fontWeight:700, padding:'0.15rem 0.5rem', borderRadius:'50px' }}>TOP-EMPFEHLUNG</span>}
                    <div style={{ fontSize:'1.5rem', marginBottom:'0.3rem' }}>{t.emoji} {t.name}</div>
                    <p style={{ fontSize:'0.8rem', color:'var(--color-text-light)', marginBottom:'0.3rem' }}>⏱️ ab {t.zeitMin} Min.</p>
                    <p style={{ fontSize:'0.75rem', color:'var(--color-primary)', fontWeight:700 }}>{begruendung(t)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(!ziel && !fach) && (
            <p style={{ marginTop:'1rem', fontSize:'0.8rem', color:'var(--color-text-light)' }}>
              Wähle oben ein Lernziel oder ein Fach, um eine begründete Empfehlung zu erhalten.
            </p>
          )}
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'2.5rem', justifyContent:'center' }}>
          {AUFGABENTYPEN.map(a => (
            <button key={a.id} className="btn" onClick={() => setFilter(a.id)}
              style={{ background:filter===a.id?'linear-gradient(135deg,#6C63FF,#8B5CF6)':'white', color:filter===a.id?'white':'var(--color-text)', border:'2px solid', borderColor:filter===a.id?'transparent':'#E5E7EB', fontSize:'0.9rem' }}>
              {a.label}
            </button>
          ))}
        </div>

        <div className="grid-cards">
          {visible.map(t => {
            const { beispiele, label } = beispielQuelle(t);
            return (
              <div key={t.id} id={`technik-${t.id}`} className="card" style={{ cursor:'pointer', borderTop:`4px solid ${mfColors[t.masterfaehigkeiten[0]]||'#6C63FF'}` }} onClick={() => setOpen(open===t.id?null:t.id)}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem', marginBottom:'0.75rem' }}>
                  <span style={{ fontSize:'2rem', background:'#F8F7FF', borderRadius:'12px', padding:'0.4rem', minWidth:'2.8rem', textAlign:'center' }}>{t.emoji}</span>
                  <div>
                    <h3 style={{ fontWeight:800, marginBottom:'0.3rem', fontSize:'1.05rem' }}>{t.name}</h3>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.25rem' }}>
                      {t.masterfaehigkeiten.map(mf => (
                        <span key={mf} style={{ background:`${mfColors[mf]}20`, color:mfColors[mf], border:`1px solid ${mfColors[mf]}40`, borderRadius:'50px', padding:'0.15rem 0.5rem', fontSize:'0.7rem', fontWeight:700 }}>
                          {mfEmoji[mf]} {mf}
                        </span>
                      ))}
                      {t.evidenceLevel && (
                        <span style={{ background:'#F3F4F6', color:'#374151', borderRadius:'50px', padding:'0.15rem 0.5rem', fontSize:'0.7rem', fontWeight:700 }}>
                          {t.evidenceLevel === 'hoch' ? '🔬 Kernstrategie' : t.evidenceLevel === 'merkhilfe' ? '💡 Merkhilfe' : '⚙️ Organisation'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize:'0.9rem', color:'var(--color-text-light)', marginBottom:'0.4rem' }}>{t.kurzbeschreibung}</p>
                {t.wannNicht && (
                  <p style={{ fontSize:'0.78rem', color:'#9CA3AF', marginBottom:'0.75rem' }}>Nicht ideal für: {t.wannNicht}</p>
                )}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:'0.8rem', color:'var(--color-text-light)' }}>⏱️ ab {t.zeitMin} Min. · {t.aufwand==='einfach'?'✅ Einfach':'⚡ Mittel'}</span>
                  <span style={{ color:'var(--color-primary)', fontWeight:700, fontSize:'0.85rem' }}>{open===t.id?'▲ Weniger':'▼ So funktioniert’s'}</span>
                </div>
                {open===t.id && (
                  <div style={{ marginTop:'1rem', paddingTop:'1rem', borderTop:'1px solid #F3F4F6' }} onClick={e => e.stopPropagation()}>
                    {t.schritte && (
                      <>
                        <h4 style={{ fontWeight:800, marginBottom:'0.5rem' }}>🪜 So gehst du vor:</h4>
                        <ol style={{ paddingLeft:'1.1rem', marginBottom:'0.75rem' }}>
                          {t.schritte.map((s, i) => <li key={i} style={{ fontSize:'0.85rem', marginBottom:'0.3rem' }}>{s}</li>)}
                        </ol>
                      </>
                    )}
                    <h4 style={{ fontWeight:800, marginBottom:'0.5rem' }}>{label}</h4>
                    {beispiele?.map((b,i) => <div key={i} style={{ background:'#F8F7FF', borderRadius:'8px', padding:'0.5rem 0.75rem', marginBottom:'0.4rem', fontSize:'0.85rem' }}>→ {b}</div>)}
                    {t.selbstcheck && (
                      <div style={{ background:'#ECFDF5', border:'1px solid #A7F3D0', borderRadius:'8px', padding:'0.6rem 0.9rem', marginTop:'0.75rem', fontSize:'0.85rem' }}>
                        ✅ <strong>Selbstcheck:</strong> {t.selbstcheck}
                      </div>
                    )}
                    {t.tipp && <div style={{ background:`${mfColors[t.masterfaehigkeiten[0]]}15`, borderLeft:`3px solid ${mfColors[t.masterfaehigkeiten[0]]}`, borderRadius:'0 8px 8px 0', padding:'0.6rem 0.9rem', marginTop:'0.75rem', fontSize:'0.85rem', fontWeight:700 }}>💡 {t.tipp}</div>}
                    {t.naechsterSchritt && (
                      <p style={{ fontSize:'0.78rem', color:'var(--color-text-light)', marginTop:'0.5rem' }}>
                        🔁 Nächster Schritt: {t.naechsterSchritt}
                      </p>
                    )}
                    {t.id === 'karteikasten' && <Karteikasten />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {visible.length === 0 && <p style={{ textAlign:'center', color:'var(--color-text-light)', marginTop:'2rem' }}>Keine Techniken für diesen Filter gefunden.</p>}

        <div className="card" style={{ marginTop:'2.5rem', padding:'1.5rem', fontSize:'0.82rem', color:'var(--color-text-light)' }}>
          <h4 style={{ fontWeight:800, marginBottom:'0.5rem', color:'var(--color-text)' }}>ℹ️ So entstehen die Beispiele</h4>
          <p style={{ marginBottom:'0.4rem' }}>
            Ohne eigene Eingabe zeigen wir dir redaktionell geprüfte <strong>Demo-Beispiele</strong> zu jeder Technik – die Seite funktioniert also auch offline oder ohne Server-Verbindung vollständig.
          </p>
          <p>
            Gibst du ein eigenes Thema ein, werden die Beispiele automatisch angepasst (gekennzeichnet als „KI-generiert – bitte prüfen"). Ist für eine Technik keine passende Anpassung verfügbar oder schlägt die Anfrage fehl, zeigen wir automatisch wieder das Demo-Beispiel dieser Technik an.
          </p>
        </div>
      </div>
    </div>
  );
}
