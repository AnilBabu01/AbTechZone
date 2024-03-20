import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {deviceHeight, deviceWidth} from '../utils/constant';
import {Colors, hightlight} from '../utils/Colors';
const PlanCard = ({data, planId}) => {
  return (
    <>
      <View style={styles.topmian}>
        <View
          style={data?.id === planId ? styles.mainCardActive : styles.mainCard}>
          <Text
            style={
              data?.id === planId ? styles.plannameActive : styles.planname
            }>
            Basic
          </Text>
          <Text
            style={
              data?.id === planId ? styles.facilityActive : styles.facility
            }>
            ₹500/month
          </Text>
          <Text
            style={
              data?.id === planId ? styles.facilityActive : styles.facility
            }>
            ₹1500 paid quarterly
          </Text>
          <Text style={styles.facility}>or ₹18000 if paid yearly</Text>
          <Text
            style={
              data?.id === planId ? styles.facilityActive : styles.facility
            }>
            No of Student 1000
          </Text>
          <View
            style={
              data?.id === planId ? styles.dividerActive : styles.divider
            }></View>
          <Text
            style={
              data?.id === planId ? styles.facilityActive : styles.facility
            }>
            A computer is an electronic device that can perform various
            operations and tasks based on a set of instructions, known as
            programs. It is capable of processing, storing, and
          </Text>
        </View>
      </View>
    </>
  );
};

export default PlanCard;

const styles = StyleSheet.create({
  topmian: {
    paddingHorizontal: deviceWidth * 0.02,
    paddingVertical: deviceHeight * 0.02,
  },
  mainCard: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: deviceWidth * 0.02,
  },
  divider: {
    borderWidth: 4,
    borderColor: Colors.primary,
    marginVertical: deviceHeight * 0.02,
  },
  planname: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 25,
  },

  facility: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },

  mainCardActive: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: deviceWidth * 0.02,
    backgroundColor: Colors.primary,
  },
  plannameActive: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 25,
  },

  facilityActive: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  dividerActive: {
    borderWidth: 4,
    borderColor: hightlight,
    marginVertical: deviceHeight * 0.02,
  },
});
