/** @jsx jsx */
import { jsx } from 'theme-ui';
import { NextPage } from 'next';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { ListItem } from '@poolbase/design-system/src/components/ListItem';
import { PageData, firestore } from '@poolbase/common';

import { useI18n } from 'hooks';
import { languages } from 'lib/i18n';

const HomePage: NextPage = () => {
  const query = firestore.collection('pages').orderBy('created', 'desc').limit(30);
  const [data, loading, error] = useCollectionData<PageData>(query, { idField: 'id' });
  const i18n = useI18n();

  return (
    <>
      <h1>{i18n.t('siteTitle')}</h1>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {data && data.map((page): JSX.Element => <ListItem key={page.id} data={page} />)}
    </>
  );
};
export async function getStaticProps({ params }) {
  const { default: common = {} } = await import(`@poolbase/common/locales/${params.lng}/common.json`);
  const { default: index = {} } = await import(`@poolbase/common/locales/${params.lng}/index.json`);
  const lngDict = {
    ...common,
    ...index,
  };
  return {
    props: { lng: params.lng, lngDict },
  };
}

export function getStaticPaths() {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  };
}
export default HomePage;
