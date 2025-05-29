import React from 'react';

// ErrorBoundary – fångar fel i React-komponentträdet och visar ett användarvänligt felmeddelande.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

   //Metod som körs när ett fel fångas i barnkomponenter
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  //Används för att logga eller hantera felet (t.ex. skicka till en loggtjänst)
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    // Om ett fel har fångats, visa ett felmeddelande till användaren
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
