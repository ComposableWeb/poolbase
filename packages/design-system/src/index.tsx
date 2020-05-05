import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './utils/logger';

import { ThemeProvider } from 'theme-ui';
import { poolbaseTheme } from './theme';

console.info('Poolbase Design-System');

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={poolbaseTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// export all the components

export * from './theme';
export * from './components/AppBar';
export * from './components/AppLayout';
export * from './components/AppMain';
export * from './components/Avatar';
export * from './components/Form';
export * from './components/ListItem';
export * from './components/NavIconButton';
