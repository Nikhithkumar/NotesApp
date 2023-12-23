import React from 'react';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
  );
};

export default MainNavigator;