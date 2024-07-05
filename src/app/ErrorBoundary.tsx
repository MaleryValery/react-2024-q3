import { Component, ReactNode } from 'react';
import ErrorElement from '../shared/ui/ErrorElement';

type ErrorState = {
  isError: boolean;
};
type ErrorProps = {
  children?: ReactNode;
};

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { isError: false };
  }

  static getDerivedStateFromError(): ErrorState {
    return { isError: true };
  }

  render() {
    const { children } = this.props;
    const { isError } = this.state;
    if (isError) {
      return <ErrorElement />;
    }
    return children;
  }
}

export default ErrorBoundary;
