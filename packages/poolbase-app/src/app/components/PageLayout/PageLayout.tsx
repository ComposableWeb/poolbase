/** @jsx jsx */
import { jsx } from 'theme-ui';

import { NextPage } from 'next';

import AppLayout from '@poolbase/design-system/src/components/AppLayout';
import AppMain from '@poolbase/design-system/src/components/AppMain';
import Header from '../Header';
import FirebaseAuth from '../FirebaseAuth';
import { useSession } from '../../hooks';

const PageLayout: NextPage = (props: React.PropsWithChildren<{}>): JSX.Element => {
  const { children } = props;
  const user = useSession();
  return (
    <>
      {!user ? (
        <AppMain>
          <p>Sign in</p>
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
