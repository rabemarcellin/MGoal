import { 
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
} from 'react-native'
import React from 'react'
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'
import { HoldItem } from 'react-native-hold-menu';


const Goal = ({ goal, compress, activeAlertRemove, onEdit }) => {
    const { navigate, goBack } = useNavigation()

    const MenuItems = [
        { key: `${goal._id} edition holdmenu`, text: "Modifier", icon: 'edit', onPress: () => onEdit(0) },
        { key: `${goal._id} removal holdmenu`, text: "Supprimer", icon: 'trash', isDestructive: true, onPress: () => {
            activeAlertRemove({status: true, item: goal})
        }},
    ];


    const style = StyleSheet.create({
        container: {
            flex: 5,
            paddingHorizontal: 10,
            paddingTop: 0,
        },
        fontText: {
          fontFamily: 'Roboto-bold',
          fontSize: 20,
          marginVertical: 10,
          textAlign: 'justify'
        },
        fontTextCompress: {
            fontSize: 32,
            textAlign: 'center',
            marginVertical: 10,
            fontFamily: 'Roboto-bold',
        },
        cover: {
          width: '100%',
          height: compress ? 100 : 200,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#bbbbbb'
        },
        configContainer: {
            flexDirection: 'row',
            marginVertical: 5,
            marginHorizontal: 10,
            padding: 5,
            borderRadius: 10,
            backgroundColor: '#ddd'
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

    const { container, fontText, fontTextCompress, configContainer, configItem, configButton } = style

   
    return (
        <View style={{
            backgroundColor:'white',
            margin: 10,
            padding: 5,
            borderRadius: 10,
            backgroundColor: 'white'
        }}>
            <View style={{flexDirection: 'row'}}>
                <View style={container}>
                    <Text style={compress ? fontTextCompress : fontText}>
                        {goal ? goal?.context: ""}
                    </Text>
                </View>
                {!compress && (
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <HoldItem 
                        key={`hold item ${goal._id}`}
                        items={MenuItems} 
                        styles={{
                            backgroundColor: 'white'
                        }}
                        closeOnTap
                        >
                            <View style={{marginVertical: 10}}>
                                <FontAwesome name="ellipsis-h" size={20} color="black" />
                            </View>
                    </HoldItem>
                    </View>
                )}  
            </View>
            <View style={configContainer}>
                {compress ? (
                    <View style={configItem}>
                        <TouchableOpacity onPress={() => goBack() }>
                            <View style={configButton}>
                                <Ionicons name="arrow-back" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                ):(
                    <>
                        <View style={configItem}>
                            <TouchableOpacity onPress={() => console.log("toggle accomplishment")}>
                                <View style={configButton}>
                                    <MaterialIcons name="star-border" size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={configItem}>
                            <TouchableOpacity onPress={() => navigate("Goal", {goal: goal})}>
                                <View style={configButton}>
                                    <Ionicons name="md-chatbubbles-outline" size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                
            </View>                
        </View>
    )
}

export default Goal