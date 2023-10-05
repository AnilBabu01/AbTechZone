import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {DrawerItem} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {secondary, hightlight} from '../utils/Colors';
import profileimg from '../assets/profileimg.jpg';
import dash from '../assets/dash5.png';
import hr from '../assets/hr.png';
import office from '../assets/office.png';
import rupee from '../assets/rupee.png';
import student from '../assets/student.png';
import attendance from '../assets/attendance.png';
import Help from '../assets/help.png';
import master from '../assets/master.png';
import reports from '../assets/reports.png';
import coaching from '../assets/coaching.png';
import test from '../assets/test.png';
const CoachingDrawerItem = ({navigation}) => {
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

          <Text style={{color: 'white'}}>Akash</Text>
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
          navigation.navigate('DashboardCoaching');
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
          navigation.navigate('FrontOfficeCoaching');
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
          navigation.navigate('StudentTabCoaching');
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
          navigation.navigate('AttendanceTabCoaching');
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
      />
      <DrawerItem
        style={styles.menu}
        label="Reports"
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
      <DrawerItem
        style={styles.menu}
        label="Coaching Profile"
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
        label="Logouts"
        icon={() => <Ionicons name="lock-closed-outline" size={30} />}
        // onPress={() => logout()}
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
          navigation.navigate('login');
        }}
        labelStyle={{color: 'black'}}
      />
    </View>
  );
};

export default CoachingDrawerItem;

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
