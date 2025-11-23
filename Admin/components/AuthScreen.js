import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  return isLogin ? (
    <Login onSwitch={() => setIsLogin(false)} />
  ) : (
    <Signup onSwitch={() => setIsLogin(true)} />
  );
}
