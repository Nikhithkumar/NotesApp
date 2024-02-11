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
import AnimatedTextInput from './src/screens/AnimatedTextInput'
import { Appearance } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from './src/redux/ThemeSlice'
import Responsive from './src/screens/Responsive'
import BugerStack from './src/navigation/BugerStack'
import Examples from './src/screens/Examples'
import { AuthProvider } from './src/screens/ContextApp'
import Context from './src/screens/ContextApp/components/App'
import ShopApp from './src/screens/3DApp/App'
import SwipeApp from './src/screens/Animated/SwipeToDelete'
import GoogleLogin from './src/screens/GoogleAuth/GoogleLogin'
//import SplashScreen from 'react-native-splash-screen'

const Stack = createNativeStackNavigator()

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const dispatch = useDispatch()

  const changeColor = () => {
    if (colorScheme == "dark") {
      dispatch(changeTheme(0))
    }
    else {
      dispatch(changeTheme(1))
    }
  }

  useEffect(() => {
    changeColor()
  }, [colorScheme])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={Home} options={{
          animation: 'slide_from_bottom'
        }} />
        <Stack.Screen name='AddNotes' component={AddNotes} options={{
          animation: 'slide_from_bottom'
        }} />
        <Stack.Screen name='ChatStack' component={ChatStack} options={{
          animation: 'slide_from_bottom'
        }} />
        <Stack.Screen name='Calendar' component={CalendarScreen} options={{
          animation: 'slide_from_bottom'
        }} />
        <Stack.Screen name='GoogleScanner' component={GoogleScanner} options={{
          animation: 'slide_from_bottom'
        }} />
        <Stack.Screen name='Scanner' component={Scanner} options={{
          animation: 'slide_from_bottom'
        }} />
        <Stack.Screen name='AnimatedTextInput' component={AnimatedTextInput} options={{
          animation: 'slide_from_bottom'
        }} />
        <Stack.Screen name='Responsive' component={Responsive} options={{
          animation: 'slide_from_bottom'
        }} />
        <Stack.Screen name='BugerList' component={BugerStack} options={{
          animation: 'slide_from_bottom'
        }} />
        <Stack.Screen name='Examples' component={Examples} options={{
          animation: 'slide_from_bottom'
        }} />
        <Stack.Screen name='Context' component={Context} options={{
          animation: 'slide_from_bottom'
        }} />
        <Stack.Screen name="Shoe" component={ShopApp} options={{ 
          animation: 'slide_from_bottom' 
        }} />
        <Stack.Screen name="SwipeApp" component={SwipeApp} options={{ 
          animation: 'slide_from_bottom' 
          }} />
        <Stack.Screen name="GoogleLogin" component={GoogleLogin} options={{ 
          animation: 'slide_from_bottom' 
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

