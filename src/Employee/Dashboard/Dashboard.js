import {StyleSheet, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import Header from '../../Component/Header/Header';
import {primary} from '../../utils/Colors';
import {useSelector} from 'react-redux';
import SchoolEmpDashbord from './School/SchoolEmpDashbord';
import CoachingEmoDashbord from './Coaching/CoachingEmoDashbord';
import CollegeEmpDashbord from './College/CollegeEmpDashbord';
const Dashboard = () => {
  const {user} = useSelector(state => state.auth);
  return (
    <>
      <Header />
      <StatusBar backgroundColor={primary} />
      <ScrollView>
        {user?.data?.CredentailsData?.userType === 'school' && (
          <>
            <SchoolEmpDashbord />
          </>
        )}

        {user?.data?.CredentailsData?.userType === 'college' && (
          <>
            <CollegeEmpDashbord />
          </>
        )}

        {user?.data?.CredentailsData?.userType === 'institute' && (
          <>
            <CoachingEmoDashbord />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  maintotalview: {
    paddingHorizontal: 10,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  minacardinfo: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 12,
    paddingTop: 10,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
