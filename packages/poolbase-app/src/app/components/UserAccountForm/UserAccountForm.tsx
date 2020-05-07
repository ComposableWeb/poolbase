/** @jsx jsx */
import { jsx, Label, Input } from 'theme-ui';
import { useForm } from 'react-hook-form';

import { UserAccountData, api } from '@poolbase/common';
import { Form, SubmitButton } from '@poolbase/design-system';

export interface UserAccountProps {
  account: UserAccountData | {};
}
export const UserAccountForm: React.FC<UserAccountProps> = (props: UserAccountProps) => {
  const { register, handleSubmit, formState } = useForm({ defaultValues: props.account });
  const onSubmit = async (data): Promise<void> => {
    try {
      await api.updateUserProfile(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="name">Name</Label>
      <Input name="name" mb={3} ref={register} />
      <Label htmlFor="email">Email</Label>
      <Input name="email" mb={3} disabled={true} ref={register} />
      <SubmitButton {...formState}>Save</SubmitButton>
    </Form>
  );
};
export default UserAccountForm;
