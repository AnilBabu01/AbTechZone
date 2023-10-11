import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {DrawerItem} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {secondary, profileheader} from '../utils/Colors';
import profileimg from '../assets/logoblue1.png';
import Help from '../assets/help.png';
import homee from '../assets/homee.png';
import learning from '../assets/learning.png';
import loginIcon from '../assets/loginIcon.png';
import logouticon from '../assets/logouticon.png';
const NologinDrawerItem = ({navigation}) => {
  return (
    <View>
      {/* <View style={styles.mainprofile}>
        <View style={styles.innearview}>
          <Image
            source={profileimg}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
            }}
          />
        </View>
      </View> */}
      <DrawerItem
        style={styles.menu}
        label="Home"
        icon={() => (
          <Image
            source={homee}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        onPress={() => {
          navigation.closeDrawer();
          // navigation.navigate('login');
        }}
        labelStyle={{color: 'black'}}
      />

      <DrawerItem
        style={styles.menu}
        label="Learning"
        icon={() => (
          <Image
            source={learning}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        onPress={() => {
          navigation.closeDrawer();
          // navigation.navigate('login');
        }}
        labelStyle={{color: 'black'}}
      />
      <DrawerItem
        style={styles.menu}
        label="Login"
        icon={() => (
          <Image
            source={loginIcon}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Login');
        }}
        labelStyle={{color: 'black'}}
      />
      <DrawerItem
        style={styles.menu}
        label="Help Center"
        icon={() => (
          <Image
            source={Help}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        onPress={() => {
          navigation.closeDrawer();
          // navigation.navigate('login');
        }}
        labelStyle={{color: 'black'}}
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
    alignItems: 'center',
    backgroundColor: profileheader,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 5,
  },

  menu: {
    backgroundColor: secondary,
  },
});
