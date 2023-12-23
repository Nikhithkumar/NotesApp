import React, { useRef, useState,memo, useEffect } from 'react';
import { Animated, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { XStyleSheet } from '../theme/Responsive';

const  AnimatedInput=({ value, onChange, placeholder, multiline }:any)=> {
    const [inputHeight, setHeight] :any= useState(null);
    const [placeholderWidth, setWidth] = useState(null);
    const animation = useRef(new Animated.Value(0)).current;
    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -inputHeight / 2],
    });
    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -placeholderWidth / 4],
    });
    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.5],
    });
    const onFocus = () => animate(1);
    const onBlur = () => !value && animate(0);
    const animate = val => {
        Animated.spring(animation, {
            toValue: val,
            bounciness: 0,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View
            style={styles.inputContainer}
            onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
            <View style={{ height: inputHeight, ...styles.placeholderContainer }}>
                <Animated.Text
                    style={[
                        styles.placeholder,
                        { transform: [{ translateY }, { translateX }, { scale }] },
                    ]}
                    onTextLayout={e =>
                        !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
                    }>
                    {placeholder}
                </Animated.Text>
            </View>
            <TextInput
                style={[
                    styles.input,
                    multiline && { height: 100, textAlignVertical: 'top' },
                ]}
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={onChange}
                multiline={multiline}
            />
        </View>
    );
}

export default memo(AnimatedInput)

const styles = XStyleSheet.create({
    container: {
        padding: 20,
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ffffff',
        marginBottom: 25,
        backgroundColor:'#0C0F14'
    },
    input: {
        paddingHorizontal: 10,
        fontSize: 18,
    },
    placeholderContainer: {
        position: 'absolute',
        backgroundColor: 'red',
        justifyContent: 'center',
    },
    placeholder: {
        fontSize: 22,
        position: 'absolute',
        marginHorizontal: 5,
        paddingHorizontal: 5,
        backgroundColor:'#0C0F14' ,
        color: '#999',
    },
});