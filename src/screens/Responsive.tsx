import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, Dimensions, TextInput, TouchableOpacity, PixelRatio } from 'react-native'
import React, { useEffect, useState } from 'react'
import { XStyleSheet, screenWidth } from '../theme/Responsive'
import { COLORS } from '../constants/Colors'
import Animated, { FadeInDown, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const width = Dimensions.get('window').width

const Responsive = () => {

    const value = useSharedValue(0)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleRegister = () => {
        // Implement your registration logic here
        console.log('Registration Data:', { name, email, password, confirmPassword, phoneNumber, address });
    };

    const heightStyle = useAnimatedStyle(() => {
        const marginTop = interpolate(
            value.value,
            [0, 1],
            [-15, 0]
        )
        const paddingBottom = interpolate(
            value.value,
            [0, 1],
            [15, 0]
        )
        return {
            marginTop, paddingBottom
        }
    })

    const innerStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            value.value, [0, 1], [12, 16]
        )
        return { borderRadius }
    })

    useEffect(()=>{
       const res= PixelRatio.get()
       console.log("responses==>",res)
    },[])

    return (
        <ScrollView contentContainerStyle={styles.Container}>
            <View style={styles.box}>
            </View>
            <Text style={styles.Text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem alias quasi iste, architecto animi,
                rerum pariatur numquam totam eaque fuga et veniam, doloribus laborum voluptatum sequi ipsa cumque fugiat accusamus.
            </Text>
            <Text style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '800',
                fontFamily: 'normal',
                fontStyle: 'normal',
                marginTop: 40,
            }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem alias quasi iste, architecto animi, rerum
                pariatur numquam totam eaque fuga et veniam, doloribus laborum voluptatum sequi ipsa cumque fugiat accusamus.
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                <TouchableWithoutFeedback style={{ alignItems: 'center', alignSelf: 'center' }}>
                    <View style={styles.outer}>
                        <Animated.View style={[styles.height, heightStyle]}>
                            <Animated.View style={[styles.inner, innerStyle]}>
                                <Text style={[styles.white, { color: COLORS[0].PRIMARY_WHITE }]}>nikhith</Text>
                            </Animated.View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{ alignItems: 'center', alignSelf: 'center' }}>
                    <View style={{
                        padding: 10,
                        borderRadius: 14,
                        height: 60,
                        width: 150,
                        marginTop: 'auto',
                        alignItems: 'center',
                        marginBottom: 30
                    }}>
                        <Animated.View style={[{
                            borderRadius: 16,
                            backgroundColor: "rgba(255, 0, 0, .5)"
                        }, heightStyle]}>
                            <Animated.View style={[{
                                backgroundColor: COLORS[0].ORANGE, width: 120,
                                alignItems: "center", justifyContent: "center", height: 50
                            }, innerStyle]}>
                                <Text style={[styles.white, { color: COLORS[0].PRIMARY_WHITE }]}>nikhith</Text>
                            </Animated.View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View>
                <Image source={require('../assets/Images/image-demo.jpg')} resizeMode='cover' style={styles.image} />
                <Image source={require('../assets/Images/image-demo.jpg')} resizeMode='cover' style={{ width: width, height: 200, alignSelf: 'center' }} />
                <Animated.Text  entering={FadeInDown.duration(1000).springify()}  style={styles.title}>Register</Animated.Text>
                
                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                </Animated.View>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Responsive

const styles = XStyleSheet.create({
    Container: {
        flexGrow: 1,
    },
    box: {
        height: 50,
        backgroundColor: 'red',
        width: 100,
        marginTop: 20,
        alignSelf: 'center'
    },
    Text: {
        fontSize: 20,
        color: 'black',
        fontWeight: '800',
        fontFamily: 'normal',
        fontStyle: 'normal'
    },
    outer: {
        padding: 10,
        borderRadius: 14,
        height: 60,
        width: 150,
        marginTop: 'auto',
        alignItems: 'center',
        marginBottom: 30
    },
    height: {
        borderRadius: 16,
        backgroundColor: "rgba(255, 0, 0, .5)"
    },
    inner: {
        backgroundColor: COLORS[0].ORANGE, width: 120,
        alignItems: "center", justifyContent: "center", height: 50
    },
    white: {
        color: COLORS[0].TEXT,
        fontWeight: "bold",
        fontSize: 20,
    },
    image: {
        width: width,
        height: 200,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color:'black',
        alignSelf:'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingLeft: 10,
        marginHorizontal:10
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})