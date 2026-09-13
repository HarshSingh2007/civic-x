import React, { useEffect, useState } from 'react';
import SourceTag from '../components/Layout/SourceTag';
import DataStateIndicator from '../components/Layout/DataStateIndicator';
import { api } from '../services/api';
import { Database, CheckCircle2, ExternalLink, ShieldCheck, Server, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { t } from '../utils/translations';

export default function DataTrustCenter({ lang = 'en' }) {
  const text = t[lang] || t.en;
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getDataSources().then((res) => {
      if (res && res.success) {
        setSources(res.data || []);
      }
      setLoading(false);
    });
  }, []);

  const categoryPieData = [
    { name: 'Environmental Telemetry', value: 2, color: '#10B981' },
    { name: 'Municipal Infrastructure', value: 2, color: '#00F0FF' },
    { name: 'Demographic Census', value: 1, color: '#A855F7' }
  ];

  const refreshBarData = sources.map(s => ({
    name: s.name.split(' ')[0],
    active: s.api_status === 'Active Feed' ? 100 : 85
  }));

  return (
    <div className="page-container">
      <div className="page-title-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">
              <Database style={{ color: 'var(--neon-emerald)' }} />
              <span className="gradient-text-saffron">{text.p11_title}</span>
            </h1>
            <p className="page-subtitle">{text.p11_sub}</p>
          </div>
          <SourceTag type="REAL" text="GOVERNMENT SOURCE CATALOG" />
        </div>
      </div>

      <DataStateIndicator loading={loading} empty={sources.length === 0}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* CHARTS ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
            
            {/* Category Pie Chart */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PieIcon size={16} style={{ color: 'var(--neon-emerald)' }} /> Verified Source Categories (Pie Chart)
              </h3>
              <div style={{ width: '100%', height: '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4}>
                      {categoryPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Health Status Bar Chart */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart2 size={16} style={{ color: 'var(--neon-cyan)' }} /> Government Dataset Feed Availability (%)
              </h3>
              <div style={{ width: '100%', height: '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={refreshBarData}>
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
                    <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                    <Bar dataKey="active" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* CATALOG REGISTER CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {sources.map((src) => (
              <div key={src.id} className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--neon-emerald)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--neon-emerald)', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                      {text.gov_source}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#FFF', margin: '4px 0 2px' }}>
                      {src.name}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Organization: <strong>{src.organization}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: 'var(--neon-emerald)',
                      border: '1px solid var(--border-emerald)'
                    }}>
                      {src.api_status}
                    </span>

                    <a
                      href={src.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    >
                      {text.portal_link} <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>GEOGRAPHIC COVERAGE</div>
                    <div style={{ fontSize: '0.85rem', color: '#FFF', marginTop: '2px' }}>{src.geographic_coverage}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TIME PERIOD / CADENCE</div>
                    <div style={{ fontSize: '0.85rem', color: '#FFF', marginTop: '2px' }}>{src.time_period}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DATA TYPE</div>
                    <div style={{ fontSize: '0.85rem', color: '#FFF', marginTop: '2px' }}>{src.data_type}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>LAST VERIFIED</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--neon-cyan)', marginTop: '2px' }}>{src.last_updated}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </DataStateIndicator>
    </div>
  );
}
