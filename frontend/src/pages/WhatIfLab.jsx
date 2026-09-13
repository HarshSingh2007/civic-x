import React, { useState } from 'react';
import SourceTag from '../components/Layout/SourceTag';
import { api } from '../services/api';
import { Sliders, AlertTriangle, Play, RotateCcw, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function WhatIfLab() {
  const [wasteDelta, setWasteDelta] = useState(-15);
  const [transitDelta, setTransitDelta] = useState(10);
  const [airDelta, setAirDelta] = useState(5);
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRunSimulation = () => {
    setLoading(true);
    api.runSimulation({
      waste_efficiency_delta_pct: parseFloat(wasteDelta),
      public_transit_delta_pct: parseFloat(transitDelta),
      air_quality_delta_pct: parseFloat(airDelta),
      population_density_growth_pct: 2.5
    }).then((res) => {
      if (res && res.success) {
        setSimulationResult(res.data);
      }
      setLoading(false);
    });
  };

  const chartData = simulationResult ? [
    { metric: 'Civic Risk Score', Baseline: simulationResult.baseline.civic_risk_score, Simulated: simulationResult.simulated_outcome.civic_risk_score },
    { metric: 'Health Cost Index', Baseline: simulationResult.baseline.health_cost_index, Simulated: simulationResult.simulated_outcome.health_cost_index },
    { metric: 'Citizen Sat (%)', Baseline: simulationResult.baseline.citizen_satisfaction_pct, Simulated: simulationResult.simulated_outcome.citizen_satisfaction_pct }
  ] : [];

  return (
    <div className="page-container">
      <div className="page-title-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">
              <Sliders style={{ color: 'var(--neon-saffron)' }} />
              <span className="gradient-text-saffron">07 — WHAT-IF SIMULATION LAB</span>
            </h1>
            <p className="page-subtitle">Interactive Policy Variable Slider & Downstream Trade-Off Modeling Engine</p>
          </div>
          <SourceTag type="SIMULATED" text="MODEL SIMULATION ENGINE" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
        
        {/* LEFT: Policy Controls Panel */}
        <div className="glass-panel glass-panel-saffron" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFF', marginBottom: '20px' }}>
            Hypothetical Policy Variables
          </h3>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Waste Collection Efficiency Shift</span>
              <strong style={{ color: wasteDelta < 0 ? 'var(--neon-rose)' : 'var(--neon-emerald)' }}>
                {wasteDelta > 0 ? `+${wasteDelta}%` : `${wasteDelta}%`}
              </strong>
            </div>
            <input
              type="range"
              min="-40"
              max="30"
              value={wasteDelta}
              onChange={(e) => setWasteDelta(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--neon-saffron)' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Public Transit Expansion</span>
              <strong style={{ color: transitDelta > 0 ? 'var(--neon-emerald)' : 'var(--neon-rose)' }}>
                {transitDelta > 0 ? `+${transitDelta}%` : `${transitDelta}%`}
              </strong>
            </div>
            <input
              type="range"
              min="-20"
              max="40"
              value={transitDelta}
              onChange={(e) => setTransitDelta(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--neon-cyan)' }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Environmental Pollution Shift</span>
              <strong style={{ color: airDelta > 0 ? 'var(--neon-rose)' : 'var(--neon-emerald)' }}>
                {airDelta > 0 ? `+${airDelta}% (Worse)` : `${airDelta}% (Better)`}
              </strong>
            </div>
            <input
              type="range"
              min="-30"
              max="50"
              value={airDelta}
              onChange={(e) => setAirDelta(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--neon-gold)' }}
            />
          </div>

          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={handleRunSimulation}
            disabled={loading}
          >
            <Play size={16} /> {loading ? 'Running Model...' : 'Execute What-If Simulation'}
          </button>
        </div>

        {/* RIGHT: Simulation Results & Dynamic Bar Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {simulationResult ? (
            <div className="glass-panel" style={{ padding: '24px', borderColor: 'var(--neon-gold)' }}>
              
              {/* Mandatory Simulation Warning */}
              <div style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid var(--neon-gold)',
                color: 'var(--neon-gold)',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <AlertTriangle size={18} />
                <span>{simulationResult.disclaimer}</span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF', marginBottom: '16px' }}>
                Simulated Downstream Outcome Comparison
              </h3>

              {/* Dynamic Recharts Bar Comparison */}
              <div style={{ width: '100%', height: '220px', marginBottom: '20px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="metric" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                    <Bar dataKey="Baseline" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Simulated" fill="#FF7722" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-cyan)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--neon-cyan)', marginBottom: '4px' }}>Model Inference & Trade-Off Summary</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  {simulationResult.analytical_insight}
                </p>
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
              <Sliders size={44} style={{ color: 'var(--neon-saffron)', margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '8px' }}>What-If Policy Lab Ready</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto' }}>
                Adjust policy sliders on the left and click "Execute What-If Simulation" to generate dynamic comparison graphs.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
