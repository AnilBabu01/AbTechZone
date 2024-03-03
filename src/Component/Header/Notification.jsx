// Notification.js
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Notification = ({count, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Icon name="notifications" size={35} color="white" />
        {count > 0 && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: 10,
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              top: 0,
              right: 0,
            }}>
            <Text style={{color: 'white'}}>{count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Notification;
