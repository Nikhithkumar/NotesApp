import { Appearance, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import Animated, { FadeIn, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { COLORS } from '../../../constants/Colors';

interface MenuItem{
    id:number;
    name:string;
}

const data:MenuItem[]=[
    { id: 1, name: "Burger" },
    { id: 2, name: "Pizza" },
    { id: 3, name: "Pasta" },
    { id: 4, name: "Salad" },
]
const AnimatedPress = Animated.createAnimatedComponent(TouchableOpacity)
const colorScheme = Appearance.getColorScheme();

const MenuList:FC = () => {
    const translateX=useSharedValue(0);
    const totalWidth=useRef(0);
    const [activeIndex,setActiveIndex]=useState(0)
    const selectMenu=(event:any,index:number)=>{
        setActiveIndex(index)
    }

    const animatedStyle=useAnimatedStyle(()=>{
        return{
            transform:[{translateX:translateX.value}]
        }
    })

    const renderItem=(item:{item:MenuItem,index:number})=>{
        const bg = activeIndex == item?.index?"#FFD580":"gray";
        const br = activeIndex == item?.index?"#FFA500":"gray";

        return (
            <AnimatedPress
                style={[styles.singleRender, { backgroundColor: bg, borderWidth: 0.5, borderColor: br }]}
                onPress={(e) => selectMenu(e, item.index)}
                entering={FadeIn.duration(1000).delay(item?.index *200)}
            >
                <Text style={styles.content}>{item.item.name}</Text>
            </AnimatedPress>
        )
    }

  return (
    <View style={styles.container} onLayout={(e) => { totalWidth.current = e.nativeEvent.layout.width }}>
    <FlatList
        data={data}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
    />
</View>
  )
}

export default MenuList

const getStyles =(THEME: number) =>  StyleSheet.create({
    container:{
        width:"100%",
        height:"10%",
        alignItems:"center",
        justifyContent:"center"
    },
    singleRender:{
        height:"80%",
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:10,
        borderRadius:10,
        paddingHorizontal:18
    },
    content:{
        fontSize:16,
        fontWeight:"700",
        color: COLORS[THEME].PRIMARY_WHITE,
    },
    slider:{
        height:2,
        width:50,
    }
})

const styles = getStyles(colorScheme == 'dark' ? 0 : 1);
