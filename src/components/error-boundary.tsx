import { Component, type ReactNode, type ErrorInfo } from 'react';
import { ErrorState } from './state/error-state';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error details in development only
        if (import.meta.env.DEV) {
            console.error('Error Boundary caught an error:', error);
            console.error('Error Info:', errorInfo);
        }

        // Call optional error handler (for production error tracking like Sentry)
        this.props.onError?.(error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
        });
    };

    render() {
        if (this.state.hasError) {
            // Render custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <div className="h-full flex items-center justify-center">
                    <ErrorState
                        error={this.state.error || undefined}
                        title="Oops! Something went wrong"
                        description="The application encountered an unexpected error. Please try refreshing the page."
                        onRetry={this.handleReset}
                    />
                </div>
            );
        }

        return this.props.children;
    }
}

export { ErrorBoundary };
export type { ErrorBoundaryProps };
