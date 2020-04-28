import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/img/logo.svg';
import './Popup.css';

export const PopupPage: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup</code> and save to reload.
        </p>
      </header>
      <h1>{t('siteTitle')}</h1>
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
