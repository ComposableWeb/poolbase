import * as React from 'react';
import { render } from 'react-dom';
import { initReactI18next } from 'react-i18next';

import i18next, { defaultOptions } from '../../common/i18n';
import { Newtab } from './Newtab';
import './index.css';
defaultOptions.ns = [...defaultOptions.ns, 'browser-ext-newtab'];
i18next.use(initReactI18next).init(defaultOptions);
render(<Newtab />, window.document.querySelector('#app-container'));
