import * as React from 'react';
import { get } from 'lodash/object';
import { NextPage } from 'next';
import { PropsWithAuthUserInfo } from '../interfaces';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import Header from './Header';
import FirebaseAuth from './FirebaseAuth';

const PageLayout: NextPage<PropsWithAuthUserInfo> = (
  props: PropsWithAuthUserInfo & { children: JSX.Element }
): JSX.Element => {
  const { AuthUserInfo, children } = props;
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);
  return (
    <div>
      {!AuthUser ? (
        <div>
          <p>Sign in</p>
          <div>
            <FirebaseAuth />
          </div>
        </div>
      ) : (
        <div>
          <Header AuthUser={AuthUser} />
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default withAuthUserInfo(PageLayout);
