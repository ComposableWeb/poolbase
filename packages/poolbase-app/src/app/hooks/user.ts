import { createContext, useContext, useState, useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { AuthUser, UserProfileData } from '@poolbase/common';

import { firestore } from '../utils/initFirebase';

export const UserContext = createContext({
  user: null,
});

export const useSession = (): AuthUser | null => {
  const { user } = useContext(UserContext);
  return user;
};

export const useAuthUserProfile = (): [UserProfileData | undefined, boolean, Error | undefined] => {
  const { user } = useContext(UserContext);
  const [reference, setReference] = useState(() =>
    user ? { ref: firestore.doc(`users/${user.uid}`) } : { ref: null }
  );
  const [userProfile, dataLoading, error] = useDocumentData<UserProfileData>(reference.ref);
  useEffect(() => {
    if (user) {
      setReference({ ref: firestore.doc(`users/${user.uid}`) });
    }
  }, [user]);
  return [userProfile, dataLoading, error];
};
