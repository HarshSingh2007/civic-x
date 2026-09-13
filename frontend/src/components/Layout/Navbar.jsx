import React, { useEffect, useState } from 'react';
import { Activity, ShieldCheck, Zap, Globe, MessageSquare } from 'lucide-react';
import { api } from '../../services/api';
import { t } from '../../utils/translations';

export default function Navbar({ setCurrentPage, lang, setLang }) {
  const [apiOnline, setApiOnline] = useState(true);
  const text = t[lang] || t.en;

  useEffect(() => {
    api.getHealth().then((res) => {
      setApiOnline(res && res.success);
    });
  }, []);

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'hi' : 'en');
  };

  return (
    <header style={{
      height: '64px',
      background: 'rgba(14, 22, 38, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-cyan)',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand Tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
          {text.brand_tagline}
        </span>
        <span style={{ height: '16px', width: '1px', background: 'var(--border-cyan)' }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
          {text.sub_tagline}
        </span>
      </div>

      {/* Gateway Status & Language Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        
        <button
          className="map-pill-btn active"
          onClick={toggleLanguage}
          style={{ padding: '6px 14px', fontSize: '0.8rem' }}
        >
          <Globe size={14} /> {lang === 'en' ? 'हिंदी (Hindi)' : 'English'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <Activity size={14} style={{ color: apiOnline ? 'var(--neon-emerald)' : 'var(--neon-rose)' }} />
          <span>API:</span>
          <span style={{ fontWeight: '800', color: apiOnline ? 'var(--neon-emerald)' : 'var(--neon-rose)' }}>
            {apiOnline ? 'ACTIVE (FastAPI)' : 'OFFLINE'}
          </span>
        </div>

        <button
          className="btn-primary"
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}
          onClick={() => setCurrentPage('feedback')}
        >
          <MessageSquare size={14} /> {text.nav_command_center}
        </button>
      </div>
    </header>
  );
}
