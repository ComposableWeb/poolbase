export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
}
export interface AuthUserInfo {
  AuthUser: AuthUser;
  token: string;
}
export interface PropsWithAuthUserInfo {
  AuthUserInfo?: AuthUserInfo;
}
