import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'; 

const Do = ({todo}) => {
    const { container, type, context, configContainer, configItem, configButton } = style
  return (
    <View style={container}>
      <Text style={context}>{todo?.context}</Text>
      <View style={configContainer}>
        <View style={configItem}>
            <TouchableOpacity onPress={() => console.log("toggle accomplishment")}>
                <View style={configButton}>
                    <FontAwesome name="check-circle" size={20} color="black" />
                </View>
            </TouchableOpacity>
        </View>
        <View style={configItem}>
            <TouchableOpacity onPress={() => console.log("toggle accomplishment")}>
                <View style={configButton}>
                    <FontAwesome name="star" size={20} color="black" />
                </View>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        paddingTop: 0,
        borderBottomWidth: 1,
        marginHorizontal: 20,
        marginVertical: 5,
    },
    type: {

    },
    context: {
        fontFamily: 'Roboto',
        paddingHorizontal: 10,
        fontSize: 18,
        marginVertical: 10,
        textAlign: 'justify'

    },
    configContainer: {
        flexDirection: 'row',
    },
    configItem: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        paddingHorizontal: 25,
    },
    configButton: {
        
    },
})
export default Do