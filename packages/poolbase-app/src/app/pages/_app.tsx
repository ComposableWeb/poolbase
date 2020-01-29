import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'theme-ui';

import Header from '../components/Header';
import theme from '../theme';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    );
  }
}

export default MyApp;
