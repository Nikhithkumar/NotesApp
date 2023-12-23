import { FlatList, StyleSheet, Text, View, ViewToken } from 'react-native'
import React from 'react'
import { useSharedValue } from 'react-native-reanimated'
import MenuList from './menuList'
import ItemSingleRender from './ItemSingleRender'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const Menu = () => {
  const data = [
    { id: 0, name: "Cheese Burger", imageUrl: require("../../../assets/Images/bg.png"), price: 100, bg: "#FEB163" },
    { id: 1, name: "Spicy Burger", imageUrl: require("../../../assets/Images/bg2.png"), price: 150, bg: "#90EE90" },
    { id: 2, name: "Hum Burger", imageUrl: require("../../../assets/Images/bg3.png"), price: 150, bg: "#FEB163" },
    { id: 3, name: "Crispy Burger", imageUrl: require("../../../assets/Images/bg4.png"), price: 150, bg: "#90EE90" }
  ]

  const BottomHeight:number=useBottomTabBarHeight()
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const onViewCallBack = React.useCallback(({ viewableItems: vItems }) => {
    viewableItems.value = vItems;
  }, [])

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 10 })

  return (
    <View style={[styles.container,{marginBottom:BottomHeight}]}>
      <MenuList />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onViewableItemsChanged={onViewCallBack}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item, index }) => {
          return <ItemSingleRender item={item} index={index} viewableItems={viewableItems} />;
        }}
      />
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "75%",
  }
})