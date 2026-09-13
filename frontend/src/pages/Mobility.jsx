import React, { useEffect, useState } from 'react';
import SourceTag from '../components/Layout/SourceTag';
import DataStateIndicator from '../components/Layout/DataStateIndicator';
import { api } from '../services/api';
import { Bus, Info, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { t } from '../utils/translations';

export default function Mobility({ lang = 'en' }) {
  const text = t[lang] || t.en;
  const [selectedCity, setSelectedCity] = useState('delhi-ncr');
  const [mobilityData, setMobilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.getMobility(selectedCity).then((res) => {
      if (res && res.success && res.data) {
        setMobilityData(res.data);
      } else {
        setError(res?.error || "Verified live mobility data is not currently available for this region.");
      }
    }).catch((err) => {
      console.warn("Mobility loading error:", err);
    }).finally(() => {
      setLoading(false);
    });
  }, [selectedCity]);

  const busTypeData = [
    { name: 'Electric EV Buses', value: 14.5, color: '#10B981' },
    { name: 'CNG Eco Buses', value: 65.5, color: '#00F0FF' },
    { name: 'Diesel Buses', value: 20.0, color: '#F59E0B' }
  ];

  const ridershipBarData = [
    { metro: 'Delhi NCR', passengers: 2.4 },
    { metro: 'Bengaluru', passengers: 1.8 },
    { metro: 'Mumbai', passengers: 2.1 }
  ];

  return (
    <div className="page-container">
      <div className="page-title-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">
              <Bus style={{ color: 'var(--neon-cyan)' }} />
              <span className="gradient-text-cyan">{text.p5_title}</span>
            </h1>
            <p className="page-subtitle">{text.p5_sub}</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={selectedCity === 'delhi-ncr' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setSelectedCity('delhi-ncr')}
              style={{ fontSize: '0.8rem' }}
            >
              Delhi NCR
            </button>
            <button
              className={selectedCity === 'bengaluru' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setSelectedCity('bengaluru')}
              style={{ fontSize: '0.8rem' }}
            >
              Bengaluru
            </button>
          </div>
        </div>
      </div>

      <DataStateIndicator loading={loading} error={error}>
        {mobilityData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header Panel */}
            <div className="glass-panel glass-panel-saffron" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#FFF' }}>{mobilityData.city_name} Public Transport Report</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {mobilityData.data_note}
                </p>
              </div>
              <SourceTag type="REAL" text="MoHUA URBAN TRANSPORT" />
            </div>

            {/* CHARTS ROW */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
              
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PieIcon size={16} style={{ color: 'var(--neon-emerald)' }} /> City Bus Fleet Composition (Donut Chart)
                </h3>
                <div style={{ width: '100%', height: '180px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={busTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4}>
                        {busTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BarChart2 size={16} style={{ color: 'var(--neon-cyan)' }} /> Daily Metro Ridership (Millions)
                </h3>
                <div style={{ width: '100%', height: '180px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ridershipBarData}>
                      <XAxis dataKey="metro" stroke="#94A3B8" fontSize={11} />
                      <YAxis stroke="#94A3B8" fontSize={11} />
                      <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                      <Bar dataKey="passengers" fill="#00F0FF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Metric Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{text.transit_coverage}</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--neon-cyan)', margin: '8px 0' }}>
                  {mobilityData.public_transit_coverage_pct}%
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Citizens within 500 meters of a bus stop</p>
              </div>

              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{text.ev_share}</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--neon-emerald)', margin: '8px 0' }}>
                  {mobilityData.bus_fleet_electrification_pct}%
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Zero-emission electric buses in fleet</p>
              </div>

              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{text.ridership}</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--neon-purple)', margin: '8px 0' }}>
                  {mobilityData.daily_metro_ridership_est}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily passenger trips recorded</p>
              </div>
            </div>

          </div>
        )}
      </DataStateIndicator>
    </div>
  );
}
