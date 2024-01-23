import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BackHeader from '../../Component/Header/BackHeader';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import {Height, Width} from '../../utils/responsive';
const SchoolHrOptions = () => {
  const navigation = useNavigation();
  return (
    <>
      <BackHeader title={"HR Management"} icon={"school"}/>
      <View style={styles.mainview}>
        <TouchableOpacity onPress={() => navigation.navigate('BatchCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="user-plus" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Staff</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CourseCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="comment-sms" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Send SMS</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('FeesCoaching')}>
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
          onPress={() => navigation.navigate('CategoryCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="database" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Attendance</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('FeesCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="mug-hot" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Holiday</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DepartmentCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="magnifying-glass"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Search Attendance</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="comment-sms" color={Colors.primary} size={30} />
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
