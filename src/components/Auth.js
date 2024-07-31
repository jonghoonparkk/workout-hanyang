import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <h2>Login or Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
};

export default Auth;
