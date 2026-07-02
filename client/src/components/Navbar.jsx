import React from 'react';
import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  textDecoration: 'none',
  color: isActive ? '#6C63FF' : '#6B7280',
  fontWeight: isActive ? 800 : 700,
  padding: '0.5rem 0.75rem',
  borderRadius: '10px',
  background: isActive ? 'rgba(108,99,255,0.08)' : 'transparent'
});

export default function Navbar() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #E5E7EB' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem 1.5rem' }}>
        <NavLink to="/" style={{ textDecoration: 'none', color: '#1A1A2E' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <div style={{ width: '2.2rem', height: '2.2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#6C63FF,#8B5CF6)', color: 'white', fontSize: '1.2rem' }}>🦸</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1rem' }}>LernHeld</div>
              <div style={{ fontSize: '.75rem', color: '#6B7280' }}>Clever lernen & KI sicher nutzen</div>
            </div>
          </div>
        </NavLink>
        <nav style={{ display: 'flex', gap: '.25rem', flexWrap: 'wrap' }}>
          <NavLink to="/" style={linkStyle}>Start</NavLink>
          <NavLink to="/lerntechniken" style={linkStyle}>Lerntechniken</NavLink>
          <NavLink to="/lern-app" style={linkStyle}>Lern-App</NavLink>
          <NavLink to="/ki-sicher" style={linkStyle}>KI sicher</NavLink>
          <NavLink to="/fuer-eltern" style={linkStyle}>Für Eltern</NavLink>
        </nav>
      </div>
    </header>
  );
}
