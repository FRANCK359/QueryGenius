import React from 'react';
import AIBadge from './AIBadge';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    // Vous pourriez envoyer cette erreur à un service de suivi comme Sentry
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>
            Oups ! Quelque chose s'est mal passé <AIBadge small />
          </h2>
          <p>
            Notre IA a rencontré une erreur inattendue. Veuillez rafraîchir la page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="reload-button"
          >
            Rafraîchir la page
          </button>
          <div className="error-details">
            <details>
              <summary>Détails techniques</summary>
              <pre>{this.state.error.toString()}</pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
