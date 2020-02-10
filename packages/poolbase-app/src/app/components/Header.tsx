import React from 'react';
import { useColorMode } from 'theme-ui';
import Router from 'next/router';
import { AuthUser } from '../interfaces';
import logout from '../utils/auth/logout';

interface PropsWithAuthUser {
  AuthUser: AuthUser;
}

export default function Header({ AuthUser }: PropsWithAuthUser): JSX.Element {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <header>
      <p>You're signed in. Email: {AuthUser.email}</p>
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
      <button onClick={(): void => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </button>
    </header>
  );
}
