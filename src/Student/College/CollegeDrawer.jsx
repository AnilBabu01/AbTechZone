import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import profileimg from '../../assets/profileimg.jpg';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser} from '../../redux/action/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Component/Loader/Loader';
import {Colors} from '../../utils/Colors';
import {deviceWidth} from '../../utils/constant';
const CollegeDrawer = ({navigation, setuserData}) => {
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

  const CommonBTN = ({routename, icon, title}) => {
    return (
      <TouchableOpacity
        style={styles.menu}
        // onPress={() => navigation.navigate(routename)}
      >
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
      <Loader loader={loader} sms={sms} />
      <View style={styles.mainprofile}>
        <View style={styles.innearviewprofile}>
          {user?.data?.CredentailsData?.profileurl ? (
            <>
              <Image
                source={{
                  uri: `${user?.data?.CredentailsData?.profileurl}`,
                }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
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
                  borderRadius: 10,
                }}
              />
            </>
          )}

          <Text style={{color: Colors.black}}>{user?.data?.User?.name}</Text>
        </View>
      </View>
      <View style={styles.divider}></View>

      <CommonBTN routename="DashboardSchool" title="DashBoard" icon="grid" />

      <TouchableOpacity style={styles.menu} onPress={() => logout()}>
        <View style={styles.innearview}>
          <View style={styles.inneartitle}>
            <Ionicons name="log-out" color={Colors.primary} size={25} />
            <Text style={styles.textstyle}>Logout</Text>
          </View>

          <Ionicons
            name="chevron-forward-outline"
            color={Colors.primary}
            size={25}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CollegeDrawer;

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
});
