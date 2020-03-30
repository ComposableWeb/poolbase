/** @jsx jsx */
import { jsx, Grid } from 'theme-ui';
import { get } from 'lodash/object';
import { NextPage } from 'next';
import { PropsWithAuthUserInfo } from '../interfaces';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import Header from './Header';
import FirebaseAuth from './FirebaseAuth';

const PageLayout: NextPage<PropsWithAuthUserInfo> = (
  props: PropsWithAuthUserInfo & { children: JSX.Element }
): JSX.Element => {
  const { AuthUserInfo, children } = props;
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

  return (
    <>
      {!AuthUser ? (
        <div>
          <p>Sign in</p>
          <div>
            <FirebaseAuth />
          </div>
        </div>
      ) : (
        <Grid
          gap={0}
          columns={[0, '150px 1fr']}
          sx={{
            height: '100%',
          }}
        >
          <Header AuthUser={AuthUser} />
          <main sx={{ px: 4 }}>{children}</main>
        </Grid>
      )}
    </>
  );
};

export default withAuthUserInfo(PageLayout);
