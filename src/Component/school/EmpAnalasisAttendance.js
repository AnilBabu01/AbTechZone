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
import RNButton from '../RNButton';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {serverInstance} from '../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import {Width, Height} from '../../utils/responsive';
import {useSelector, useDispatch} from 'react-redux';
import RNBDropDown from '../RNBDropDown';
const monthlist = [
  {
    id: 1,
    name: 'January',
  },
  {
    id: 2,
    name: 'February',
  },
  {
    id: 3,
    name: 'March',
  },
  {
    id: 4,
    name: 'April',
  },
  ,
  {
    id: 5,
    name: 'May',
  },
  {
    id: 6,
    name: 'Jun',
  },
  {
    id: 7,
    name: 'July',
  },
  {
    id: 8,
    name: 'August',
  },
  {
    id: 8,
    name: 'September',
  },
  {
    id: 10,
    name: 'October',
  },
  {
    id: 11,
    name: 'November',
  },
  {
    id: 12,
    name: 'December',
  },
];

const EmpAnalasisAttendance = ({
  showModal,
  setShowModal,
  setattendancedetails,
}) => {
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
  const [loading, setloading] = useState(false);
  const {CURRENTSESSION: sessionname} = useSelector(
    state => state.GetCurrentSession,
  );
  const {innerContainer, childContainer, mainContainer} = styles;

  const onSubmit = () => {
    const data = {
      month: Number(month),
      session: sessionname,
    };
    serverInstance('EmployeeAttendance/analysisattendance', 'post', data).then(
      res => {
        if (res?.status) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });

          // setShowModal(false);
          setattendancedetails(res?.data);
          setloading(false);
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
      },
    );
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
              style={{height: deviceHeight * 0.3}}
              showsVerticalScrollIndicator={false}>
              <View style={styles.rowwrapper}>
                <View style={{width: '100%'}}>
                  <RNBDropDown
                    label="Month"
                    value={month}
                    OptionsList={
                      monthlist &&
                      monthlist?.map(item => ({
                        label: `${item?.name}`,
                        value: `${item?.id}`,
                      }))
                    }
                    onChange={data => setmonth(data.value)}
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

export default EmpAnalasisAttendance;

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
    paddingTop: 10,
  },
  dropstyle: {
    width: '100%',
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
