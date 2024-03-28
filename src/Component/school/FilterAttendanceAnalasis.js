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
import RNDatePicker from '../RNDatePicker';
import RNButton from '../RNButton';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {handleDate, getTodaysDate} from '../../utils/functions';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {Width, Height} from '../../utils/responsive';
import {MonthlyStudentAttendance} from '../../redux/action/attendanceActions';
import moment from 'moment';
import RNBDropDown from '../RNBDropDown';

const studentStatus = [
  {label: 'Active', value: 'Active'},
  {label: 'On Leave', value: 'On Leave'},
  {label: 'Left In Middle', value: 'Left In Middle'},
  {label: 'Completed', value: 'Completed'},
  {label: 'Unknown', value: 'Unknown'},
];

const monthlist = [
  {
    id: 1,
    name: 'April',
  },
  {
    id: 2,
    name: 'May',
  },
  {
    id: 3,
    name: 'Jun',
  },
  {
    id: 4,
    name: 'July',
  },
  {
    id: 5,
    name: 'August',
  },
  {
    id: 6,
    name: 'September',
  },
  {
    id: 7,
    name: 'October',
  },
  {
    id: 8,
    name: 'November',
  },
  {
    id: 9,
    name: 'December',
  },
  {
    id: 10,
    name: 'January',
  },
  {
    id: 11,
    name: 'February',
  },
  {
    id: 12,
    name: 'March',
  },
];

const MonthNolist = {
  April: 1,
  May: 2,
  June: 3,
  July: 4,
  August: 5,
  September: 6,
  October: 7,
  November: 8,
  December: 9,
  January: 10,
  February: 11,
  March: 12,
};

const FilterAttendanceAnalasis = ({showModal, setShowModal}) => {
  const dispatch = useDispatch();
  let currentDate = new Date();
  const currentMonthName = currentDate.toLocaleString('default', {
    month: 'long',
  });
  const currentMonthNumber = MonthNolist[currentMonthName];

  const [month, setmonth] = useState(Number(currentMonthNumber));

  console.log('monthnamelist[currentMonthNumber]', currentMonthNumber);

  const [status, setstatus] = useState('Active');
  const [courseorclass, setcourseorclass] = useState('');
  const [sectionname, setsectionname] = useState('NONE');
  const [courselist, setcourselist] = useState([]);
  const [sectionlist, setsectionlist] = useState([]);
  const {course} = useSelector(state => state.getcourse);
  const {sections} = useSelector(state => state.GetSection);
  const {CURRENTSESSION: sessionname} = useSelector(
    state => state.GetCurrentSession,
  );
  const {monthlyattendance, loading} = useSelector(state => state.monthlyatten);
  const {innerContainer, childContainer, mainContainer} = styles;

  const onSubmit = () => {
    dispatch(
      MonthlyStudentAttendance(
        '',
        Number(month),
        '',
        '',
        status,
        courseorclass,
        sectionname,
        sessionname,
      ),
    );

    // sbatch,
    // month,
    // "",
    // "",
    // status,
    // classname,
    // sectionname,
    // sessionname
  };

  useEffect(() => {
    if (course) {
      setcourselist(course);
    }
    if (sections) {
      setsectionlist(sections);
    }
  }, [course, sections]);

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
              paddingTop: 10,
            }}>
            <ScrollView
              style={{height: deviceHeight * 0.4}}
              showsVerticalScrollIndicator={false}>
              <View style={styles.rowwrapper}>
                <View style={{width: '45%'}}>
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
                <View style={{width: '45%'}}>
                  <RNBDropDown
                    label="Class"
                    value={courseorclass}
                    OptionsList={
                      courselist &&
                      courselist?.map(item => ({
                        label: `${item?.coursename}`,
                        value: `${item?.coursename}`,
                      }))
                    }
                    onChange={data => setcourseorclass(data.value)}
                  />
                </View>
              </View>

              <View style={styles.rowwrapper}>
                <View style={{width: '45%'}}>
                  <RNBDropDown
                    label="Section"
                    value={sectionname}
                    OptionsList={
                      sectionlist &&
                      sectionlist?.map(item => ({
                        label: `${item?.section}`,
                        value: `${item?.section}`,
                      }))
                    }
                    onChange={data => setsectionname(data.value)}
                    placeholder="NONE"
                  />
                </View>
                <View style={{width: '45%'}}>
                  <RNBDropDown
                    label="Status"
                    value={status}
                    OptionsList={studentStatus}
                    onChange={data => setstatus(data.value)}
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

export default FilterAttendanceAnalasis;

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
