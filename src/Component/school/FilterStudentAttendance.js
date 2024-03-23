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
import {MarkStudentAttendance} from '../../redux/action/attendanceActions';
import moment from 'moment';
import RNBDropDown from '../RNBDropDown';
const FilterStudentAttendance = ({showModal, setShowModal}) => {
  const dispatch = useDispatch();
  const [atttendanceDate, setatttendanceDate] = useState(getTodaysDate());
  const [courseorclass, setcourseorclass] = useState('');
  const [sectionname, setsectionname] = useState('NONE');
  const [courselist, setcourselist] = useState([]);
  const [sectionlist, setsectionlist] = useState([]);
  const {course} = useSelector(state => state.getcourse);
  const {sections} = useSelector(state => state.GetSection);
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);
  const {markattendance, loading} = useSelector(state => state.markatten);
  const {innerContainer, childContainer, mainContainer} = styles;

  const onSubmit = () => {
    var momentDate = moment(atttendanceDate, 'DD/MM/YYYY');
    var yyyyddmm = moment(momentDate).format('YYYY-MM-DD');
    dispatch(
      MarkStudentAttendance(
        yyyyddmm,
        '',
        courseorclass,
        sectionname,
        CURRENTSESSION,
      ),
    );

    console.log('dnfdx', yyyyddmm, courseorclass, sectionname, CURRENTSESSION);
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
            }}>
            <ScrollView
              style={{height: deviceHeight * 0.4}}
              showsVerticalScrollIndicator={false}>
              <View style={styles.rowwrapper}>
                <View style={{width: '49.3%'}}>
                  <RNDatePicker
                    title="Select Date"
                    value={atttendanceDate}
                    onDateChange={date => setatttendanceDate(handleDate(date))}
                  />
                </View>
                <View style={{width: '49.3%'}}>
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
                <View style={{width: '100%'}}>
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

export default FilterStudentAttendance;

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
    marginTop: 10,
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
