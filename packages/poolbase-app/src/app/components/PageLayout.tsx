import React, { Props } from 'react';
import { get } from 'lodash/object';
import Link from 'next/link';
import { Styled } from 'theme-ui';


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
          <Header authUser={AuthUser} />
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default withAuthUserInfo(PageLayout);
