import React, { useEffect, useState } from 'react';
import SourceTag from '../components/Layout/SourceTag';
import DataStateIndicator from '../components/Layout/DataStateIndicator';
import { api } from '../services/api';
import { Flag, Sparkles, TrendingUp, ShieldCheck, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function India2047() {
  const [readiness, setReadiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get2047Readiness().then((res) => {
      if (res && res.success) {
        setReadiness(res.data);
      }
      setLoading(false);
    });
  }, []);

  const domainChartData = readiness?.domains?.map(d => ({
    name: d.domain.split('&')[0],
    score: d.score
  })) || [];

  return (
    <div className="page-container">
      <div className="page-title-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">
              <Flag style={{ color: 'var(--neon-saffron)' }} />
              <span className="gradient-text-saffron">10 — INDIA @ 2047 CIVIC READINESS</span>
            </h1>
            <p className="page-subtitle">Urban Infrastructure Preparedness Index & 100-Year Independence Vision Benchmark</p>
          </div>
          <SourceTag type="ANALYTICAL" text="CIVIC X READINESS INDEX" />
        </div>
      </div>

      <DataStateIndicator loading={loading} empty={!readiness}>
        {readiness && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Header Banner */}
            <div className="glass-panel glass-panel-saffron" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--neon-saffron)', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    {readiness.index_name}
                  </span>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#FFF', margin: '4px 0 8px' }}>
                    Readiness Score: {readiness.overall_score} / 100
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '650px' }}>
                    {readiness.disclaimer}
                  </p>
                </div>

                <div style={{ background: 'rgba(255, 119, 34, 0.15)', border: '1px solid var(--neon-saffron)', padding: '16px 28px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--neon-saffron)', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>PROGRESS TIER</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#FFF', marginTop: '2px' }}>{readiness.readiness_tier}</div>
                </div>
              </div>
            </div>

            {/* DYNAMIC TRAJECTORY AREA CHART */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFF', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={20} style={{ color: 'var(--neon-cyan)' }} /> Analytical Trajectory to 2047 (Area Growth Curve)
              </h3>

              <div style={{ width: '100%', height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={readiness.trajectory}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF7722" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} domain={[60, 100]} />
                    <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                    <Area type="monotone" dataKey="score" stroke="#FF7722" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Domain Breakdown Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {readiness.domains?.map((dom, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFF' }}>{dom.domain}</h4>
                    <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--neon-emerald)' }}>{dom.score}</span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)', fontWeight: '700', marginBottom: '16px' }}>
                    Status: {dom.status}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {dom.key_indicators?.map((ind, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                        <div style={{ color: '#FFF', fontWeight: '600' }}>{ind.name}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          <span>Current: <strong>{ind.current}</strong></span>
                          <span>Target 2047: <strong style={{ color: 'var(--neon-saffron)' }}>{ind.target_2047}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </DataStateIndicator>
    </div>
  );
}
