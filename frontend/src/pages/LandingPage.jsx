import React from 'react';
import { ArrowRight, ShieldCheck, Flag, Sparkles, Building2, BarChart2, PieChart as PieIcon, TrendingUp, Activity, Award, Database, Cpu } from 'lucide-react';
import SourceTag from '../components/Layout/SourceTag';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { t } from '../utils/translations';

export default function LandingPage({ setCurrentPage, lang = 'en' }) {
  const text = t[lang] || t.en;

  const airQualityData = [
    { city: 'Delhi', aqi: 218 },
    { city: 'Lucknow', aqi: 172 },
    { city: 'Kolkata', aqi: 165 },
    { city: 'Mumbai', aqi: 134 },
    { city: 'Ahmedabad', aqi: 125 },
    { city: 'Hyderabad', aqi: 88 },
    { city: 'Chennai', aqi: 72 },
    { city: 'Bengaluru', aqi: 68 }
  ];

  const anomalyPieData = [
    { name: 'Air Pollution Alerts', value: 40, color: '#EF4444' },
    { name: 'Garbage Delays', value: 30, color: '#F59E0B' },
    { name: 'Bus Access Deficits', value: 20, color: '#00F0FF' },
    { name: 'Water Pipe Leaks', value: 10, color: '#A855F7' }
  ];

  return (
    <div className="page-container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      
      {/* HERO HERO CONTAINER */}
      <div className="glass-panel glass-panel-saffron" style={{
        padding: '48px 36px',
        background: 'radial-gradient(circle at 50% 0%, rgba(255, 119, 34, 0.16) 0%, rgba(14, 22, 38, 0.95) 75%)',
        borderRadius: '16px',
        textAlign: 'center',
        position: 'relative'
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <SourceTag type="REAL" text="GOVERNMENT DATA VERIFIED" />
          <span style={{
            background: 'rgba(255, 119, 34, 0.15)',
            border: '1px solid var(--neon-saffron)',
            color: 'var(--neon-saffron)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.72rem',
            fontWeight: '800',
            fontFamily: 'var(--font-mono)'
          }}>
            🇮🇳 INDIA @ 2047 PLATFORM
          </span>
        </div>

        {/* Brand Name: CIVIC X */}
        <h1 style={{
          fontSize: '3.6rem',
          fontWeight: '900',
          letterSpacing: '-0.03em',
          color: '#FFF',
          marginBottom: '6px',
          fontFamily: 'var(--font-heading)'
        }}>
          CIVIC X
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: '1.25rem',
          fontWeight: '800',
          color: 'var(--neon-saffron)',
          letterSpacing: '0.04em',
          marginBottom: '16px',
          fontFamily: 'var(--font-heading)'
        }}>
          "From City Data to City Decisions."
        </p>

        <p style={{
          fontSize: '0.98rem',
          color: 'var(--text-main)',
          maxWidth: '750px',
          margin: '0 auto 28px',
          lineHeight: '1.6'
        }}>
          AI Urban Intelligence & India @ 2047 Readiness Platform. Transforming official government data and urban telemetry into real-time civic signals and policy decisions.
        </p>

        {/* FEATURE HIGHLIGHT PILLARS (3 Key Highlights) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto 32px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-cyan)' }}>
            <Cpu size={24} style={{ color: 'var(--neon-cyan)', marginBottom: '8px' }} />
            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#FFF' }}>1. Urban Intelligence Telemetry</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Real-time CPCB air readings and Smart City indicators</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-saffron)' }}>
            <Flag size={24} style={{ color: 'var(--neon-saffron)', marginBottom: '8px' }} />
            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#FFF' }}>2. India @ 2047 Readiness</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Tracking urban progress towards 100 years of independence</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-emerald)' }}>
            <Database size={24} style={{ color: 'var(--neon-emerald)', marginBottom: '8px' }} />
            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#FFF' }}>3. Government Data Trust</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Verified data from official government portals</div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            className="btn-primary"
            style={{ fontSize: '1rem', padding: '12px 28px' }}
            onClick={() => setCurrentPage('india-pulse')}
          >
            EXPLORE INDIA CITY DASHBOARD <ArrowRight size={18} />
          </button>
          
          <button
            className="btn-secondary"
            style={{ fontSize: '1rem', padding: '12px 28px' }}
            onClick={() => setCurrentPage('command-center')}
          >
            OPEN CONTROL ROOM <ShieldCheck size={18} />
          </button>
        </div>

      </div>

      {/* CHARTS PREVIEW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '28px' }}>
        
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart2 size={18} style={{ color: 'var(--neon-gold)' }} /> Air Quality (AQI) Overview Across Metros
            </h3>
            <SourceTag type="REAL" text="CPCB TELEMETRY" />
          </div>

          <div style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={airQualityData}>
                <XAxis dataKey="city" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={10} domain={[0, 250]} />
                <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                <Bar dataKey="aqi" fill="#FF7722" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PieIcon size={18} style={{ color: 'var(--neon-purple)' }} /> City Alert Distribution
            </h3>
            <SourceTag type="PREDICTION" text="AI DETECTOR" />
          </div>

          <div style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={anomalyPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4}>
                  {anomalyPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
