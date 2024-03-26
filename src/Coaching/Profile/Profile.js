import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import CoachingProfie from './Coaching/CoachingProfie';
import SchoolProfile from './School/SchoolProfile';
import CollegeProfile from './College/CollegeProfile';
import SchoolEmploye from './School/SchoolEmploye';
import CoachingEmployee from './Coaching/CoachingEmployee';
import CollegeEmployee from './College/CollegeEmployee';
import CollegeStudent from './College/CollegeStudent';
import SchoolStudent from './School/SchoolStudent';
import CoachingStudent from './Coaching/CoachingStudent';
import CollegeParent from './College/CollegeParent';
import SchoolParent from './School/SchoolParent';
import CoachingParent from './Coaching/CoachingParent';
import Header from '../../Component/Header/Header';

const Profile = () => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);

  return (
    <>
      <Header/>
      <ScrollView>
        {user?.data?.User?.userType === 'employee' ? (
          <>
            {user?.data?.CredentailsData?.userType === 'school' && (
              <>
                <SchoolEmploye />
              </>
            )}

            {user?.data?.CredentailsData?.userType === 'college' && (
              <>
                <CollegeEmployee />
              </>
            )}

            {user?.data?.CredentailsData?.userType === 'institute' && (
              <>
                <CoachingEmployee />
              </>
            )}
          </>
        ) : (
          <>
            {user?.data?.CredentailsData?.userType === 'school' && (
              <>
                <SchoolProfile />
              </>
            )}

            {user?.data?.CredentailsData?.userType === 'college' && (
              <>
                <CollegeProfile />
              </>
            )}

            {user?.data?.CredentailsData?.userType === 'institute' && (
              <>
                <CoachingProfie />
              </>
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});
