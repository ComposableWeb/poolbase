import React, { Props } from 'react';
import { get } from 'lodash/object';
import Link from 'next/link';
import Router from 'next/router';
import { Styled } from 'theme-ui';

import logout from '../utils/auth/logout';
import { PropsWithAuthUserInfo } from '../interfaces';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import Header from './Header';
import FirebaseAuth from './FirebaseAuth';

const PageLayout: React.FC<PropsWithAuthUserInfo> = props => {
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
          <Header />
          <p>You're signed in. Email: {AuthUser.email}</p>
          <p
            style={{
              display: 'inlinelock',
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={async () => {
              try {
                await logout();
                Router.push('/')
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Log out
          </p>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default withAuthUserInfo(PageLayout);
