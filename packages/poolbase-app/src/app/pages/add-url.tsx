/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { useState, useEffect } from 'react';
import { NextPage } from 'next';

import PageLayout from '../components/PageLayout';
import { firestore, collectionData } from '../utils/initFirebase';
import { AddUrlForm } from '../components/AddUrlForm';

const AddUrlPage: NextPage = () => {
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
      <AddUrlForm />
      {data.map(
        (page): JSX.Element => (
          <>
            <Styled.h3 key={page.id}>{!page.metaTitle ? page.url : page.metaTitle}</Styled.h3>
          </>
        )
      )}
    </PageLayout>
  );
};

export default AddUrlPage;
