import React, {useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import axios from 'axios';

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
  
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  }

  const googleSignIn = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
  }
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser?.email) {
        const userData = { email: currentUser.email };
        axios.post('http://localhost:3000/jwt', userData, {
          withCredentials:true
        }).then(res => {
          console.log(res.data);
        }).catch(error => {
          console.log(error);
        })
      }
    })
    return () => {
      unsubscribe();
    }
    
  },[])


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