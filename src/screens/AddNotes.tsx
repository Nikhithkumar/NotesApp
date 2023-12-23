import {
    StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Dimensions,
    TouchableWithoutFeedback, Modal, FlatList, Appearance
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStore } from '../store/store'
import uuid from 'react-native-uuid';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { COLORS } from '../constants/Colors';
import { useSelector } from 'react-redux';
import { XStyleSheet } from '../theme/Responsive';

const w = Dimensions.get('window').width
const colorScheme = Appearance.getColorScheme();

const AddNotes = ({ navigation, route }: any) => {

    const value = useSharedValue(0)
    const update = useSharedValue(0)
    const [title, setTitle]: any = useState('')
    const [discription, setDiscription]: any = useState('')
    const [error, setError] = useState('')
    const [category, setCategory]: any = useState('')
    const [editData, setEditData]: any = useState(false)
    const [visible, setVisible] = useState(false)
    const addToNote = useStore((state: any) => state.addToNote);
    const deleteToNote = useStore((state: any) => state.deleteNote)
    const updateToNote = useStore((state: any) => state.updateNote)
    const Theme = useSelector((state: any) => state.theme.data)

    const d = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const { data, index }: any = route?.params

    useEffect(() => {
        console.log("ddldl", data)
        if (data != null && data != "") {
            setTitle(data.title)
            setCategory(data.Category)
            setDiscription(data.Discription)
            setEditData(true)
        }
    }, [])

    const heightStyle = useAnimatedStyle(() => {
        const marginTop = interpolate(
            value.value,
            [0, 1],
            [-15, 0]
        )
        const paddingBottom = interpolate(
            value.value,
            [0, 1],
            [15, 0]
        )
        return {
            marginTop, paddingBottom
        }
    })

    const updateStyle = useAnimatedStyle(() => {
        const marginTop = interpolate(
            update.value,
            [0, 1],
            [-15, 0]
        )
        const paddingBottom = interpolate(
            update.value,
            [0, 1],
            [15, 0]
        )
        return {
            marginTop, paddingBottom
        }
    })

    const updateInnerStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            update.value, [0, 1], [12, 16]
        )
        return { borderRadius }
    })

    const innerStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            value.value, [0, 1], [12, 16]
        )
        return { borderRadius }
    })



    const handlePress = (type: string) => {

        if (type == "AddNote") {
            value.value = withTiming(1, {
                duration: 100
            })
            setTimeout(() => {
                submitButton();
            }, 300)
        }
        else if (type == "Update") {
            update.value = withTiming(1, {
                duration: 100
            })
            setTimeout(() => {
                updateNote()
            }, 300)

        }
        else if (type == "Delete") {
            value.value = withTiming(1, {
                duration: 100
            })
            setTimeout(() => {
                deleteNote()
            }, 300)

        }

    }

    const onUpdateUp = () => {
        update.value = withTiming(0, {
            duration: 50
        })
    }

    const onButtonUp = () => {
        value.value = withTiming(0, {
            duration: 50
        })
    }


    const submitButton = () => {
        setVisible(false)
        if (title.trim() == "") {
            setError("Please enter title")
            setVisible(true)
        }
        else if (category.trim() == "") {
            setError("Please enter Category")
            setVisible(true)
        }
        else if (discription.trim() == "") {
            setError("Please enter Discription")
            setVisible(true)
        }
        else {
            setVisible(false)
            const data = {
                id: uuid.v4(),
                title: title,
                Discription: discription,
                Category: category,
                OrderDate: d.getDate() + ' ' + month[d.getMonth()]
            }
            addToNote(data)
            setTitle('')
            setDiscription('')
            setCategory('')
            navigation.navigate('Home')
        }
    }

    const deleteNote = () => {
        deleteToNote(index)
        navigation.navigate('Home')
    }

    const updateNote = () => {
        const data: any = {
            id: index,
            title: title,
            Discription: discription,
            Category: category,
            OrderDate: d.getDate() + ' ' + month[d.getMonth()]
        }
        updateToNote(data)
        navigation.navigate('Home')
    }

    const AnimatedButton = ({ data }: any) => {
        return (
            <TouchableWithoutFeedback style={{ alignItems: 'center', alignSelf: 'center' }} onPressIn={() => navigation.navigate(data)} onPressOut={onButtonUp}>
                <View style={styles.outer}>
                    <Animated.View style={[styles.height, heightStyle]}>
                        <Animated.View style={[styles.inner, innerStyle]}>
                            <Text style={[styles.white, { color: COLORS[Theme].PRIMARY_WHITE }]}>{data.slice(0, 10)}</Text>
                        </Animated.View>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled' keyboardDismissMode='interactive'>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' color={COLORS[Theme].PRIMARY_WHITE} size={20} />
                </TouchableOpacity>
                <Text style={styles.Heading}>{data != null ? "UPDATE NOTE" : "ADD NOTE"}</Text>
            </View>
            <View style={styles.card}>
                <TextInput placeholder="ADD TITLE..."
                    value={title}
                    style={styles.Input}
                    placeholderTextColor={COLORS[Theme].PRIMARY_WHITE}
                    onChangeText={(text) => setTitle(text)}
                />
                <TextInput placeholder="ADD CATEGORY..."
                    value={category}
                    style={styles.Input}
                    placeholderTextColor={COLORS[Theme].PRIMARY_WHITE}
                    onChangeText={(text) => setCategory(text)}
                />
                <TextInput underlineColorAndroid="transparent"
                    placeholder="ADD DESCRIPTION..."
                    value={discription}
                    placeholderTextColor={COLORS[Theme].PRIMARY_WHITE}
                    style={styles.TextInputDescription}
                    onChangeText={(text) => setDiscription(text)}
                    multiline={true}
                    numberOfLines={4} />
                {editData ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableWithoutFeedback onPressIn={() => handlePress('Delete')} onPressOut={onButtonUp}>
                            <View style={styles.outer}>
                                <Animated.View style={[styles.height, heightStyle]}>
                                    <Animated.View style={[styles.inner, innerStyle]}>
                                        <Text style={[styles.white, { color: COLORS[Theme].PRIMARY_WHITE }]}>Delete Note</Text>
                                    </Animated.View>
                                </Animated.View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPressIn={() => handlePress('Update')} onPressOut={onUpdateUp}>
                            <View style={styles.outer}>
                                <Animated.View style={[styles.height, updateStyle]}>
                                    <Animated.View style={[styles.inner, updateInnerStyle]}>
                                        <Text style={[styles.white, { color: COLORS[Theme].PRIMARY_WHITE }]}>Update Note</Text>
                                    </Animated.View>
                                </Animated.View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    :
                    <TouchableWithoutFeedback onPressIn={() => handlePress('AddNote')} onPressOut={onButtonUp}>
                        <View style={styles.outer}>
                            <Animated.View style={[styles.height, heightStyle]}>
                                <Animated.View style={[styles.inner, innerStyle]}>
                                    <Text style={[styles.white, { color: COLORS[Theme].PRIMARY_WHITE }]}>Add Note</Text>
                                </Animated.View>
                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>}
            </View>

            <TouchableOpacity style={styles.ResponsiveBtn} onPress={() => navigation.navigate('Examples')}>
                <Text style={styles.ResposiveText}>Examples</Text>
            </TouchableOpacity>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop: 30 }}>
                {Screens.map((data: any, index: any) => (
                    <AnimatedButton key={index} data={data} index={index} />
                ))}
            </View> */}

            <Modal visible={visible} transparent={true} animationType='fade'>
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }} >
                        <View style={{
                            width: w - 60, height: 120, borderRadius: 20, paddingVertical: 20, backgroundColor: COLORS[Theme].LIGHT_BLACK, alignItems: 'center',
                            justifyContent: 'space-between', borderColor: COLORS[Theme].PRIMARY_WHITE, borderWidth: 1
                        }}>
                            <Text style={{ fontSize: 20, color: COLORS[Theme].PRIMARY_WHITE, fontWeight: '800' }}>{error}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <TouchableOpacity style={{
                                    backgroundColor: COLORS[Theme].ORANGE, width: 60, height: 40, borderRadius: 10,
                                    alignItems: 'center', justifyContent: 'center', alignSelf: 'center'
                                }} onPress={() => setVisible(false)}>
                                    <Text style={{ textAlign: 'right', fontWeight: 'bold', color: COLORS[Theme].TEXT }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </ScrollView>
    )
}


