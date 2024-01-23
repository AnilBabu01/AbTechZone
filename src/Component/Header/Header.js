import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {primary, hightlight} from '../../utils/Colors';
import {Height, Width} from '../../utils/responsive';
import profileimg from '../../assets/profileimg.jpg';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const windowWidth = Dimensions.get('window').width;
const Header = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);
  const [istoken, setistoken] = useState('');
  const getToken = async () => {
    let token = await AsyncStorage.getItem('erptoken');
    setistoken(token);
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <View>
      <View style={styles.mainheader}>
        <Pressable
          onPress={() => {
            navigation.openDrawer();
          }}>
          <FontAwesome6 name="bars" color={Colors.white} size={30} />
        </Pressable>

        {istoken ? (
          <>
            <View style={styles.profile}>
              {/* <Pressable onPress={() => showNotification(true)}>
                <MaterialIcons name="notifications" size={20} color="#fff" />
              </Pressable> */}
              <Pressable onPress={() => navigation.navigate('ProfileCoaching')}>
                {user?.data?.CredentailsData?.profileurl ? (
                  <>
                    <Image
                      source={{
                        uri: `${user?.data?.CredentailsData?.profileurl}`,
                      }}
                      style={styles.avator}
                    />
                  </>
                ) : (
                  <>
                    <Image source={profileimg} style={styles.avator} />
                  </>
                )}
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginbtn}>
                <Text style={styles.logintextstyle}>Login</Text>
              </View>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainheader: {
    width: windowWidth,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: primary,
    paddingBottom: 5,
  },
  loginbtn: {
    width: Width(80),
    height: Height(35),
    backgroundColor: hightlight,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logintextstyle: {
    color: 'white',
    // fontWeight: 700,
    fontSize: 22,
  },
  profile: {
    backgroundColor: primary,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avator: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  logoimg: {
    height: Height(50),
    width: Width(50),
  },
  menuimg: {
    height: Height(40),
    width: Width(40),
    borderRadius: 10,
  },
});
