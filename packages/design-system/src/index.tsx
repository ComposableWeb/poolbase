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

