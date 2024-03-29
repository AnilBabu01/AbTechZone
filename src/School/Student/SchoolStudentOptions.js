import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import {Height, Width} from '../../utils/responsive';
import Header from '../../Component/Header/Header';
import {useSelector} from 'react-redux';
const SchoolStudentOptions = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);
  return (
    <>
      <Header />
      <View>
        <View style={styles.mainview}>
          <TouchableOpacity onPress={() => navigation.navigate('Admission')}>
            <View style={styles.mainoption}>
              <FontAwesome6
                name="user-plus"
                color={Colors.optionColor}
                size={30}
              />
              <Text style={styles.titlestyle}>Admission</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Add')}>
            <View style={styles.mainoption}>
              <FontAwesome6
                name="user-plus"
                color={Colors.optionColor}
                size={30}
              />
              <Text style={styles.titlestyle}>Add</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AttendanceTabSchool')}>
            <View style={styles.mainoption}>
              <FontAwesome6
                name="receipt"
                color={Colors.optionColor}
                size={30}
              />
              <Text style={styles.titlestyle}>Attendance</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('AddOtherFee')}>
            <View style={styles.mainoption}>
              <FontAwesome6
                name="indian-rupee-sign"
                color={Colors.optionColor}
                size={30}
              />
              <Text style={styles.titlestyle}>Add Other Fee</Text>
            </View>
          </TouchableOpacity>

          {user?.data?.User?.userType != 'employee' && (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddTimeTable')}>
                <View style={styles.mainoption}>
                  <FontAwesome6
                    name="calendar"
                    color={Colors.optionColor}
                    size={30}
                  />
                  <Text style={styles.titlestyle}>Time Table</Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate('SCreadentials')}>
            <View style={styles.mainoption}>
              <FontAwesome6
                name="person-military-to-person"
                color={Colors.optionColor}
                size={30}
              />
              <Text style={styles.titlestyle}>Student Credentials</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PCreadentials')}>
            <View style={styles.mainoption}>
              <FontAwesome6
                name="person-military-to-person"
                color={Colors.optionColor}
                size={30}
              />
              <Text style={styles.titlestyle}>Parent Credentials</Text>
            </View>
          </TouchableOpacity>

          {user?.data?.User?.userType != 'employee' && (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChangeSession')}>
                <View style={styles.mainoption}>
                  <FontAwesome6
                    name="database"
                    color={Colors.optionColor}
                    size={30}
                  />
                  <Text style={styles.titlestyle}>Change Session</Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={() => navigation.navigate('TCTab')}>
            <View style={styles.mainoption}>
              <FontAwesome6
                name="certificate"
                color={Colors.optionColor}
                size={30}
              />
              <Text style={styles.titlestyle}>TC</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CCTab')}>
            <View style={styles.mainoption}>
              <FontAwesome6
                name="certificate"
                color={Colors.optionColor}
                size={30}
              />
              <Text style={styles.titlestyle}>CC</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('IdCardView')}>
            <View style={styles.mainoption}>
              <FontAwesome6
                name="certificate"
                color={Colors.optionColor}
                size={30}
              />
              <Text style={styles.titlestyle}>Id Card</Text>
            </View>
          </TouchableOpacity>
          {user?.data?.User?.userType != 'employee' && (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('CommunicationTab')}>
                <View style={styles.mainoption}>
                  <FontAwesome6
                    name="comment-sms"
                    color={Colors.optionColor}
                    size={30}
                  />
                  <Text style={styles.titlestyle}>Send SMS</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default SchoolStudentOptions;

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
    width: deviceWidth * 0.3,
    paddingVertical: 5,
    backgroundColor: Colors.optionBGColor,
    margin: deviceWidth * 0.01,
    borderRadius: 10,
  },
  mainoptionface: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: Width(110),
    height: Height(80),
    margin: deviceWidth * 0.01,
    borderRadius: 10,
  },
  titlestyle: {
    fontWeight: 'bold',
    marginVertical: deviceHeight * 0.01,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.optionColor,
    fontWeight: 'bold',
  },
});
