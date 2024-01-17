import {StyleSheet, Text, View, Image} from 'react-native';
import React,{useState} from 'react';
import {DrawerItem} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {secondary, hightlight} from '../utils/Colors';
import profileimg from '../assets/profileimg.jpg';
import dash from '../assets/dash5.png';
import hostel from '../assets/hostel.png';
import hr from '../assets/hr.png';
import library from '../assets/library.png';
import office from '../assets/office.png';
import rupee from '../assets/rupee.png';
import student from '../assets/student.png';
import timetable from '../assets/timetable.png';
import transport from '../assets/transport.png';
import attendance from '../assets/attendance.png';
import reports from '../assets/reports.png';
import test from '../assets/test.png';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser} from '../redux/action/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Component/Loader/Loader';
const AdminDrawerItem = ({navigation,setuserData}) => {
  const [loader, setloader] = useState(false);
  const [sms, setsms] = useState('');
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const logout = async () => {
    setloader(true);
    setsms('Logout....');
    await AsyncStorage.removeItem('erptoken');
    navigation.navigate('home');
    dispatch(loadUser());
    setuserData('');
    setloader(false);
    setsms('');
  };
  return (
    <View>
       <Loader loader={loader} sms={sms}/>
      <View style={styles.mainprofile}>
        <View style={styles.innearview}>
          <Image
            source={profileimg}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
            }}
          />

          {/*             
          {user?.profile_image ? (
            <>
              <Image
                source={{
                  uri: `${backendUrl}uploads/images/${user?.profile_image}`,
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
          )} */}

          <Text style={{color: 'white'}}>Demo</Text>
        </View>
      </View>

      <DrawerItem
        style={styles.menu}
        label="DashBoard"
        icon={() => (
          <Image
            source={dash}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        onPress={() => {
          navigation.closeDrawer();
          //   navigation.navigate('Profiles', {user});
        }}
        labelStyle={{color: 'black'}}
      />
      <DrawerItem
        style={styles.menu}
        label="Front Office"
        icon={() => (
          <Image
            source={office}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        onPress={() => {
          //   navigation.navigate('Home');
          navigation.closeDrawer();
        }}
        labelStyle={{color: 'black'}}
      />

      <DrawerItem
        style={styles.menu}
        label="Student"
        icon={() => (
          <Image
            source={student}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        onPress={() => {
          //   navigation.navigate('login');
          navigation.closeDrawer();
        }}
        labelStyle={{color: 'black'}}
      />
      <DrawerItem
        style={styles.menu}
        label="Time Table"
        icon={() => (
          <Image
            source={timetable}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        onPress={() => {
          //   navigation.navigate('login');
          navigation.closeDrawer();
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
        label="Accounts"
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
        label="Human Resourse"
        icon={() => (
          <Image
            source={hr}
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
        label="Hostal"
        icon={() => (
          <Image
            source={hostel}
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
        label="Library"
        icon={() => (
          <Image
            source={library}
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
        label="Library"
        icon={() => (
          <Image
            source={transport}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        // onPress={() => logout()}
        labelStyle={{color: 'black'}}
      />
      {/* <DrawerItem
        style={styles.menu}
        label="Masters"
        icon={() => (
          <Image
            source={master}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        // onPress={() => logout()}
        labelStyle={{color: 'black'}}
      /> */}
      <DrawerItem
        style={styles.menu}
        label="Reparts"
        icon={() => (
          <Image
            source={reports}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
        // onPress={() => logout()}
        labelStyle={{color: 'black'}}
      />
      {/* <DrawerItem
        style={styles.menu}
        label="School Profile"
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
      /> */}
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

export default AdminDrawerItem;

const styles = StyleSheet.create({
  mainprofile: {
    paddingHorizontal: 10,
  },
  innearview: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: hightlight,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 5,
  },

  menu: {
    backgroundColor: secondary,
  },
});
