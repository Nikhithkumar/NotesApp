import { View, Text, StyleSheet, TouchableOpacity, Appearance } from 'react-native'
import React from 'react'
import Iconicons from '../../../components/Iconicons'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../constants/Colors'
import { useSelector } from 'react-redux'

const colorScheme = Appearance.getColorScheme();

const Header = () => {
    const navigation=useNavigation()
    const Theme = useSelector((state: any) => state.theme.data)
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Iconicons name='menu' size={26} color={COLORS[Theme].PRIMARY_WHITE}/>
            </TouchableOpacity>
            <Iconicons name='cart-outline' size={26} color={COLORS[Theme].PRIMARY_WHITE}/>
        </View>
    )
}

export default Header

const getStyles =(THEME:number)=> StyleSheet.create({
    container: {
        width: "100%",
        height: "6%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "5%",
        justifyContent: "space-between",
        backgroundColor:COLORS[THEME].PRIMARY_BLACK,
    },
    location: {
        fontSize: 14,
        fontWeight: "700",
        color: "gray",
        letterSpacing: 1.5,
        marginLeft: "35%"
    }
});

const styles = getStyles(colorScheme == 'dark' ? 0 : 1);
