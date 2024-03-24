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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../utils/Colors';
import Notification from './Notification';
import {deviceHeight,deviceWidth}  from '../../utils/constant';
const windowWidth = Dimensions.get('window').width;
const Header = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);
  const [istoken, setistoken] = useState('');
  const [openModel, setopenModel] = useState(false);
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
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
              <View style={styles.notificationView}>
                <Notification
                  count={notificationCount}
                  onPress={() => navigation.navigate('ViewNotification')}
                />
              </View>

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
  notificationView: {
    marginRight: 20,
  },
  mainheader: {
    width: windowWidth,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: deviceHeight*0.06,
    backgroundColor: primary,
    paddingBottom: 5,
  },
  loginbtn: {
    width: deviceWidth*0.3,
    height: deviceHeight*0.05,
    // backgroundColor: hightlight,
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
    resizeMode:'contain'
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
