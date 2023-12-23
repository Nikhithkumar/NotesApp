import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '..';

const HomeScreen = ({ navigation }:any) => {
  const { user, logout }:any = useAuth();

  return (
    <View>
      <Text>Welcome, {user ? user.username : 'Guest'}!</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;