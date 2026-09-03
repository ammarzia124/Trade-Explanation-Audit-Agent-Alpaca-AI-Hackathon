import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] items-center justify-center p-8">
          <div className="card max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-muted">
                <AlertTriangle size={32} className="text-danger" />
              </div>
            </div>
            <h2 className="section-title mb-2">Something went wrong</h2>
            <p className="text-body text-text-secondary mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button onClick={this.handleRetry} className="btn-primary">
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
