import '../../common/logger';
import i18next, { defaultOptions } from '../../common/i18n';
defaultOptions.ns = [...defaultOptions.ns, 'browser-ext-content'];
i18next.init(defaultOptions).then((t) => {
  console.info('content script:', t('siteTitle'));
});
console.info('Content script works without translation!');
