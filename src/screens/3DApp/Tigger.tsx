import React, { useEffect } from 'react'
import { View } from 'react-native'

type Props = {
    setLoading:React.Dispatch<React.SetStateAction<boolean>>;
}

const Tigger = ({setLoading}: Props) => {

    useEffect(()=>{
        setLoading(true)
        return()=>{
            setLoading(false)
        }
    },[setLoading])

  return (
   <></>
  )
}

export default Tigger