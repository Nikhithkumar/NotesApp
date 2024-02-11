import { Appearance, FlatList, StyleSheet, Text, TouchableWithoutFeedback, View, Vibration } from 'react-native'
import React, { useRef, useState } from 'react'
import { useSharedValue } from 'react-native-reanimated';
import CircularCarouselListItem, { ListItemWidth } from './CircularCarouselListItem';
import { XStyleSheet } from '../../theme/Responsive';

const colorScheme = Appearance.getColorScheme();

const SwipeBottom = () => {
    const contentOffset = useSharedValue(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const vibrateDevice = () => {
        Vibration.vibrate(60);
    };

    const onScroll = (event:any) => {
        contentOffset.value = event.nativeEvent.contentOffset.x;
        const visibleIndex = Math.floor(event.nativeEvent.contentOffset.x / ListItemWidth);
        if (visibleIndex !== currentIndex) {
            setCurrentIndex(visibleIndex);
            vibrateDevice();
        }
    };

    return (
        <View style={styles.container}>
             <FlatList
                ref={flatListRef}
                data={[1,2,3,4,5,6,7,8,9,10]}
                horizontal
                keyExtractor={(_, index) => index.toString()}
                scrollEventThrottle={1}
                onScroll={onScroll}
                showsHorizontalScrollIndicator={false}
                snapToInterval={ListItemWidth}
                pagingEnabled
                style={{
                    position: 'absolute',
                    bottom: 0,
                    height: 200,
                }}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 1.5 * ListItemWidth,
                }}
                renderItem={({ item, index }) => (
                    <CircularCarouselListItem
                        contentOffset={contentOffset}
                        index={index} />
                )} />
        </View>
    )
}

export default SwipeBottom

const getStyles = (Theme: number) => XStyleSheet.create({
    container: {
        flex: 1
    }
});

const styles = getStyles(colorScheme == 'dark' ? 0 : 1);