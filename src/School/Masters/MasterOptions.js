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

const MasterOptions = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <View style={styles.mainview}>
        <TouchableOpacity onPress={() => navigation.navigate('AddClass')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="computer" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Class</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddSession')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="calendar" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Session</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AddSection')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="section" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Section</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AddStream')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="creative-commons-sampling-plus"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Add Stream</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddSubject')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="book" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Subjects</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddCaste')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="certificate" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Caste</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddFee')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="indian-rupee-sign"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Fee Structure</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AddDepartment')}>
          <View style={styles.mainoption}>
            <FontAwesome6
              name="building-user"
              color={Colors.primary}
              size={30}
            />
            <Text style={styles.titlestyle}>Deparment</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddDesignation')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="compass" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Designation</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FooterDetails')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="shoe-prints" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Footer Details</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddNotice')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="circle-info" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Notic</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddSlider')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="images" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Add Slider</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddReceiptFormat')}>
          <View style={styles.mainoption}>
            <FontAwesome6 name="receipt" color={Colors.primary} size={30} />
            <Text style={styles.titlestyle}>Receipt Format</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MasterOptions;

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
    width: Width(110),
    height: Height(80),
    backgroundColor: Colors.fadeGray,
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
