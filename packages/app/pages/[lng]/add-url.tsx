/** @jsx jsx */
import { jsx } from 'theme-ui';
import { NextPage } from 'next';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { ListItem } from '@poolbase/design-system/src/components/ListItem';
import { PageData, firestore } from '@poolbase/common';
import { AddUrlForm } from '~components/AddUrlForm';

const AddUrlPage: NextPage = () => {
  const query = firestore.collection('pages').orderBy('created', 'desc').limit(3);
  const [data, loading, error] = useCollectionData<PageData>(query, { idField: 'id' });

  return (
    <>
      <AddUrlForm />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {data && data.map((page): JSX.Element => <ListItem key={page.id} data={page} />)}
    </>
  );
};

export default AddUrlPage;
