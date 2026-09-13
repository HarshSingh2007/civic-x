import React from 'react';
import { ShieldAlert } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught Exception:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '48px', margin: '32px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--accent-red)', borderRadius: '12px', textAlign: 'center' }}>
          <ShieldAlert size={48} style={{ color: 'var(--accent-red)', margin: '0 auto 16px' }} />
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Interface Module Error Handled</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 20px' }}>
            CIVIC X intercepted an unexpected rendering error. The application remains operational.
          </p>
          <button 
            className="btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload Module
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
