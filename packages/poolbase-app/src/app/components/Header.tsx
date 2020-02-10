import React from 'react';
import { useColorMode } from 'theme-ui';
import Router from 'next/router';

import logout from '../utils/auth/logout';

export default function Header({authUser}) {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <header>
      <p>You're signed in. Email: {authUser.email}</p>
      <p
        style={{
          display: 'inlinelock',
          color: 'blue',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={async () => {
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
      <button onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </button>
    </header>
  );
}
