import React, { useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import AnimatedInput from '../components/AnimatedInput';

export default function AnimatedTextInput() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
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
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor:'#0C0F14',
        flex:1
    },
});