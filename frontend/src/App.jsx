import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import { ErrorBoundary } from './components/Layout/ErrorBoundary';

import LandingPage from './pages/LandingPage';
import IndiaPulse from './pages/IndiaPulse';
import CityIntelligence from './pages/CityIntelligence';
import CivicRadar from './pages/CivicRadar';
import RootCauseEngine from './pages/RootCauseEngine';
import Mobility from './pages/Mobility';
import Environment from './pages/Environment';
import FeedbackSection from './pages/FeedbackSection';
import WhatIfLab from './pages/WhatIfLab';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [lang, setLang] = useState('en');
  const [civicScore, setCivicScore] = useState(140);

  const renderPage = () => {
    const props = { setCurrentPage, lang };
    switch (currentPage) {
      case 'landing':
        return <LandingPage {...props} />;
      case 'india-pulse':
        return <IndiaPulse {...props} />;
      case 'city-intelligence':
        return <CityIntelligence {...props} />;
      case 'civic-radar':
        return <CivicRadar {...props} />;
      case 'root-cause':
        return <RootCauseEngine {...props} />;
      case 'mobility':
        return <Mobility {...props} />;
      case 'environment':
        return <Environment {...props} />;
      case 'feedback':
        return <FeedbackSection {...props} />;
      case 'what-if-lab':
        return <WhatIfLab {...props} />;
      default:
        return <IndiaPulse {...props} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} lang={lang} civicScore={civicScore} />

      <div className="main-content">
        <Navbar setCurrentPage={setCurrentPage} lang={lang} setLang={setLang} />

        <main style={{ flex: 1 }}>
          <ErrorBoundary>
            {renderPage()}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
