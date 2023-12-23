import React from 'react';
import MainNavigator from './MainNavigator';
import { AuthProvider } from '..';

const Context = () => {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
};

export default Context;