import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create(
    persist(
        (set, get) => ({
            NotesList: [],
            addToNote: (data: any) =>
                set(
                    produce(state => {
                        console.log("data", data)
                        state.NotesList.unshift(data)
                    })
                ),
            deleteNote: (id: any) =>
                set(
                    produce(state => {
                        state.NotesList = state.NotesList.filter((item: any) => (
                            item.id != id
                        ))
                        console.log("state===>", state.NotesList)
                    })
                ),
            updateNote: (data: any) =>
                set(
                    produce(state => {
                        for (let i = 0; i < state.NotesList.length; i++) {
                            if (state.NotesList[i].id == data.id) {
                                state.NotesList[i].title = data.title
                                state.NotesList[i].Discription = data.Discription
                                state.NotesList[i].Category = data.Category
                                state.NotesList[i].OrderDate = data.OrderDate
                            }
                        }
                    })
                )
        }),
        {
            name: 'notes-app',
            storage: createJSONStorage(() => AsyncStorage),
        },
    )
)