import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/img/logo.svg';
import './Newtab.css';

export const NewtabPage: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Newtab/Newtab.js</code> and save to reload.
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

export const Newtab: React.FC = () => (
  <Suspense fallback={<Loader />}>
    <NewtabPage />
  </Suspense>
);
