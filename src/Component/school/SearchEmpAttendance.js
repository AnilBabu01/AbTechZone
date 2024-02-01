import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import RNButton from '../RNButton';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {serverInstance} from '../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import {Width, Height} from '../../utils/responsive';
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

const SearchEmpAttendance = ({
  showModal,
  setShowModal,
  setattendancedetails,
}) => {
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
  const [loading, setloading] = useState(false);
  const [emp, setemp] = useState('');
  const [emplist, setemplist] = useState([]);
  const {employees} = useSelector(state => state.getemp);
  const {innerContainer, childContainer, mainContainer} = styles;

  const onSubmit = () => {
    const data = {
      month: Number(month),
      emp: Number(emp),
    };
    serverInstance('EmployeeAttendance/analysisattendance', 'post', data).then(
      res => {
        if (res?.status) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });

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

  useEffect(() => {
    if (employees) {
      setemplist(employees);
    }
  }, [employees]);

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
              <View style={{width: '100%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      lineHeight: 19,
                    }}>
                    Month
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      monthlist &&
                      monthlist?.map(item => ({
                        label: `${item?.name}`,
                        value: `${item?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Month"
                    searchPlaceholder="Search..."
                    value={month}
                    onChange={item => {
                      setmonth(item.value);
                    }}
                  />
                </View>
              </View>
              <View style={{width: '100%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      lineHeight: 19,
                    }}>
                    Employee
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      emplist &&
                      emplist?.map(item => ({
                        label: `${item?.name} ${item?.empId}`,
                        value: `${item?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Employee"
                    searchPlaceholder="Search..."
                    value={emp}
                    onChange={item => {
                      setemp(item.value);
                    }}
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

export default SearchEmpAttendance;

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
