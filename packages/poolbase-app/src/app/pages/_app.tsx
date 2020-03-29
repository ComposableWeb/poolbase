import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'theme-ui';

import theme from '../../../design-system/theme';

class MyApp extends App {
  public render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default MyApp;
