import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Height, Width} from '../../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CardEnquiry from './Card';
import {primary, Colors} from '../../../utils/Colors';
import {AnimatedFAB} from 'react-native-paper';
import {
  getcourse,
  getbatch,
  getstudent,
  getfee,
  getcategory,
  GetSession,
  GetSection,
  getcurrentsession,
} from '../../../redux/action/commanAction';
import {
  GetHostel,
  GetFacility,
  GetCategory,
} from '../../../redux/action/hostelActions';
import {GetRoute} from '../../../redux/action/transportActions';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholderLoader from '../../../Component/DashboardPlaceholderLoader';
import {deviceWidth} from '../../../utils/constant';
import DownloadStudentData from '../../../Component/school/DownloadExcel';
import BackHeader from '../../../Component/Header/BackHeader';
import StudentFilter from '../../../Component/school/StudentFilter';
import RNBDropDown from '../../../Component/RNBDropDown';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import {Checkbox} from 'react-native-paper';
import {deviceHeight} from '../../../utils/constant';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
const ChangeSession = ({navigation}) => {
  const dispatch = useDispatch();
  const [isdata, setisdata] = useState([]);
  const [ischecked, setischecked] = useState(false);
  const [isAllSelect, setisAllSelect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const [selectStudentList, setselectStudentList] = useState([]);
  const [CourseList, setCourseList] = useState();
  const [sessionList, setsessionList] = useState();
  const [sectionlist, setsectionlist] = useState();
  const [classname, setclassname] = useState('');
  const [sessionname, setsessionname] = useState('');
  const [sectionname, setsectionname] = useState('NONE');
  const {loading, student} = useSelector(state => state.getstudent);
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);
  const {Sessions} = useSelector(state => state.GetSession);
  const {sections} = useSelector(state => state.GetSection);
  const {fee} = useSelector(state => state.getfee);

  const handleCheckboxAcadminArrayToggle = index => {
    const updatedMonths = [...isdata];
    updatedMonths[index].checked = !updatedMonths[index].checked;

    setisdata(updatedMonths);

    if (updatedMonths[index].checked) {
      setselectStudentList(prevSelectedMonths => [
        ...prevSelectedMonths,
        updatedMonths[index],
      ]);
      setischecked(true);
    } else {
      setselectStudentList(prevSelectedMonths =>
        prevSelectedMonths.filter(
          month => month?.MonthName !== updatedMonths[index].MonthName,
        ),
      );
    }
  };

  useEffect(() => {
    if (student) {
      setisdata(student);
      setShowModal(false);
      console.log('student', student);
    }
    if (sections) {
      setsectionlist(sections);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
    if (CURRENTSESSION) {
      setsessionname(CURRENTSESSION);
    }
    if (fee) {
      setCourseList(fee);
    }
  }, [student, sections, Sessions, CURRENTSESSION, fee]);

  useEffect(() => {
    dispatch(getcourse());
    dispatch(getbatch());
    dispatch(getstudent());
    dispatch(getfee());
    dispatch(getcategory());
    dispatch(GetSession());
    dispatch(GetSection());
    dispatch(getcurrentsession());
    dispatch(GetHostel());
    dispatch(GetFacility());
    dispatch(GetCategory());
    dispatch(GetRoute());
  }, []);

  const changesession = () => {
    try {
      console.log('click');

      if (ischecked === false) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please select student list!!',
        });
      } else {
        serverInstance('student/changesession', 'post', {
          studentlist: isAllSelect ? isdata : selectStudentList,
          session: sessionname,
          section: sectionname,
          classname: classname,
        }).then(res => {
          if (res?.status === true) {
            console.log('changes session data is', res);

            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: res?.msg,
            });
          }
          if (res?.status === false) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: res?.msg,
            });

            console.log('eroro', res);
          }
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something Went Wrong!!',
      });
    }
  };

  const confirmation = data => {
    Alert.alert(
      'Change Session',
      'Do you really want to Change Session ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => changesession(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };
  return (
    <>
      <View style={{flex: 1}}>
        <BackHeader title={'Change Session'} icon={'person'} />
        <View style={styles.headerTitleContainer}>
          <View>
            <Text style={styles.secondaryTitle}>Session Management</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Pressable
              onPress={() => setShowDocOptions(true)}
              style={styles.filterBtnContainer}>
              <FontAwesome6 name="download" color={Colors.primary} size={25} />
            </Pressable>
            <Pressable
              onPress={() => setShowModal(true)}
              style={styles.filterBtnContainer}>
              <Ionicons name="filter" color={Colors.primary} size={25} />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: Colors.primary}}>
            Select All
          </Text>
          <Checkbox.Android
            status={isAllSelect === true ? 'checked' : 'unchecked'}
            onPress={() => {
              setisAllSelect(!isAllSelect);
              setischecked(true);
            }}
          />
        </View>
        <ScrollView>
          {loading ? (
            <>
              <DashboardPlaceholderLoader type="table" />
            </>
          ) : (
            <>
              <View style={styles.titleview}>
                {/* <Text style={{color: 'white'}}>Session</Text> */}
                <View
                  style={{
                    width: '40%',
                  }}>
                  <Text style={{color: 'white'}}>Name</Text>
                </View>
                <View style={{width: '40%'}}>
                  <Text style={{color: 'white'}}>Class</Text>
                </View>

                {/* <Text style={{color: 'white'}}>Section</Text> */}
                <View
                  style={{
                    width: '20%',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    Select
                  </Text>
                </View>
              </View>

              {isdata &&
                isdata?.map((item, index) => {
                  return (
                    <View key={index} style={styles.Sdataview}>
                      {/* <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                        }}>
                        {item?.Session}
                      </Text> */}
                      <View style={{width: '40%'}}>
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: 'bold',
                          }}>
                          {item?.name}
                        </Text>
                      </View>
                      <View style={{width: '40%'}}>
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: 'bold',
                          }}>
                          {item?.courseorclass}
                        </Text>
                      </View>

                      {/* <Text
                        style={{
                          color: Colors.black,
                          fontWeight: 'bold',
                        }}>
                        {item?.Section}
                      </Text> */}
                      <View style={{width: '20%'}}>
                        <Checkbox.Android
                          disabled={isAllSelect}
                          status={
                            isAllSelect
                              ? 'checked'
                              : item.checked === true
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() =>
                            handleCheckboxAcadminArrayToggle(index)
                          }
                        />
                      </View>
                    </View>
                  );
                })}
            </>
          )}

          <View
            style={{
              paddingHorizontal: deviceHeight * 0.02,
              borderTopWidth: 2,
              borderTopColor: Colors.primary,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                color: Colors.black,
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              Change to session
            </Text>

            
            <View style={styles.rowwrapper}>
              <View style={{width: '45%'}}>
                <RNBDropDown
                  label="Session"
                  value={sessionname}
                  OptionsList={
                    sessionList &&
                    sessionList?.map(item => ({
                      label: `${item?.Session}`,
                      value: `${item?.Session}`,
                    }))
                  }
                  onChange={data => setsessionname(data.value)}
                />
              </View>
              <View style={{width: '45%', marginBottom: deviceHeight * 0.02}}>
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
                />
              </View>
            </View>
            <View style={styles.rowwrapper}>
              <View style={{width: '45%'}}>
                <RNBDropDown
                  label="Class"
                  value={classname}
                  OptionsList={
                    CourseList &&
                    CourseList?.map(item => ({
                      label: `${item?.coursename}`,
                      value: `${item?.coursename}`,
                    }))
                  }
                  onChange={data => setclassname(data.value)}
                />
              </View>
              <View
                style={{
                  width: '45%',
                  marginBottom: deviceHeight * 0.02,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <RNButton
                  style={{paddingHorizontal: 25}}
                  onPress={() => {
                    confirmation();
                  }}>
                  Change
                </RNButton>
              </View>
            </View>
          </View>
        </ScrollView>
        {showModal && (
          <>
            <StudentFilter setShowModal={setShowModal} showModal={showModal} />
          </>
        )}

        <DownloadStudentData
          visible={showDocOptions}
          hideModal={setShowDocOptions}
          enquiry={isdata}
          filename={'StudentList'}
        />
      </View>
    </>
  );
};

export default ChangeSession;

const styles = StyleSheet.create({
  rowwrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: deviceWidth * 0.06,
    paddingVertical: deviceWidth * 0.02,
    backgroundColor: primary,
  },
  Sdataview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: deviceWidth * 0.06,
    paddingVertical: deviceWidth * 0.02,
  },
  dateview: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  inputview: {
    width: Width(360),
    height: Height(50),
    backgroundColor: '#E9EAEC',
    alignSelf: 'center',
    borderRadius: Width(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Height(10),
  },
  inputsaerch: {
    paddingLeft: Width(30),
    fontFamily: 'Gilroy-SemiBold',
    color: 'black',
    fontSize: Height(16),
    width: Width(260),
  },
  enquirymainview: {
    paddingHorizontal: 10,
  },

  searchtext: {
    fontSize: 20,
  },

  cancalView: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  baseinput: {
    width: Width(310),
    height: Height(45),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Width(10),
    // borderColor: index === 3 ? primary: '#a9a9a9',
    marginTop: Height(10),
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    backgroundColor: primary,
  },
  headerTitleContainer: {
    backgroundColor: Colors.fadeGray,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondaryTitle: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    color: Colors.primary,
  },
  accordionTitle: {
    color: Colors.primary,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20,
  },
  filterBtnContainer: {
    padding: 2,
    borderRadius: 10,
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 1,
    marginVertical: 300,
    borderRadius: 20,
    position: 'relative',
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
    marginTop: deviceWidth * 0.045,
    marginBottom: deviceWidth * 0.06,
  },
});
