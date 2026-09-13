import React, { useEffect, useState } from 'react';
import SourceTag from '../components/Layout/SourceTag';
import DataStateIndicator from '../components/Layout/DataStateIndicator';
import { api } from '../services/api';
import { Radar, AlertOctagon, ChevronRight, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { t } from '../utils/translations';

export default function CivicRadar({ setCurrentPage, lang = 'en' }) {
  const text = t[lang] || t.en;
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getAnomalies().then((res) => {
      if (res && res.success) {
        setAnomalies(res.data || []);
      }
      setLoading(false);
    });
  }, []);

  const pieData = [
    { name: 'Severe High Risk', value: 2, color: '#EF4444' },
    { name: 'Moderate Risk', value: 3, color: '#F59E0B' },
    { name: 'Low Deviation', value: 2, color: '#00F0FF' }
  ];

  const deviationBarData = anomalies.map(a => ({
    name: a.city_name,
    deviation: Math.abs(a.deviation),
    metric: a.metric
  }));

  return (
    <div className="page-container">
      <div className="page-title-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">
              <Radar style={{ color: 'var(--neon-rose)' }} />
              <span className="gradient-text-saffron">{text.p3_title}</span>
            </h1>
            <p className="page-subtitle">{text.p3_sub}</p>
          </div>
          <SourceTag type="PREDICTION" text="ISOLATION FOREST AI MODEL" />
        </div>
      </div>

      <DataStateIndicator loading={loading} empty={anomalies.length === 0}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* TOP CHARTS SECTION */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
            
            {/* Severity Pie Chart */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PieIcon size={16} style={{ color: 'var(--neon-rose)' }} /> Alert Severity Breakdown (Pie Chart)
              </h3>
              <div style={{ width: '100%', height: '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Metric Deviation Bar Chart */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart2 size={16} style={{ color: 'var(--neon-gold)' }} /> Statistical Deviation (%) by Metro
              </h3>
              <div style={{ width: '100%', height: '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deviationBarData}>
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                    <Bar dataKey="deviation" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* ANOMALY TABLE */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF' }}>
                Flagged Potential Civic Anomalies ({anomalies.length})
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Notice: AI statistical divergence signals — not confirmed crisis events.
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-cyan)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    <th style={{ padding: '12px 16px' }}>{text.metric}</th>
                    <th style={{ padding: '12px 16px' }}>{text.location}</th>
                    <th style={{ padding: '12px 16px' }}>{text.baseline}</th>
                    <th style={{ padding: '12px 16px' }}>{text.observed}</th>
                    <th style={{ padding: '12px 16px' }}>{text.deviation}</th>
                    <th style={{ padding: '12px 16px' }}>{text.severity}</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {anomalies.map((anom) => (
                    <tr key={anom.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: '800', color: '#FFF' }}>
                        {anom.metric}
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                        {anom.geographic_area}
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                        {anom.baseline}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: '800', color: 'var(--neon-gold)' }}>
                        {anom.observed}
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--neon-rose)', fontWeight: '800' }}>
                        +{anom.deviation}%
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          fontWeight: '800',
                          background: 'rgba(239, 68, 68, 0.2)',
                          color: 'var(--neon-rose)',
                          border: '1px solid var(--neon-rose)'
                        }}>
                          {anom.severity}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <button
                          className="btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          onClick={() => setCurrentPage('root-cause')}
                        >
                          Root Cause Analysis <ChevronRight size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </DataStateIndicator>
    </div>
  );
}
