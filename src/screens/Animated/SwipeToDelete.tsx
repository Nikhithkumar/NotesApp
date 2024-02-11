import { Appearance, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { COLORS } from '../../constants/Colors'
import { XStyleSheet } from '../../theme/Responsive'
import ListItem from './ListItem'
import SwipeButton from './SwipeButtom'
import SwipeBottom from '../SwipeBottom/SwipeBottom'

const TITLES = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍🏼 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo',
];

export interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));

const colorScheme = Appearance.getColorScheme();

const SwipeToDelete = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value:boolean) => setToggleState(value);

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index));
  }, []);

  const scrollRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        {tasks.map((task) => (
          <ListItem
            simultaneousHandlers={scrollRef}
            key={task.index}
            task={task}
            onDismiss={onDismiss}
          />
        ))}
        <View style={styles.swipeBox}>
          <SwipeButton onToggle={handleToggle} />
        </View>
        <SwipeBottom />
      </ScrollView>
    </SafeAreaView>
  );
}



const SwipeApp = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SwipeToDelete />
    </GestureHandlerRootView>
  )
}

export default SwipeApp

const getStyles = (Theme: number) => XStyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS[Theme].PRIMARY_BLACK,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: '5%',
  },
  swipeBox: {
    bottom: 0,
    backgroundColor: COLORS[Theme].LIGHT_BLACK,
    height: 100,
    borderRadius: 10,
  }
})

const styles = getStyles(colorScheme == 'dark' ? 0 : 1);
