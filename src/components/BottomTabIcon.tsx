import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Iconicons from './Iconicons'

interface Props {
    route: string,
    isFocused: boolean
}

const BottomTabIcon = ({ route, isFocused }: Props) => {

    const renderIcon = (route: string, isFocused: boolean) => {
        let height: number = 34;
        let width: number = 34;

        switch (route) {
            case "Home":
                return (
                    <Iconicons name='home-outline' size={24} color={isFocused ? '#0047AB' : '#ffffff'} />
                );
            case 'Notification':
                return (
                    <Iconicons name='search-outline' size={24} color={isFocused ? '#0047AB' : '#ffffff'} />
                );
            case 'Profile':
                return (
                    <Iconicons name='person-outline' size={24} color={isFocused ? '#0047AB' : '#ffffff'} />
                );
            default:
                break;
        }
    }
    return (
        <View>
            {renderIcon(route, isFocused)}
        </View>
    )
}

export default BottomTabIcon

