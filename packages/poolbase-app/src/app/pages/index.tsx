/** @jsx jsx */
import { jsx } from 'theme-ui';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';

import { withTranslation } from '../../functions/handlers/i18n';
import { firestore, collectionData } from '../utils/initFirebase';
import { ListItem } from '@poolbase/design-system/src/components/ListItem';

import PageLayout from '../components/PageLayout';

interface HomePageProps {
  t?: (key: string) => string;
  namespacesRequired: string[];
}

const HomePage: NextPage<HomePageProps> = ({ t }: HomePageProps) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const query = firestore.collection('pages').orderBy('created', 'desc').limit(3);
    const subscription = collectionData(query, 'id').subscribe(setData);

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

export default withTranslation('common')(HomePage as any);
