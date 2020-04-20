/** @jsx jsx */
/* eslint react/no-danger: 0 */
import { jsx, Box } from 'theme-ui';
import { get } from 'lodash/object';
import Document, { DocumentContext, Html, Head, Main, NextScript, DocumentInitialProps } from 'next/document';

interface CustomDocumentProps extends DocumentInitialProps {
  AuthUserInfo: {
    AuthUser: {
      id: string;
      email: string;
      emailVerified: boolean;
    };
    token: string;
  };
}

export default class CustomDocument extends Document<CustomDocumentProps> {
  public static async getInitialProps(ctx: DocumentContext): Promise<CustomDocumentProps> {
    // Get the AuthUserInfo object. This is set if the server-rendered page
    // is wrapped in the `withAuthUser` higher-order component.
    const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null);

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, AuthUserInfo };
  }
  public render(): JSX.Element {
    // Store initial props from request data that we need to use again on
    // the client. See:
    // https://github.com/zeit/next.js/issues/3043#issuecomment-334521241
    // https://github.com/zeit/next.js/issues/2252#issuecomment-353992669
    // Alternatively, you could use a store, like Redux.
    const { AuthUserInfo } = this.props;
    return (
      <Html
        sx={{
          height: '100%',
        }}
      >
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="All your information in one place" />
          <meta name="keywords" content="bookmarks, groups, collaboration, search, information management" />
          <title>Poolbase</title>

          <meta name="theme-color" content="#1887ED" />
          <meta name="mobile-web-app-capable" content="yes" />

          <meta name="apple-mobile-web-app-title" content="Poolbase" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />

          <meta name="msapplication-navbutton-color" content="#1887ED" />
          <meta name="msapplication-TileColor" content="red" />
          <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
          <meta name="msapplication-config" content="browserconfig.xml" />

          <meta name="application-name" content="Poolbase" />
          <meta name="msapplication-tooltip" content="All your informnation in one place" />
          <meta name="msapplication-starturl" content="/" />

          <meta name="msapplication-tap-highlight" content="no" />

          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />

          <meta name="nightmode" content="enable" />

          <meta name="viewport" content="uc-fitscreen=yes" />

          <meta name="layoutmode" content="fitscreen" />

          <meta name="screen-orientation" content="portrait" />
          <link href="/images/icons/icon16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/images/icons/icon32.png" rel="icon" type="image/png" sizes="32x32" />
          <link href="/images/icons/icon48.png" rel="icon" type="image/png" sizes="48x48" />

          <link href="/images/icons/icon32.png" rel="apple-touch-icon" />
          <link href="/images/icons/icon76.png" rel="apple-touch-icon" sizes="76x76" />
          <link href="/images/icons/icon120.png" rel="apple-touch-icon" sizes="120x120" />
          <link href="/images/icons/icon152.png" rel="apple-touch-icon" sizes="152x152" />

          <link href="/images/icons/touch-icon-start-up-320x480.png" rel="apple-touch-startup-image" />

          <link href="/images/icons/poolbase-icon.svg" rel="mask-icon" color="#1887ED" />

          <link href="/images/icons/icon192.png" rel="icon" sizes="192x192" />
          <link href="/images/icons/icon128.png" rel="icon" sizes="128x128" />

          <link href="/images/icons/favicon.ico" rel="shortcut icon" type="image/x-icon" />

          <link href="/images/icons/icon57.png" rel="apple-touch-icon-precomposed" sizes="57x57" />
          <link href="/images/icons/icon72.png" rel="apple-touch-icon" sizes="72x72" />

          <link href="/manifest.json" rel="manifest" />
          <script
            id="__MY_AUTH_USER_INFO"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(AuthUserInfo, null, 2),
            }}
          />
        </Head>
        <Box as="body"
          sx={{
            height: '100%',
            '& > div': {
              height: '100%',
            },
          }}
        >
          <Main />
          <NextScript />
        </Box>
      </Html>
    );
  }
}
