import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Card = ({ navigation, data, index }: any) => {


    return (
        <TouchableOpacity key={index}
            onPress={() => { navigation.navigate('AddNotes', { data, index }) }}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
                colors={['#252A32', '#0C0F14']}>

                <Text style={styles.create}>{data?.OrderDate?.slice(0, 6)}</Text>
                <Text numberOfLines={1} style={styles.title}>{data.title}</Text>
                <Text numberOfLines={1} style={styles.category}>{data.Category}</Text>
                <Text numberOfLines={4} style={styles.note}>{data.Discription}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        borderRadius: 5,
        margin: 20,
        paddingRight: 20,
        width: 138,
        height: 136,
        color: '#fff',
        borderColor: '#FFF',
        borderWidth: .5
    },
    create: {
        fontSize: 11,
        alignSelf: 'flex-end',
        color: '#fff',
        right: -10,
        top: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        top: 10,
        left: 10,
    },
    category: {
        color: '#FFFBFB',
        fontSize: 13,
        top: 8,
        left: 10
    },
    note: {
        color: '#fff',
        fontSize: 12,
        top: 10,
        left: 10
    }
})