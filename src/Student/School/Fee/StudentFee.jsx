import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import TodayAttendance from './TodayAttendance';
import MonthlyAttendance from './MonthlyAttendance';
import DateWiseAttendance from './DateWiseAttendance';
import BackHeader from '../../../Component/Header/BackHeader';
const StudentFee = () => {
  const [selected, setselected] = useState(0);
  return (
    <>
      <BackHeader title={'Student Attendance'} />
      <View style={styles.mainHeader}>
        <Pressable onPress={() => setselected(0)}>
          <View style={selected === 0 ? styles.btnviewActive : styles.btnview}>
            <Text style={styles.nonActive}>Today</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setselected(1)}>
          <View style={selected === 1 ? styles.btnviewActive : styles.btnview}>
            <Text style={selected ? styles.nonActive : styles.nonActive}>
              Monthly
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={() => setselected(2)}>
          <View style={selected === 2 ? styles.btnviewActive : styles.btnview}>
            <Text style={selected ? styles.nonActive : styles.nonActive}>
              Date Wise
            </Text>
          </View>
        </Pressable>
      </View>
      <ScrollView>
        {selected === 0 && (
          <>
            <TodayAttendance />
          </>
        )}
        {selected === 1 && (
          <>
            <MonthlyAttendance />
          </>
        )}
        {selected === 2 && (
          <>
            <DateWiseAttendance />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default StudentFee;

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
