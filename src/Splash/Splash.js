import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo1 from '../assets/phonelogo.png';

const Splash = ({navigation}) => {
  const gettoken = async () => {
    let token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.navigate('Drawer');
    }
  };

  useEffect(() => {
    gettoken();
  }, []);

  return (
    <View style={style.maincontainer}>
      <StatusBar hidden={true} />
      {/* <View></View> */}
      <View style={style.logocontainer}>
        <Image
          source={logo1}
          style={{
            width: 200,
            height: 200,
            borderRadius: 11,
          }}
        />
        {/* <Text style={style.textsplsh}>erp</Text> */}
      </View>
      {/* <View style={style.bottomcontainer}>
        <Text style={style.bottomtext}>erp</Text>
      </View> */}
    </View>
  );
};

export default Splash;

const style = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textsplsh: {
    fontSize: 25,
    color: '#fa9c23',
    marginTop: 10,
    textAlign: 'center',
  },

  logocontainer: {
    alignItems: 'center',
  },
  bottomcontainer: {},
  bottomtext: {},
});
