export interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}
export interface PropsWithAuthUser {
  AuthUser: AuthUser;
}
export interface UserProfileData {
  displayName: string;
  email?: string;
  photoURL?: string;
  uid?: string
}

export interface PageData {
  id: string;
  url: string;
  status: number | string | null;
  metaKeywords: string[] | null;
  metaDescription: string | null;
  metaTitle: string | null;
  metaAuthor: string | null;
  metaPublisher: string | null;
  mainText: string | null;
  metaIconUrl: string | null;
  mainImageUrl: string | null;
  processed: {
    html: boolean;
  };
}
