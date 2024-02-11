import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { COLORS } from '../../constants/Colors'

const Loader = () => {
  return (
    <View style={styles.container}>
        <ActivityIndicator color={COLORS[0].PRIMARY_WHITE} size={"large"}/>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:'center',
        alignItems:'center'
    }
})