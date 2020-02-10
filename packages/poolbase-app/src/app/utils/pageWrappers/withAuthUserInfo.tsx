/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { get } from 'lodash/object';
import { AuthUserInfoContext } from '../auth/hooks';
import { PropsWithAuthUserInfo } from '../../interfaces';

// Provides an AuthUserInfo prop to the composed component.
export default (ComposedComponent): NextPage<PropsWithAuthUserInfo> => {
  const WithAuthUserInfoComp: NextPage<PropsWithAuthUserInfo> = (props: PropsWithAuthUserInfo): JSX.Element => {
    const { AuthUserInfo: AuthUserInfoFromSession, ...otherProps } = props;
    return (
      <AuthUserInfoContext.Consumer>
        {(AuthUserInfo): JSX.Element => (
          <ComposedComponent {...otherProps} AuthUserInfo={AuthUserInfo || AuthUserInfoFromSession} />
        )}
      </AuthUserInfoContext.Consumer>
    );
  };

  WithAuthUserInfoComp.getInitialProps = async (ctx: NextPageContext): Promise<PropsWithAuthUserInfo> => {
    const AuthUserInfo = get(ctx, 'poolbase.AuthUserInfo', null);

    // Evaluate the composed component's getInitialProps().
    let composedInitialProps = {};
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx);
    }

    return {
      ...composedInitialProps,
      AuthUserInfo,
    };
  };

  WithAuthUserInfoComp.displayName = `WithAuthUserInfo(${ComposedComponent.displayName})`;

  return WithAuthUserInfoComp;
};
