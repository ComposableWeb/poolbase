import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import logo from '../../assets/img/logo.svg';
import './Options.css';

export const OptionsPage: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <div className="OptionsContainer">
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

export const Options: React.FC = () => (
  <Suspense fallback={<Loader />}>
    <OptionsPage />
  </Suspense>
);
