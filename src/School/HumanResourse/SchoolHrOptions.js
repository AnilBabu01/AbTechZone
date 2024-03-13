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
            <FontAwesome6 name="user-plus" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Staff</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EmpAssignRole')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="critical-role"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Assign role</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AttendanceTabEmployee')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="database" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Attendance</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchAttendance')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="magnifying-glass"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Search</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EmpAddholiday')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="mug-hot" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Holiday</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('CommunicationTabemp')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="comment-sms" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Communication</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('EmpAddpayroll')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Add Payroll</Text>
          </View>
        </TouchableOpacity>
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
    width: Width(110),
    height: Height(80),
    backgroundColor: Colors.fadeGray,
    margin: deviceWidth * 0.01,
    borderRadius: 10,
  },
  titlestyle: {
    fontWeight: 'bold',
    marginVertical: deviceHeight * 0.01,
    fontSize: 14,
    textAlign: 'center',
  },
});
