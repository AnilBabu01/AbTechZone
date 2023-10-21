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
            <Text>Collect Fee</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CourseCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>Pending Fee</Text>
          </View>
        </TouchableOpacity>
      
        <TouchableOpacity
          onPress={() => navigation.navigate('CategoryCoaching')}>
          <View style={styles.mainoption}>
            <Image source={Option} style={styles.optionimg} />
            <Text>Paid Fee</Text>
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
