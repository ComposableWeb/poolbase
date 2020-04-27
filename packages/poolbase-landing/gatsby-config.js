module.exports = {
  siteMetadata: {
    siteName: `Poolbase`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-theme-localization`,
      options: {
        languages: [`en`, `de`],
        namespaces: [`common`, `index`],
        localesDir: `./src/locales`,
        defaultLng: `en`,
        embedTranslations: {
          preloadFallbackLng: true,
          preloadNamespaces: [
            {
              regex: `/.*/`,
              namespaces: [`common`],
            },
            {
              regex: `/index/`,
              namespaces: [`index`],
            },
          ],
        },
        i18next: {
          // whatever you want to pass to react-i18next
          fallbackLng: `en`,
        },
        i18nPlugin: {
          // whatever you want to pass to gatsby-plugin-i18n
          langKeyDefault: `en`,
          useLangKeyLayout: false,
        },
      },
    },
  ],
}
