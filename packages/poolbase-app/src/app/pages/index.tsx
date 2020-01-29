import * as React from 'react';
import { NextPage } from 'next';
import { Styled } from 'theme-ui';
import { get } from 'lodash/object';
import Link from 'next/link';
import Router from 'next/router';
import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import logout from '../utils/auth/logout';
import {PropsWithAuthUserInfo} from '../interfaces'
import firebase from 'firebase/app';

import initFirebase from '../utils/auth/initFirebase';
initFirebase();

type HomePageProps = PropsWithAuthUserInfo & {
  data: any;
};

const HomePage = (props: HomePageProps) => {
  const { AuthUserInfo, data } = props;
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);
  return (
    <div>
      <Styled.h1>Welcome</Styled.h1>
      {!AuthUser ? (
        <p>
          You are not signed in.{' '}
          <Link href={'/auth'}>
            <a>Sign in</a>
          </Link>
        </p>
      ) : (
        <div>
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
                Router.push('/auth');
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Log out
          </p>
          <div>
            {data.map(page => (
              <h3 key={page.id}>{page.title}</h3>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


HomePage.getInitialProps = async ctx => {
  // Get the AuthUserInfo object. This is set in `withAuthUser.js`.
  // The AuthUserInfo object is available on both the server and client.
  const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null);
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

  // You can also get the token (e.g., to authorize a request when fetching data)
  // const AuthUserToken = get(AuthUserInfo, 'token', null)

  const db = firebase.firestore();
  const snapshot = await db.collection('pages').get();
  const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

  return {
    data,
  };
};


HomePage.defaultProps = {
  AuthUserInfo: null,
};

export default withAuthUser(withAuthUserInfo(HomePage));
