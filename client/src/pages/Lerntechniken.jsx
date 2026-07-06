import React, { useState } from 'react';
import { LERNTECHNIKEN } from '../data/lerntechniken.js';
import { MASTERFAEHIGKEITEN } from '../data/masterfaehigkeiten.js';
import Karteikasten from '../components/Karteikasten.jsx';
const AUFGABENTYPEN = [
  {id:'alle',label:'🔍 Alle Techniken'},{id:'vokabeln',label:'🔤 Vokabeln'},{id:'fakten',label:'📌 Fakten'},
  {id:'prozesse',label:'🔬 Prozesse'},{id:'textverstaendnis',label:'📖 Texte'},{id:'referat',label:'🎤 Referate'},{id:'pruefungsvorbereitung',label:'📝 Prüfungen'}
];

const FAECHER = [
  { id:'sprachen', label:'🔤 Sprachen / Vokabeln', aufgabentyp:'vokabeln' },
  { id:'mathe', label:'🔢 Mathematik', aufgabentyp:'fakten' },
  { id:'naturwissenschaften', label:'🔬 Naturwissenschaften', aufgabentyp:'prozesse' },
  { id:'deutsch', label:'📖 Deutsch / Text', aufgabentyp:'textverstaendnis' },
  { id:'geschichte', label:'📌 Geschichte / Fakten', aufgabentyp:'fakten' },
  { id:'referat', label:'🎤 Referat vorbereiten', aufgabentyp:'referat' },
  { id:'pruefung', label:'📝 Prüfung allgemein', aufgabentyp:'pruefungsvorbereitung' }
];

const ZEITOPTIONEN = [5, 10, 15, 20, 30, 60];

export default function Lerntechniken() {
  const [filter, setFilter] = useState('alle');
  const [open, setOpen] = useState(null);
  const [fach, setFach] = useState(null);
  const [zeit, setZeit] = useState(null);
  const mfColors = Object.fromEntries(MASTERFAEHIGKEITEN.map(m => [m.id, m.farbe]));
  const mfEmoji = Object.fromEntries(MASTERFAEHIGKEITEN.map(m => [m.id, m.emoji]));

  const visible = filter==='alle' ? LERNTECHNIKEN : LERNTECHNIKEN.filter(t => t.aufgabentypen?.includes(filter));

  const empfehlung = React.useMemo(() => {
    if (!fach || !zeit) return [];
    const aufgabentyp = FAECHER.find(f => f.id === fach)?.aufgabentyp;
    return LERNTECHNIKEN
      .filter(t => t.aufgabentypen?.includes(aufgabentyp) && t.zeitMin <= zeit)
      .sort((a, b) => a.zeitMin - b.zeitMin)
      .slice(0, 3);
  }, [fach, zeit]);

  return (
    <div className="section">
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <div style={{ fontSize:'3.5rem', marginBottom:'0.5rem' }}>🧠</div>
          <h1 className="section-title">22 Lerntechniken entdecken</h1>
          <p className="section-subtitle">Für jedes Fach und jeden Lerntyp – mit echten Schulbeispielen.</p>
        </div>

        <div className="card" style={{ marginBottom:'2.5rem', padding:'1.5rem' }}>
          <h3 style={{ fontWeight:800, marginBottom:'1rem' }}>🎯 Passende Technik finden</h3>
          <p style={{ fontSize:'0.85rem', color:'var(--color-text-light)', marginBottom:'0.5rem' }}>Fach auswählen:</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'1rem' }}>
            {FAECHER.map(f => (
              <button key={f.id} className="btn" onClick={() => setFach(f.id)}
                style={{ background:fach===f.id?'linear-gradient(135deg,#6C63FF,#8B5CF6)':'white', color:fach===f.id?'white':'var(--color-text)', border:'2px solid', borderColor:fach===f.id?'transparent':'#E5E7EB', fontSize:'0.85rem' }}>
                {f.label}
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
                {empfehlung.map(t => (
                  <div key={t.id} className="card" style={{ flex:'1 1 200px', padding:'1rem', cursor:'pointer', borderTop:`4px solid ${mfColors[t.masterfaehigkeiten[0]]||'#6C63FF'}` }}
                    onClick={() => { setFilter('alle'); setOpen(t.id); document.getElementById(`technik-${t.id}`)?.scrollIntoView({ behavior:'smooth', block:'center' }); }}>
                    <div style={{ fontSize:'1.5rem', marginBottom:'0.3rem' }}>{t.emoji} {t.name}</div>
                    <p style={{ fontSize:'0.8rem', color:'var(--color-text-light)' }}>⏱️ ab {t.zeitMin} Min.</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {fach && zeit && empfehlung.length === 0 && (
            <p style={{ marginTop:'1rem', fontSize:'0.85rem', color:'var(--color-text-light)' }}>
              Für diese Kombination gibt es leider keine passende Technik mit ausreichend wenig Zeitaufwand. Versuch mehr Zeit auszuwählen.
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
          {visible.map(t => (
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
                  </div>
                </div>
              </div>
              <p style={{ fontSize:'0.9rem', color:'var(--color-text-light)', marginBottom:'0.75rem' }}>{t.kurzbeschreibung}</p>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:'0.8rem', color:'var(--color-text-light)' }}>⏱️ ab {t.zeitMin} Min. · {t.aufwand==='einfach'?'✅ Einfach':'⚡ Mittel'}</span>
                <span style={{ color:'var(--color-primary)', fontWeight:700, fontSize:'0.85rem' }}>{open===t.id?'▲ Weniger':'▼ Beispiele'}</span>
              </div>
              {open===t.id && (
                <div style={{ marginTop:'1rem', paddingTop:'1rem', borderTop:'1px solid #F3F4F6' }} onClick={e => e.stopPropagation()}>
                  <h4 style={{ fontWeight:800, marginBottom:'0.5rem' }}>📚 Schulbeispiele:</h4>
                  {t.beispielaufgaben?.map((b,i) => <div key={i} style={{ background:'#F8F7FF', borderRadius:'8px', padding:'0.5rem 0.75rem', marginBottom:'0.4rem', fontSize:'0.85rem' }}>→ {b}</div>)}
                  {t.tipp && <div style={{ background:`${mfColors[t.masterfaehigkeiten[0]]}15`, borderLeft:`3px solid ${mfColors[t.masterfaehigkeiten[0]]}`, borderRadius:'0 8px 8px 0', padding:'0.6rem 0.9rem', marginTop:'0.75rem', fontSize:'0.85rem', fontWeight:700 }}>💡 {t.tipp}</div>}
                  {t.id === 'karteikasten' && <Karteikasten />}
                </div>
              )}
            </div>
          ))}
        </div>
        {visible.length === 0 && <p style={{ textAlign:'center', color:'var(--color-text-light)', marginTop:'2rem' }}>Keine Techniken für diesen Filter gefunden.</p>}
      </div>
    </div>
  );
}

