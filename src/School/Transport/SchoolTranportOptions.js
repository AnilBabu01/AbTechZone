import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BackHeader from '../../Component/Header/BackHeader';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import {Height, Width} from '../../utils/responsive';
import Header from '../../Component/Header/Header';
const SchoolTranportOptions = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <View style={styles.mainview}>
        <TouchableOpacity onPress={() => navigation.navigate('VehicleType')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="wand-magic-sparkles"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Vehicle Type</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddRoute')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="route" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Route</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddBus')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="bus" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Bus</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddStudentToTransport')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="user-plus" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Student</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TabGiveBusOrRemove')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="bus" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Assign Bus</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.fakeview}></View>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('SendSmsToBusStudent')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="comment-sms" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Communication</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => navigation.navigate('SearchBus')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="magnifying-glass"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Search</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </>
  );
};

export default SchoolTranportOptions;

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

  fakeview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: Width(110),
    height: Height(80),
    margin: deviceWidth * 0.01,
    borderRadius: 10,
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
  titlestyle: {
    fontWeight: 'bold',
    marginVertical: deviceHeight * 0.01,
    fontSize: 14,
    textAlign: 'center',
  },
});
