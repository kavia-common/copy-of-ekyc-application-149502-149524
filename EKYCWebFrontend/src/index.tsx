import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

// PUBLIC_INTERFACE
function bootstrap() {
  /** Entry point for React app mounting with routing context. */
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root container #root not found');
  }
  const root = createRoot(container);

  const apiBase = process.env.REACT_APP_API_BASE;
  const EnvBanner = () =>
    !apiBase ? (
      <div role="status" style={{ padding: 8, background: '#fff3cd', color: '#664d03', borderBottom: '1px solid #ffecb5' }}>
        Warning: REACT_APP_API_BASE is not set. Using defaults may break API calls.
      </div>
    ) : null;

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <EnvBanner />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

bootstrap();

export {};
