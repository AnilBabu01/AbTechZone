import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from '../Auth/Login';
import SplashScreen from '../Splash/Splash';
import CollegeOptionScreen from '../College/Options/Option'

import {donationavtivebtn} from '../utils/Colors';

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
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {showsplash && <Stack.Screen name="OnBoarding" component={SplashScreen} />}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CollegeOptions" component={CollegeOptionScreen} />
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
