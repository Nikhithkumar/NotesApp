import { Appearance, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Animated, { FadeInRight, FadeInUp, SlideInLeft } from 'react-native-reanimated'
import Iconicons from '../../../components/Iconicons'
import { COLORS } from '../../../constants/Colors'

const colorScheme = Appearance.getColorScheme();

const Searchbox = () => {
    const text = 'Burger Lauch'
    return (
        <View style={styles.container}>
            <View style={styles.textView} >
                {text.split('').map((letter, index) => (
                    <Animated.Text style={styles.brandName} key={index} entering={FadeInRight.duration(1500).delay(index * 50)}>{letter}</Animated.Text>
                ))}
                <Animated.Text style={[styles.brandName, { marginLeft: "4%" }]} entering={SlideInLeft.duration(500)}>🍔</Animated.Text>
            </View>
            {/* <Animated.View style={styles.searchView} entering={FadeInUp.duration(1000).delay(1000)}>
                <View style={styles.box}>
                    <Iconicons name='search' size={22} color='gray' />
                    <TextInput placeholder='Search Item' style={styles.input} />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Iconicons name='filter' size={22} color='gray' />
                </TouchableOpacity>
            </Animated.View> */}
        </View>
    )
}

export default Searchbox

const getStyles = (THEME: number) => StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: "5%",
        height: "10%",
        justifyContent: "center"
    },
    brandName: {
        fontSize: 28,
        fontWeight: "600",
        color: COLORS[THEME].PRIMARY_WHITE,
    },
    textView: {
        width: "100%",
        flexDirection: "row",
    },
    searchView: {
        width: "100%",
        height: "40%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: "5%"
    },
    box: {
        width: "80%",
        height: "100%",
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        borderColor: "#d3d3d3",
        borderWidth: 0.5,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "5%"
    },
    input: {
        fontSize: 14,
        color: "gray",
        marginLeft: "5%"
    },
    filterButton: {
        height: "100%",
        padding: "2%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        width: "15%",
        borderColor: "#d3d3d3",
        borderWidth: 0.5,
    }
})
const styles = getStyles(colorScheme == 'dark' ? 0 : 1);
