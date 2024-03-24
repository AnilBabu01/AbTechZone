import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import SchoolEmployee from './SchoolEmployee';
import CoachingEmployee from './CoachingEmployee';
import ColleggeEmployee from './ColleggeEmployee';
const EmployeeDrawerItem = ({navigation, setuserData}) => {
  const {user} = useSelector(state => state.auth);

  return (
    <View>
      {user?.data?.CredentailsData?.userType === 'school' && (
        <>
          <SchoolEmployee setuserData={setuserData} navigation={navigation} />
        </>
      )}

      {user?.data?.CredentailsData?.userType === 'college' && (
        <>
          <ColleggeEmployee setuserData={setuserData} navigation={navigation} />
        </>
      )}

      {user?.data?.CredentailsData?.userType === 'institute' && (
        <>
          <CoachingEmployee setuserData={setuserData} navigation={navigation} />
        </>
      )}
    </View>
  );
};

export default EmployeeDrawerItem;

const styles = StyleSheet.create({});
