import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BackHeader from '../../Component/Header/BackHeader';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import {Height, Width} from '../../utils/responsive';
import Header from '../../Component/Header/Header';
const SchoolHrOptions = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <View style={styles.mainview}>
        <TouchableOpacity onPress={() => navigation.navigate('Employee')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="user-plus"
              color={Colors.optionColor}
              size={30}
            />
            <Text style={styles.titlestyle}>Add Staff</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EmpAssignRole')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="critical-role"
              color={Colors.optionColor}
              size={30}
            />
            <Text style={styles.titlestyle}>Assign role</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AttendanceTabEmployee')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="receipt" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Attendance</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('SearchAttendance')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="magnifying-glass"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Search</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('EmpAddholiday')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="mug-hot" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Add Holiday</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EmpAddpayroll')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.optionColor}
              size={30}
            />
            <Text style={styles.titlestyle}>Add Payroll</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.mainoptionWhite}></View>
      </View>
    </>
  );
};

export default SchoolHrOptions;

const styles = StyleSheet.create({
  mainview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: deviceHeight * 0.01,
    paddingHorizontal: deviceWidth * 0.01,
  },

  mainoption: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth * 0.3,
    paddingVertical: 5,
    backgroundColor: Colors.optionBGColor,
    margin: deviceWidth * 0.01,
    borderRadius: 10,
  },
  mainoptionWhite: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth * 0.3,
    paddingVertical: 5,
    margin: deviceWidth * 0.01,
    borderRadius: 10,
  },
  titlestyle: {
    fontWeight: 'bold',
    marginVertical: deviceHeight * 0.01,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.optionColor,
  },
});
