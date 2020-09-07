/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';
import Router from 'next/router';
import { PlusSquare as Add, Moon, Sun } from 'react-feather';

import AppBar from '@poolbase/design-system/src/components/AppBar';
import NavIconButton from '@poolbase/design-system/src/components/NavIconButton';

import UserSettingsMenu from '../UserSettingsMenu';

export default function Header(): JSX.Element {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <AppBar as="header">
      <NavIconButton
        aria-label="Add URL"
        onClick={(): void => {
          Router.push('/en/add-url');
        }}
      >
        <Add />
      </NavIconButton>
      <NavIconButton
        onClick={(): void => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
        aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'}`}
      >
        {colorMode === 'light' ? <Moon /> : <Sun />}
      </NavIconButton>
      <UserSettingsMenu />
    </AppBar>
  );
}
