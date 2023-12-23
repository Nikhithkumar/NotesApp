import {
    FlatList, StyleSheet, Text, TextInput, View, Appearance
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import Card from '../components/Card'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native'
import { useStore } from '../store/store'
import LottieView from 'lottie-react-native'
import { COLORS } from '../constants/Colors'
import '../translation'
import {Picker} from '@react-native-picker/picker';
import il8n from '../translation'
import { XStyleSheet } from '../theme/Responsive'

const colorScheme = Appearance.getColorScheme();

const Home = ({ navigation }: any) => {
    const { t } = useTranslation()
    const [limitSearch, setLimitSearch] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const NotesList = useStore((state: any) => state.NotesList);
    const [Notes, setNotes]: any = useState([...NotesList])
    const Theme = useSelector((state: any) => state.theme.data)

    useEffect(() => {
        setNotes([...NotesList])
    }, [NotesList])

    const handleSearch = (text: any) => {
        setLimitSearch(text)
        if (text) {
            const data = NotesList.filter((item: any) => {
                let filterTitle = item.title != "" ? item.title.toUpperCase() : ''.toUpperCase()
                const textName = text.toUpperCase()
                return filterTitle.includes(textName)
            })

            if (data.length > 0) {
                setNotes([...data])
            }
            else {
                setNotes([])
            }

        }
        else {
            setNotes([...NotesList])
        }
    }

    const handleClear = () => {
        setLimitSearch('')
        setNotes([...NotesList])
    }

    const onLanguageChange = (language: string) => {
        il8n.changeLanguage(language)
        console.log(`Selected language: ${language}`);
      };

    return (
        <View style={styles.container}>
            <Animated.Text entering={FadeOut.duration(1000)} style={styles.Text}>{t("NOTES")}</Animated.Text>
            <View style={styles.search}>
                <TextInput style={styles.input}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder={t("Search")+"..."}
                    placeholderTextColor={COLORS[Theme].PRIMARY_WHITE}
                    autoCapitalize="none"
                    value={limitSearch}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity activeOpacity={100} style={{ marginRight: 10 }} onPress={handleClear}>
                    <Ionicons name="close" size={20} color={COLORS[Theme].PRIMARY_WHITE} />
                </TouchableOpacity>
            </View>
            {Notes.length > 0 ? <FlatList
                style={styles.noteList}
                data={Notes}
                numColumns={2}
                contentContainerStyle={{ alignSelf: 'center' }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <Card navigation={navigation} data={item} index={item.id} />}
                onEndReachedThreshold={0.1}
            /> :
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <LottieView
                        style={{ height: 300 }}
                        source={require('../lottie/nodata.json')}
                        autoPlay={true}
                        loop />
                </View>
            }
            <TouchableOpacity onPress={() => navigation.navigate('AddNotes', { data: null })} style={styles.fab}>
                <FontAwesome5 name="plus" size={20} color={COLORS[Theme].BLACK} />
            </TouchableOpacity>
            <Picker
                selectedValue={selectedLanguage}
                style={styles.btn}
                onValueChange={(itemValue) => {
                    setSelectedLanguage(itemValue);
                    onLanguageChange(itemValue);
                }}
            >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Hindi" value="hi" />
            </Picker>
        </View>
    )
}

const getStyles = (THEME: number) => StyleSheet.create({
    container: {
        paddingTop: 0,
        justifyContent: 'center',
        backgroundColor: COLORS[THEME].PRIMARY_BLACK,
        flex: 1,
        paddingHorizontal: 10
    },
    activityIndicator: {
        paddingTop: 300,
        position: 'absolute',
    },
    noteList: {
        marginTop: 70,
        paddingBottom: 100
    },
    input: {
        marginHorizontal: 20,
        height: 37,
        borderColor: '#999',
        borderWidth: 0,
        color: COLORS[THEME].PRIMARY_WHITE,
        flex: 1,
    },
    search: {
        padding: 0,
        position: 'absolute',
        marginTop: 60,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        elevation: 3,
        borderColor: COLORS[THEME].PRIMARY_WHITE,
        borderWidth: 0.5,
        borderRadius: 25,
        backgroundColor: COLORS[THEME].BLACK,
        opacity: 0.9,
        width: 304,
        top: 0,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 30,
        backgroundColor: COLORS[THEME].PRIMARY_WHITE,
        borderRadius: 30,
        elevation: 2,
        color: COLORS[THEME].BLACK
    },
    Text: {
        fontSize: 20,
        color: COLORS[THEME].PRIMARY_WHITE,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 20
    },
    btn: {
        alignSelf: 'center',
        width: 150,
        height: 40,
        borderRadius: 5,
        borderColor:COLORS[THEME].PRIMARY_WHITE
    }
})


const styles = getStyles(colorScheme == 'dark' ? 0 : 1);

export default Home





