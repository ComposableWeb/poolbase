/** @jsx jsx */
import { jsx } from 'theme-ui';

import {
  Avatar,
  NavIconButton,
  DialogWrapper,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from '@poolbase/design-system';

import { useSession } from 'hooks';

import UserAccountForm from 'components/UserAccountForm';

export const UserSettingsMenu: React.FC = () => {
  const user = useSession();
  return (
    <DialogWrapper>
      <DialogDisclosure as={NavIconButton}>
        {user ? (
          <Avatar user={user.profile} />
        ) : null}
      </DialogDisclosure>
      <DialogBackdrop>
        <Dialog aria-label="User Configuration">
          {() => {
            return <UserAccountForm account={user || {}} />;
          }}
        </Dialog>
      </DialogBackdrop>
    </DialogWrapper>
  );
};
export default UserSettingsMenu;
