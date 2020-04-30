/** @jsx jsx */
import { jsx } from 'theme-ui';
import { NextPage } from 'next';
import { useCollection } from 'react-firebase-hooks/firestore';

import { ListItem } from '@poolbase/design-system/src/components/ListItem';
import { PageData } from '@poolbase/common';

import PageLayout from '../components/PageLayout';
import { firestore } from '../utils/initFirebase';
import { AddUrlForm } from '../components/AddUrlForm';

const AddUrlPage: NextPage = () => {
  const query = firestore.collection('pages').orderBy('created', 'desc').limit(3);
  const [data, loading, error] = useCollection(query);

  return (
    <PageLayout>
      <AddUrlForm />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {data && data.docs.map((page): JSX.Element => <ListItem key={page.id} data={page.data() as PageData} />)}
    </PageLayout>
  );
};

export default AddUrlPage;
