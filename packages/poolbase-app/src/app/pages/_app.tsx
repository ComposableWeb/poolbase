import React from 'react';
import App from 'next/app';
import { ThemeProvider, Styled } from 'theme-ui';

import Header from '../components/Header';
import theme from '../theme';

class MyApp extends App {

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Header />
        <Styled.root as="main">
          <Component {...pageProps} />
        </Styled.root>
      </ThemeProvider>
    );
  }
}

export default MyApp;
