/** @jsx jsx */
import { jsx, IconButton, useColorMode } from 'theme-ui';
import Router from 'next/router';

import { AuthUser } from '../interfaces';
import logout from '../utils/auth/logout';
import Moon from '../../../design-system/assets/svg/moon.svg';
import Sun from '../../../design-system/assets/svg/sun.svg';
import Logout from '../../../design-system/assets/svg/log-out.svg';

interface PropsWithAuthUser {
  AuthUser: AuthUser;
}

export default function Header({ AuthUser }: PropsWithAuthUser): JSX.Element {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <header
      sx={{
        bg: 'grayDark',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <IconButton
        aria-label="Log out"
        sx={{
          color: 'textInverted',
          width: 10,
          height: 10,
          display: 'flex',
          my: 1,
        }}
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
      </IconButton>
      <IconButton
        sx={{
          color: 'textInverted',
          width: 10,
          height: 10,
          display: 'flex',
          my: 1,
        }}
        onClick={(): void => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
        aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'}`}
      >
        {colorMode === 'light' ? <Moon /> : <Sun />}
      </IconButton>
    </header>
  );
}
