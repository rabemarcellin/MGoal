import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { createGoalAction } from '../store/goals/actions'

export function NewGoalForm() {
    const dispatch = useDispatch()
    const [context, setContext ] = useState('')

    const onPress = async () => {
        const formData = { context }
        try {
            if(context.length > 5) {
                dispatch(createGoalAction(formData))
            }
        } catch(err) {
            console.error(err)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    editable
                    multiline
                    numberOfLines={4}
                    placeholder='Je vais ...'
                    value={context}
                    onChangeText={text => setContext(text)}
                />
            </View>
            <View style={{}}>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                    <Text style={styles.buttonText}>Ajouter</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputView: {
        marginVertical: 10,
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    inputLabel: {
        fontSize: 18,
        fontFamily: 'Roboto',
        marginVertical: 10,
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Roboto',
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontSize: 18,
        fontFamily: 'Roboto',
        textAlignVertical: 'center', 
        margin: 5
    }
})