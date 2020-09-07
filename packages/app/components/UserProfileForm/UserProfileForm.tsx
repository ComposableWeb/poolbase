/** @jsx jsx */
import { jsx, Box, Label, Input, Checkbox } from 'theme-ui';
import Form from '../Form'

import { UserProfileData, UserProfileSchema, api } from '@poolbase/common';

export interface UserProfileProps {
  profile: UserProfileData | {};
  onSuccess?: () => void
}
export const UserProfileForm: React.FC<UserProfileProps> = (props: UserProfileProps) => {
  const onSubmit = async (data): Promise<void> => {
    try {
      console.log(data);
      await api.saveUserProfile(data);
      props.onSuccess && props.onSuccess();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={onSubmit} schema={UserProfileSchema} initialValues={props.profile} submitText="Save">
      <Label htmlFor="displayName">Name</Label>
      <Input name="displayName" mb={3} />
      <Label htmlFor="email">Email</Label>
      <Input name="email" mb={3} />
      <Box>
        <Label mb={3}>
          <Checkbox name="isEmailPublic" />
          Show email on profile
        </Label>
      </Box>
      <Label htmlFor="twitter">Twitter Username</Label>
      <Input name="twitter" mb={3} />
      <Label htmlFor="github">Github Username</Label>
      <Input name="github" mb={3} />
    </Form>
  );
};
export default UserProfileForm;
