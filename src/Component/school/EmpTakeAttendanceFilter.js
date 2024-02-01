import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import RNDatePicker from '../RNDatePicker';
import RNButton from '../RNButton';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {handleDate, getTodaysDate} from '../../utils/functions';
import {Width, Height} from '../../utils/responsive';
import moment from 'moment';
import {serverInstance} from '../../API/ServerInstance';
import Toast from 'react-native-toast-message';
const EmpTakeAttendanceFilter = ({
  showModal,
  setShowModal,
  setattendancedetails,
}) => {
  const [atttendanceDate, setatttendanceDate] = useState(getTodaysDate());
  const [loading, setloading] = useState(false);
  const {innerContainer, childContainer, mainContainer} = styles;

  const onSubmit = () => {
    setloading(true);
    var momentDate = moment(atttendanceDate, 'DD/MM/YYYY');
    var yyyyddmm = moment(momentDate).format('YYYY-MM-DD');
    const data = {
      Attendancedate: yyyyddmm,
    };

    serverInstance('EmployeeAttendance/attendance', 'post', data).then(res => {
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        setShowModal(false);
        setattendancedetails(res?.data)
        setloading(false);
        
        console.log("employee attendance is",res);

      }

      if (res?.status === false) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
        setShowModal(false);
        setloading(false);
      }
    });
  };

  return (
    <>
      <Modal animationType={'fade'} transparent={true} visible={showModal}>
        <View style={[innerContainer, mainContainer]}>
          <Text
            style={{
              color: Colors.white,
              fontSize: 17,
              fontWeight: '600',
              lineHeight: 20,
            }}>
            Filter
          </Text>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Ionicons name="close" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={[childContainer]}>
          <View
            style={{
              position: 'relative',
              backgroundColor: Colors.white,
            }}>
            <ScrollView
              style={{height: deviceHeight * 0.2}}
              showsVerticalScrollIndicator={false}>
              <View style={styles.rowwrapper}>
                <View style={{width: '100%'}}>
                  <RNDatePicker
                    title="Select Date"
                    value={atttendanceDate}
                    onDateChange={date => setatttendanceDate(handleDate(date))}
                  />
                </View>
              </View>
            </ScrollView>
            <View style={styles.bottomBtn}>
              <RNButton loading={loading} onPress={onSubmit}>
                Submit
              </RNButton>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EmpTakeAttendanceFilter;

const styles = StyleSheet.create({
  bottomBtn: {
    marginBottom: deviceHeight * 0.02,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 5,
  },

  innerContainer: {
    backgroundColor: Colors.primary,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  childContainer: {
    marginHorizontal: deviceWidth * 0.04,
    marginBottom: deviceWidth * 0.06,
  },

  mainContainer: {
    marginHorizontal: deviceWidth * 0.04,
    marginTop: deviceWidth * 0.04,
  },
  rowwrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: deviceWidth * 0.02,
  },
  dropstyle: {
    width: Width(160),
    height: Height(54),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(20),
    fontSize: Height(16),
    marginTop: Height(7),
    backgroundColor: Colors.fadeGray,
    color: 'white',
  },
});
