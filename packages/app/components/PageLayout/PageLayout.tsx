/** @jsx jsx */
import { jsx } from 'theme-ui';
import Head from 'next/head';
import { NextPage } from 'next';

import AppLayout from '@poolbase/design-system/src/components/AppLayout';
import AppMain from '@poolbase/design-system/src/components/AppMain';
import Header from '../Header';
import FirebaseAuth from '../FirebaseAuth';
import { useSession, useI18n } from 'hooks';
import { contentLanguageMap } from 'lib/i18n';

const PageLayout: NextPage = (props: React.PropsWithChildren<{}>): JSX.Element => {
  const { children } = props;
  const user = useSession();
  console.log(user)
  const i18n = useI18n();
  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content={contentLanguageMap[i18n.activeLocale]} />
      </Head>
      {!user ? (
        <AppMain>
          <p>{i18n.t('signIn')}</p>
          <div>
            <FirebaseAuth />
          </div>
        </AppMain>
      ) : (
        <AppLayout>
          <Header />
          <AppMain>{children}</AppMain>
        </AppLayout>
      )}
    </>
  );
};

export default PageLayout;
