import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native'
import { useStore } from '../store/store'
import LottieView from 'lottie-react-native'

const Home = ({ navigation }: any) => {
    const [limitSearch, setLimitSearch] = useState('')
    const NotesList = useStore((state: any) => state.NotesList);
    const [Notes, setNotes]: any = useState([...NotesList])

    useEffect(() => {
        console.log("notesLIst", NotesList)
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

    return (
        <View style={styles.container}>
            <Text style={styles.Text}>NOTES</Text>
            <View style={styles.search}>
                <TextInput style={styles.input}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Search..."
                    placeholderTextColor="#FFF"
                    autoCapitalize="none"
                    value={limitSearch}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity activeOpacity={100} style={{ marginRight: 10 }} onPress={handleClear}>
                    <Ionicons name="close" size={20} color={'#FFFFFF'} />
                </TouchableOpacity>
            </View>
            {Notes.length>0?<FlatList
                style={styles.noteList}
                data={Notes}
                numColumns={2}
                contentContainerStyle={{ alignSelf: 'center' }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <Card navigation={navigation} data={item} index={item.id} />}
                onEndReachedThreshold={0.1}
            />:
            <View style={{ flex: 1, justifyContent: 'center' }}>
            <LottieView
                style={{ height: 300 }}
                source={require('../lottie/nodata.json')}
                autoPlay={true}
                loop />
        </View>
            }
            <TouchableOpacity onPress={() => navigation.navigate('AddNotes', { data: null })} style={styles.fab}>
                <FontAwesome5 name="plus" size={20} color={'black'} />
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        justifyContent: 'center',
        backgroundColor: '#0C0F14',
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
        color: '#FFF',
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
        borderColor: '#FFFFFF',
        borderWidth: 0.5,
        borderRadius: 25,
        backgroundColor: '#141921',
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
        backgroundColor: '#FFF',
        borderRadius: 30,
        elevation: 2,
        color: '#000'
    },
    Text: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 20
    }
})