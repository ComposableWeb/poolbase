/** @jsx jsx */
import { jsx } from 'theme-ui';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';

import { withTranslation } from '../../functions/handlers/i18n';
import withAuthUser from '../utils/pageWrappers/withAuthUser';
import { firestore, collectionData } from '../utils/auth/initFirebase';
import { ListItem } from 'design-system/src/components/ListItem';

import PageLayout from '../components/PageLayout';
import { PropsWithAuthUserInfo } from '../interfaces';

interface HomePageProps extends PropsWithAuthUserInfo {
  t?: (key: string) => string;
  namespacesRequired: string[];
}
declare global {
  interface Window {
    subscription: any;
  }
}

const HomePage: NextPage<HomePageProps> = ({ t }: HomePageProps) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const query = firestore.collection('pages').orderBy('created', 'desc').limit(3);
    const subscription = collectionData(query, 'id').subscribe(setData);

    window.subscription = collectionData(query, 'id');
    // Specify how to clean up after this effect:
    return function cleanup(): void {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <PageLayout>
      <h1>{t('siteTitle')}</h1>
      {data.map(
        (page): JSX.Element => (
          <ListItem key={page.id} data={page} />
        )
      )}
    </PageLayout>
  );
};
HomePage.getInitialProps = () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(withAuthUser(HomePage) as any);
