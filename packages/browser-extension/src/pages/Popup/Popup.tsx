import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@poolbase/common';
import logo from '../../assets/img/logo.svg';
import './Popup.css';

export const PopupPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [user, loading, error] = useAuthState(auth);
  console.log(user, loading);
  return (
    <div className="App">
      <h2>{t('siteTitle')}</h2>
      {user && user.email}
      {loading && 'Loading'}
      {error && 'Error'}
    </div>
  );
};
const Loader: React.FC = () => (
  <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
);

export const Popup: React.FC = () => (
  <Suspense fallback={<Loader />}>
    <PopupPage />
  </Suspense>
);
