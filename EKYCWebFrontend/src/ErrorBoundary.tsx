import React from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  message?: string;
};

// PUBLIC_INTERFACE
export default class ErrorBoundary extends React.Component<Props, State> {
  /** Error boundary to catch runtime exceptions and display a friendly message. */
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: undefined };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error?.message || 'Unexpected error' };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{ padding: 24, color: 'white', background: '#b00020' }}>
          <h2>Something went wrong.</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.message}</pre>
          <p>Check the console for more details.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
