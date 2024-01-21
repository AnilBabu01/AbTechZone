import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {deviceWidth} from '../utils/constant';
import {Colors,primary} from '../utils/Colors';

import {useNavigation} from '@react-navigation/native';
const RNTable = ({isFirst, data, theme, isBorderCurve}) => {
  const navigation = useNavigation();

  const nav = data => {
    navigation.navigate(data.redirect, {
      editdata: data.allDetails,
    });

    console.log('dd', data.redirect);
  };
  return (
    <View style={{flexDirection: 'row'}}>
      {data?.length>0&&
        data?.map((item, index) => (
          <View key={index} style={{width: deviceWidth * item.width}}>
            <View
              style={[
                styles.tabContainer,
                index == 0 && isBorderCurve && {borderTopLeftRadius: 15},
                index + 1 === data.length &&
                  isBorderCurve && {borderTopRightRadius: 15},
                theme === 'primary'
                  ? {backgroundColor: Colors.primary}
                  : {backgroundColor: Colors.light1Grey},
                {
                  alignItems: item.align,
                  paddingHorizontal: deviceWidth * (item.width * 0.05),
                },
              ]}>
              <Text
                style={{
                  color: theme === 'primary' ? Colors.white : Colors.black,
                }}>
                {item?.title}
              </Text>
            </View>
            {item?.items.map((data, index) => (
              <View
                key={index}
                style={[
                  {
                    justifyContent: 'center',
                    alignItems: item.align,
                    paddingVertical: 8,
                    paddingHorizontal: deviceWidth * (item.width * 0.06),
                  },
                  index % 2 !== 0 && {backgroundColor: Colors.lightGrey},
                ]}>
                <TouchableOpacity onPress={() => nav(data)}>
                  <Text numberOfLines={1} style={{}}>
                    {data?.value}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
    </View>
  );
};

export default RNTable;

const styles = StyleSheet.create({
  tabContainer: {
    overflow: 'hidden',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
