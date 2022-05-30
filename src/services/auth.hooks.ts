/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState, useContext } from 'react';
import { User } from '@prisma/client';
import { AuthContext } from '../frontend/app/app-context-auth/app-context-auth';
import { useLogUserIn } from './users.hooks';
import { Auth } from '../shared/types';

// Provider hook that creates auth object and handles state
export const useProvideAuth = () => {
  const serverSignin = useLogUserIn();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);

  const devSignin = (user: User) => {
    setUser(user);
    return user;
  };

  const signin = async (id_token: string) => {
    const user = await serverSignin.mutateAsync(id_token);
    setUser(user);
    return user;
  };

  const signout = () => {
    setUser(undefined);
  };

  const updateLoadingState = () => {
    setIsLoading(serverSignin.isLoading);
    return isLoading;
  };

  return {
    user,
    devSignin,
    signin,
    signout,
    updateLoadingState
  } as Auth;
};

// Hook for child components to get the auth object
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw Error('Auth must be used inside of context.');
  return context;
};
