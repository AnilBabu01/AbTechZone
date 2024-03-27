import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, primary} from '../utils/Colors';
import {Dropdown} from 'react-native-element-dropdown';
import {Height, Width} from '../utils/responsive';
import {deviceHeight, deviceWidth} from '../utils/constant';
const RNBDropDown = props => {
  const {
    error,
    label,
    placeholder,
    ispassword,
    rightIcon,
    onChange,
    name,
    value,
    passwordShow,
    setShowPassword,
    OptionsList,
    borderRad,
    ...rest
  } = props;

  return (
    <View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          lineHeight: 19,
          marginBottom: 4,
          color: Colors.black,
        }}>
        {label}
      </Text>
      <Dropdown
        style={{
          alignSelf: 'center',
          width: '100%',
          padding: deviceWidth * 0.023,
          fontFamily: 'Gilroy-SemiBold',
          borderRadius: borderRad ? borderRad : 5,
          borderWidth: 1,
          borderColor: Colors.black,
          marginTop: 6,
          paddingHorizontal: deviceWidth * 0.028,
          backgroundColor: Colors.white,
          color: Colors.black,
        }}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        dropdownTextStyle={{color: Colors.black}}
        itemTextStyle={{
          color: Colors.black,
        }}
        data={OptionsList}
        search
        // maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder ? placeholder : 'Please Select'}
        searchPlaceholder="Search..."
        value={value}
        onChange={onChange}
      />
      <Text>{error}</Text>
    </View>
  );
};

export default RNBDropDown;

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  selectedTextStyle: {
    fontSize: 16,
    borderColor: primary,
    // borderRadius: 10,

    color: Colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    // borderColor: primary,
    // borderRadius: 5,
    // borderWidth: 1,
    borderColor: Colors.black,
    color: Colors.black,
  },
});
