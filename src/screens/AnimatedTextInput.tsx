import React, { useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import AnimatedInput from '../components/AnimatedInput';
import ButtonContainer from '../components/ButtonContainer';

const width=Dimensions.get('window').width

export default function AnimatedTextInput() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const scrollViewRef:any = useRef(null);

    const scrollX = useRef(new Animated.Value(0)).current;
    const buttons = ['btn 1', 'btn 2', 'btn 3', 'btn 4', 'btn 5'];


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <AnimatedInput value={name} onChange={setName} placeholder="Name" />
            <AnimatedInput value={email} onChange={setEmail} placeholder="Email" />
            <AnimatedInput
                value={address}
                onChange={setAddress}
                placeholder="Address"
                multiline
            />
            <ButtonContainer buttons={buttons} onClick={()=>{}} scrollX={scrollX} />
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor:'#0C0F14',
        flexGrow:1
    },
});