export type PropsWithAuthUserInfo = {
  AuthUserInfo: {
    AuthUser: {
      id: string;
      email: string;
      emailVerified: boolean;
    }
    token: string;
  }
};
