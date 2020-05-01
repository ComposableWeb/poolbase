/** @jsx jsx */
import { jsx } from 'theme-ui';
import { NextPage } from 'next';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { ListItem } from '@poolbase/design-system/src/components/ListItem';
import { PageData } from '@poolbase/common';

import { withTranslation } from '../../functions/handlers/i18n';
import { firestore } from '../utils/initFirebase';
import PageLayout from '../components/PageLayout';

interface HomePageProps {
  t?: (key: string) => string;
  namespacesRequired: string[];
}

const HomePage: NextPage<HomePageProps> = ({ t }: HomePageProps) => {
  const query = firestore.collection('pages').orderBy('created', 'desc').limit(30);
  const [data, loading, error] = useCollectionData<PageData>(query, { idField: 'id' });

  return (
    <PageLayout>
      <h1>{t('siteTitle')}</h1>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {data && data.map((page): JSX.Element => <ListItem key={page.id} data={page} />)}
    </PageLayout>
  );
};
HomePage.getInitialProps = () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(HomePage as any);
