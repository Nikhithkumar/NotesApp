import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../components/CustomBottomTab';
import Home from '../screens/BugerApp/Home';

const Tab = createBottomTabNavigator();

function Notification() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Notification!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const CustomBottomTabs = (props: BottomTabBarProps) => {
    return <CustomBottomTab {...props} />;
};

const BugerStack = () => {
    return (
        <Tab.Navigator tabBar={CustomBottomTabs}
            screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={SettingsScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

export default BugerStack

