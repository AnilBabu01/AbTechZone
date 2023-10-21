import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../Component/Header/Header';
import Option from '../../assets/option.png';
import {useNavigation} from '@react-navigation/native';
const HumanResourseOptions = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <View style={styles.mainoptionmain}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EmployeeCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>Add Staff</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchPendingFeeCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>Attendance</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('SearchPaidCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>PayRoll</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.mainoptionmain}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EmployeeCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>PayRoll Report</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchPendingFeeCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>Department</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('SearchPaidCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>Disabled Staff</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HumanResourseOptions;

const styles = StyleSheet.create({
  mainoptionmain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingRight: 30,
  },
  optionimg: {
    width: 80,
    height: 80,
  },
  mainoption: {
    display: 'flex',
    alignItems: 'center',
  },
});
