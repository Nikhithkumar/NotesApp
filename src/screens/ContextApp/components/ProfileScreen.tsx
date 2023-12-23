import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '..';

const ProfileScreen = () => {
  const { user } :any= useAuth();

  return (
    <View>
      <Text>Profile Screen</Text>
      <Text>Username: {user ? user.username : 'N/A'}</Text>
      <Text>Email: {user ? user.email : 'N/A'}</Text>
    </View>
  );
};

export default ProfileScreen;