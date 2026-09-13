import React, { useState } from 'react';
import SourceTag from '../components/Layout/SourceTag';
import { Share2, ArrowRight, Info, CheckCircle2, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { t } from '../utils/translations';

export default function CivicChainReaction({ lang = 'en' }) {
  const text = t[lang] || t.en;

  const nodes = [
    {
      id: 'node-1',
      title: '1. Garbage Truck Pickup Drop',
      category: 'Initial Problem',
      indicator: 'Truck Pickup Rate (-15%)',
      source: 'MoHUA Smart Cities Feed',
      confidence: '92%',
      explanation: 'Garbage trucks delayed at municipal processing hub.'
    },
    {
      id: 'node-2',
      title: '2. Garbage Accumulation on Streets',
      category: 'Secondary Effect',
      indicator: 'Street Garbage Reports (+28%)',
      source: 'City Complaint Portal',
      confidence: '88%',
      explanation: 'Uncollected waste builds up in residential wards within 18 hours.'
    },
    {
      id: 'node-3',
      title: '3. Local Air Pollution Increase',
      category: 'Environmental Effect',
      indicator: 'Particulate Rise (+12%)',
      source: 'CPCB Local Air Sensors',
      confidence: '84%',
      explanation: 'Waste decomposition causes smell and localized air quality reduction.'
    },
    {
      id: 'node-4',
      title: '4. Public Complaint Calls Surge',
      category: 'Public Response',
      indicator: 'Helpline Call Density (+35%)',
      source: 'Command Center (ICCC)',
      confidence: '90%',
      explanation: 'Citizens file mobile app complaints about roadside waste.'
    }
  ];

  const [selectedNode, setSelectedNode] = useState(nodes[0]);

  const cascadePieData = [
    { name: 'Sanitation Impact', value: 40, color: '#FF7722' },
    { name: 'Air Quality Impact', value: 30, color: '#F59E0B' },
    { name: 'Public Grievance', value: 30, color: '#00F0FF' }
  ];

  const levelBarData = nodes.map((n, i) => ({
    step: `Step 0${i + 1}`,
    confidence: parseInt(n.confidence)
  }));

  return (
    <div className="page-container">
      <div className="page-title-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">
              <Share2 style={{ color: 'var(--neon-cyan)' }} />
              <span className="gradient-text-saffron">{text.p9_title}</span>
            </h1>
            <p className="page-subtitle">{text.p9_sub}</p>
          </div>
          <SourceTag type="ANALYTICAL" text="CIVIC CASCADE MODEL" />
        </div>
      </div>

      {/* CHARTS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', marginBottom: '24px' }}>
        
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieIcon size={16} style={{ color: 'var(--neon-saffron)' }} /> Cascade Domain Impact (Pie Chart)
          </h3>
          <div style={{ width: '100%', height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={cascadePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4}>
                  {cascadePieData.map((entry, index) => (
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
            <BarChart2 size={16} style={{ color: 'var(--neon-cyan)' }} /> Chain Step Confidence Score (%)
          </h3>
          <div style={{ width: '100%', height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={levelBarData}>
                <XAxis dataKey="step" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                <Bar dataKey="confidence" fill="#FF7722" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* NODE INTERACTIVE CHAIN & INSPECTOR */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#FFF', marginBottom: '20px' }}>
            Interactive Problem Chain (Click any step to inspect details)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {nodes.map((node, index) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    onClick={() => setSelectedNode(node)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isSelected ? 'var(--neon-cyan)' : 'var(--border-cyan)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: isSelected ? 'var(--glow-cyan)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: isSelected ? 'var(--neon-cyan)' : 'var(--text-muted)', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                        {node.category}
                      </span>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFF', marginTop: '2px' }}>{node.title}</h4>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--neon-gold)', fontWeight: '700' }}>{node.indicator}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Confidence: {node.confidence}</div>
                    </div>
                  </div>

                  {index < nodes.length - 1 && (
                    <div style={{ height: '20px', width: '2px', background: 'var(--neon-saffron)', margin: '4px 0', opacity: 0.8 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details */}
        <div className="glass-panel glass-panel-saffron" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--neon-saffron)', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{text.node_inspector}</div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#FFF', margin: '4px 0 12px' }}>{selectedNode.title}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PROBLEM EXPLANATION</div>
              <div style={{ color: '#FFF', marginTop: '4px', fontWeight: '600' }}>{selectedNode.explanation}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SUPPORTING MEASUREMENT</div>
              <div style={{ color: 'var(--neon-cyan)', fontWeight: '800', marginTop: '4px' }}>{selectedNode.indicator}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>VERIFIED DATA SOURCE</div>
              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{selectedNode.source}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
