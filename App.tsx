import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home'
import AddNotes from './src/screens/AddNotes'
import ChatStack from './src/navigation/ChatStack'
import Calendar from './src/screens/Calendar'
import CalendarScreen from './src/screens/Calendar'
import GoogleScanner from './src/screens/GoogleScanner'
import Scanner from './src/screens/Scanner'
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
           <Stack.Screen name='ChatStack' component={ChatStack} options={{
            animation:'slide_from_bottom'
          }}/>
           <Stack.Screen name='Calendar' component={CalendarScreen} options={{
            animation:'slide_from_bottom'
          }}/>
           <Stack.Screen name='GoogleScanner' component={GoogleScanner} options={{
            animation:'slide_from_bottom'
          }}/>
           <Stack.Screen name='Scanner' component={Scanner} options={{
            animation:'slide_from_bottom'
          }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

