import { StyleProp, StyleSheet, TextInput, TextStyle, View } from 'react-native'
import React from 'react'

interface InputProps {
    Placeholder: string,
    ChangeText: any,
    Value: string,
    Styles: StyleProp<TextStyle>,
}

const Input: React.FC<InputProps> = ({ Placeholder, ChangeText, Value, Styles }) => {
    return (
        <View style={[Styles, styles.InputView]}>
            <TextInput
                style={
                    {
                        fontSize: 16,
                        color: '#ffffff',
                        fontWeight: '500',
                        marginLeft: 10,
                        width:'100%'
                    }
                }
                placeholder={Placeholder}
                onChangeText={ChangeText}
                value={Value} />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    InputView: {
        borderRadius: 10,
        borderColor: '#ffffff',
        height: 60,
        flexDirection: 'row',
        borderWidth: .5,
    }
})