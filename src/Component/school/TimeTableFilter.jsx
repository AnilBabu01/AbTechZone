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
import {Height, Width} from '../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import RNBDropDown from '../RNBDropDown';
import {GetsSubject} from '../../redux/action/commanAction';

const daylist = [
  {label: 'Monday', value: 'Monday'},
  {label: 'Tuesday', value: 'Tuesday'},
  {label: 'Wednesday', value: 'Wednesday'},
  {label: 'Thursday', value: 'Thursday'},
  {label: 'Friday', value: 'Friday'},
  {label: 'Saturday', value: 'Saturday'},
  {label: 'Sunday', value: 'Sunday'},
];
const TimeTableFilter = ({showModal, setShowModal}) => {
  const dispatch = useDispatch();
  const [classId, setclassId] = useState('');
  const [empID, setempID] = useState('');
  const [courseorclass, setcourseorclass] = useState('Monday');
  const [courselist, setcourselist] = useState([]);
  const [EmpList, setEmpList] = useState([]);
  const {course} = useSelector(state => state.getcourse);
  const {sections} = useSelector(state => state.GetSection);
  const {employees} = useSelector(state => state.getemp);
  const {container, innerContainer, childContainer, mainContainer} = styles;
  const {loading} = useSelector(state => state.GetSubject);

  useEffect(() => {
    if (course) {
      setcourselist(course);
    }
    if (employees) {
      setEmpList(employees);
    }
  }, [sections, course, employees]);

  const onSubmit = () => {
    dispatch(GetsSubject(classId, empID, courseorclass));
  };

  return (
    <>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={showModal}
        contentContainerStyle={container}>
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
              backgroundColor: Colors.white,
              // borderRadius: deviceWidth * 0.05,
              paddingHorizontal: deviceWidth * 0.02,
              paddingBottom: deviceHeight * 0.03,
            }}>
            <ScrollView
              style={{height: deviceHeight * 0.3}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  marginTop: deviceHeight * 0.02,
                }}>
                <View style={styles.rowwrapper}>
                  <View style={{width: '45%'}}>
                    <RNBDropDown
                      label="Class"
                      value={classId}
                      OptionsList={
                        courselist &&
                        courselist?.map(item => ({
                          label: `${item?.coursename}`,
                          value: `${item?.coursename}`,
                        }))
                      }
                      onChange={data => setclassId(data.value)}
                    />
                  </View>

                  <View style={{width: '49%'}}>
                    <RNBDropDown
                      label="Teacher"
                      value={empID}
                      OptionsList={
                        EmpList &&
                        EmpList?.map(item => ({
                          label: `${item?.name} ${item?.empId}`,
                          value: `${item?.id}`,
                        }))
                      }
                      onChange={data => setempID(data.value)}
                    />
                  </View>
                </View>

                <View style={{width: '100%'}}>
                  <RNBDropDown
                    label=" All Day"
                    value={courseorclass}
                    OptionsList={daylist}
                    onChange={data => setcourseorclass(data.value)}
                  />
                </View>
              </View>
            </ScrollView>

            <RNButton loading={loading} onPress={onSubmit}>
              Submit
            </RNButton>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TimeTableFilter;

const styles = StyleSheet.create({
  bottomBtn: {
    marginBottom: deviceHeight * 0.01,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 30,
    borderRadius: 20,
    position: 'relative',
    zIndex: 9999,
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
  },
  dropstyle: {
    width: Width(160),
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(20),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.fadeGray,
    color: 'white',
  },

  dropstyleFullScreen: {
    width: Width(325),
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(20),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.fadeGray,
    color: 'white',
  },
});
