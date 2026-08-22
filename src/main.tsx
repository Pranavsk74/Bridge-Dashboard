import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          backgroundColor: '#2f2116',
          color: '#ffebd0',
          padding: '40px',
          fontFamily: 'monospace',
          minHeight: '100vh',
          boxSizing: 'border-box'
        }}>
          <h1 style={{ color: '#fee197', fontSize: '24px', marginBottom: '16px' }}>
            BRIDGE//SENSE — APPLICATION ERROR BOUNDARY
          </h1>
          <p style={{ color: '#b8755b', fontSize: '16px', fontWeight: 'bold' }}>
            {this.state.error && this.state.error.toString()}
          </p>
          <pre style={{
            backgroundColor: '#000000',
            padding: '20px',
            overflow: 'auto',
            border: '1px solid #4f3622',
            color: '#ffebd0',
            marginTop: '20px'
          }}>
            {this.state.errorInfo?.componentStack || this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
