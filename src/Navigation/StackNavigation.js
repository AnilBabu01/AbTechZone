import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Auth/Login';
import SplashScreen from '../Splash/Splash';
import HomeScreen from '../Owner/Home';
import Header from '../Owner/Header';
import DrawerNavigation from '../Navigation/DrawerNavigation';
import DashboardCoaching from '../Coaching/Dashboard/Dashboard';
import FrontOfficeCoaching from '../Coaching/FrontOffice/FrontOffice';
import SearchEnquiryCoaching from '../Coaching/FrontOffice/SearchEnquiry';
import { primary } from '../utils/Colors';
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
       screenOptions={{headerShown: false}}

      // headerMode={'screen'}
      // screenOptions={{
      //   header: ({navigation}) => <Header navigation={navigation} />,
      // }}
      
      >
      {showsplash && (
        <Stack.Screen name="OnBoarding" component={SplashScreen} />
      )}
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="drawer" component={DrawerNavigation} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="DashboardCoaching" component={DashboardCoaching} />
      <Stack.Screen
        name="FrontOfficeCoaching"
        component={FrontOfficeCoaching}
      />
      <Stack.Screen
        name="SearchEnquiryCoaching"
        component={SearchEnquiryCoaching}
        options={{
          headerShown: true,
          title: 'Search Enquiry',
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
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
