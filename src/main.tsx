import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/App.tsx';
import ContextThemeProvider from './app/context/ContextThemeProvider.tsx';
import ErrorBoundary from './app/ErrorBoundary.tsx';
import store from './app/redux/store.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ContextThemeProvider>
          <App />
        </ContextThemeProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
