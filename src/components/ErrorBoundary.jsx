import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("[Echoes] ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="h-screen w-full bg-[#F5F5F7] flex flex-col items-center justify-center p-8 text-[#2C2C2C]"
          role="alert"
          aria-live="assertive"
        >
          <img
            src="./error.png"
            alt="error"
            className="w-24 h-24 mb-6 object-contain"
          />
          <h1 className="text-2xl font-bold mb-2 text-center">
            Something went wrong
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
            This might be caused by character settings or configuration. Please try to reset or reload.
          </p>
          {this.state.error && (
            <details className="mb-6 p-4 bg-gray-100 rounded-xl text-left w-full max-w-lg">
              <summary className="text-xs font-bold text-gray-500 cursor-pointer mb-2">
                Error details (click to expand)
              </summary>
              <pre className="text-xs text-red-600 overflow-auto whitespace-pre-wrap">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
          <div className="flex gap-3">
            <button
              onClick={this.handleReset}
              className="px-8 py-3 bg-[#2C2C2C] text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
