import * as React from 'react';
import { NextPage } from 'next';
import { get } from 'lodash/object';
import withAuthUser from '../utils/pageWrappers/withAuthUser';

import firebase from 'firebase/app';
import PageLayout from '../components/PageLayout'
import initFirebase from '../utils/auth/initFirebase';
initFirebase();

type HomePageProps = {
  data: any;
};

const HomePage = (props: HomePageProps) => {
  const { data } = props;
  return (
    <PageLayout>
      {data.map(page => (<h3 key={page.id}>{page.title}</h3>
      ))}
    </PageLayout>
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

export default withAuthUser(HomePage);
