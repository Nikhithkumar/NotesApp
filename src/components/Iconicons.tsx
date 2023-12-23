import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Icons from "react-native-vector-icons/Ionicons"

interface iconType{
    name:string,
    size:number,
    color:string
}
const Iconicons:FC<iconType> = ({name,size,color}) => {
  return (
   <Icons name={name} size={size} color={color}/>
  )
}

export default Iconicons