const getStyles = (Theme: number) => XStyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: COLORS[Theme].PRIMARY_BLACK,
    },
    Heading: {
        fontSize: 20,
        color: COLORS[Theme].PRIMARY_WHITE,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 20,
        flex: 1,
    },
    card: {
        padding: 20,
        gap: 10,
        borderRadius: 10,
        borderColor: COLORS[Theme].PRIMARY_WHITE,
        borderWidth: 1,
    },
    Input: {
        borderBottomWidth: 1,
        borderColor: '#FFF',
        paddingLeft: 10,
        fontSize: 16,
        color: COLORS[Theme].PRIMARY_WHITE,
        justifyContent: 'flex-start'
    },
    TextInputDescription: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS[Theme].PRIMARY_WHITE,
        height: 100,
        justifyContent: 'flex-start',
        fontSize: 16,
        color: COLORS[Theme].PRIMARY_WHITE,
        marginVertical: 10,
        textAlignVertical: 'top',
        padding: 10
    },
    Button: {
        backgroundColor: COLORS[Theme].GRAY,
        borderRadius: 10,
        borderColor: COLORS[Theme].BLACK,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        alignSelf: 'center',
        height: 45
    },
    text: {
        color: COLORS[Theme].PRIMARY_WHITE,
        fontWeight: '500',
        fontSize: 16
    },
    outer: {
        padding: 10,
        borderRadius: 14,
        height: 60,
        width: 150,
        marginTop: 'auto',
        alignItems: 'center',
        marginBottom: 30
    },
    inner: {
        backgroundColor: COLORS[Theme].ORANGE, width: 120,
        alignItems: "center", justifyContent: "center", height: 50
    },
    white: {
        color: COLORS[Theme].TEXT,
        fontWeight: "bold",
        fontSize: 20,
    },
    height: {
        borderRadius: 16,
        backgroundColor: "rgba(255, 0, 0, .5)"
    },
    ResponsiveBtn: {
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: COLORS[Theme].PRIMARY_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 100,
        borderWidth: 1,
        marginTop: 10
    },
    ResposiveText: {
        fontSize: 16,
        color: COLORS[Theme].PRIMARY_WHITE,
        fontWeight: '500'
    }
})

const styles = getStyles(colorScheme == 'dark' ? 0 : 1);

export default AddNotes

