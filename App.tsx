import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home'
import AddNotes from './src/screens/AddNotes'
//import SplashScreen from 'react-native-splash-screen'

const Stack=createNativeStackNavigator()

const App = () => {

  // useEffect(()=>{
  //   SplashScreen.hide()
  // },[])

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown:false
        }}>
          <Stack.Screen name="Home" component={Home}  options={{
            animation:'slide_from_bottom'
          }}/>
          <Stack.Screen name='AddNotes' component={AddNotes} options={{
            animation:'slide_from_bottom'
          }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

