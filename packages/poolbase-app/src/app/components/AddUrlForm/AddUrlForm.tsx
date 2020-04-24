/** @jsx jsx */
import { jsx, Label, Input, Button } from 'theme-ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { functions } from '../../utils/auth/initFirebase';

export const AddUrlForm = () => {
  const router = useRouter();
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3 className="error">{error}</h3> : null}
      <Label htmlFor="url">URL</Label>
      <Input name="url" defaultValue={router.query.url ? router.query.url : ''} required ref={register} />
      <Button disabled={loading}>{loading ? 'Loading...' : 'Add URL'}</Button>
    </form>
  );
};
