/** @jsx jsx */
import { jsx, Grid } from 'theme-ui';

import {
  Avatar,
  NavIconButton,
  DialogWrapper,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
  Tabs,
  Tab,
  TabList,
  TabPanel,
} from '@poolbase/design-system';

import { useSession } from '../../hooks';
import UserProfileForm from 'components/UserProfileForm';
import UserAccountForm from 'components/UserAccountForm';

export const UserSettingsMenu: React.FC = () => {
  const user = useSession();
  console.log(user);
  return (
    <DialogWrapper>
      <DialogDisclosure as={NavIconButton}>
        {user && user.profile ? (
          <Avatar user={user.profile} />
        ) : user && user.account ? (
          <Avatar user={user.account} />
        ) : null}
      </DialogDisclosure>
      <DialogBackdrop>
        <Dialog aria-label="User Configuration">
          {() => {
            return (
              <Grid>
                <Tabs orientation={'vertical'}>
                  <TabList>
                    <Tab>{`Profile Settings`}</Tab>
                    <Tab>{`Account Settings`}</Tab>
                  </TabList>
                  <TabPanel>
                    <UserProfileForm profile={user.profile || {}} />
                  </TabPanel>
                  <TabPanel>
                    <UserAccountForm account={user.account || {}} />
                  </TabPanel>
                </Tabs>
              </Grid>
            );
          }}
        </Dialog>
      </DialogBackdrop>
    </DialogWrapper>
  );
};
export default UserSettingsMenu;
