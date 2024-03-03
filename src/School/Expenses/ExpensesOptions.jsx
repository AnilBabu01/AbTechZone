import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import {Height, Width} from '../../utils/responsive';
import Checkin from '../../assets/Checkin.png';
import Header from '../../Component/Header/Header';
const ExpensesOptions = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <View style={styles.mainview}>
        <TouchableOpacity onPress={() => navigation.navigate('AddExpenses')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="layer-group" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Expenses</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TransferCaseOnline')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="hotel" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Cash/Bank Transfer</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Analysie')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="restroom" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Expenses Analysie</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ExpensesOptions;

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
  mainoptionEmpty: {
    width: Width(110),
    height: Height(80),
    margin: deviceWidth * 0.01,
    borderRadius: 10,
  },
  titlestyle: {
    fontWeight: 'bold',
    marginVertical: deviceHeight * 0.01,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.primary,
  },
  optionimg: {
    width: Width(30),
    height: Height(30),
  },
});
