/** @jsx jsx */
import { jsx, Label, Input } from 'theme-ui';
import Form from '../Form'
import { useRouter } from 'next/router';
import * as z from 'zod';
import { api } from '@poolbase/common';

export const AddUrlForm: React.FC = () => {
  const router = useRouter();
  const onSubmit = async (data): Promise<void> => {
    try {
      await api.addURL(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={onSubmit} schema={z.string()} submitText="Add">
      <Label htmlFor="url">URL</Label>
      <Input name="url" defaultValue={router.query.url ? router.query.url : ''} required />
    </Form>
  );
};
