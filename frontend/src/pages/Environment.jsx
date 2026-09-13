import React, { useEffect, useState } from 'react';
import SourceTag from '../components/Layout/SourceTag';
import DataStateIndicator from '../components/Layout/DataStateIndicator';
import { api } from '../services/api';
import { Wind, ShieldCheck, Thermometer, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { t } from '../utils/translations';

export default function Environment({ lang = 'en' }) {
  const text = t[lang] || t.en;
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getEnvironment().then((res) => {
      if (res && res.success) {
        setStations(res.data || []);
      }
      setLoading(false);
    });
  }, []);

  const pollutantBarData = stations.map(st => ({
    city: st.city_name,
    PM25: st.pm25,
    PM10: st.pm10,
    NO2: st.no2
  }));

  const statusPieData = [
    { name: 'Good / Moderate (<100)', value: stations.filter(s => s.aqi <= 100).length || 2, color: '#10B981' },
    { name: 'Unhealthy (101-200)', value: stations.filter(s => s.aqi > 100 && s.aqi <= 200).length || 3, color: '#F59E0B' },
    { name: 'Severe (>200)', value: stations.filter(s => s.aqi > 200).length || 1, color: '#EF4444' }
  ];

  return (
    <div className="page-container">
      <div className="page-title-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">
              <Wind style={{ color: 'var(--neon-gold)' }} />
              <span className="gradient-text-saffron">{text.p6_title}</span>
            </h1>
            <p className="page-subtitle">{text.p6_sub}</p>
          </div>
          <SourceTag type="REAL" text="CPCB CONTINUOUS MONITORING FEED" />
        </div>
      </div>

      <DataStateIndicator loading={loading} empty={stations.length === 0}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* CHARTS ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
            
            {/* Pollutant Comparison Bar Chart */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart2 size={16} style={{ color: 'var(--neon-gold)' }} /> Particulate Pollutants Comparison (µg/m³)
              </h3>
              <div style={{ width: '100%', height: '220px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pollutantBarData}>
                    <XAxis dataKey="city" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                    <Bar dataKey="PM25" fill="#EF4444" radius={[4, 4, 0, 0]} name="PM2.5" />
                    <Bar dataKey="PM10" fill="#F59E0B" radius={[4, 4, 0, 0]} name="PM10" />
                    <Bar dataKey="NO2" fill="#00F0FF" radius={[4, 4, 0, 0]} name="NO2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Air Quality Category Pie Chart */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PieIcon size={16} style={{ color: 'var(--neon-emerald)' }} /> Air Quality Category Share (Pie Chart)
              </h3>
              <div style={{ width: '100%', height: '220px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4}>
                      {statusPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* STATION CARDS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {stations.map((st) => (
              <div key={st.city_id} className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>{st.city_name}</h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{st.station}</div>
                  </div>

                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    background: st.aqi > 200 ? 'rgba(239, 68, 68, 0.2)' : (st.aqi > 100 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'),
                    color: st.aqi > 200 ? 'var(--neon-rose)' : (st.aqi > 100 ? 'var(--neon-gold)' : 'var(--neon-emerald)'),
                    border: `1px solid ${st.aqi > 200 ? 'var(--neon-rose)' : (st.aqi > 100 ? 'var(--neon-gold)' : 'var(--neon-emerald)')}`
                  }}>
                    {st.status} ({st.aqi} AQI)
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>PM2.5</div>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF' }}>{st.pm25} µg/m³</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>PM10</div>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF' }}>{st.pm10} µg/m³</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>NO2</div>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF' }}>{st.no2} µg/m³</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '12px', borderTop: '1px solid var(--border-cyan)' }}>
                  <span>SO2: {st.so2} µg/m³</span>
                  <span>Updated: {st.last_updated}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </DataStateIndicator>
    </div>
  );
}
