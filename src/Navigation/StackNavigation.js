import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Auth/Login';
import SplashScreen from '../Splash/Splash';
import HomeScreen from '../Owner/Home';
import Header from '../Owner/Header';
import DrawerNavigation from '../Navigation/DrawerNavigation';
import Dashboard from '../Coaching/Dashboard/Dashboard';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  //   const dispatch = useDispatch();
  const [showsplash, setshowsplash] = useState(true);
  useEffect(() => {
    // dispatch(loadUser());
    setTimeout(() => {
      setshowsplash(false);
    }, 1000);
  }, []);

  return (
    <Stack.Navigator
      //  screenOptions={{headerShown: false}}
      headerMode={'screen'}
      screenOptions={{
        header: ({navigation}) => <Header navigation={navigation} />,
      }}>
      {showsplash && (
        <Stack.Screen name="OnBoarding" component={SplashScreen} />
      )}
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="drawer" component={DrawerNavigation} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />

      {/* 
      <Stack.Screen
        name="Changepassword"
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
          title: 'Edit Profile',
          headerStyle: {
            backgroundColor: donationavtivebtn,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> */}
    </Stack.Navigator>
  );
}

export default StackNavigation;
