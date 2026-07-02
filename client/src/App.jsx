import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Startseite from './pages/Startseite.jsx';
import Lerntechniken from './pages/Lerntechniken.jsx';
import LernApp from './pages/LernApp.jsx';
import KiSicher from './pages/KiSicher.jsx';
import FuerEltern from './pages/FuerEltern.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Startseite />} />
          <Route path="lerntechniken" element={<Lerntechniken />} />
          <Route path="lern-app" element={<LernApp />} />
          <Route path="ki-sicher" element={<KiSicher />} />
          <Route path="fuer-eltern" element={<FuerEltern />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
