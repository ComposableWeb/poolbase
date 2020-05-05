/** @jsx jsx */
import { jsx, Label, Input } from 'theme-ui';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Form, SubmitButton } from '@poolbase/design-system/src';

import { functions } from '@poolbase/common';

export const AddUrlForm: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = async (data): Promise<void> => {
    try {
      const addURL = functions.httpsCallable('addURL');
      await addURL(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="url">URL</Label>
      <Input name="url" defaultValue={router.query.url ? router.query.url : ''} required ref={register} />
      <SubmitButton {...formState}>{formState.isSubmitting ? 'Loading...' : 'Add URL'}</SubmitButton>
    </Form>
  );
};
