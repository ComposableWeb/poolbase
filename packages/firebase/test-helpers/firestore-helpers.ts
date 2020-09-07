import * as firebase from '@firebase/testing';

export type Firestore = firebase.firestore.Firestore;
export type DocumentReference = firebase.firestore.DocumentReference;

let testIncrement = 0;
let useRealProjectId = false;
const projectIdBase = `firestore-emulator-${Date.now()}`;

function adjustTestIncrement(): void {
  testIncrement += 1;
}

function getProjectId(): string {
  return `${projectIdBase}:${testIncrement}`;
}

function generateProjectId(): string {
  return useRealProjectId ? 'poolbasefyi' : getProjectId();
}

export function setUseRealProjectId(): void {
  useRealProjectId = true;
}

export function getAdminApp(): Firestore {
  const adminApp = firebase.initializeAdminApp({
    projectId: generateProjectId(),
  });

  return adminApp.firestore();
}

export function getAuthedApp(userUid?: string): Firestore {
  const app = firebase.initializeTestApp({
    auth: userUid ? { uid: userUid } : undefined,
    projectId: generateProjectId(),
  });

  return app.firestore();
}

export async function setup(userUid?: string, data: {} = {}): Promise<Firestore> {
  adjustTestIncrement();
  const db = getAuthedApp(userUid);

  if (!data || !Object.keys(data).length) {
    return db;
  }

  const adminDb = getAdminApp();
  const batch = adminDb.batch();

  Object.entries(data).forEach(([key, value]) => {
    batch.set(adminDb.doc(key), value as {});
  });

  await batch.commit();
  return db;
}

export async function teardown(): Promise<void[]> {
  useRealProjectId = false;
  return Promise.all<void>(firebase.apps().map((app) => app.delete()));
}
