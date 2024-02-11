import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { COLORS } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

type Props = {
    handleChangeDirection: () => void,
    rotate: SharedValue<number>;
}

const ThreeDHeader = ({ handleChangeDirection, rotate }: Props) => {
    const navigations = useNavigation()

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotate.value}deg` }]
        }
    })
    return (
        <View style={styles.container}>
            <Pressable style={styles.ImageContainer} onPress={() => navigations.goBack()}>
                <Ionicons name={"arrow-back-sharp"} color={COLORS[0].PRIMARY_WHITE} size={20} />
            </Pressable>
            <Pressable style={styles.ImageContainer} onPress={handleChangeDirection}>
                <Animated.Image style={[styles.image, animatedStyle]}
                    source={require('../../assets/3DShopAssets/ArrowLeftRight.png')} />
            </Pressable>
        </View>
    )
}

export default ThreeDHeader

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: COLORS[0].PRIMARY_BLACK
    },
    ImageContainer: {
        backgroundColor: '#323232',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16
    },
    image: {
        width: 30,
        height: 20
    }
})