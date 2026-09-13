import React from 'react';
import { Loader2, AlertTriangle, Inbox } from 'lucide-react';

export default function DataStateIndicator({ loading, error, empty, emptyMessage, children }) {
  if (loading) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <Loader2 size={32} className="spin-icon" style={{ animation: 'spin 1s linear infinite', color: 'var(--accent-cyan)' }} />
        <p style={{ marginTop: '12px', fontSize: '0.9rem' }}>Fetching verified government data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
        <AlertTriangle size={32} style={{ color: 'var(--accent-red)' }} />
        <h4 style={{ marginTop: '12px', color: 'var(--text-primary)', fontSize: '1rem' }}>Government Source Temporarily Unavailable</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
          {typeof error === 'string' ? error : "The underlying government dataset or API endpoint could not be reached at this moment."}
        </p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <Inbox size={32} />
        <p style={{ marginTop: '12px', fontSize: '0.9rem' }}>{emptyMessage || "No verified government data available for this region."}</p>
      </div>
    );
  }

  return children;
}
