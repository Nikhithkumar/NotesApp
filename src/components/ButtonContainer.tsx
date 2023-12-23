import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { XStyleSheet } from '../theme/Responsive';

// interface ButtonContainerProps {
//     buttons: [],
//     onClick: void,
//     scrollX:
// }

const width = Dimensions.get('window').width

const ButtonContainer = ({ buttons, scrollX }: any) => {
    const [btnContainerWidth, setWidth] = useState(0);
    const btnWidth = btnContainerWidth / buttons.length;
    const translateX = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: [0, btnWidth],
    });
    const translateXOpposit = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: [0, -btnWidth],
    });

    const onClick=(i)=>{
        
    }

    return (
        <View
            style={styles.btnContainer}
            onLayout={e => setWidth(e.nativeEvent.layout.width)}>
            {buttons.map((btn:any, i:any) => (
                <TouchableOpacity
                    key={btn}
                    style={styles.btn}
                    onPress={onClick}>
                    <Text style={styles.btnTextActive}>{btn}</Text>
                </TouchableOpacity>
            ))}
            <Animated.View
                style={[
                    styles.animatedBtnContainer,
                    { width: btnWidth, transform: [{ translateX }] },
                ]}>
                {buttons.map(btn => (
                    <Animated.View
                        key={btn}
                        style={[
                            styles.animatedBtn,
                            { width: btnWidth, transform: [{ translateX: translateXOpposit }] },
                        ]}>
                        <Text style={styles.btnTextActive}>{btn}</Text>
                    </Animated.View>
                ))}
            </Animated.View>
        </View>
    )
}

export default ButtonContainer

const styles = XStyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 5
    },
    btnContainer: {
        height: 40,
        borderRadius: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: '#00000011',
        width: '100%',
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedBtnContainer: {
        height: 40,
        flexDirection: 'row',
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
    },
    animatedBtn: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextActive: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize:20
    },
   
})