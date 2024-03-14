import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../utils/Colors';
import {deviceWidth} from '../utils/constant';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';

const RNTimePicker = ({value, title, onDateChange}) => {
  const {container} = styles;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleConfirmDate = data => {
    setOpen(false);
    // setDate(date);
    onDateChange && onDateChange(data);
  };

  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          lineHeight: 19,
          color: Colors.black,
        }}>
        {title}
      </Text>

      <Pressable onPress={() => setOpen(true)} style={container}>
        <Text style={{color: Colors.black}}>{value}</Text>
        <FontAwesome6 name="calendar" size={25} color={Colors.black} />
      </Pressable>
      <DatePicker
        modal
        mode="time"
        open={open}
        date={date || undefined}
        onConfirm={handleConfirmDate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default RNTimePicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: deviceWidth * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginTop: 6,
  },
});
