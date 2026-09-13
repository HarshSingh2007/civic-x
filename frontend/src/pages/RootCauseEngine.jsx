import React, { useEffect, useState } from 'react';
import SourceTag from '../components/Layout/SourceTag';
import DataStateIndicator from '../components/Layout/DataStateIndicator';
import { api } from '../services/api';
import { SearchCode, HelpCircle, CheckCircle2, AlertTriangle, Layers, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { t } from '../utils/translations';

export default function RootCauseEngine({ lang = 'en' }) {
  const text = t[lang] || t.en;
  const [incidentId, setIncidentId] = useState('delhi-aqi-spike');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getRootCause(incidentId).then((res) => {
      if (res && res.success) {
        setAnalysis(res.data);
      }
    }).catch((err) => {
      console.warn("RootCauseEngine loading error:", err);
    }).finally(() => {
      setLoading(false);
    });
  }, [incidentId]);

  const signalPieData = [
    { name: 'Air Pollution Reading', value: 45, color: '#EF4444' },
    { name: 'Weather / Wind Speed', value: 30, color: '#F59E0B' },
    { name: 'Traffic Density', value: 25, color: '#00F0FF' }
  ];

  const confidenceBarData = [
    { factor: 'Delhi Air Issue', accuracy: 86 },
    { factor: 'Lucknow Waste Issue', accuracy: 79 },
    { factor: 'Bengaluru Transit', accuracy: 91 }
  ];

  return (
    <div className="page-container">
      <div className="page-title-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">
              <SearchCode style={{ color: 'var(--neon-purple)' }} />
              <span className="gradient-text-cyan">{text.p4_title}</span>
            </h1>
            <p className="page-subtitle">{text.p4_sub}</p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className={incidentId === 'delhi-aqi-spike' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setIncidentId('delhi-aqi-spike')}
              style={{ fontSize: '0.8rem' }}
            >
              Delhi Air Issue
            </button>
            <button
              className={incidentId === 'waste-collection-drop' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setIncidentId('waste-collection-drop')}
              style={{ fontSize: '0.8rem' }}
            >
              Garbage Pickup Issue
            </button>
          </div>
        </div>
      </div>

      <DataStateIndicator loading={loading} empty={!analysis}>
        {analysis && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* CHARTS ROW */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
              
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PieIcon size={16} style={{ color: 'var(--neon-purple)' }} /> Related Cause Signals (Pie Chart)
                </h3>
                <div style={{ width: '100%', height: '180px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={signalPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4}>
                        {signalPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#FFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BarChart2 size={16} style={{ color: 'var(--neon-cyan)' }} /> Helper Confidence Score (%)
                </h3>
                <div style={{ width: '100%', height: '180px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={confidenceBarData}>
                      <XAxis dataKey="factor" stroke="#94A3B8" fontSize={11} />
                      <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
                      <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                      <Bar dataKey="accuracy" fill="#A855F7" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Analysis Card */}
            <div className="glass-panel glass-panel-saffron" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <SourceTag type="ANALYTICAL" text="AI CAUSE HELPER" />
                <span style={{ fontSize: '0.85rem', color: 'var(--neon-cyan)', fontWeight: '800' }}>
                  {text.confidence}: {(analysis.confidence_score * 100).toFixed(0)}%
                </span>
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#FFF', margin: '8px 0' }}>{analysis.title}</h2>
              <div style={{ fontSize: '0.95rem', color: 'var(--neon-cyan)', background: 'rgba(0,240,255,0.08)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-cyan)' }}>
                <strong>{text.potential_cause}:</strong> {analysis.potential_root_cause}
              </div>
            </div>

          </div>
        )}
      </DataStateIndicator>
    </div>
  );
}
