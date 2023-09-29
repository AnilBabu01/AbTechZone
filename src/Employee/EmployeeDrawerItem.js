import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
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
import card from '../assets/card.png';
import employee from '../assets/employee.png';
import result from '../assets/result.png';
import master from '../assets/master.png';
import reports from '../assets/reports.png';
import coaching from '../assets/coaching.png';
import test from '../assets/test.png';
const EmployeeDrawerItem = ({navigation}) => {
  return (
    <View>
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

          <Text style={{color: 'white'}}>Anil Babu</Text>
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
        label="Logouts"
        icon={() => <Ionicons name="lock-closed-outline" size={30} />}
        // onPress={() => logout()}
        labelStyle={{color: 'black'}}
      />
    </View>
  );
};

export default EmployeeDrawerItem;

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
