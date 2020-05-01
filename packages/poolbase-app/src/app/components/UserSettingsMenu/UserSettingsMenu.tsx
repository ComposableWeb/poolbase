/** @jsx jsx */
import { jsx } from 'theme-ui';

import Avatar from '@poolbase/design-system/src/components/Avatar';

import { useAuthUserProfile } from '../../hooks';

export const UserSettingsMenu: React.FC = () => {
  const [userProfile] = useAuthUserProfile();
  return <>{userProfile ? <Avatar user={userProfile} /> : null}</>;
};
export default UserSettingsMenu;
