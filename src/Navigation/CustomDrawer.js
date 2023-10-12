import React, {useEffect, useState} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {primary} from '../utils/Colors';
import NologinDrawerItem from '../Owner/NologinDrawerItem';
import CoachingDrawerItem from '../Coaching/CoachingDrawerItem';
import SchoolDrawerItem from '../School/SchoolDrawerItem';
import EmployeeDrawerItem from '../Employee/EmployeeDrawerItem';
import StudentDrawerItem from '../Student/StudentDrawerItem';
import ParentDrawerItem from '../Parent/ParentDrawerItem';
import CollegeDrawerItem from '../College/CollegeDrawerItem';
import AdminDrawerItem from '../Owner/AdminDrawerItem';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser} from '../Redux/action/authActions';
function CustomDrawer(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [userData, setuserData] = useState('');
  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (user?.data) {
      setuserData(user?.data?.User);
    }
  }, [user, userData]);

  return (
    <DrawerContentScrollView
      style={{backgroundColor: primary, color: 'black'}}
      {...props}>
      {userData ? (
        <>
          {userData?.userType === 'institute' && (
            <>
              <CoachingDrawerItem
                navigation={navigation}
                setuserData={setuserData}
              />
            </>
          )}

          {userData?.userType === 'college' && (
            <>
              <CollegeDrawerItem
                navigation={navigation}
                setuserData={setuserData}
              />
            </>
          )}

          {userData?.userType === 'school' && (
            <>
              <SchoolDrawerItem
                navigation={navigation}
                setuserData={setuserData}
              />
            </>
          )}

          {userData?.userType === 'employee' && (
            <>
              <EmployeeDrawerItem
                navigation={navigation}
                setuserData={setuserData}
              />
            </>
          )}

          {userData?.userType === 'student' && (
            <>
              <StudentDrawerItem
                navigation={navigation}
                setuserData={setuserData}
              />
            </>
          )}

          {userData?.userType === 'parent' && (
            <>
              <ParentDrawerItem
                navigation={navigation}
                setuserData={setuserData}
              />
            </>
          )}
          {userData?.userType === 'admin' && (
            <>
              <AdminDrawerItem
                navigation={navigation}
                setuserData={setuserData}
              />
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
