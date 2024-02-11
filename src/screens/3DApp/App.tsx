import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Suspense, useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { COLORS } from '../../constants/Colors'
import { Canvas } from '@react-three/fiber'
import Shoe from './Shoe'
import Tigger from './Tigger'
import Loader from './Loader'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import ThreeDHeader from './ThreeDHeader'

type Props = {

}

const ShopApp = (props: Props) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [baseColor, setBaseColor] = useState<string>('pink')
    const [soleColor, setSoleColor] = useState<string>('blue')
    const [direction, setDirection] = useState<'x' | 'y'>('x')
    const dataColors = ['pink', 'red', 'orange', 'green', 'blue']

    const position = useSharedValue(0)
    const rotate = useSharedValue(0)
    const slidetoPay = useSharedValue(0)

    const pan = Gesture.Pan().onUpdate(e => {
        position.value = e.translationX;
    }).onEnd(() => {
        position.value = withSpring(0)
    })

    const slide = Gesture.Pan().onUpdate(e => {
        slidetoPay.value = e.translationX;
    })

    const animatedStyle1 = useAnimatedStyle(() => ({
        transform: [{ translateX: slidetoPay.value }]
    }))

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }]
    }))

    const handleChangeDirection = () => {
        if (direction === 'y') {
            setDirection('x')
            rotate.value = withSpring(90)
        } else {
            setDirection('y')
            rotate.value = withSpring(0)
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <ThreeDHeader handleChangeDirection={handleChangeDirection} rotate={rotate} />
                <View style={styles.mainContainer}>
                    {isLoading && <Loader />}
                    <Canvas camera={{ fov: 24 }}>
                        <directionalLight position={[1, 0, 0]} args={['white', 2]} />
                        <directionalLight position={[-1, 0, 0]} args={['white', 2]} />
                        <directionalLight position={[0, 0, 1]} args={['white', 2]} />
                        <directionalLight position={[0, 0, -1]} args={['white', 2]} />
                        <directionalLight position={[0, 1, 0]} args={['white', 2]} />
                        <directionalLight position={[0, -1, 0]} args={['white', 2]} />

                        <Suspense fallback={<Tigger setLoading={setLoading} />}>
                            <Shoe baseColor={baseColor} soleColor={soleColor} position={position} direction={direction} />
                        </Suspense>
                    </Canvas>
                    <View style={{width:50,alignSelf:'flex-end'}}>
                        <GestureDetector gesture={pan}>
                            <Animated.View style={[{}, animatedStyle]}>
                                <Image source={require('../../assets/3DShopAssets/Slider.png')}
                                    style={[{ transform: [{ rotateX: '90deg' }] ,marginRight:50,width:30,height:200}]} />
                            </Animated.View>
                        </GestureDetector>
                    </View>
                </View>
                <GestureDetector gesture={pan}>
                    <Animated.View style={[styles.sliderContainer, animatedStyle]}>
                        <Image source={require('../../assets/3DShopAssets/Slider.png')}
                            style={styles.slider} />
                    </Animated.View>
                </GestureDetector>
                <View>
                    <Text style={styles.textTitle}>Base Color</Text>
                    <View style={styles.colorsModel}>
                        {dataColors.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => setBaseColor(item)}>
                                <View style={[styles.colorBox, { backgroundColor: item }]} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.textTitle}>Sole Color</Text>
                    <View style={styles.colorsModel}>
                        {dataColors.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => setSoleColor(item)}>
                                <View style={[styles.colorBox, { backgroundColor: item }]} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                {/* <GestureDetector gesture={slide}>
                    <View style={styles.slideButton}>
                        <Animated.View style={[styles.slide,animatedStyle1]}>
                        </Animated.View>
                    </View>
                </GestureDetector> */}
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default ShopApp

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS[0].PRIMARY_BLACK
    },
    mainContainer: {
        height: 300,
        flexDirection: 'row'
    },
    colorsModel: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10
    },
    textTitle: {
        fontSize: 25,
        color: COLORS[0].PRIMARY_WHITE,
        fontWeight: '700',
        fontStyle: 'normal',
        margin: 10,
    },
    colorBox: {
        width: 25,
        height: 25,
        borderRadius: 5
    },
    slider: {
        width: 200,
        height: 30
    },
    sliderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    slideButton: {
        backgroundColor: '#323232',
        marginHorizontal: 10,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        bottom: 0,
        padding: 5
    },
    slide: {
        height: 50,
        width: 50,
        borderRadius: 13,
        backgroundColor: 'green',

    }
})