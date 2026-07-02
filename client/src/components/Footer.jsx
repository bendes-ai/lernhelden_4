import React from 'react';

export default function Footer() {
  return (
    <footer style={{ marginTop: '4rem', background: '#fff', borderTop: '1px solid #E5E7EB' }}>
      <div className="container" style={{ padding: '2rem 1.5rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontWeight: 800, marginBottom: '.35rem' }}>LernHeld</div>
          <p style={{ color: 'var(--color-text-light)', fontSize: '.92rem' }}>Lerntechniken, Lern-App und KI-Kompetenz für Kinder von 8–14 Jahren.</p>
        </div>
        <div style={{ color: 'var(--color-text-light)', fontSize: '.92rem' }}>
          <div>© 2026 LernHeld</div>
          <div>Datenschutzfreundlich & ohne Registrierung</div>
        </div>
      </div>
    </footer>
  );
}
