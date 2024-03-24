import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import Header from '../../Component/Header/Header';
const FrontOfficeOptions = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <View style={styles.mainview}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FrontOfficeSchool')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="plus" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Add Enquiry</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Complain')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="plus" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Add Complain</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Visitor')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="plus" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Add Visitor</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FrontOfficeOptions;

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
