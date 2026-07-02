import React, { useState } from 'react';

const API_BASE = 'https://lernheldenserver.onrender.com';

export default function HomeworkUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${API_BASE}/api/homework/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Fehler bei der Verarbeitung.');
      setResult(data);
    } catch (err) {
      setError(err.message || 'Verbindung zum Server fehlgeschlagen.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div>
      {!result && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📷</div>
          <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Foto deiner Hausaufgabe hochladen</h3>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '1.25rem' }}>
            Mache ein deutliches Foto deines Arbeitsblatts oder wähle ein Bild aus.
          </p>

          <label className="btn btn-primary" style={{ cursor: 'pointer', display: 'inline-flex' }}>
            📤 Bild auswählen
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>

          {preview && (
            <div style={{ marginTop: '1.5rem' }}>
              <img src={preview} alt="Vorschau" style={{ maxWidth: '100%', maxHeight: '320px', borderRadius: '12px', boxShadow: 'var(--shadow)' }} />
              <div style={{ marginTop: '1rem' }}>
                <button className="btn btn-primary" onClick={handleUpload} disabled={loading}>
                  {loading ? '🧠 Analysiere...' : '🚀 Jetzt analysieren'}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div style={{ marginTop: '1.25rem', background: 'rgba(255,101,132,0.12)', border: '2px solid #FF6584', borderRadius: '12px', padding: '1rem', color: '#B91C4C', fontWeight: 700 }}>
              ⚠️ {error}
            </div>
          )}
        </div>
      )}

      {result && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontWeight: 800 }}>🔍 Fach erkannt: {result.subject || 'Sonstiges'}</h2>
            <button className="btn btn-outline" onClick={reset}>← Neues Foto</button>
          </div>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '0.75rem' }}>📖 Erkannter Text</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>{result.text}</p>
          </div>

          {result.exercises?.length > 0 && (
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '0.75rem' }}>📝 Übungsaufgaben</h3>
              <ol style={{ marginLeft: '1.25rem' }}>
                {result.exercises.map((ex, i) => (<li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>{ex}</li>))}
              </ol>
            </div>
          )}

          {result.flashcards?.length > 0 && (
            <div className="card">
              <h3 style={{ fontWeight: 800, marginBottom: '0.75rem' }}>🗂️ Karteikarten</h3>
              <div className="grid-2">
                {result.flashcards.map((fc, i) => (
                  <div key={i} style={{ background: '#F8F7FF', borderRadius: '12px', padding: '1rem' }}>
                    <p style={{ fontWeight: 700, marginBottom: '0.4rem' }}>❓ {fc.front}</p>
                    <p style={{ color: 'var(--color-text-light)' }}>💡 {fc.back}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
