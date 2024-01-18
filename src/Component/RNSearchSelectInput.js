import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../utils/colors';
import {Divider, Menu} from 'react-native-paper';
import {deviceHeight, deviceWidth} from '../utils/constant';
import {Dropdown} from 'react-native-element-dropdown';
const RNSelectInput = ({
  items,
  placeholder,
  title,
  outterContainerStyle,
  onChangeSelect,
  value,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const {container, labelText} = styles;

  return (
    <View style={outterContainerStyle}>
      <Text style={labelText}>{title}</Text>
        
        
    </View>
  );
};

export default RNSelectInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey,
    padding: deviceWidth * 0.035,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 6,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
    color: Colors.black,
  },
});
