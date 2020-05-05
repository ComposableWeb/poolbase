/** @jsx jsx */
import { jsx, Box, Avatar as TUIAvatar } from 'theme-ui';

import { UserProfileData, UserAccountData } from '@poolbase/common';

export const Avatar: React.FC<{ user: UserProfileData | UserAccountData }> = ({
  user,
}: {
  user: UserProfileData | UserAccountData;
}) => {
  if (user.photoURL) {
    return <TUIAvatar src={user.photoURL} />;
  }
  const name = (user as UserProfileData).displayName || (user as UserAccountData).name;
  return (
    <Box
      bg="primary"
      color="white"
      sx={{
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!!name && name.split(' ').reduce((acc, name) => acc + name[0], '')}
    </Box>
  );
};
export default Avatar;
