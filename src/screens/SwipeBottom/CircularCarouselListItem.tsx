import {
    Image, StyleSheet, ImageProps, Dimensions, TouchableOpacity
    , Text,
    View,
    Appearance
} from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { XStyleSheet } from '../../theme/Responsive'
import { COLORS } from '../../constants/Colors'

interface CircularCarouselListItemProps {
    id?: string,
    type?: string,
    itemIndex?: string,
    name?: string,
    imageSrc?: ImageProps['source'],
    index: number,
    contentOffset: Animated.SharedValue<number>
}

const { width: windowWidth } = Dimensions.get('window')

export const ListItemWidth = windowWidth / 4;

const colorScheme = Appearance.getColorScheme();

const CircularCarouselListItem: React.FC<CircularCarouselListItemProps> = ({
    imageSrc, index, contentOffset, id, type, itemIndex, name }) => {
    const navigation:any = useNavigation()
    const rStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 2) * ListItemWidth,
            (index - 1) * ListItemWidth,
            index* ListItemWidth,
            (index + 1) * ListItemWidth,
            (index + 2) * ListItemWidth,
        ]

        console.log(inputRange)

        const translateYOutputRange = [
            0,
            0,
            0,
            0,
            0,
        ];

        const opacityOutputRange = [0.7, 0.8, 1, 0.8, 0.7];

        const scaleOutputRange = [0.7, 0.8, 1, 0.8, 0.7];

        const translateY = interpolate(
            contentOffset.value,
            inputRange,
            translateYOutputRange,
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            contentOffset.value,
            inputRange,
            opacityOutputRange,
            Extrapolate.CLAMP
        );

        const scale = interpolate(
            contentOffset.value,
            inputRange,
            scaleOutputRange,
            Extrapolate.CLAMP
        );

        return {
            opacity,
            transform: [
                {
                    translateY: translateY,
                },
                {
                    translateX: 1,
                },
                {
                    scale,
                },
            ],
        };
    })

    return (
        <Animated.View
            style={[styles.container, { width: ListItemWidth }, rStyle]}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Details', {
                    index: itemIndex,
                    id: id,
                    type: type,
                })
            }}>
                {/* <Image source={imageSrc} style={{
                    margin: 3,
                    height: ListItemWidth,
                    width: ListItemWidth,
                    borderRadius: 200,
                    borderWidth: 2,
                    borderColor: 'white',
                }} /> */}
                <View style={{
                    margin: 3,
                    height: ListItemWidth,
                    width: ListItemWidth,
                    borderRadius: 200,
                    borderWidth: 2,
                    borderColor: 'white',
                }}/>
                <Text style={styles.NameText}>{name}</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

const getStyles = (Theme: number) => XStyleSheet.create({
    container: {
        aspectRatio: 1,
        elevation: 5,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        alignSelf: 'center'
    },
    NameText: {
        textAlign: 'center',
        fontSize: 10,
        color:  COLORS[Theme].PRIMARY_WHITE,
    }
})

const styles = getStyles(colorScheme == 'dark' ? 0 : 1);

export default CircularCarouselListItem
