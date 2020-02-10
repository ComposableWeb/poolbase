import * as React from 'react';
import { NextPage } from 'next';
import withAuthUser from '../utils/pageWrappers/withAuthUser';

import firebase from 'firebase/app';
import PageLayout from '../components/PageLayout';
import { PropsWithAuthUserInfo } from '../interfaces';
import initFirebase from '../utils/auth/initFirebase';
initFirebase();

interface HomePageProps extends PropsWithAuthUserInfo {
  data: Datum[];
}

interface Datum {
  id: string;
  title: string;
}

const HomePage: NextPage<HomePageProps> = (props: HomePageProps): JSX.Element => {
  const { data } = props;
  return (
    <PageLayout>
      {data.map(
        (page): JSX.Element => (
          <h3 key={page.id}>{page.title}</h3>
        )
      )}
    </PageLayout>
  );
};

HomePage.getInitialProps = async (): Promise<{ data: Datum[] }> => {
  const db = firebase.firestore();
  const snapshot = await db.collection('pages').get();
  const data: Datum[] = snapshot.docs.map((doc): Datum => ({ id: doc.id, ...(doc.data() as { title: string }) }));

  return {
    data,
  };
};

export default withAuthUser(HomePage);
