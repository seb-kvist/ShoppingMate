import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Något gick fel!</h2>
          <p>Testa ladda om sidan eller kontakta oss på ShoppingMate@mail.com</p>
          <details className="error-details">
            {this.state.error ? this.state.error.toString() : null}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
