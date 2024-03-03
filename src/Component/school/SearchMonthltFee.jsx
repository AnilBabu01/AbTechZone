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
import RNInputField from '../RNInputField';
import RNButton from '../RNButton';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {Width, Height} from '../../utils/responsive';
import Toast from 'react-native-toast-message';
import {serverInstance} from '../../API/ServerInstance';
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

const monthnamelist = {
  1: 'January',

  2: 'February',

  3: 'March',

  4: 'April',

  5: 'May',

  6: 'Jun',

  7: 'July',

  8: 'August',

  9: 'September',

  10: 'October',

  11: 'November',

  12: 'December',
};

const SearchMonthltFee = ({
  showModal,
  setShowModal,
  setloading,
  loading,
  setmonth,
  month,
  setdata,
}) => {
  const [SrNumber, setSrNumber] = useState('');
  const [courseorclass, setcourseorclass] = useState('');
  const [sessionname, setsessionname] = useState('');
  const [courselist, setcourselist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const {course} = useSelector(state => state.getcourse);
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);
  const {Sessions} = useSelector(state => state.GetSession);

  const {innerContainer, childContainer, mainContainer} = styles;

  const onSubmit = () => {
    setloading(true);
    serverInstance('student/SearchfeeByMonth', 'post', {
      scoursename: courseorclass,
      sessionname: sessionname,
      seno: SrNumber,
      monthname: monthnamelist[month],
    }).then(res => {
      if (res?.status === true) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        setdata(res?.data);

        console.log('data fromsearch modal', res);

        setloading(false);
        setShowModal(false);
      }
      if (res?.status === false) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });

        setloading(false);
          setShowModal(false);
      }
    });
  };

  useEffect(() => {
    if (course) {
      setcourselist(course);
    }
    if (CURRENTSESSION) {
      setsessionname(CURRENTSESSION);
    }

    if (Sessions) {
      setsessionList(Sessions);
    }
  }, [course, Sessions, CURRENTSESSION]);

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
              style={{height: deviceHeight * 0.4}}
              showsVerticalScrollIndicator={false}>
              <View style={styles.rowwrapper}>
                <View style={{width: '45%'}}>
                  <View style={{marginHorizontal: deviceWidth * 0.01}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        lineHeight: 19,
                      }}>
                      Session
                    </Text>
                    <Dropdown
                      style={styles.dropstyle}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={
                        sessionList &&
                        sessionList?.map(item => ({
                          label: `${item?.Session}`,
                          value: `${item?.Session}`,
                        }))
                      }
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Session"
                      searchPlaceholder="Search..."
                      value={sessionname}
                      onChange={item => {
                        setsessionname(item.value);
                      }}
                    />
                  </View>
                </View>
                <View style={{width: '49.3%'}}>
                  <View style={{marginHorizontal: deviceWidth * 0.01}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        lineHeight: 19,
                      }}>
                      Class
                    </Text>
                    <Dropdown
                      style={styles.dropstyle}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={
                        courselist &&
                        courselist?.map(item => ({
                          label: `${item?.coursename}`,
                          value: `${item?.coursename}`,
                        }))
                      }
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="All Class"
                      searchPlaceholder="Search..."
                      value={courseorclass}
                      onChange={item => {
                        setcourseorclass(item.value);
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.rowwrapper}>
                <View style={{width: '45%'}}>
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
                <View style={{width: '49.3%'}}>
                  <RNInputField
                    label="Sr Number"
                    placeholder="Enter Sr Number"
                    value={SrNumber}
                    onChangeText={data => setSrNumber(data)}
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

export default SearchMonthltFee;

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
    marginTop: 20,
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
