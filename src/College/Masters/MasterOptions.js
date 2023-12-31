import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../Component/Header/Header';
import Option from '../../assets/option.png';
import {useNavigation} from '@react-navigation/native';
const MasterOptions = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <View style={styles.mainoptionmain}>
        <TouchableOpacity onPress={() => navigation.navigate('BatchCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>batch</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CourseCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>Course</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('DurationCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>Duration</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('CategoryCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>Category</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.mainoptionmain}>
        <TouchableOpacity onPress={() => navigation.navigate('FeesCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>Fees</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DepartmentCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>Department</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DesignationCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>Designation</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MasterOptions;

const styles = StyleSheet.create({
  mainoptionmain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingRight:30
  },
  optionimg: {},
  mainoption: {
    display: 'flex',
    alignItems: 'center',
  },
});
