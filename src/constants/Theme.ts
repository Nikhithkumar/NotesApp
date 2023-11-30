
import React from 'react'
import { useSelector } from 'react-redux'

const Theme = () => {
    const Theme = useSelector((state: any) => state.theme.data)
  return Theme
}

export default Theme


    

