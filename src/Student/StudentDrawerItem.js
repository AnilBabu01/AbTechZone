import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Colors} from '../utils/Colors';
import {deviceWidth} from '../utils/constant';
import SchoolDrawer from './School/SchoolDrawer';
import CollegeDrawer from './College/CollegeDrawer';
import CoachingDrawer from './Coaching/CoachingDrawer';
const StudentDrawerItem = ({navigation, setuserData}) => {
  const {user} = useSelector(state => state.auth);

  return (
    <View>
      {user?.data?.CredentailsData?.userType === 'school' && (
        <>
          <SchoolDrawer setuserData={setuserData} navigation={navigation} />
        </>
      )}

      {user?.data?.CredentailsData?.userType === 'college' && (
        <>
          <CollegeDrawer setuserData={setuserData} navigation={navigation} />
        </>
      )}

      {user?.data?.CredentailsData?.userType === 'institute' && (
        <>
          <CoachingDrawer setuserData={setuserData} navigation={navigation} />
        </>
      )}
    </View>
  );
};

export default StudentDrawerItem;

const styles = StyleSheet.create({
  mainprofile: {
    paddingHorizontal: 10,
  },

  innearview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innearviewprofile: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 5,
  },

  menu: {
    marginHorizontal: deviceWidth * 0.02,
    marginBottom: deviceWidth * 0.02,
    paddingVertical: deviceWidth * 0.02,
    paddingRight: deviceWidth * 0.07,
  },
  inneartitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textstyle: {
    color: Colors.black,
    paddingLeft: deviceWidth * 0.02,
  },
  divider: {
    borderWidth: 1,
    borderColor: Colors.fadeGray,
  },
});
