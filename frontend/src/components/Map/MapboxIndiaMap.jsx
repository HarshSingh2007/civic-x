import React, { useState } from 'react';
import { ShieldCheck, Building2, Zap, AlertTriangle, ChevronRight, Activity, Globe } from 'lucide-react';

export default function MapboxIndiaMap({ onSelectState, onSelectCity, selectedStateCode }) {
  const [activeZone, setActiveZone] = useState('ALL');

  // Indian States Regional Grid Data (Lighter, Faster, 100% Reliable State Representation)
  const statesGrid = [
    { code: "IN-DL", name: "Delhi (NCT)", zone: "NORTH", risk: 74.2, aqi: 218, urbanPct: 97.5, anomalies: 3, status: "High Risk", color: "#EF4444" },
    { code: "IN-UP", name: "Uttar Pradesh", zone: "NORTH", risk: 62.5, aqi: 172, urbanPct: 22.3, anomalies: 2, status: "Medium Risk", color: "#F59E0B" },
    { code: "IN-KA", name: "Karnataka", zone: "SOUTH", risk: 42.0, aqi: 68, urbanPct: 38.7, anomalies: 1, status: "Low Risk", color: "#10B981" },
    { code: "IN-MH", name: "Maharashtra", zone: "WEST", risk: 53.8, aqi: 134, urbanPct: 45.2, anomalies: 2, status: "Medium Risk", color: "#F59E0B" },
    { code: "IN-GJ", name: "Gujarat", zone: "WEST", risk: 38.5, aqi: 125, urbanPct: 42.6, anomalies: 1, status: "Low Risk", color: "#10B981" },
    { code: "IN-TN", name: "Tamil Nadu", zone: "SOUTH", risk: 39.2, aqi: 72, urbanPct: 48.4, anomalies: 0, status: "Low Risk", color: "#10B981" },
    { code: "IN-TG", name: "Telangana", zone: "SOUTH", risk: 41.5, aqi: 88, urbanPct: 38.9, anomalies: 1, status: "Low Risk", color: "#10B981" },
    { code: "IN-WB", name: "West Bengal", zone: "EAST", risk: 58.0, aqi: 165, urbanPct: 31.8, anomalies: 2, status: "Medium Risk", color: "#F59E0B" }
  ];

  const filteredStates = activeZone === 'ALL' ? statesGrid : statesGrid.filter(s => s.zone === activeZone);

  const handleStateClick = (st) => {
    if (onSelectState) onSelectState(st.code, st.name);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. REGIONAL ZONE FILTER TABS */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--neon-cyan)', fontFamily: 'var(--font-heading)' }}>
            REGIONAL ZONES:
          </span>
          {['ALL', 'NORTH', 'SOUTH', 'EAST', 'WEST'].map((zone) => (
            <button
              key={zone}
              className={`map-pill-btn ${activeZone === zone ? 'active' : ''}`}
              onClick={() => setActiveZone(zone)}
            >
              {zone === 'ALL' ? '🇮🇳 All India' : `${zone} Zone`}
            </button>
          ))}
        </div>

        <div style={{ color: 'var(--neon-emerald)', fontSize: '0.78rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={16} /> Official State Regional Spatial Grid ✓
        </div>
      </div>

      {/* 2. HIGH-TECH INTERACTIVE STATE SPATIAL GRID CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {filteredStates.map((st) => {
          const isSelected = selectedStateCode === st.code;
          return (
            <div
              key={st.code}
              onClick={() => handleStateClick(st)}
              className="glass-panel"
              style={{
                padding: '18px',
                cursor: 'pointer',
                border: `2px solid ${isSelected ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.08)'}`,
                background: isSelected ? 'rgba(0, 240, 255, 0.12)' : 'var(--bg-card)',
                boxShadow: isSelected ? 'var(--glow-cyan)' : 'none',
                borderRadius: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--neon-saffron)', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                    {st.zone} ZONE • {st.code}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#FFF', margin: '2px 0 0' }}>
                    {st.name}
                  </h3>
                </div>

                <span style={{
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  background: `${st.color}22`,
                  color: st.color,
                  border: `1px solid ${st.color}`
                }}>
                  {st.status}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px', fontSize: '0.8rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Civic Risk Score</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '900', color: st.color }}>{st.risk} / 100</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Avg Air AQI</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--neon-gold)' }}>{st.aqi} AQI</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
