import * as zod from 'zod';

export interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}

export interface PropsWithAuthUser {
  AuthUser: AuthUser;
}

export const UserProfileSchema = zod.object({
  displayName: zod.string(),
  email: zod.string().email().optional(),
  photoURL: zod.string().url().optional(),
  isEmailPublic: zod.boolean().optional(),
});

export type UserProfileData = zod.infer<typeof UserProfileSchema>;

export const UserAccountSchema = zod.object({
  name: zod.string().min(3),
  email: zod.string().email(),
  photoURL: zod.string().url().optional(),
  uid: zod.string(),
  profile: UserProfileSchema,
});
export type UserAccountData = zod.infer<typeof UserAccountSchema>;

export const PageSchema = zod.object({
  id: zod.string(),
  url: zod.string().url(),
  uid: zod.string(),
  title: zod.string().optional(),
  status: zod.string().nullable(),
  metaKeywords: zod.array(zod.string()).nullable().optional(),
  metaDescription: zod.string().nullable().optional(),
  metaTitle: zod.string().nullable().optional(),
  metaAuthor: zod.string().nullable().optional(),
  metaPublisher: zod.string().nullable().optional(),
  mainText: zod.string().nullable().optional(),
  metaIconUrl: zod.string().nullable().optional(),
  mainImageUrl: zod.string().nullable().optional(),
  processed: zod.object({
    html: zod.boolean().nullable().optional(),
  }),
});

export type PageData = zod.infer<typeof PageSchema>;
