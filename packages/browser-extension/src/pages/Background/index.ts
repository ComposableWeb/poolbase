import '@poolbase/common/src/logger';
import i18next, { defaultOptions } from '../../common/i18n';
defaultOptions.ns = [...defaultOptions.ns, 'browser-ext-background'];
i18next.init(defaultOptions).then((t) => {
  console.info(t('siteTitle'));
});

console.info('This is the background page without translation!!!!!!!!!!!');
