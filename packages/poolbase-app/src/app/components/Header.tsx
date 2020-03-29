/** @jsx jsx */
import { jsx, IconButton, useColorMode } from 'theme-ui';
import Router from 'next/router';

import { AuthUser } from '../interfaces';
import logout from '../utils/auth/logout';
import Moon from '../../../../design-system/assets/svg/moon.svg';
import Sun from '../../../../design-system/assets/svg/sun.svg';

interface PropsWithAuthUser {
  AuthUser: AuthUser;
}

export default function Header({ AuthUser }: PropsWithAuthUser): JSX.Element {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <header
      sx={{
        bg: 'grayDark',
      }}
    >
      <p sx={{
        color: 'white',
      }}>You're signed in. Email: {AuthUser.email}</p>
      <p
        style={{
          display: 'inlinelock',
          color: 'blue',
          textDecoration: 'underline',
          cursor: 'pointer',
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
        Log out
      </p>
      <IconButton sx={{
        color: 'white',
      }} onClick={(): void => setColorMode(colorMode === 'light' ? 'dark' : 'light')} aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'}`}>
        {colorMode === 'light' ? <Moon /> : <Sun />}
      </IconButton>
    </header>
  );
}
