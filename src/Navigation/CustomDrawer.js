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
import {useDispatch, useSelector} from 'react-redux';
import {loadUser} from '../Redux/action/authActions';
function CustomDrawer(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [Token, setToken] = useState('');
  const [userData, setuserData] = useState('');
  const {loading, isAuthenticated, user} = useSelector(state => state.auth);
  const gettoken = async () => {
    let token = await AsyncStorage.getItem('erptoken');
    ``;
    setToken(token);
  };

  useEffect(() => {
    gettoken();
    dispatch(loadUser());
    if (user) {
      console.log('user data from dashboard', user?.data[0]?.User?.userType);
      setuserData(user?.data[0]?.User);
    }
  }, [user,userData]);

  console.log('Show Drawer options', userData?.userType );

  return (
    <DrawerContentScrollView
      style={{backgroundColor: primary, color: 'black'}}
      {...props}>
      {userData? (
        <>
          {userData?.userType === 'institute' && (
            <>
              <CoachingDrawerItem navigation={navigation}  setuserData={setuserData}/>
            </>
          )}

          {userData?.userType === 'college' && (
            <>
              <CollegeDrawerItem navigation={navigation} />
            </>
          )}

          {userData?.userType === 'school' && (
            <>
              <SchoolDrawerItem navigation={navigation} />
            </>
          )}

          {userData?.userType === 'employee' && (
            <>
              <EmployeeDrawerItem navigation={navigation} />
            </>
          )}

          {userData?.userType === 'student' && (
            <>
              <StudentDrawerItem navigation={navigation} />
            </>
          )}

          {userData?.userType === 'parent' && (
            <>
              <ParentDrawerItem navigation={navigation} />
            </>
          )}
        </>
      ) : (
        <>
          <NologinDrawerItem navigation={navigation} />
        </>
      )}
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
