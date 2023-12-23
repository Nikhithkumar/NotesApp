import { Appearance, Image, StyleSheet, Text, TouchableOpacity, View, ViewToken } from 'react-native'
import React, { FC, useState } from 'react'
import Animated, { FadeInLeft, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Iconicons from '../../../components/Iconicons';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../constants/Colors';

interface MenuItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  bg: string;
}

interface itemType {
  item: MenuItem,
  index: number,
  viewableItems: Animated.SharedValue<ViewToken[]>
}

const AnimatedImage = Animated.createAnimatedComponent(Image)
const colorScheme = Appearance.getColorScheme();

const ItemSingleRender: FC<itemType> = ({ item, index, viewableItems }) => {
  const [isFav, setIsFav] = useState(false)
  const Theme = useSelector((state: any) => state.theme.data)

  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItems) => viewableItems.item.id === item.id)
    )

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        }
      ]
    }
  }, []);


  return (
    <Animated.View style={[styles.container, rStyle]}>
      <View style={[styles.topPiece, { backgroundColor: item?.bg }]} />
      <View style={[styles.box, { backgroundColor: item?.bg }]}>
        <AnimatedImage entering={FadeInLeft.duration(500).delay(index * 100)} source={require("../../../assets/Images/bg2.png")} style={styles.image} />

        <Text style={styles.productName}>{item?.name}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={() => setIsFav((p) => !p)}>
          <Iconicons name={isFav ? 'heart' : 'heart-outline'} size={28} color={COLORS[Theme].ORANGE} />
        </TouchableOpacity>
        <Text style={styles.description}>Classic cheese burger</Text>
        <View style={styles.priceView}>
          <View style={styles.price}>
            <Text style={styles.priceText}>₹{item?.price}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  )
}

export default ItemSingleRender

const getStyles = (THEME: number) => StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%"
  },
  box: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    // elevation: 1,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 1,
    // alignItems:"center",
    // justifyContent:"center",
  },
  image: {
    width: 120,
    height: 120,
    position: "absolute",
    // left:"0%",
    bottom: "80%",
    right: "78%"
  },
  topPiece: {
    width: "90%",
    height: 70,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    top: "7%",
    right: 1.5,
    transform: [{ rotate: "-3deg" }],
  },
  productName: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    left: "30%"
  },
  saveButton: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "rgba(58,58,58,0.1)",
    left: "80%",
    bottom: "60%",
    alignItems: "center",
    justifyContent: "center"
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    left: "35%",
    bottom: "20%",
    color: COLORS[THEME].PRIMARY_WHITE
  },
  price: {
    height: 60,
    width: 80,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  priceView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  priceText: {
    fontSize: 16,
    fontWeight: "800",
    color: "black"
  }
})

const styles = getStyles(colorScheme == 'dark' ? 0 : 1);
