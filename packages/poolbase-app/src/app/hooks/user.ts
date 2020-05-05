import { createContext, useContext, useState, useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { UserProfileData, UserSessionData, UserAccountData } from '@poolbase/common';

import { firestore, auth } from '@poolbase/common';

export const UserContext = createContext({
  user: null,
});

export const useSession = (): UserSessionData | null => {
  const { user } = useContext(UserContext);
  return user;
};

export const useAuthUserProfile = (): [
  UserSessionData | undefined,
  boolean,
  Error | firebase.auth.Error | undefined
] => {
  const [returnValue, setReturnValue] = useState<{
    user: UserSessionData | undefined;
    loading: boolean;
    error: Error | firebase.auth.Error | undefined;
  }>({
    user: undefined,
    loading: true,
    error: undefined,
  });
  const [user, loading, error] = useAuthState(auth);
  const [userAccountDocReference, setUserAccountDocReference] = useState({ ref: null });
  const [userProfileDocReference, setUserProfileDocReference] = useState({ ref: null });

  const [userAccountData, dataAccountLoading, dataAccountError] = useDocumentData<UserAccountData & { id: string }>(
    userAccountDocReference.ref,
    {
      idField: 'id',
    }
  );
  const [userProfileData, dataProfileLoading, dataProfileError] = useDocumentData<UserProfileData & { id: string }>(
    userProfileDocReference.ref,
    {
      idField: 'id',
    }
  );
  useEffect(() => {
    if (user && !userAccountDocReference.ref) {
      setUserAccountDocReference({ ref: firestore.doc(`users/${user.uid}`) });
    }
    if (error) {
      setReturnValue({
        ...returnValue,
        error,
        loading: false,
      });
    }
  }, [loading]);

  useEffect(() => {
    // user (account) docs have the uid as id
    if (userAccountData) {
      let newReturnValue = {
        ...returnValue,
        user: {
          account: userAccountData,
        },
      };
      // if the user account references a user profile, load that as well
      if (userAccountData.userProfileId && !userProfileDocReference.ref) {
        setUserProfileDocReference({
          ref: firestore.doc(`userProfiles/${userAccountData.userProfileId}`),
        });
        newReturnValue = {
          ...newReturnValue,
          loading: true,
        };
      } else {
        newReturnValue = {
          ...newReturnValue,
          loading: false,
        };
      }
      setReturnValue(newReturnValue);
    }
    if (dataAccountError) {
      setReturnValue({
        ...returnValue,
        error: dataAccountError,
        loading: false,
      });
    }
  }, [dataAccountLoading]);

  useEffect(() => {
    // user (account) docs have the uid as id
    if (userProfileData) {
      setReturnValue({
        ...returnValue,
        user: {
          account: { ...returnValue.user.account },
          profile: userProfileData,
        },
        loading: false,
      });
    }
    if (dataProfileError) {
      setReturnValue({
        ...returnValue,
        error: dataProfileError,
        loading: false,
      });
    }
  }, [dataProfileLoading]);

  return [returnValue.user, returnValue.loading, returnValue.error];
};
