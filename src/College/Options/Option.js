import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import dash from '../../assets/dash5.png';
import hostel from '../../assets/hostel.png';
import hr from '../../assets/hr.png';
import library from '../../assets/library.png';
import office from '../../assets/office.png';
import rupee from '../../assets/rupee.png';
import student from '../../assets/student.png';
import timetable from '../../assets/timetable.png';
import transport from '../../assets/transport.png';
import attendance from '../../assets/attendance.png';
import card from '../../assets/card.png';
import employee from '../../assets/employee.png';
import result from '../../assets/result.png';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Option = () => {
  return (
    <View>
      <View style={styles.flexview}>
        <View style={styles.maininearoption}>
          <Image source={dash} style={styles.optionimg} />
          <Text>Dashboard</Text>
        </View>
        <View style={styles.maininearoption}>
          <Image source={hostel} style={styles.optionimg} />
          <Text>Hostel</Text>
        </View>
        <View style={styles.maininearoption}>
          <Image source={rupee} style={styles.optionimg} />
          <Text>Account</Text>
        </View>
        <View style={styles.maininearoption}>
          <Image source={library} style={styles.optionimg} />
          <Text>Library</Text>
        </View>
      </View>
      <View style={styles.flexview}>
        <View style={styles.maininearoption}>
          <Image source={office} style={styles.optionimg} />
          <Text>Front Office</Text>
        </View>
        <View style={styles.maininearoption}>
          <Image source={student} style={styles.optionimg} />
          <Text>Student</Text>
        </View>
        <View style={styles.maininearoption}>
          <Image source={timetable} style={styles.optionimg} />
          <Text>Time Table</Text>
        </View>
        <View style={styles.maininearoption}>
          <Image source={transport} style={styles.optionimg} />
          <Text>Transport</Text>
        </View>
      </View>
      <View style={styles.flexview}>
        <View style={styles.maininearoption}>
          <Image source={card} style={styles.optionimg} />
          <Text>Id Card</Text>
        </View>
        <View style={styles.maininearoption}>
          <Image source={attendance} style={styles.optionimg} />
          <Text>Attendance</Text>
        </View>
        <View style={styles.maininearoption}>
          <Image source={employee} style={styles.optionimg} />
          <Text>Employee</Text>
        </View>
        <View style={styles.maininearoption}>
          <Image source={result} style={styles.optionimg} />
          <Text>Result</Text>
        </View>
      </View>
      <View style={styles.flexview}>
        <View style={styles.maininearoption}>
          <Image source={hr} style={styles.optionimg} />
          <Text>Hr</Text>
        </View>
      </View>
    </View>
  );
};

export default Option;

const styles = StyleSheet.create({
  optionimg: {
    height: 40,
    width: 40,
  },
  maininearoption: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '25%',
  },
  flexview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
