import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../constants/Colors'
import { useSelector } from 'react-redux'

const Card = ({ navigation, data, index }: any) => {
    const Theme = useSelector((state: any) => state.theme.data)
    return (
        <TouchableOpacity key={index}
            onPress={() => { navigation.navigate('AddNotes', { data, index }) }}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
                colors={[COLORS[Theme].LINER, COLORS[Theme].BLACK]}>

                <Text style={[styles.create,{color:COLORS[Theme].PRIMARY_WHITE}]}>{data?.OrderDate?.slice(0, 6)}</Text>
                <Text numberOfLines={1} style={[styles.title,{color:COLORS[Theme].PRIMARY_WHITE}]}>{data.title}</Text>
                <Text numberOfLines={1} style={[styles.category,{color:COLORS[Theme].PRIMARY_WHITE}]}>{data.Category}</Text>
                <Text numberOfLines={4} style={[styles.note,{color:COLORS[Theme].PRIMARY_WHITE}]}>{data.Discription}</Text>
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