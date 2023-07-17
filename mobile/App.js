import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Dashboard from './src/screens/Dashboard';
import { useEffect } from 'react';
import GoalScreen from './src/screens/GoalScreen';
import { HoldMenuProvider } from 'react-native-hold-menu';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './src/store';
SplashScreen.preventAutoHideAsync();

const Tab = createStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto': require('./assets/fonts/FiraSansCondensed-Regular.ttf'),
    'Roboto-bold': require('./assets/fonts/FiraSansCondensed-Bold.ttf'),
  });

  useEffect(() => {
    if(fontsLoaded) {
      const hideSplashScreen = async () => {
        await SplashScreen.hideAsync()
      }
      hideSplashScreen()
    }
  })

  if (!fontsLoaded) {
    return null;
  }
  return (
    <HoldMenuProvider theme="light" iconComponent={FeatherIcon}>
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Tab.Screen name="Goal" component={GoalScreen} options={{ headerShown: false }} />
          </Tab.Navigator>
        </NavigationContainer> 
      </Provider>
      <StatusBar /> 
    </HoldMenuProvider>
  );
}

