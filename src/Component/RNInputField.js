import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors} from '../utils/Colors';

const RNInputField = props => {
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
    ...rest
  } = props;

  return (
    <View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          lineHeight: 19,
          marginBottom: 9,
          color: Colors.black,
        }}>
        {label}
      </Text>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        mode="outlined"
        activeOutlineColor={Colors.black}
        placeholderTextColor="black"
        textColor="black"
        onChangeText={onChange}
        value={value}
        secureTextEntry={passwordShow}
        style={{backgroundColor: Colors.white, color: Colors.black}}
        right={
          ispassword ? (
            <TextInput.Icon
              onPress={() => {
                if (setShowPassword) setShowPassword(!passwordShow);
              }}
              icon={passwordShow ? 'eye' : 'eye-off'}
            />
          ) : (
            rightIcon && rightIcon
          )
        }
        {...rest}
      />

      <Text>{error}</Text>
    </View>
  );
};

export default RNInputField;

const styles = StyleSheet.create({});
