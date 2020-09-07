/** @jsx jsx */
import { jsx, Label, Input } from 'theme-ui';
import Form from '../Form'
import { UserAccountData, UserAccountSchema, api } from '@poolbase/common';


export interface UserAccountProps {
  account: UserAccountData | {};
  onSuccess?: () => void
}
export const UserAccountForm: React.FC<UserAccountProps> = (props: UserAccountProps) => {
  const onSubmit = async (data): Promise<void> => {
    try {
        await api.saveUserAccount(data);
        props.onSuccess && props.onSuccess();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={onSubmit} schema={UserAccountSchema} initialValues={props.account} submitText="Save">
      <Label htmlFor="name">Name</Label>
      <Input name="name" mb={3} />
      <Label htmlFor="email">Email</Label>
      <Input name="email" mb={3} disabled={true} />
    </Form>
  );
};
export default UserAccountForm;
