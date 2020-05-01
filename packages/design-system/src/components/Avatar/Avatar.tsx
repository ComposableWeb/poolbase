/** @jsx jsx */
import { jsx, Box, Avatar as TUIAvatar } from 'theme-ui';

import { UserProfileData } from '@poolbase/common';

export const Avatar: React.FC<{ user: UserProfileData }> = ({ user }: { user: UserProfileData }) => {
  if (user.photoURL) {
    return <TUIAvatar src={user.photoURL} />;
  }

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
      {!!user.displayName && user.displayName.split(' ').reduce((acc, name) => acc + name[0], '')}
    </Box>
  );
};
export default Avatar;
