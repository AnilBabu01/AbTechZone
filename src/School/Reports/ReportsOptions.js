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
const ReportsOptions = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <View style={styles.mainview}>
        <TouchableOpacity
          onPress={() => navigation.navigate('StudentListReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="users" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Student</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('StudentAttendanceReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="users" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Attendance</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('PaidFeeReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.optionColor}
              size={30}
            />
            <Text style={styles.titlestyle}>Fee Report</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('PendingFeeReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.optionColor}
              size={30}
            />
            <Text style={styles.titlestyle}>Pending Fee</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => navigation.navigate('FeeByMonthReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.optionColor}
              size={30}
            />
            <Text style={styles.titlestyle}>Fee By Month</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('StudentTestReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="receipt" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Student Test</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => navigation.navigate('StaffReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="person" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Staff</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('StaffAttendanceReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="calendar"
              color={Colors.optionColor}
              size={30}
            />
            <Text style={styles.titlestyle}>Staff Attendance</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('StaffSalaryReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="database"
              color={Colors.optionColor}
              size={30}
            />
            <Text style={styles.titlestyle}>Staff Salary Paid</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BookReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="book" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Book</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('IssueBookReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="book" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Issue Book</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('BookReturnreport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="book" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Return Book</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('AvailableRoomReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="hotel" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Available Rooms</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('OccuipiedRoomReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="hotel" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Occupied Rooms</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => navigation.navigate('StudentInRoom')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="hotel" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Students-in-Room</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('HostelPaidReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.optionColor}
              size={30}
            />
            <Text style={styles.titlestyle}>Hostel-Paid-Fee</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('HostelDuesFeeReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="calendar" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Hostel-Dues-Fee</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('BusReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="bus" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Bus</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('BusAvaialbleSheets')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="bus" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Available Sheets</Text>
          </View>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={() => navigation.navigate('TransPaidFee')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="bus" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Tport-paid-fee</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TransDuesReport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="bus" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Tport-Dues-Fee</Text>
          </View>
        </TouchableOpacity> */}
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
    width: deviceWidth * 0.3,
    paddingVertical: 5,
    backgroundColor: Colors.optionBGColor,
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
