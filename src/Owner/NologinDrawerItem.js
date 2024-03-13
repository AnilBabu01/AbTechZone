import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import logouticon from '../assets/logoblue1.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../utils/Colors';
import {deviceWidth} from '../utils/constant';
const NologinDrawerItem = ({navigation}) => {
  const CommonBTN = ({routename, icon, title}) => {
    return (
      <TouchableOpacity
        style={styles.menu}
        onPress={() => navigation.navigate(routename)}>
        <View style={styles.innearview}>
          <View style={styles.inneartitle}>
            <Ionicons name={icon} color={Colors.primary} size={25} />
            <Text style={styles.textstyle}>{title}</Text>
          </View>

          <Ionicons
            name="chevron-forward-outline"
            color={Colors.primary}
            size={25}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={styles.mainprofile}>
        <View style={styles.innearviewprofile}>
          <Image
            source={logouticon}
            style={{
              width: '100%',
              height: 80,
              borderRadius: 50,
            }}
          />
        </View>
      </View>
      <View style={styles.divider}></View>
      <CommonBTN routename="Login" title="Home" icon="home" />
      <CommonBTN routename="Login" title="Learning" icon="book" />
      <CommonBTN routename="Login" title="Login" icon="log-in" />
      <CommonBTN
        routename="HelpCenter"
        title="Help Center"
        icon="help-circle"
      />
    </View>
  );
};

export default NologinDrawerItem;

const styles = StyleSheet.create({
  mainprofile: {
    paddingHorizontal: 10,
  },

  innearview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  innearviewprofile: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 5,
  },

  menu: {
    marginHorizontal: deviceWidth * 0.02,
    marginBottom: deviceWidth * 0.02,
    paddingVertical: deviceWidth * 0.02,
    paddingRight: deviceWidth * 0.07,
  },
  inneartitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textstyle: {
    color: Colors.black,
    paddingLeft: deviceWidth * 0.02,
  },
  divider: {
    borderWidth: 1,
    borderColor: Colors.fadeGray,
  },
  mainprofile: {
    paddingHorizontal: 10,
  },
});
