import React, { Component } from 'react';
import { ThemeProvider } from 'theme-ui';
import { poolbaseTheme } from '../theme';

export default class ThemeWrapper extends Component {
  render() {
    return <ThemeProvider theme={poolbaseTheme}>{this.props.children}</ThemeProvider>;
  }
}
