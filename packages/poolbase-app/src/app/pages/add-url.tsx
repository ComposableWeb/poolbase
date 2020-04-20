/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import withAuthUser from '../utils/pageWrappers/withAuthUser';
import PageLayout from '../components/PageLayout';
import { PropsWithAuthUserInfo } from '../interfaces';
import { firestore, collectionData, functions } from '../utils/auth/initFirebase';

interface AddUrlProps extends PropsWithAuthUserInfo {
  data: Datum[];
}

interface Datum {
  id: string;
  metaTitle: string;
}

const AddUrlPage: NextPage<{}> = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data): Promise<void> => {
    try {
      setLoading(true);
      const addURL = functions.httpsCallable('addURL');
      await addURL(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        {error ? <h3 className="error">{error}</h3> : null}
        <label htmlFor="url">URL</label>
        <input name="url" value={router.query.url ? router.query.url : ''} required ref={register} />
        <button disabled={loading}>{loading ? 'Loading...' : 'Add URL'}</button>
      </form>
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

export default withAuthUser(AddUrlPage);
