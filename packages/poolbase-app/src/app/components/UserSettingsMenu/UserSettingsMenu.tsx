/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Avatar } from '@poolbase/design-system';

import { useSession } from '../../hooks';

export const UserSettingsMenu: React.FC = () => {
  const user = useSession();

  return (
    <>
      {user && user.profile ? (
        <Avatar user={user.profile} />
      ) : user && user.account ? (
        <Avatar user={user.account} />
      ) : null}
    </>
  );
};
export default UserSettingsMenu;
