import { Component, ReactNode } from 'react';

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
      return <h1>Rick messed up, try later</h1>;
    }
    return children;
  }
}

export default ErrorBoundary;
