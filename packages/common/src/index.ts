import { functions } from './initFirebase';

export const api = {
  saveUserProfile: functions.httpsCallable('saveUserProfile'),
  saveUserAccount: functions.httpsCallable('saveUserAccount'),
  addURL: functions.httpsCallable('addURL'),
};

export * from './initFirebase';
export * from './types';
