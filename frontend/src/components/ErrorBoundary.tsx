import React from 'react';

export default class ErrorBoundary extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }
  // @ts-ignore
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    // @ts-ignore
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.errorInfo) {
      // Error path
      return (
        <div
          style={{
            background: '#000',
            width: '100%',
            backgroundSize: 'cover',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div style={{ width: '20em' }}>
            <h2>Something went wrong :(</h2>
            <button
              onClick={() => (window.location.href = window.location.origin)}
              style={{
                marginTop: '2em',
                height: '44px',
                borderRadius: '6px',
                background: '#e65100',
                width: '100%',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    // Normally, just render children
    // eslint-disable-next-line react/destructuring-assignment
    // @ts-ignore
    return <>{this.props.children}</>;
  }
}
