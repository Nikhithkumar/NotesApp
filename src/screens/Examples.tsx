import { Appearance, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { XStyleSheet } from '../theme/Responsive'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../constants/Colors'

const width = Dimensions.get('screen').width
const colorScheme = Appearance.getColorScheme();

const Examples = () => {
    const Screens: string[] = ['ChatStack', 'Calendar', 'GoogleScanner', "AnimatedTextInput", "BugerList", "Responsive","Context"]
    const navigation: any = useNavigation()

    return (
        <View style={styles.container}>
            <FlatList
                data={Screens}
                numColumns={2}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }: { item: string }) => { 
                    return (
                        <TouchableOpacity style={styles.Box} onPress={() => navigation.navigate(item)} >
                            <Text style={{color:'#FFFFFF',fontWeight:'800'}}>{item}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default Examples

const getStyles =(Theme: number) =>  XStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS[Theme].PRIMARY_BLACK,
    },
    Box: {
        width: (width / 2) - 20,
        height: 150,
        borderRadius: 20,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        margin:10,
    },
})

const styles = getStyles(colorScheme == 'dark' ? 0 : 1);
