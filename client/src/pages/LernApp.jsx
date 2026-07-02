import React from 'react';
import HomeworkUpload from '../components/HomeworkUpload.jsx';

export default function LernApp() {
  return (
    <div className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🚀</div>
          <h1 className="section-title">Meine Lern-App</h1>
          <p className="section-subtitle">Foto hochladen, Hausaufgaben analysieren und passende Lernaufgaben erhalten.</p>
        </div>
        <div className="safety-banner" style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>🔒</span>
          <div><strong>Datenschutz-Hinweis:</strong> Bitte keine Namen, Adressen, Schulnamen oder andere persönliche Daten in Bilder einfügen.</div>
        </div>
        <HomeworkUpload />
      </div>
    </div>
  );
}
