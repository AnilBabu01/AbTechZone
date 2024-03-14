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
    ...rest
  } = props;

  return (
    <View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          lineHeight: 19,
          color: Colors.black,
        }}>
        {label}
      </Text>
      <Dropdown
        style={styles.dropstyle}
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
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Please Select"
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
  dropstyle: {
    alignSelf: 'center',
    width: '100%',
    padding: deviceWidth * 0.023,
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginTop: 6,
    paddingHorizontal: deviceWidth * 0.028,
    backgroundColor: Colors.white,
    color: Colors.black,
  },

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
    borderColor: primary,
    // borderRadius: 5,
    // borderWidth: 1,
    borderColor: Colors.primary,
    color: Colors.black,
  },
});
