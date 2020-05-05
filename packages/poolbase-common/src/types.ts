import { FieldValue } from '@google-cloud/firestore';

export interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}

export interface PropsWithAuthUser {
  AuthUser: AuthUser;
}

export interface UserProfileData {
  displayName?: string;
  email?: string;
  photoURL?: string;
  isEmailPublic: boolean;
}

export interface UserAccountData {
  name: string;
  email?: string;
  photoURL?: string;
  uid: string;
  userProfileId?: string;
}

export interface UserSessionData {
  account: UserAccountData;
  profile?: UserProfileData;
}

export interface PageData {
  id: string;
  created: FieldValue | string;
  url: string;
  uid: string;
  title?: string;
  status: number | string | null;
  metaKeywords?: string[] | null;
  metaDescription?: string | null;
  metaTitle?: string | null;
  metaAuthor?: string | null;
  metaPublisher?: string | null;
  mainText?: string | null;
  metaIconUrl?: string | null;
  mainImageUrl?: string | null;
  processed: {
    html?: boolean;
  };
}
