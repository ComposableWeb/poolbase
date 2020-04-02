import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ThemeProvider } from 'theme-ui';
import { poolbaseTheme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={poolbaseTheme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

