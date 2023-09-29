import React, {useState, useEffect} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import {primary, secondary, hightlight} from '../utils/Colors';
import NologinDrawerItem from '../Owner/NologinDrawerItem';
import CoachingDrawerItem from '../Coaching/CoachingDrawerItem';
import SchoolDrawerItem from '../School/SchoolDrawerItem';
import EmployeeDrawerItem from '../Employee/EmployeeDrawerItem';
import StudentDrawerItem from '../Student/StudentDrawerItem';
import ParentDrawerItem from '../Parent/ParentDrawerItem';
import CollegeDrawerItem from '../College/CollegeDrawerItem';
function CustomDrawer(props) {
  const {navigation} = props;

  return (
    <DrawerContentScrollView
      style={{backgroundColor: primary, color: 'black'}}
      {...props}>
      {/* <NologinDrawerItem navigation={navigation} /> */}
      <CoachingDrawerItem navigation={navigation}/>
      {/* <CollegeDrawerItem navigation={navigation} /> */}
      {/* <SchoolDrawerItem navigation={navigation}/> */}
      {/* <EmployeeDrawerItem navigation={navigation}/> */}
      {/* <StudentDrawerItem  navigation={navigation}/> */}
      {/* <ParentDrawerItem navigation={navigation}/> */}
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
