import React, {useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import axios from 'axios';

import toast from 'react-hot-toast';


const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading]=useState(true);
  
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }
  
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }
  
  const signOutUser = async() => {
    setLoading(true);
    try {
      await api.post('/logout', {});
      await signOut(auth);
      setUser(null);
    } catch (err) {
      toast.error('Logout failed');
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  }

  const googleSignIn = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
  }
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);
      if (currentUser?.email) {
        try {
          const res = await api.post('/jwt', { email: currentUser.email });
          if (res.data.message !== 'jwt created successfully') {
            throw new Error('JWT creation failed');
          }
        } catch (err) {
          toast.error('Failed to generate JWT. Logging out...');
          console.error('JWT generation error:', err);
          await signOut(auth);
          setUser(null);
          
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const userInfo = {
    createUser,
    user,
    loading,
    signInUser,
    signOutUser,
    googleSignIn,
  }
  return <AuthContext value={userInfo}>{children}</AuthContext>
};

export default AuthProvider;