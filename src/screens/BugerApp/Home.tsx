import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Components/header'
import Searchbox from './Components/searchbox'
import Menu from './Components/menu'
import { COLORS } from '../../constants/Colors'
import { useSelector } from 'react-redux'

const Home = () => {
  const Theme = useSelector((state: any) => state.theme.data)
  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: COLORS[Theme].PRIMARY_BLACK }}>
      <Header />
      <Searchbox />
      <Menu />
    </View>
  )
}

export default Home

