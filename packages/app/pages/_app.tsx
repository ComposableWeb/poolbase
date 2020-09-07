import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'theme-ui';

import { poolbaseTheme } from '@poolbase/design-system/src/theme';
import I18n from 'lib/i18n';
import '@poolbase/common/src/logger';
import { UserContext, useAuthUserProfile } from 'hooks';
import PageLayout from 'components/PageLayout';

export const App: React.FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;
  const [user, loading, error] = useAuthUserProfile();

  return (
    <ThemeProvider theme={poolbaseTheme}>
      <Head>
        <title>Poolbase</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="viewport" content="uc-fitscreen=yes" />
      </Head>
      <I18n lngDict={pageProps.lngDict} locale={pageProps.lng}>
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {!loading && !error && (
          <UserContext.Provider value={{ user }}>
            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>
          </UserContext.Provider>
        )}
      </I18n>
    </ThemeProvider>
  );
};

export default App;
