import React, { useState } from 'react';

export default function FuerEltern() {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { f:'Werden persönliche Daten meines Kindes gespeichert?', a:'Nein. LernHeld speichert keine personenbezogenen Daten. Lernfortschritte werden ausschließlich lokal im Browser gespeichert (LocalStorage) und niemals an einen Server übertragen. Es gibt keine Registrierung, keine Konten, keine Tracker.' },
    { f:'Ist die KI-Nutzung in der App datenschutzkonform?', a:'Die App ist so gestaltet, dass keine persönlichen Daten in KI-Analysen eingehen. Bilder werden nur zur Texterkennung verarbeitet und danach gelöscht.' },
    { f:'Kann ich LernHeld im Unterricht einsetzen?', a:'Ja! Alle Lerntechniken sind für den Unterricht geeignet. Die Materialliste im Eltern-/Lehrkraftbereich enthält druckbare Checklisten, Mind-Map-Vorlagen und Erklärungen für verschiedene Klassenstufen.' },
    { f:'Was passiert, wenn mein Kind versehentlich persönliche Daten eingibt?', a:'Beim Start der App erscheint ein Hinweis-Fenster für Eltern. In der Lern-App erinnern Sicherheitsbanner Kinder daran, keine persönlichen Daten einzugeben.' },
    { f:'Wie erkläre ich meinem Kind den Unterschied zwischen KI-Hilfe und eigenem Lernen?', a:'Die Seite "KI sicher nutzen" enthält kindgerechte Erklärungen und ein Quiz. Das Kernprinzip: KI ist ein Werkzeug wie ein Taschenrechner – das Denken macht das Kind selbst!' }
  ];
  const tipps = [
    { emoji:'🕐', titel:'Lernroutinen gemeinsam entwickeln', text:'Feste Lernzeiten helfen mehr als lange, unregelmäßige Sessions. 20–25 Minuten mit Pause sind oft effektiver als 2 Stunden am Stück.' },
    { emoji:'🎯', titel:'Technik gemeinsam ausprobieren', text:'Probiert eine neue Lerntechnik zusammen aus – das motiviert und zeigt, dass ihr die Methode unterstützt.' },
    { emoji:'💬', titel:'Über KI-Erfahrungen sprechen', text:'Fragt regelmäßig: Hast du heute KI genutzt? Was hat sie gesagt? Stimmte das? Das fördert kritisches Denken.' },
    { emoji:'✅', titel:'Fortschritte feiern', text:'Kleine Erfolge zählen! Wenn eine Technik gut klappt, lobt konkret: "Du hast die Vokabeln mit der Loci-Technik super gelernt!"' },
    { emoji:'📵', titel:'Ablenkungsfreie Lernzonen schaffen', text:'Handy in einem anderen Raum, Benachrichtigungen aus. 20 Minuten echte Konzentration schlägt 2 Stunden mit Ablenkung.' }
  ];
  const begleitskripte = [
    { emoji:'💭', frage:'Was hast du heute gelernt – kannst du es mir in 1 Satz erklären?' },
    { emoji:'⭐', frage:'Welche Technik hat dir heute am meisten geholfen?' },
    { emoji:'🔄', frage:'Was würdest du morgen anders machen?' }
  ];
  const begleitLeitfaden = [
    'Du musst die Technik nicht selbst können – frag einfach nach, wie sie funktioniert hat.',
    'Lass dir die Lösung in eigenen Worten erklären, statt sie selbst zu kontrollieren.',
    'Lob konkrete Anstrengung, nicht nur das Ergebnis.',
    'Wenn eine Technik nicht klappt, ist das kein Problem – probiert gemeinsam eine andere aus.'
  ];

  return (
    <div className="section">
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <div style={{ fontSize:'3.5rem', marginBottom:'0.5rem' }}>👨‍👩‍👧</div>
          <h1 className="section-title">Für Eltern & Lehrkräfte</h1>
          <p className="section-subtitle">Hintergründe zu den Lerntechniken, Datenschutz-FAQ und praktische Tipps zur Begleitung.</p>
        </div>

        <div className="card" style={{ marginBottom:'2rem', background:'linear-gradient(135deg,#6C63FF,#8B5CF6)', color:'white' }}>
          <h2 style={{ fontWeight:800, marginBottom:'0.75rem' }}>🔒 Datenschutz auf einen Blick</h2>
          <div className="grid-2">
            {[['✅ Keine Registrierung','Keine E-Mail-Adresse oder Name erforderlich.'],['✅ Keine Tracker','Kein Google Analytics, keine Werbecookies.'],['✅ Lokale Speicherung','Lernfortschritte nur im Browser-LocalStorage.'],['✅ Datensparsamkeit','Fotos werden nach der Analyse sofort gelöscht.'],['✅ Optionaler PDF-Export','Fortschritt lässt sich als PDF exportieren – verlässt dein Gerät nur, wenn du die Datei aktiv teilst.']].map(([t,d]) => (
              <div key={t} style={{ background:'rgba(255,255,255,0.15)', borderRadius:'12px', padding:'1rem' }}>
                <h4 style={{ fontWeight:700, marginBottom:'0.3rem' }}>{t}</h4>
                <p style={{ fontSize:'0.9rem', opacity:0.9 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginBottom:'2rem' }}>
          <h2 style={{ fontWeight:800, marginBottom:'1.25rem' }}>💡 Tipps für die Begleitung</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {tipps.map(t => (
              <div key={t.titel} style={{ display:'flex', gap:'1rem', alignItems:'flex-start', background:'#F8F7FF', borderRadius:'12px', padding:'1rem' }}>
                <span style={{ fontSize:'1.75rem', flexShrink:0 }}>{t.emoji}</span>
                <div><h4 style={{ fontWeight:700, marginBottom:'0.3rem' }}>{t.titel}</h4><p style={{ fontSize:'0.9rem', color:'var(--color-text-light)' }}>{t.text}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginBottom:'2rem' }}>
          <h2 style={{ fontWeight:800, marginBottom:'1.25rem' }}>🗣️ Begleit-Skripte für nach dem Lernen</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1.5rem' }}>
            {begleitskripte.map(b => (
              <div key={b.frage} style={{ display:'flex', gap:'1rem', alignItems:'flex-start', background:'#F8F7FF', borderRadius:'12px', padding:'1rem' }}>
                <span style={{ fontSize:'1.5rem', flexShrink:0 }}>{b.emoji}</span>
                <p style={{ fontSize:'0.95rem', fontWeight:600 }}>{b.frage}</p>
              </div>
            ))}
          </div>
          <h3 style={{ fontWeight:800, marginBottom:'0.75rem', fontSize:'1rem' }}>🎯 So begleite ich mein Kind ohne selbst Experte zu sein</h3>
          <ul style={{ display:'flex', flexDirection:'column', gap:'0.5rem', paddingLeft:'1.25rem', fontSize:'0.9rem', color:'var(--color-text-light)' }}>
            {begleitLeitfaden.map(l => <li key={l}>{l}</li>)}
          </ul>
        </div>

        <div className="card" style={{ marginBottom:'2rem' }}>
          <h2 style={{ fontWeight:800, marginBottom:'1.25rem' }}>❓ Häufige Fragen (FAQ)</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
            {faqs.map((faq,i) => (
              <div key={i} style={{ border:'1px solid #E5E7EB', borderRadius:'12px', overflow:'hidden' }}>
                <button className="btn" onClick={() => setOpenFaq(openFaq===i?null:i)} style={{ width:'100%', justifyContent:'space-between', borderRadius:0, background:openFaq===i?'#F8F7FF':'white', padding:'1rem 1.25rem', fontWeight:700, color:'var(--color-text)' }}>
                  <span style={{ textAlign:'left', flex:1 }}>{faq.f}</span>
                  <span style={{ marginLeft:'0.5rem', color:'var(--color-primary)', flexShrink:0 }}>{openFaq===i?'▲':'▼'}</span>
                </button>
                {openFaq===i && <div style={{ padding:'1rem 1.25rem', background:'#F8F7FF', fontSize:'0.95rem', borderTop:'1px solid #E5E7EB' }}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ background:'linear-gradient(135deg,#43E97B,#21D4FD)', color:'white', textAlign:'center' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.75rem' }}>📬</div>
          <h2 style={{ fontWeight:900, marginBottom:'0.5rem' }}>Haben Sie weitere Fragen?</h2>
          <p style={{ opacity:0.9, maxWidth:500, margin:'0 auto' }}>LernHeld ist ein Gemeinschaftsprojekt. Feedback, Ideen und Fehlerhinweise sind jederzeit willkommen.</p>
        </div>
      </div>
    </div>
  );
}
