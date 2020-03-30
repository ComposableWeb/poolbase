/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { NextPage } from 'next';
import withAuthUser from '../utils/pageWrappers/withAuthUser';

import PageLayout from '../components/PageLayout';
import { PropsWithAuthUserInfo } from '../interfaces';
import { firestore } from '../utils/auth/initFirebase';

interface HomePageProps extends PropsWithAuthUserInfo {
  data: Datum[];
}

interface Datum {
  id: string;
  url: string;
}

const HomePage: NextPage<HomePageProps> = (props: HomePageProps): JSX.Element => {
  const { data } = props;
  return (
    <PageLayout>
      {data.map(
        (page): JSX.Element => (
          <Styled.h3 key={page.id}>{page.url}</Styled.h3>
        )
      )}
    </PageLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/unbound-method
HomePage.getInitialProps = async (): Promise<{ data: Datum[] }> => {
  const snapshot = await firestore.collection('pages').get();
  const data: Datum[] = snapshot.docs.map((doc): Datum => ({ id: doc.id, ...(doc.data() as { url: string }) }));

  return {
    data,
  };
};

export default withAuthUser(HomePage);
