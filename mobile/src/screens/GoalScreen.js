import { View, SafeAreaView, Text, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { Dimensions } from 'react-native'
import Goal from '../components/Goal'
import axios from 'axios'
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { Feather, Ionicons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateGoalCoverAction } from '../store/goals/actions';

const GoalScreen = ({ navigation, route }) => {
  const width = Dimensions.get('screen').width
  const height = Dimensions.get('screen').height
  const dispatch = useDispatch()
  const [alertRemove, activeAlertRemove] = useState(false)
  const goalId = route.params.goal._id
  const goal = useSelector(state => state?.goals?.find(goal => goal._id === goalId)) 

  const [ dos, setDos ] = useState([])
    const sheetRef = useRef(null)

    const snapPoints = useMemo(() => ["5%", "25%", "90%"], []);

    const handleSnapPress = useCallback((index) => {
      sheetRef?.current?.snapToIndex(index)
    }, [])

    const pickImage = async () => {
      // request user permission
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    
      if (!result.canceled) {
        const urisArray = result.assets.map(file => file.uri)
        if(urisArray) {
          dispatch(updateGoalCoverAction(goal._id, urisArray))
        }
      }
    };


    useEffect(() => {
      if(goal?.length > 0) {
        const fetchDoBelongsTo = async () => {
          const server = await axios.get(`http://192.168.88.30:10000/api/do/${goal?._id}`)
            if(server.data) {
              setDos(server.data)
            }
        }
        fetchDoBelongsTo()
      }
    }, [goal])
    useEffect(() => {
      if(dos) {
        console.log(dos)
      }
    }, [dos])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{
        position: 'relative',
        backgroundColor: '#bbbbbb',
        flex: 1
      }}>
        {
          goal?.coverUrl?.length > 0 && (
            <FlatList
          horizontal
          data={goal.coverUrl}
          renderItem={(({item}) => (
            <View style={{flex: 1}}>
              <Image
                style={{
                  margin: 20,
                  borderRadius: 10,
                  width: (width / 100) * 90,
                  height: (height / 100) * 80
                }}
                source={{uri: item ?? "https://i.pinimg.com/564x/ff/70/4c/ff704cba36da1f1ee34ea1507418da54.jpg"}}
              />
            </View>
          ))}
          keyExtractor={item => `${item}+${goal?._id}`}
        />

          )
        }
        <View style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: 'white',
          padding: 5,
          borderRadius: '50%',
          transform: [
            {translate: [-50, -50]}
          ]
        }}>
          <TouchableOpacity 
            onPress={pickImage}
            style={{
              flex: 1,
              borderRadius: '50%',
              padding: 15,
              borderWidth: 1,
              borderStyle: 'dashed'
            }}
          >
            <Ionicons name="image" size={24} color="black" />        

          </TouchableOpacity>
        </View>
      </View>
      
      <BottomSheet ref={sheetRef}
        index={0}
        snapPoints={snapPoints} 
      >
        <View style={{
          flex: 1, 
          backgroundColor: '#bbbbbb', 
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20
        }}>
          <View style={{}}>
            <View style={{backgroundColor: 'white'}}>
                <Goal  compress key={goal._id} goal={goal} activeAlertRemove={activeAlertRemove} onEdit={handleSnapPress} />
                <View style={{
              flexDirection: 'row', 
              borderWidth: 1, 
              marginHorizontal: 20, 
              marginVertical: 10,
              borderRadius: 10,
              backgroundColor: 'white'
            }}>
                <TouchableOpacity 
                  style={{alignItems: 'center',  margin: 20,}}
                  onPress={() => console.log('new Do')}
                >
                  <Feather name="send" size={24} color="black" />
                </TouchableOpacity>
                <TextInput style={{
                  flexGrow: 1,
                  margin: 15, 
                  textAlignVertical: 'center',
                  fontFamily: 'Roboto',
                  fontSize: 18,
                  }} 
                  placeholder='tip ...'
                  multiline
                  editable
                />
            </View>
            </View>
           
          </View>
          <FlatList
            style={{paddingHorizontal: 10}}
                data={[goal]}
                renderItem={({item, index})=> (
                  goal && <Goal key={item._id} goal={item} activeAlertRemove={activeAlertRemove} onEdit={handleSnapPress} />
            )}
          />
        </View>    
      </BottomSheet>
    </SafeAreaView>
  )
}

export default GoalScreen