import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BackHeader from '../../Component/Header/BackHeader';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import {Height, Width} from '../../utils/responsive';
const ReportsOptions = () => {
  const navigation = useNavigation();
  return (
    <>
      <BackHeader title={'Reports'} icon={'receipt'} />
      <View style={styles.mainview}>
        <TouchableOpacity onPress={() => navigation.navigate('BatchCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="users" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Student</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CourseCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="users" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Student Attendance</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('CategoryCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Paid Fee</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('FeesCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Pending Fee</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DepartmentCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Fee By Month</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="receipt" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Student Test</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('FeesCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Staff</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DepartmentCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="calendar" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Staff Attendance</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="database" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Staff Salary Paid</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FeesCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="book" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Book</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DepartmentCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="book" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Issue Book</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="book" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Return Book</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FeesCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="hotel" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Available Rooms</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DepartmentCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="hotel" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Occupied Rooms</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="hotel" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Students-in-Room</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FeesCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Hostel-Paid-Fee</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DepartmentCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="calendar" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Hostel-Dues-Fee</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="bus" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Available Sheets</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="bus" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Bus</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="bus" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Tport-paid-fee</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="bus" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Tport-Dues-Fee</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ReportsOptions;

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
