// src/hooks/useAuth.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from 'firebase/auth';
import { app } from '@/lib/firebase.config';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (email: string, pass: string, profile: { firstName: string, lastName: string }) => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  loginWithGoogle: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        await user.reload(); // Refresh user data to get latest claims
        const idTokenResult = await user.getIdTokenResult(true);
        setUser(user);
        setIsAdmin(!!idTokenResult.claims.admin);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signup = async (email: string, pass: string, profile: { firstName: string, lastName: string }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(userCredential.user, { displayName: `${profile.firstName} ${profile.lastName}` });
    await sendEmailVerification(userCredential.user);
    await signOut(auth); // Sign out user until they verify email
  };

  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };
  
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const logout = () => {
    return signOut(auth);
  };

  const sendPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    signup,
    logout,
    sendPasswordReset,
    loginWithGoogle
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
