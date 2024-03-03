import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NotificationCard from './NotificationCard';
import BackHeader from './BackHeader';
const ViewNotification = () => {
  return (
    <>
      <BackHeader title={'Notifications'} icon={'envelope'} />
      <View style={styles.mainView}>
        <NotificationCard />
      </View>
    </>
  );
};

export default ViewNotification;

const styles = StyleSheet.create({
  mainView: {
    padding: 10,
  },
});
