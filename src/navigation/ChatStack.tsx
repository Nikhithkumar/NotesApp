import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useChatClient } from '../components/useChatClient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from '../components/AppContext';
import {
    OverlayProvider, Chat
} from 'stream-chat-react-native';
import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../store/chatConfig';
import ChatScreen, { ChannelScreen } from '../screens/Chat';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
    const { clientIsReady } = useChatClient();
    console.log(clientIsReady)
    const chatClient = StreamChat.getInstance(chatApiKey);

    if (!clientIsReady) {
        return <Text>Loading chat ...</Text>
    }

    return (
        <AppProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                        <OverlayProvider>
                            <Chat client={chatClient}>
                                <Stack.Navigator initialRouteName='ChatScreen'>
                                    <Stack.Screen name="ChatScreen" component={ChatScreen}/>
                                    <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
                                </Stack.Navigator>
                            </Chat>
                        </OverlayProvider>
                </SafeAreaView>
            </GestureHandlerRootView>
        </AppProvider>
    )
}

export default ChatStack

