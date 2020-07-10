import { v4 as uuid } from 'uuid';

type Collections = 'catchAlls' | 'pages' | 'users';

export enum COLLECTIONS {
  CATCH_ALL = 'catchAlls',
  PAGES = 'pages',
  USERS = 'users',
}

export function generateMockDocument(data: Record<string, any> = {}): Record<string, any> {
  return { name: 'document name', ...data };
}

export function generateMockUpdateDocument(data: Record<string, any> = {}): Record<string, any> {
  return { name: 'updated document name', ...data };
}

export function generateMockDocumentWithPageId(pageId: string) {
  return generateMockDocument({ pageId });
}

export function generateMockUpdateDocumentWithPageId(pageId: string) {
  return generateMockUpdateDocument({ pageId });
}

export function generateSecurityRecordAny(): Record<string, any> {
  return { role: 'any' };
}

export function generateSecurityRecordOwner(): Record<string, any> {
  return { role: 'owner' };
}

export function documentPath(...parts: string[]): string {
  return parts.join('/');
}

export function membershipPath(collection: Collections, recordId: string, userId: string): string {
  return documentPath(collection, recordId, 'members', userId);
}

export function generateId({
  append = '',
  prepend = '',
}: {
  append?: string;
  prepend?: string;
} = {}): string {
  let id = uuid();

  if (prepend) {
    id = `${prepend}-${id}`;
  }

  if (append) {
    id += `-${append}`;
  }

  return id;
}

export function generateUserId(): string {
  return generateId({ prepend: 'USER' });
}
