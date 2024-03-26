import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import TodayTimeTable from './TodayTimeTable';
import WeklyTimeTable from './WeklyTimeTable';
import BackHeader from '../../../Component/Header/BackHeader';
const TimeTabletab = () => {
  const [selected, setselected] = useState(true);
  return (
    <>
      <BackHeader title={'Time Table'} />
      <View style={styles.mainHeader}>
        <Pressable onPress={() => setselected(true)}>
          <View style={selected ? styles.btnviewActive : styles.btnview}>
            <Text style={styles.nonActive}>Today</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setselected(false)}>
          <View style={selected ? styles.btnview : styles.btnviewActive}>
            <Text style={selected ? styles.nonActive : styles.nonActive}>
              Weekly
            </Text>
          </View>
        </Pressable>
      </View>
      <ScrollView>
        {selected ? (
          <>
            <TodayTimeTable />
          </>
        ) : (
          <>
            <WeklyTimeTable />
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
