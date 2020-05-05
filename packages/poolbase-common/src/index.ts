import { functions } from './initFirebase';

export const api = {
  updateUserProfile: functions.httpsCallable('updateUserProfile'),
};

export * from './initFirebase';
