import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BackHeader from '../../Component/Header/BackHeader';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import {Height, Width} from '../../utils/responsive';

const SchoolStudentOptions = () => {
  const navigation = useNavigation();
  return (
    <>
      <BackHeader title={'Student Management'} icon={'school'} />
      <View style={styles.mainview}>
        <TouchableOpacity onPress={() => navigation.navigate('Admission')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="user-plus" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Admission</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="user-plus" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add</Text>
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
            <FontAwesome6 name="certificate" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>TC</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DepartmentCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="certificate" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>CC</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="comment-sms" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Send SMS</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('FeesCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Add Other Fee</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DepartmentCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="calendar" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Time Table</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="database" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Send Email</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FeesCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Student Credentials</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DepartmentCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="calendar" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Parent Credentials</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="database" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Change Session</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SchoolStudentOptions;

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
