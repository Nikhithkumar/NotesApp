import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChannelList,MessageList, MessageInput, Channel } from 'stream-chat-react-native'
import { chatApiKey, chatUserId } from '../store/chatConfig'
import { useAppContext } from '../components/AppContext';

const filters = {
    members: {
        '$in': [chatUserId]
    },
};

const sort = {
    last_message_at: -1,
};

export const ChannelScreen=(props:any)=>{
    const { channel }:any = useAppContext();

    return (
        <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      );
}

const ChatScreen = (Props: any) => {
    const { setChannel } = useAppContext();

    return (
        <View>
            <ChannelList
                onSelect={(channel) => {
                    const { navigation } = Props;
                    setChannel(channel);
                    navigation.navigate('ChannelScreen');
                }}
                filters={filters}
                sort={sort}
            />
        </View>
    )
}

export default ChatScreen
