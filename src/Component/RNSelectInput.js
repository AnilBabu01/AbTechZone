import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../utils/Colors';
import {Divider, Menu} from 'react-native-paper';
import {deviceHeight, deviceWidth} from '../utils/constant';

const RNSelectInput = (
  items,
  placeholder,
  title,
  outterContainerStyle,
  onChangeSelect,
  value,
) => {
  const [showModal, setShowModal] = React.useState(false);
  const {container, labelText} = styles;

  return (
    <View style={outterContainerStyle}>
      <Text style={labelText}>{title}</Text>
      <Menu
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        style={{width: deviceWidth * 0.85}}
        contentStyle={{backgroundColor: Colors.white}}
        anchor={
          <Pressable style={container} onPress={() => setShowModal(true)}>
            <Text style={{width: '85%'}} numberOfLines={1}>
              {value?.label ?? placeholder}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={25}
              color={Colors.primary}
            />
          </Pressable>
        }>
        {items?.map((itm, index) => (
          <View style={{}} key={index}>
            <Pressable
              onPress={() => {
                onChangeSelect && onChangeSelect(itm);
                setShowModal(false);
              }}
              style={{
                paddingVertical: deviceHeight * 0.015,
                paddingHorizontal: deviceWidth * 0.03,
              }}>
              <Text>{itm.label}</Text>
            </Pressable>
            <Divider />
          </View>
        ))}
      </Menu>
    </View>
  );
};

export default RNSelectInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
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
