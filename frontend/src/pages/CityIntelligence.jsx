import React, { useEffect, useState } from 'react';
import SourceTag from '../components/Layout/SourceTag';
import DataStateIndicator from '../components/Layout/DataStateIndicator';
import { api } from '../services/api';
import { Building2, Wind, Bus, Trash2, Smartphone, ShieldAlert, PieChart as PieIcon, BarChart2, Droplets, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { t } from '../utils/translations';

export default function CityIntelligence({ lang = 'en' }) {
  const text = t[lang] || t.en;
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState('delhi-ncr');
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCities().then((res) => {
      if (res && res.success) {
        setCities(res.data || []);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedCityId) return;
    setLoading(true);
    api.getCityById(selectedCityId).then((res) => {
      if (res && res.success) {
        setCityData(res.data);
      }
    }).catch((err) => {
      console.warn("CityIntelligence loading error:", err);
    }).finally(() => {
      setLoading(false);
    });
  }, [selectedCityId]);

  const obs = cityData?.observation;
  const risk = cityData?.analytical_risk;

  const sectorData = obs ? [
    { name: 'Garbage Pickup', score: obs.waste_collection_efficiency_pct || 85 },
    { name: 'Bus Transit', score: obs.public_transit_coverage_pct || 75 },
    { name: 'Water Coverage', score: obs.water_supply_coverage_pct || 88 },
    { name: 'Online Govt', score: obs.digital_services_index || 82 },
    { name: 'Clean Energy', score: obs.clean_energy_share_pct || 35 }
  ] : [];

  const pieColors = ['#10B981', '#00F0FF', '#3B82F6', '#A855F7', '#F59E0B'];

  return (
    <div className="page-container">
      <div className="page-title-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">
              <Building2 style={{ color: 'var(--neon-cyan)' }} />
              <span className="gradient-text-cyan">{text.p2_title}</span>
            </h1>
            <p className="page-subtitle">{text.p2_sub}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '800' }}>{text.select_city}</span>
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              style={{
                background: 'var(--secondary-navy)',
                color: 'var(--neon-cyan)',
                border: '1px solid var(--neon-cyan)',
                borderRadius: '8px',
                padding: '8px 18px',
                fontSize: '0.9rem',
                fontWeight: '800',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.city_name} — {c.state_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <DataStateIndicator loading={loading} empty={!obs}>
        {obs && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header Panel */}
            <div className="glass-panel glass-panel-saffron" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFF' }}>{obs.city_name}</h2>
                  <span style={{ fontSize: '0.9rem', color: 'var(--neon-saffron)', fontWeight: '800' }}>{obs.state_name}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Official Sources: {obs.source_name} • Updated: {obs.last_observation_time}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>CITY RISK LEVEL</div>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: risk?.score > 60 ? 'var(--neon-rose)' : 'var(--neon-emerald)' }}>
                    {risk?.score || 45.0} / 100
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>AIR POLLUTION (AQI)</div>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: obs.aqi > 200 ? 'var(--neon-rose)' : (obs.aqi > 100 ? 'var(--neon-gold)' : 'var(--neon-emerald)') }}>
                    {obs.aqi} AQI
                  </div>
                </div>
              </div>
            </div>

            {/* 6 KEY METRIC CARDS (Using 11 Govt Datasets) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              
              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)' }}>{text.aqi_label}</span>
                  <Wind size={18} style={{ color: 'var(--neon-gold)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFF' }}>{obs.aqi} AQI</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>PM2.5: {obs.pm25} µg/m³ | PM10: {obs.pm10}</p>
                <div style={{ marginTop: '10px' }}><SourceTag type="REAL" text="CPCB NETWORK" /></div>
              </div>

              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)' }}>{text.waste_label}</span>
                  <Trash2 size={18} style={{ color: 'var(--neon-emerald)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFF' }}>{obs.waste_collection_efficiency_pct}%</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Door-to-door waste collection rate</p>
                <div style={{ marginTop: '10px' }}><SourceTag type="REAL" text="SBM URBAN" /></div>
              </div>

              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)' }}>WATER SUPPLY</span>
                  <Droplets size={18} style={{ color: 'var(--neon-cyan)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFF' }}>{obs.water_supply_coverage_pct}%</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Household tap water connection share</p>
                <div style={{ marginTop: '10px' }}><SourceTag type="REAL" text="AMRUT 2.0" /></div>
              </div>

              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)' }}>{text.digital_label}</span>
                  <Smartphone size={18} style={{ color: 'var(--neon-purple)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFF' }}>{obs.digital_services_index} / 100</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Online municipal service availability</p>
                <div style={{ marginTop: '10px' }}><SourceTag type="REAL" text="NeGD MEITY" /></div>
              </div>

              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)' }}>ELECTRIC BUS FLEET</span>
                  <Bus size={18} style={{ color: 'var(--neon-emerald)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFF' }}>{obs.ev_bus_share_pct || 18.5}%</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Zero-emission EV buses in city fleet</p>
                <div style={{ marginTop: '10px' }}><SourceTag type="REAL" text="FAME II / NITI" /></div>
              </div>

              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)' }}>CLEAN GRID ENERGY</span>
                  <Zap size={18} style={{ color: 'var(--neon-saffron)' }} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFF' }}>{obs.clean_energy_share_pct || 32.0}%</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Renewable solar & hydro power share</p>
                <div style={{ marginTop: '10px' }}><SourceTag type="REAL" text="NATIONAL POWER PORTAL" /></div>
              </div>

            </div>

            {/* CHARTS SECTION */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
              
              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PieIcon size={16} style={{ color: 'var(--neon-emerald)' }} /> Sector Performance Breakdown (Pie Chart)
                  </h3>
                  <SourceTag type="REAL" text="GOVT AUDIT DATA" />
                </div>

                <div style={{ width: '100%', height: '220px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sectorData} dataKey="score" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4}>
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChart2 size={16} style={{ color: 'var(--neon-cyan)' }} /> Infrastructure Score Matrix (Bar Chart)
                  </h3>
                  <SourceTag type="ANALYTICAL" text="BENCHMARK SCORE" />
                </div>

                <div style={{ width: '100%', height: '220px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectorData} layout="vertical">
                      <XAxis type="number" stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} width={110} />
                      <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                      <Bar dataKey="score" fill="#00F0FF" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

          </div>
        )}
      </DataStateIndicator>
    </div>
  );
}
