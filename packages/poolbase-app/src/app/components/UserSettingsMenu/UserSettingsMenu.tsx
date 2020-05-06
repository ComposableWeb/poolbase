/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useDialogState, Dialog, DialogDisclosure, DialogBackdrop } from 'reakit/Dialog';

import { Avatar, NavIconButton } from '@poolbase/design-system';

import { useSession } from '../../hooks';
import UserProfileForm from 'components/UserProfileForm';

export const UserSettingsMenu: React.FC = () => {
  const user = useSession();
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure {...dialog} as={NavIconButton}>
        {user && user.profile ? (
          <Avatar user={user.profile} />
        ) : user && user.account ? (
          <Avatar user={user.account} />
        ) : null}
      </DialogDisclosure>
      <DialogBackdrop {...dialog}>
        <Dialog
          {...dialog}
          aria-label="User Profile Form"
          sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <UserProfileForm profile={user.profile || {}} />
        </Dialog>
      </DialogBackdrop>
    </>
  );
};
export default UserSettingsMenu;
