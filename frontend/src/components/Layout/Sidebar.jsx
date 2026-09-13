import React from 'react';
import { 
  Globe, 
  Building2, 
  Radar, 
  SearchCode, 
  Bus, 
  Wind, 
  MessageSquare, 
  Award
} from 'lucide-react';
import { t } from '../../utils/translations';

export default function Sidebar({ currentPage, setCurrentPage, lang, civicScore = 140 }) {
  const text = t[lang] || t.en;

  const menuItems = [
    { id: 'india-pulse', label: text.p1, icon: Globe },
    { id: 'city-intelligence', label: text.p2, icon: Building2 },
    { id: 'civic-radar', label: text.p3, icon: Radar },
    { id: 'root-cause', label: text.p4, icon: SearchCode },
    { id: 'mobility', label: text.p5, icon: Bus },
    { id: 'environment', label: text.p6, icon: Wind },
    { id: 'feedback', label: text.p7, icon: MessageSquare },
  ];

  return (
    <aside style={{
      width: '285px',
      background: 'rgba(5, 8, 17, 0.96)',
      borderRight: '1px solid var(--border-cyan)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      flexShrink: 0,
      backdropFilter: 'blur(25px)'
    }}>
      {/* Brand Header */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-cyan)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #FF7722 0%, #00F0FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#050811',
            fontWeight: '900',
            fontSize: '1.4rem',
            boxShadow: 'var(--glow-saffron)'
          }}>
            X
          </div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: '900', letterSpacing: '0.04em', color: '#FFF' }}>CIVIC X</h1>
            <p style={{ fontSize: '0.68rem', color: 'var(--neon-saffron)', fontWeight: '800', letterSpacing: '0.04em' }}>
              URBAN INTELLIGENCE
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', padding: '0 8px 8px', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
          {lang === 'hi' ? 'मुख्य मॉड्यूल' : 'Core Modules'}
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '8px',
                border: 'none',
                background: isActive ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)',
                fontWeight: isActive ? '800' : '600',
                fontSize: '0.88rem',
                cursor: 'pointer',
                marginBottom: '6px',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                borderLeft: isActive ? '3px solid var(--neon-cyan)' : '3px solid transparent',
                fontFamily: 'var(--font-heading)'
              }}
            >
              <Icon size={18} style={{ color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)' }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Profile Badge */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-cyan)', background: 'rgba(14, 22, 38, 0.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Award size={22} style={{ color: 'var(--neon-gold)' }} />
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-main)' }}>
              {lang === 'hi' ? 'नागरिक विश्लेषक' : 'Civic Intelligence Champion'}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
              Score: {civicScore} PTS
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
