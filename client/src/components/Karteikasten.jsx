import React, { useState, useEffect } from 'react';

const API_BASE = 'https://lernheldenserver.onrender.com';
const STORAGE_KEY = 'karteikasten_karten';
const INTERVALLE_TAGE = [0, 1, 3, 7, 14]; // Fach 1: sofort, Fach 5: alle 14 Tage

function ladeKarten() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function speichereKarten(karten) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(karten));
}

function istFaellig(karte) {
  const jetzt = Date.now();
  return !karte.naechsteWiederholung || karte.naechsteWiederholung <= jetzt;
}

export default function Karteikasten() {
  const [karten, setKarten] = useState(ladeKarten);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [lernModus, setLernModus] = useState(false);
  const [aktuelleKarte, setAktuelleKarte] = useState(null);
  const [zeigeAntwort, setZeigeAntwort] = useState(false);

  useEffect(() => { speichereKarten(karten); }, [karten]);

  const faelligeKarten = karten.filter(istFaellig);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API_BASE}/api/karteikasten/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler beim Verarbeiten.');
      const neueKarten = data.flashcards.map((k, i) => ({
        id: `${Date.now()}-${i}`,
        front: k.front,
        back: k.back,
        fach: 1,
        naechsteWiederholung: 0
      }));
      setKarten(prev => [...prev, ...neueKarten]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function starteLernen() {
    if (faelligeKarten.length === 0) return;
    setLernModus(true);
    setZeigeAntwort(false);
    setAktuelleKarte(faelligeKarten[0]);
  }

  function beantworten(gewusst) {
    setKarten(prev => prev.map(k => {
      if (k.id !== aktuelleKarte.id) return k;
      const neuesFach = gewusst ? Math.min(k.fach + 1, 5) : 1;
      const tage = INTERVALLE_TAGE[neuesFach - 1];
      return {
        ...k,
        fach: neuesFach,
        naechsteWiederholung: Date.now() + tage * 24 * 60 * 60 * 1000
      };
    }));

    const rest = faelligeKarten.filter(k => k.id !== aktuelleKarte.id);
    if (rest.length === 0) {
      setLernModus(false);
      setAktuelleKarte(null);
    } else {
      setZeigeAntwort(false);
      setAktuelleKarte(rest[0]);
    }
  }

  function karteLoeschen(id) {
    setKarten(prev => prev.filter(k => k.id !== id));
  }

  const faecherUebersicht = [1, 2, 3, 4, 5].map(f => ({
    fach: f,
    anzahl: karten.filter(k => k.fach === f).length
  }));

  if (lernModus && aktuelleKarte) {
    return (
      <div className="card" style={{ maxWidth: '500px', margin: '2rem auto', textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
          Noch {faelligeKarten.length} Karte(n) fällig · Fach {aktuelleKarte.fach}
        </p>
        <div
          onClick={() => setZeigeAntwort(!zeigeAntwort)}
          style={{
            background: '#F8F7FF', borderRadius: '16px', padding: '3rem 1.5rem',
            fontSize: '1.3rem', fontWeight: 700, cursor: 'pointer', minHeight: '120px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'
          }}
        >
          {zeigeAntwort ? aktuelleKarte.back : aktuelleKarte.front}
        </div>
        {!zeigeAntwort ? (
          <button className="btn" onClick={() => setZeigeAntwort(true)}>Antwort zeigen</button>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn" style={{ background: '#EF4444', color: 'white' }} onClick={() => beantworten(false)}>
              ❌ Wusste ich nicht
            </button>
            <button className="btn" style={{ background: '#10B981', color: 'white' }} onClick={() => beantworten(true)}>
              ✅ Wusste ich
            </button>
          </div>
        )}
        <button className="btn" style={{ marginTop: '1.5rem', background: 'transparent', border: '2px solid #E5E7EB' }} onClick={() => setLernModus(false)}>
          Beenden
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
      <h3 style={{ fontWeight: 800, marginBottom: '1rem' }}>📇 Virtueller Karteikasten</h3>

      <label className="btn" style={{ display: 'inline-block', cursor: 'pointer', marginBottom: '1rem' }}>
        {uploading ? 'Wird verarbeitet...' : '📷 Foto hochladen (z. B. Vokabelblatt)'}
        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} style={{ display: 'none' }} />
      </label>

      {error && <p style={{ color: '#EF4444', fontSize: '0.85rem' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
        {faecherUebersicht.map(f => (
          <span key={f.fach} style={{ background: '#F8F7FF', borderRadius: '50px', padding: '0.3rem 0.8rem', fontSize: '0.8rem', fontWeight: 700 }}>
            Fach {f.fach}: {f.anzahl}
          </span>
        ))}
      </div>

      <button
        className="btn"
        style={{ background: 'linear-gradient(135deg,#6C63FF,#8B5CF6)', color: 'white', width: '100%' }}
        onClick={starteLernen}
        disabled={faelligeKarten.length === 0}
      >
        {faelligeKarten.length > 0 ? `🚀 Lernen starten (${faelligeKarten.length} fällig)` : 'Keine Karten fällig'}
      </button>

      {karten.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Alle Karten ({karten.length})</h4>
          {karten.map(k => (
            <div key={k.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', padding: '0.4rem 0', borderBottom: '1px solid #F3F4F6' }}>
              <span>{k.front} → {k.back} (Fach {k.fach})</span>
              <button onClick={() => karteLoeschen(k.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}>🗑️</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

