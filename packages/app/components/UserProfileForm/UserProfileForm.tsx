/** @jsx jsx */
import { jsx, Box, Label, Input, Checkbox } from 'theme-ui';
import { useForm } from 'react-hook-form';

import { UserProfileData, UserProfileSchema, api } from '@poolbase/common';
import { Form, SubmitButton } from '@poolbase/design-system';

export interface UserProfileProps {
  profile: UserProfileData | {};
}
export const UserProfileForm: React.FC<UserProfileProps> = (props: UserProfileProps) => {
  const { register, handleSubmit, formState } = useForm({ defaultValues: props.profile });
  const onSubmit = async (data): Promise<void> => {
    try {
      console.log(data);
      // Validate
      const valid = await UserProfileSchema.isValid(data);
      if (valid) {
        await api.saveUserProfile(data);
      } else {
        UserProfileSchema.validate(data).catch(console.error);
        // @TODO: propagate error to form
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="displayName">Name</Label>
      <Input name="displayName" mb={3} ref={register} />
      <Label htmlFor="email">Email</Label>
      <Input name="email" mb={3} ref={register} />
      <Box>
        <Label mb={3}>
          <Checkbox name="isEmailPublic" ref={register} />
          Show email on profile
        </Label>
      </Box>
      <Label htmlFor="twitter">Twitter Username</Label>
      <Input name="twitter" mb={3} ref={register} />
      <Label htmlFor="github">Github Username</Label>
      <Input name="github" mb={3} ref={register} />
      <SubmitButton {...formState}>Save</SubmitButton>
    </Form>
  );
};
export default UserProfileForm;
