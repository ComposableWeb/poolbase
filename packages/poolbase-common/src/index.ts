import { functions } from './initFirebase';

export const api = {
  updateUserProfile: functions.httpsCallable('updateUserProfile'),
  addURL: functions.httpsCallable('addURL'),
};

export * from './initFirebase';
export * from './types';
