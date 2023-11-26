import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Input from '../components/Input';

const CalendarScreen = () => {
    const [selected, setSelected] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const [Search, setSearch] = useState('')

    useEffect(() => {
        console.log(addDate(90))
    }, [])

    const addDate = async (days: number) => {
        let updatedMarkedDates = { ...markedDates };

        for (let i = 1; i <= days; i++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + i);

            const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

            updatedMarkedDates = {
                ...updatedMarkedDates,
                [currentDate.toISOString().split('T')[0]]: {
                    selected: !isWeekend,
                    disableTouchEvent: isWeekend,
                    selectedColor: 'green'
                }
            };
        }

        setMarkedDates(updatedMarkedDates);

        return updatedMarkedDates;
    };



    const handleDayPress = (day: any) => {
        const updatedMarkedDates: any = { ...markedDates };

        updatedMarkedDates[day.dateString] = {
            selected: !updatedMarkedDates[day.dateString]?.selected,
            disableTouchEvent: false,
            selectedColor: 'green',
        };

        setMarkedDates(updatedMarkedDates);
        setSelected(day.dateString);

        console.log(selected);
    };



    return (
        <View style={{ flex: 1, backgroundColor: '#0C0F14', paddingTop: 30 }}>
            <Calendar
                style={{ marginHorizontal: 5 }}
                onDayPress={handleDayPress}
                markedDates={markedDates}
                hideExtraDays={true}
                theme={{
                    backgroundColor: '#0C0F14',
                    calendarBackground: '#0C0F14',
                    textSectionTitleColor: '#ffffff',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    monthTextColor: '#ffffff',

                }}
            />
            <Input
                Value={Search}
                ChangeText={(text: any) => setSearch(text)}
                Placeholder='Search here'
                Styles={{ marginTop:30,marginHorizontal:10}} />
        </View>
    )
}

export default CalendarScreen

const styles = StyleSheet.create({})