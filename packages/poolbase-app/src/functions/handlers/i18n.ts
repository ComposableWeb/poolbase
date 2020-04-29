import NextI18Next from 'next-i18next';

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de'],
  localePath: './locales',
  localeSubpaths: {
    de: 'de',
  },
});
export default NextI18NextInstance;
export const { appWithTranslation, withTranslation } = NextI18NextInstance;
