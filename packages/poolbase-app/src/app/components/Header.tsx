/** @jsx jsx */
import { jsx, IconButton, useColorMode, Box } from 'theme-ui';
import Router from 'next/router';

import { AuthUser } from '../interfaces';
import logout from '../utils/auth/logout';
import Moon from '../../../../design-system/src/assets/svg/moon.svg';
import Sun from '../../../../design-system/src/assets/svg/sun.svg';
import Logout from '../../../../design-system/src/assets/svg/log-out.svg';
import Add from '../../../../design-system/src/assets/svg/plus-square.svg';

interface PropsWithAuthUser {
  AuthUser: AuthUser;
}

const NaviIconButton = (props) => (
  <IconButton
    {...props}
    sx={{
      color: 'textInverted',
      width: 10,
      height: 10,
      display: 'flex',
      my: 1,
    }}
  />
);
export default function Header({ AuthUser }: PropsWithAuthUser): JSX.Element {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Box
      as="header"
      sx={{
        bg: 'backgroundInverted',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <NaviIconButton
        aria-label="Add URL"
        onClick={(): void => {
          Router.push('/add-url');
        }}
      >
        <Add />
      </NaviIconButton>
      <NaviIconButton
        aria-label="Log out"
        onClick={async (): Promise<void> => {
          try {
            await logout();
            Router.push('/');
          } catch (e) {
            console.error(e);
          }
        }}
      >
        <Logout />
      </NaviIconButton>
      <NaviIconButton
        onClick={(): void => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
        aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'}`}
      >
        {colorMode === 'light' ? <Moon /> : <Sun />}
      </NaviIconButton>
    </Box>
  );
}
