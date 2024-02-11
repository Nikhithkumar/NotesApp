import { Alert, Appearance, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import { XStyleSheet } from '../../theme/Responsive'
import { COLORS } from '../../constants/Colors';


const width = Dimensions.get('screen').width
const colorScheme = Appearance.getColorScheme();

const GoogleLogin = () => {

  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    const configureGoogleSignIn = async () => {
      GoogleSignin.configure();
      requestUserPermission();
      await messaging().registerDeviceForRemoteMessages();
      try {
        const token = await messaging().getToken();
        console.log('Device Token:', token);
      } catch (error) {
        console.error('Error obtaining token:', error);
      }
    };

    configureGoogleSignIn();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log("notications caused app to open or closed", remoteMessage.notification)
  })

  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage)
      console.log("notications caused app to open or closed", remoteMessage.notification)
  })

  const GoogleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  }

  const GoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo= await GoogleSignin.signIn();
      console.log(userInfo, "userInfor================================================================>")
      setUserInfo({ userInfo, error: undefined });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error.message)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error.message)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error.message)
      } else {
        console.log(error)
      }
    }
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => GoogleSignIn()}>
        <Text style={styles.text}>Google SignIn</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.text}>Push Notification</Text>
      </TouchableOpacity>


      <GoogleSigninButton
        style={styles.btn}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={GoogleSignIn}
        disabled={false}
      />
      <TouchableOpacity style={styles.btn} onPress={() => GoogleSignOut()}>
        <Text style={styles.text}>SignOut</Text>
      </TouchableOpacity>

    </View>
  )
}

export default GoogleLogin

const getStyles = (Theme: number) => XStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS[Theme].PRIMARY_BLACK,
    gap:10
  },
  btn: {
    width: (width / 2),
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS[Theme].PRIMARY_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 30
  },
  text: {
    color: COLORS[Theme].PRIMARY_WHITE,
    fontWeight: '800',
    fontSize: 20,
  }
})

const styles = getStyles(colorScheme == 'dark' ? 0 : 1);