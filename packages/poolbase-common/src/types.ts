import { FieldValue } from '@google-cloud/firestore';
import * as yup from 'yup';

export interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}

export interface PropsWithAuthUser {
  AuthUser: AuthUser;
}

export const UserProfileSchema = yup.object().shape({
  displayName: yup.string().required(),
  email: yup.string().email().notRequired(),
  photoURL: yup.string().url().notRequired(),
  isEmailPublic: yup.boolean().notRequired(),
});
export type UserProfileData = yup.InferType<typeof UserProfileSchema>;

export const UserAccountSchema = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  photoURL: yup.string().url().notRequired(),
  uid: yup.string().required(),
  userProfileId: yup.string().notRequired(),
});
export type UserAccountData = yup.InferType<typeof UserAccountSchema>;

export interface UserSessionData {
  account: UserAccountData;
  profile?: UserProfileData;
}

export const PageSchema = yup.object().shape({
  id: yup.string().required(),
  created: yup.date().required(),
  url: yup.string().url().required(),
  uid: yup.string().required(),
  title: yup.string().notRequired(),
  status: yup.string().nullable(),
  metaKeywords: yup.array().of(yup.string()).nullable().notRequired(),
  metaDescription: yup.string().nullable().notRequired(),
  metaTitle: yup.string().nullable().notRequired(),
  metaAuthor: yup.string().nullable().notRequired(),
  metaPublisher: yup.string().nullable().notRequired(),
  mainText: yup.string().nullable().notRequired(),
  metaIconUrl: yup.string().nullable().notRequired(),
  mainImageUrl: yup.string().nullable().notRequired(),
  processed: yup.object().shape({
    html: yup.boolean().notRequired(),
  }),
});

export type PageData = yup.InferType<typeof PageSchema>;
