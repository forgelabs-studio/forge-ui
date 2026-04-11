"use client";

import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex h-full flex-col items-center justify-center p-4">
          <h2 className="text-center text-lg font-medium">
            Error! Something went wrong.
          </h2>
          <p className="mt-2 text-sm text-[rgba(240,237,232,0.38)]">
            {this.state.error?.message}
          </p>
          <button
            onClick={this.reset}
            className="mt-4 rounded-md bg-[#7F77DD] px-4 py-2 text-sm text-white transition-colors hover:opacity-80"
          >
            Try again
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
