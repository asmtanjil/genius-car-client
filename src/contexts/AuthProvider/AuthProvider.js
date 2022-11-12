import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.init';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  //CreateUser
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  //Sign In
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  //Update Profile
  const updateUserProfile = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name
    })
  }

  //Sign Out
  const logOut = () => {
    localStorage.removeItem('geniusToken')
    setLoading(true);
    return signOut(auth)
  }


  //AuthState Changed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log(currentUser)
      setUser(currentUser)
      setLoading(false)
    })

    return () => {
      unsubscribe();
    }
  }, [])

  const authInfo = {
    user,
    createUser,
    signIn,
    updateUserProfile,
    loading,
    logOut
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;