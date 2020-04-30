/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NextPage } from 'next';
import { auth } from '../../utils/initFirebase';

import AppLayout from '@poolbase/design-system/src/components/AppLayout';
import AppMain from '@poolbase/design-system/src/components/AppMain';
import Header from '../Header';
import FirebaseAuth from '../FirebaseAuth';

const PageLayout: NextPage = (props: React.PropsWithChildren<{}>): JSX.Element => {
  const { children } = props;
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <AppMain>loading...</AppMain>;
  }
  if (error) {
    return <AppMain>{error.message}</AppMain>;
  }
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
