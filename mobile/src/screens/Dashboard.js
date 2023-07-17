
import { 
  SafeAreaView, 
  Text, 
  StyleSheet, 
  View, 
  FlatList, 
  Alert, 
  Image 
} from 'react-native'
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, { BottomSheetScrollView, TouchableOpacity } from "@gorhom/bottom-sheet";
import { Feather } from '@expo/vector-icons'; 
import {
  Placeholder,
  PlaceholderLine,
  Fade
} from "rn-placeholder";

import * as LocalAuthentication from 'expo-local-authentication'
import { Vibration } from "react-native"
import { TextInput } from 'react-native-gesture-handler'
import { Entypo } from "@expo/vector-icons"

import { NewGoalForm } from '../components/Form';
import Goal from '../components/Goal'
import { getGoals } from '../store/goals/selectors';
import { deleteGoalAction, getGoalsAction } from '../store/goals/actions';

const Form = ({title, FormType}) => {
  return (
      <View style={{
        flex: 1,
        paddingHorizontal: 20
      }}>
          <View>
              <Text style={{
                  fontSize: 32,
                  fontFamily: 'Roboto-bold',
                  marginTop: 20
              }}>{title}</Text>
          </View>
          <FormType />
      </View>
  )
}

const Dashboard = () => {
    const [password, setPassword] = useState("")
    const [isLogged, setIsLogged] = useState(false)
    const bottomSheetRef = useRef(null)

    const handleLoginSnapPress = useCallback((index) => {
      bottomSheetRef?.current?.snapToIndex(index)
    }, [])

    const loginUsingFingerprint = async () => {
        const haveFingerFunction = await LocalAuthentication.hasHardwareAsync()
        const haveFingerSave = await LocalAuthentication.isEnrolledAsync()

        if(haveFingerFunction && haveFingerSave) {
            const biometricAuth = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Utiliser votre empreinte digital pour vous authentifier',
                disableDeviceFallback: true,
            })
            if(biometricAuth.success) {
                setIsLogged(true)
            } else {
                Vibration.vibrate()
            }
        }
    }

    const sheetRef = useRef(null)
    const { container } = styles
    const [isLoading, setIsLoading] = useState(true)
    const [alertRemove, activeAlertRemove] = useState(false)
    const snapPoints = useMemo(() => ["50%", "90%"], []);

    const dispatch = useDispatch()
    const goals = useSelector(getGoals)

    const handleSnapPress = useCallback((index) => {
      sheetRef?.current?.snapToIndex(index)
    }, [])

    const handleSheetClose = useCallback(() => {
      sheetRef?.current?.close()
    }, [])


    useEffect(() => {
      dispatch(getGoalsAction())
    }, [isLogged])

    useEffect(() => {
      if(alertRemove.status) {
        Alert.alert(
          "Suppression", 
          "Voulez-vous vraiment le supprimer ? Cette action est irreversible", 
          [
            {
                text: 'Annuler',
                style: 'cancel',
            },
            {
                text: 'Oui', 
                onPress: () => {
                    dispatch(deleteGoalAction(alertRemove?.item?._id))
                },
            },
          ]
        )
        handleSheetClose()
      }
    }, [alertRemove])

    useEffect(() => {
      if(goals !== undefined) {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    }, [goals])

  return (
    <SafeAreaView style={container}>
      { isLogged ? (
        <>
          <View style={{flexGrow: 1}}>
            <View style={{flex: 1}}>
                <Text 
                  style={{
                    fontSize: 32,
                    fontFamily: 'Roboto-bold',
                    padding: 20,
                    backgroundColor: 'black',
                    color: 'white'
                }}>
                  Mes Objectifs
                </Text>
                <View style={{flex: 1}}>
                  {
                    isLoading ? (
                      <View style={{margin: 20}}>
                        <Placeholder Animation={Fade}>
                            <PlaceholderLine style={{borderRadius: 5, height: 40, margin: 5}} />
                            <PlaceholderLine style={{borderRadius: 10, height: 200, margin: 5}} />
                        </Placeholder>
                      </View>
                    ): (
                      goals && (
                        <FlatList
                          style={{paddingHorizontal: 10}}
                          data={goals}
                          renderItem={({item, index})=> (
                            <Goal key={item._id} goal={item} activeAlertRemove={activeAlertRemove} onEdit={handleSnapPress} />
                          )}
                        />
                      )
                    )
                  }
                </View>
            </View>
          </View>
  
          <View style={{
            justifyContent: 'center', 
            alignItems: 'center', 
            borderWidth: 2,
            color: 'white',
            borderRadius: 10,
            height: 50,
            margin: 10,
            backgroundColor: 'white'
            
          }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{position: 'relative'}}>
                <View style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: 'black',
                  borderRadius: '50%',
                  padding: 20,
                  alignItems: 'center',
                  transform: [
                    {
                      translate: [-35, -55]
                    }
                  ]
                  }}>
                  <TouchableOpacity onPress={() => handleSnapPress(0)}>
                      <Text style={{
                        fontSize: 18,
                      }}>
                        <Feather name="plus" size={32} color="white" />
                      </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <BottomSheet ref={sheetRef}
            index={-1}
            snapPoints={snapPoints} 
            enablePanDownToClose
          >
            <BottomSheetScrollView>
              <Form title="Nouvel objectif" FormType={NewGoalForm} />
            </BottomSheetScrollView>
          </BottomSheet>
        </>
      ):(
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <BottomSheet
            ref={bottomSheetRef}
            snapPoints={["35%", "75%"]}
              >
                  <View style={{flex: 1, alignItems: 'center'}}>
                      {
                          isLogged ? (
                              <>
                              <Image
                                  source={require("../../assets/confetti.gif")}
                                  style={{
                                      marginTop: 25,
                                      resizeMode: 'contain',
                                      width: 80,
                                      height: 80
                                  }}
                              />
                                  <Text style={{
                                      fontFamily: 'Roboto',
                                      fontSize: 18,
                                      marginVertical: 20
                                  }}>
                                      Redirection vers dashboard ...
                                  </Text>
                              </>
                          ):(
                              <>
                                  <Text style={{
                                      fontFamily: 'Roboto',
                                      fontSize: 18
                                  }}>
                                      Authentification
                                  </Text>
                                  <View style={{
                                      width: '100%',
                                      padding: 10
                                  }}>
                                      <TextInput
                                          style={{
                                              fontFamily: 'Roboto',
                                              fontSize: 18,
                                              padding: 10,
                                              borderRadius: 10,
                                              backgroundColor: '#bbbbbb'
                                          }}
                                          value={password}
                                          onChangeText={text => setPassword(text)}
                                          onFocus={() => handleLoginSnapPress(1)}
                                          onSubmitEditing={() => password === "Goal" ? setIsLogged(true) : handleLoginSnapPress(0)}
                                      />
                                  </View>
                                  <TouchableOpacity 
                                      style={{
                                          marginVertical: 10,
                                          backgroundColor: '#98c1d9',
                                          borderRadius: "50%",
                                          padding: 10
                                      }}
                                      onPress={loginUsingFingerprint}
                                  >
                                      <Entypo name="fingerprint" size={48} color="black" />
                                  </TouchableOpacity>
                              </>
                          )
                      }   
                  </View>
            </BottomSheet>
          </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bbbbbb'
    },
})
export default Dashboard