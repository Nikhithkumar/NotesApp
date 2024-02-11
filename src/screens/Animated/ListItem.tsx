import { Appearance, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { XStyleSheet } from '../../theme/Responsive'
import { COLORS } from '../../constants/Colors';
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerProps } from 'react-native-gesture-handler';
import { TaskInterface } from './SwipeToDelete';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Animated, { FadeInUp, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const colorScheme = Appearance.getColorScheme();

interface ListItemProps
    extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    task: TaskInterface;
    onDismiss?: (task: TaskInterface) => void;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;
const LIST_ITEM_HEIGHT = 60

const ListItem: React.FC<ListItemProps> = ({
    task,
    onDismiss,
    simultaneousHandlers,
}) => {

    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
    const marginVertical = useSharedValue(10);
    const opacity = useSharedValue(1);


    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                marginVertical.value = withTiming(0);
                opacity.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished && onDismiss) {
                        runOnJS(onDismiss)(task);
                    }
                });
            } else {
                translateX.value = withTiming(0);
            }
        },
    });

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));

    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(
            translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
        );
        return { opacity };
    });

    const rTaskContainerStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            marginVertical: marginVertical.value,
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View
            style={[styles.taskContainer, rTaskContainerStyle]}
            entering={FadeInUp.duration(500).delay(task.index * 100)}
        >

            <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
                <FontAwesome5 name={'trash-alt'} size={LIST_ITEM_HEIGHT * 0.4} color={'red'} />
            </Animated.View>
            <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>
                <AnimatedLinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.task, rStyle]}
                    colors={[
                        'rgba(223,0,0,1)',
                        'rgba(214,91,0,1)',
                        'rgba(233,245,0,1)',
                        'rgba(23,255,17,1)',
                        'rgba(29,255,255,1)',
                        'rgba(5,17,255,1)',
                        'rgba(202,0,253,1)',
                    ]}
                >
                    <View style={[styles.taskView]}>
                        <Text style={styles.taskTitle}>{task.title}</Text>
                    </View>
                </AnimatedLinearGradient>

            </PanGestureHandler>
        </Animated.View>
    )
}

export default ListItem

const getStyles = (Theme: number) => XStyleSheet.create({
    taskContainer: {
        width: '100%',
        alignItems: 'center',
    },
    task: {
        width: '90%',
        height: LIST_ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS[Theme].PRIMARY_BLACK,
        borderColor: COLORS[Theme].PRIMARY_WHITE,
        borderRadius: 10,
        // Shadow for iOS
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
        // Shadow for Android
        elevation: 5,
    },
    taskView: {
        width: '99%',
        height: LIST_ITEM_HEIGHT - 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS[Theme].PRIMARY_BLACK,
        borderColor: COLORS[Theme].PRIMARY_WHITE,
    },
    card: {
        flexGrow: 1,
        width: "90%",
        height: LIST_ITEM_HEIGHT,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskTitle: {
        fontSize: 16,
    },
    iconContainer: {
        height: LIST_ITEM_HEIGHT,
        width: LIST_ITEM_HEIGHT,
        position: 'absolute',
        right: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const styles = getStyles(colorScheme == 'dark' ? 0 : 1);
