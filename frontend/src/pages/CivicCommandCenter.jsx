import React from 'react';
import SourceTag from '../components/Layout/SourceTag';
import { ShieldCheck, AlertTriangle, ArrowUpRight, Activity, CheckCircle, Zap, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { t } from '../utils/translations';

export default function CivicCommandCenter({ lang = 'en' }) {
  const text = t[lang] || t.en;

  const incidents = [
    {
      id: 'INC-2026-081',
      problem: 'High Air Pollution Spike',
      location: 'Delhi NCR (Anand Vihar Sector)',
      severity: 'High',
      detected_at: 'Today 04:00 AM',
      evidence: 'CPCB sensor registered PM2.5 = 112.5 µg/m³',
      source: 'Central Pollution Control Board',
      potential_impact: 'Increased respiratory risk for local residents',
      recommendation: 'Suggested Action: Turn on anti-smog water spray trucks & restrict heavy diesel trucks',
      status: 'ANALYZED'
    },
    {
      id: 'INC-2026-042',
      problem: 'Garbage Transfer Truck Delay',
      location: 'Lucknow (Ward 14 & 18)',
      severity: 'Medium',
      detected_at: 'Today 02:30 AM',
      evidence: 'Smart City tracker shows 12.5% transfer volume drop',
      source: 'Smart Cities Mission',
      potential_impact: 'Potential garbage buildup on streets within 24 hours',
      recommendation: 'Suggested Action: Send 4 backup garbage compactor trucks from Ward 6',
      status: 'PREDICTED'
    }
  ];

  const priorityPieData = [
    { name: 'High Priority P1', value: 3, color: '#EF4444' },
    { name: 'Medium Priority P2', value: 2, color: '#F59E0B' },
    { name: 'Low Priority P3', value: 1, color: '#10B981' }
  ];

  const slaBarData = [
    { area: 'Air Quality Response', slaHours: 2.5 },
    { area: 'Garbage Pickup SLA', slaHours: 4.0 },
    { area: 'Water Leak Repair', slaHours: 3.2 }
  ];

  return (
    <div className="page-container">
      <div className="page-title-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">
              <ShieldCheck style={{ color: 'var(--neon-cyan)' }} />
              <span className="gradient-text-cyan">{text.p8_title}</span>
            </h1>
            <p className="page-subtitle">{text.p8_sub}</p>
          </div>
          <SourceTag type="ANALYTICAL" text="CITY CONTROL ROOM" />
        </div>
      </div>

      {/* OPERATIONS WORKFLOW STEPS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderTop: '4px solid var(--neon-rose)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>1. {text.detected}</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#FFF' }}>3 Alerts</div>
        </div>

        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderTop: '4px solid var(--neon-purple)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>2. {text.analyzed}</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#FFF' }}>2 Solved</div>
        </div>

        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderTop: '4px solid var(--neon-gold)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>3. {text.priority}</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#FFF' }}>P1 HIGH</div>
        </div>

        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderTop: '4px solid var(--neon-emerald)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>4. ACTION STATUS</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#FFF' }}>2 Directives</div>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', marginBottom: '24px' }}>
        
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieIcon size={16} style={{ color: 'var(--neon-rose)' }} /> Incident Priority Share (Pie Chart)
          </h3>
          <div style={{ width: '100%', height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={priorityPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4}>
                  {priorityPieData.map((entry, index) => (
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
            <BarChart2 size={16} style={{ color: 'var(--neon-cyan)' }} /> Average Action SLA Time (Hours)
          </h3>
          <div style={{ width: '100%', height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={slaBarData}>
                <XAxis dataKey="area" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                <Bar dataKey="slaHours" fill="#00F0FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* INCIDENT CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {incidents.map((inc) => (
          <div key={inc.id} className="glass-panel" style={{ padding: '24px', borderLeft: `4px solid ${inc.severity === 'High' ? 'var(--neon-rose)' : 'var(--neon-gold)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{inc.id} • {inc.detected_at}</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#FFF', margin: '4px 0' }}>{inc.problem}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--neon-cyan)', fontWeight: '700' }}>Area: {inc.location}</div>
              </div>

              <span style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '800',
                background: inc.severity === 'High' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                color: inc.severity === 'High' ? 'var(--neon-rose)' : 'var(--neon-gold)',
                border: `1px solid ${inc.severity === 'High' ? 'var(--neon-rose)' : 'var(--neon-gold)'}`
              }}>
                {inc.severity} Priority
              </span>
            </div>

            <div style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid var(--border-cyan)', padding: '16px', borderRadius: '8px', marginTop: '12px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--neon-cyan)', marginBottom: '4px', textTransform: 'uppercase' }}>
                {text.recommendation}
              </div>
              <p style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: '700' }}>
                {inc.recommendation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
