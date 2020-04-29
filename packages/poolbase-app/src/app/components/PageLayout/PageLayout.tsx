/** @jsx jsx */
import { jsx } from 'theme-ui';
import { get } from 'lodash/object';
import { NextPage } from 'next';

import AppLayout from 'design-system/src/components/AppLayout';
import AppMain from 'design-system/src/components/AppMain';
import { PropsWithAuthUserInfo } from 'poolbase-common';
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo';
import Header from '../Header';
import FirebaseAuth from '../FirebaseAuth';

const PageLayout: NextPage<PropsWithAuthUserInfo> = (
  props: PropsWithAuthUserInfo & { children: JSX.Element }
): JSX.Element => {
  const { AuthUserInfo, children } = props;
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

  return (
    <>
      {!AuthUser ? (
        <AppMain>
          <p>Sign in</p>
          <div>
            <FirebaseAuth />
          </div>
        </AppMain>
      ) : (
        <AppLayout>
          <Header AuthUser={AuthUser} />
          <AppMain>{children}</AppMain>
        </AppLayout>
      )}
    </>
  );
};

export default withAuthUserInfo(PageLayout);
