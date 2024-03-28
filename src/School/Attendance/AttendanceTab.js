import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import TakeAttendance from './TakeAttendance/TakeAttendance';
import TodayAttendance from './TodayAttendance/TodayAttendance';
import Analysis from './Analysis/Analysis';
import BackHeader from '../../Component/Header/BackHeader';
const TimeTabletab = () => {
  const [selected, setselected] = useState(true);
  return (
    <>
      <BackHeader title={'Attendance'} />
      <View style={styles.mainHeader}>
        <Pressable onPress={() => setselected(true)}>
          <View style={selected ? styles.btnviewActive : styles.btnview}>
            <Text style={styles.nonActive}>Attendance</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setselected(false)}>
          <View style={selected ? styles.btnview : styles.btnviewActive}>
            <Text style={selected ? styles.nonActive : styles.nonActive}>
              Analysis
            </Text>
          </View>
        </Pressable>
      </View>
      <ScrollView>
        {selected ? (
          <>
            <TakeAttendance />
          </>
        ) : (
          <>
            <Analysis />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default TimeTabletab;

const styles = StyleSheet.create({
  mainHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: Colors.black,
    padding: deviceWidth * 0.02,
  },
  btnview: {
    backgroundColor: Colors.black,
    paddingHorizontal: deviceWidth * 0.09,
    paddingVertical: deviceHeight * 0.01,
  },
  nonActive: {
    color: Colors.white,
    fontSize: 16,
  },
  btnviewActive: {
    backgroundColor: Colors.black,
    paddingHorizontal: deviceWidth * 0.09,
    paddingVertical: deviceHeight * 0.01,
    borderBottomWidth: 4,
    borderBlockColor: Colors.primary,
  },
  Active: {
    color: Colors.white,
    fontSize: 16,
  },
});
