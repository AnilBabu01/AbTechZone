import React, {useEffect, useState} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {primary} from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NologinDrawerItem from '../Owner/NologinDrawerItem';
import CoachingDrawerItem from '../Coaching/CoachingDrawerItem';
import SchoolDrawerItem from '../School/SchoolDrawerItem';
import EmployeeDrawerItem from '../Employee/EmployeeDrawerItem';
import StudentDrawerItem from '../Student/StudentDrawerItem';
import ParentDrawerItem from '../Parent/ParentDrawerItem';
import CollegeDrawerItem from '../College/CollegeDrawerItem';
function CustomDrawer(props) {
  const {navigation} = props;
  const [Token, setToken] = useState('');
  const gettoken = async () => {
    let token = await AsyncStorage.getItem('token');
    setToken(token);
  };

  useEffect(() => {
    gettoken();
  }, []);

  console.log('Token', Token);
  
  return (
    <DrawerContentScrollView
      style={{backgroundColor: primary, color: 'black'}}
      {...props}>
      <NologinDrawerItem navigation={navigation} />
      {/* <CoachingDrawerItem navigation={navigation}/> */}
      {/* <CollegeDrawerItem navigation={navigation} /> */}
      {/* <SchoolDrawerItem navigation={navigation}/> */}
      {/* <EmployeeDrawerItem navigation={navigation}/> */}
      {/* <StudentDrawerItem  navigation={navigation}/> */}
      {/* <ParentDrawerItem navigation={navigation}/> */}
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
