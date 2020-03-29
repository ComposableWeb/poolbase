/** @jsx jsx */
/* eslint react/no-danger: 0 */
import { jsx } from 'theme-ui';
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
          <script
            id="__MY_AUTH_USER_INFO"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(AuthUserInfo, null, 2),
            }}
          />
        </Head>
        <body
          sx={{
            height: '100%',
            '& > div': {
              height: '100%',
            }
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
