import React from 'react';
import { NextPage } from 'next';
import { TFunction } from 'next-i18next';

import { withTranslation } from '../../functions/handlers/i18n';

interface ErrorPageProps {
  statusCode: number;
  namespacesRequired: string[];
  t?: TFunction;
}

const Error: NextPage<ErrorPageProps> = ({ statusCode, t }: ErrorPageProps) => (
  <p>{statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}</p>
);

Error.getInitialProps = ({ res, err }): ErrorPageProps => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    namespacesRequired: ['common'],
    statusCode,
  };
};

Error.defaultProps = {
  statusCode: null,
};

export default withTranslation('common')(Error as any);
