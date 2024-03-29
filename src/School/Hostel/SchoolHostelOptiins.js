import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BackHeader from '../../Component/Header/BackHeader';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import {Height, Width} from '../../utils/responsive';
import Checkin from '../../assets/Checkin.png';
import Checkout from '../../assets/Checkout.png';
import Header from '../../Component/Header/Header';
const SchoolHostelOptiins = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <View style={styles.mainview}>
        <TouchableOpacity onPress={() => navigation.navigate('HostelCategory')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="layer-group" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Add Category</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HostelFacility')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="history" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Add Facility</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Addhostel')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="hotel" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Add Hostel</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AddRoom')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="restroom" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Add Room</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddStudentToHostel')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="user-plus" color={Colors.optionColor} size={30} />
            <Text style={styles.titlestyle}>Add Student</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Checking')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="check-to-slot"
              color={Colors.optionColor}
              size={30}
            />

            <Text style={styles.titlestyle}>Check-In</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="arrows" color={Colors.optionColor} size={30} />

            <Text style={styles.titlestyle}>Check-Out</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RoomChange')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="anchor" color={Colors.optionColor} size={30} />

            <Text style={styles.titlestyle}>Room Shift</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('SearchHostel')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="magnifying-glass"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Search</Text>
          </View>
        </TouchableOpacity> */}

        <View style={styles.mainoptionEmpty}></View>
      </View>
    </>
  );
};

export default SchoolHostelOptiins;

const styles = StyleSheet.create({
  mainview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: deviceHeight * 0.01,
    paddingHorizontal: deviceWidth * 0.01,
  },

  mainoption: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth*0.3,
    paddingVertical: 5,
    backgroundColor: Colors.optionBGColor,
    margin: deviceWidth * 0.01,
    borderRadius: 10,
  },
  mainoptionEmpty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth*0.3,
    paddingVertical: 5,
    // backgroundColor: Colors.fadeGray,
    margin: deviceWidth * 0.01,
    borderRadius: 10,
  },
  titlestyle: {
    fontWeight: 'bold',
    marginVertical: deviceHeight * 0.01,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.optionColor,
  },
  optionimg: {
    width: Width(30),
    height: Height(30),
  },
});
