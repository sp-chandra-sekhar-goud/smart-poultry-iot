// contexts/AuthContext.js

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null); // Store the current user state

  const loginWithEmail = async (email, password) => {
    try {
      // Call email sign-in API
      // Handle response and setUser accordingly
    } catch (error) {
      console.error('Email Sign-In Error:', error.message);
      // Handle error
    }
  };

  const signUpWithEmail = async (email, password) => {
    try {
      // Call email sign-up API
      // Handle response and setUser accordingly
    } catch (error) {
      console.error('Email Sign-Up Error:', error.message);
      // Handle error
    }
  };

  const signInWithGoogle = async (idToken) => {
    try {
      // Call Google sign-in API
      // Handle response and setUser accordingly
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
      // Handle error
    }
  };

  const signUpWithGoogle = async (idToken) => {
    try {
      // Call Google sign-up API
      // Handle response and setUser accordingly
    } catch (error) {
      console.error('Google Sign-Up Error:', error.message);
      // Handle error
    }
  };

  const logout = async () => {
    try {
      // Call logout API
      // Handle response and setUser accordingly
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Logout Error:', error.message);
      // Handle error
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginWithEmail, signUpWithEmail, signInWithGoogle, signUpWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
