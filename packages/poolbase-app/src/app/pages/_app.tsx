import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'theme-ui';

import { poolbaseTheme } from '@poolbase/design-system/src/theme';

import '@poolbase/common/src/logger';
import { UserContext, useAuthUserProfile } from '../hooks';
import { appWithTranslation } from '../../functions/handlers/i18n';

export const App: React.FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;
  const [user, loading, error] = useAuthUserProfile();
  return (
    <ThemeProvider theme={poolbaseTheme}>
      <Head>
        <title>Poolbase</title>
      </Head>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!loading && !error && (
        <UserContext.Provider value={{ user }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      )}
    </ThemeProvider>
  );
};

export default appWithTranslation(App);
