import { createContext, useContext, useState, useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { firestore, auth, UserAccountData } from '@poolbase/common';

export const UserContext = createContext({
  user: null,
});

export const useSession = (): UserAccountData | null => {
  const { user } = useContext(UserContext);
  return user;
};

export const useAuthUserProfile = (): [UserAccountData | undefined, boolean, Error | firebase.auth.Error | undefined] => {
  const [returnValue, setReturnValue] = useState<{
    user: UserAccountData | undefined;
    loading: boolean;
    error: Error | firebase.auth.Error | undefined;
  }>({
    user: undefined,
    loading: true,
    error: undefined,
  });
  const [user, loading, error] = useAuthState(auth);

  const [userAccountDocReference, setUserAccountDocReference] = useState({ ref: null });

  const [userAccountData, dataAccountLoading, dataAccountError] = useDocumentData<UserAccountData & { id: string }>(
    userAccountDocReference.ref,
    {
      idField: 'id',
    }
  );

  useEffect(() => {
    if (user && !userAccountDocReference.ref) {
      setUserAccountDocReference({ ref: firestore.doc(`users/${user.uid}`) });
    }
    if (!loading && !user) {
      setReturnValue({
        ...returnValue,
        loading: false,
      });
    }
    if (error) {
      setReturnValue({
        ...returnValue,
        error,
        loading: false,
      });
    }
  }, [user]);

  useEffect(() => {
    if (userAccountData) {
      const newReturnValue = {
        ...returnValue,
        user: {
          ...userAccountData,
        },
        loading: false,
      };
      setReturnValue(newReturnValue);
    }
    if (dataAccountError) {
      setReturnValue({
        ...returnValue,
        error: dataAccountError,
        loading: false,
      });
    }
  }, [userAccountData]);

  return [returnValue.user, returnValue.loading, returnValue.error];
};
