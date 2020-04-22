import React from 'react';
import App from 'next/app';
import Head from 'next/head'
import { ThemeProvider } from 'theme-ui';
import '../utils/logger';
import { poolbaseTheme } from 'design-system/src/theme';

class MyApp extends App {
  public render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={poolbaseTheme}>
        <Head>
          <title>Poolbase</title>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default MyApp;
