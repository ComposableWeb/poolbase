import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'theme-ui';
import '../utils/logger';
import { poolbaseTheme } from 'design-system/src/theme';

class MyApp extends App {
  public render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={poolbaseTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default MyApp;
