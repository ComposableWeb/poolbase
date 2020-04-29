/** @jsx jsx */
import { jsx, IconButton, useColorMode } from 'theme-ui';
import Router from 'next/router';
import { PlusSquare as Add, Moon, Sun, LogOut } from 'react-feather'

import AppBar from 'design-system/src/components/AppBar';
import { AuthUser } from '../../interfaces';
import logout from '../../utils/auth/logout';


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
    <AppBar as="header">
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
        <LogOut />
      </NaviIconButton>
      <NaviIconButton
        onClick={(): void => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
        aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'}`}
      >
        {colorMode === 'light' ? <Moon /> : <Sun />}
      </NaviIconButton>
    </AppBar>
  );
}
