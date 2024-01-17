import {View, StyleSheet, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo1 from '../assets/phonelogo.png';
import {useDispatch} from 'react-redux';
import {loadUser} from '../redux/action/authActions';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();

  const gettoken = async () => {
    let userType = await AsyncStorage.getItem('userType');

    if (userType === 'school') {
      navigation.navigate('DashboardSchool');
    }
    if (userType === 'college') {
      navigation.navigate('DashboardCollege');
    }
    if (userType === 'institute') {
      navigation.navigate('DashboardCoaching');
    }
    if (userType === 'employee') {
      navigation.navigate('DashboardEmplyee');
    }
    if (userType === 'student') {
      navigation.navigate('DashboardStudent');
    }
    if (userType === 'parent') {
      navigation.navigate('DashboardParent');
    }
    if (userType === 'admin') {
      navigation.navigate('DashboardOwner');
    }
  };

  useEffect(() => {
    gettoken();
    dispatch(loadUser());
  }, []);

  return (
    <View style={style.maincontainer}>
      <StatusBar hidden={true} />
     <View style={style.logocontainer}>
        <Image
          source={logo1}
          style={{
            width: 200,
            height: 200,
            borderRadius: 11,
          }}
        />
      </View>
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
});
