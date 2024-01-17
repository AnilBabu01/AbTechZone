import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {DrawerItem} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {secondary, profileheader} from '../utils/Colors';
import profileimg from '../assets/profileimg.jpg';
import rupee from '../assets/rupee.png';
import attendance from '../assets/attendance.png';
import coaching from '../assets/coaching.png';
import test from '../assets/test.png';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser} from '../redux/action/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Component/Loader/Loader';
import {backendUrl} from '../Config/config';
const StudentDrawerItem = ({navigation, setuserData}) => {
  const [loader, setloader] = useState(false);
  const [sms, setsms] = useState('');
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const logout = async () => {
    setloader(true);
    setsms('Logout....');
    await AsyncStorage.removeItem('erptoken');
    await AsyncStorage.removeItem('userType');
    navigation.navigate('home');
    dispatch(loadUser());
    setuserData('');
    setloader(false);
    setsms('');
  };
  return (
    <View>
      <Loader loader={loader} sms={sms} />
      <View style={styles.mainprofile}>
        <View style={styles.innearview}>
          {user?.data?.CredentailsData?.profileurl ? (
            <>
              <Image
                source={{
                  uri: `${backendUrl}public/upload/${user?.data?.CredentailsData?.profileurl}`,
                }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                }}
              />
            </>
          ) : (
            <>
              <Image
                source={profileimg}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                }}
              />
            </>
          )}

          <Text style={{color: 'white'}}>{user?.data?.User?.name}</Text>
        </View>
      </View>

      <DrawerItem
        style={styles.menu}
        label="Home"
        icon={() => <Ionicons name="home-outline" size={30} />}
        onPress={() => {
          navigation.closeDrawer();
          //   navigation.navigate('Profiles', {user});
        }}
        labelStyle={{color: 'black'}}
      />

      <DrawerItem
        style={styles.menu}
        label="Attendance"
        icon={() => (
          <Image
            source={attendance}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        onPress={() => {
          //   navigation.navigate('Changepassword');
          navigation.closeDrawer();
        }}
        labelStyle={{color: 'black'}}
      />
      <DrawerItem
        style={styles.menu}
        label="Fee"
        icon={() => (
          <Image
            source={rupee}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        onPress={() => {
          navigation.closeDrawer();
          //   navigation.navigate('login');
        }}
        labelStyle={{color: 'black'}}
      />

      <DrawerItem
        style={styles.menu}
        label="Profile"
        icon={() => (
          <Image
            source={coaching}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        // onPress={() => logout()}
        labelStyle={{color: 'black'}}
      />
      <DrawerItem
        style={styles.menu}
        label="Test"
        icon={() => (
          <Image
            source={test}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        // onPress={() => logout()}
        labelStyle={{color: 'black'}}
      />
      <DrawerItem
        style={styles.menu}
        label="Logout"
        icon={() => <Ionicons name="lock-closed-outline" size={30} />}
        onPress={() => {
          navigation.closeDrawer();
          logout();
        }}
        labelStyle={{color: 'black'}}
      />
    </View>
  );
};

export default StudentDrawerItem;

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
