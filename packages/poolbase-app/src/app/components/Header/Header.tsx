/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';
import Router from 'next/router';
import { PlusSquare as Add, Moon, Sun, LogOut } from 'react-feather';

import { PropsWithAuthUser } from 'poolbase-common';
import AppBar from 'design-system/src/components/AppBar';
import NavIconButton from 'design-system/src/components/NavIconButton';

import logout from '../../utils/auth/logout';

export default function Header({ AuthUser }: PropsWithAuthUser): JSX.Element {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <AppBar as="header">
      <NavIconButton
        aria-label="Add URL"
        onClick={(): void => {
          Router.push('/add-url');
        }}
      >
        <Add />
      </NavIconButton>
      <NavIconButton
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
        <LogOut />
      </NavIconButton>
      <NavIconButton
        onClick={(): void => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
        aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'}`}
      >
        {colorMode === 'light' ? <Moon /> : <Sun />}
      </NavIconButton>
    </AppBar>
  );
}
