import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useCameraPermission } from 'react-native-vision-camera';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const GoogleScanner = (props: any) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  console.log(props.route.params);

  const onPress = () => {
    if (hasPermission) {
      props.navigation.navigate('Scanner')
    } else {
      requestPermission()
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1,backgroundColor:'#0C0F14' }}>
        <View style={{ flex: 1, padding: 16, justifyContent: 'space-around', alignItems: 'center' }}>
          <TouchableOpacity style={styles.btnContainer} onPress={onPress} >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Scan Now</Text>
          </TouchableOpacity>
          <View style={{ padding: 12, borderWidth: 2, width: "100%", height: 200, borderRadius: 16, borderColor: "#FF725E" }}>
            <Text style={{ color: "#ffffff", borderBottomWidth: 1, borderColor: "#ffffff", paddingVertical: 8, marginBottom: 8, borderStyle: "dashed", fontWeight: "500" }}>Scanned Details</Text>
            <Text style={{ color: "#ffffff" }}>
              {props.route.params && props.route.params.codes && JSON.stringify(props.route.params.codes)}
            </Text>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

export default GoogleScanner

const styles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: '#0C0F14',
    borderRadius: 8,
    borderColor: "#FF725E" ,
    borderWidth: 2,
  },
})