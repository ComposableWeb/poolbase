import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import useI18n from '../hooks/use-i18n';
import { contentLanguageMap } from '../lib/i18n';
interface ErrorPageProps {
  statusCode: number;
}

const Error: NextPage<ErrorPageProps> = ({ statusCode }: ErrorPageProps) => {
  const i18n = useI18n();

  useEffect(() => {
    i18n.locale('en', EN);
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content={contentLanguageMap[i18n.activeLocale]} />
      </Head>
      <p>{statusCode ? i18n.t('error-with-status', { statusCode }) : i18n.t('error-without-status')}</p>
    </>
  );
};

Error.getInitialProps = ({ res, err }): ErrorPageProps => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    statusCode,
  };
};

Error.defaultProps = {
  statusCode: null,
};

export default Error;
