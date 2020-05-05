/** @jsx jsx */
import { jsx, Box } from 'theme-ui';

import { UserProfileData } from '@poolbase/common';

export interface UserProfileProps {
  profile: UserProfileData;
}
export const UserProfile: React.FC = (props: React.PropsWithChildren<UserProfileProps>) => {
  return <Box {...props} />;
};
export default UserProfile;
