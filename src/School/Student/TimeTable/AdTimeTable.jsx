import {StyleSheet, View, ScrollView, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import RNTimePicker from '../../../Component/RNTimePicker';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {GetsSubject} from '../../../redux/action/commanAction';
import {useSelector} from 'react-redux';
import {getCurrentTime, handleTime} from '../../../utils/functions';

const daylist = [
  {label: 'Monday', value: 'Monday'},
  {label: 'Tuesday', value: 'Tuesday'},
  {label: 'Wednesday', value: 'Wednesday'},
  {label: 'Thursday', value: 'Thursday'},
  {label: 'Friday', value: 'Friday'},
  {label: 'Saturday', value: 'Saturday'},
  {label: 'Sunday', value: 'Sunday'},
];
const AdTimeTable = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [courseList, setcourseList] = useState([]);
  const [startTime, setstartTime] = useState(getCurrentTime());
  const [endtime, setendtime] = useState(getCurrentTime());
  const [sectionname, setsectionname] = useState('NONE');
  const [empID, setempID] = useState('');
  const [dayname, setdayname] = useState('Monday');
  const [classId, setclassId] = useState('');
  const [subject, setsubject] = useState('');
  const [sectionlist, setsectionlist] = useState([]);
  const [EmpList, setEmpList] = useState([]);
  const [SubjectList, setSubjectList] = useState([]);
  const {sections} = useSelector(state => state.GetSection);
  const [loading, setloading] = useState(false);
  const {course} = useSelector(state => state.getcourse);
  const {Classsubject} = useSelector(state => state.GetClassSubject);
  const {employees} = useSelector(state => state.getemp);

  const submit = () => {
    setloading(true);
    const data = {
      section: sectionname,
      dayname: dayname,
      classId: classId,
      empID: empID,
      starttime: startTime,
      endtime: endtime,
      subject: subject,
    };

    serverInstance('comman/subject', 'post', data).then(res => {
      if (res?.status) {
        setloading(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });

        dispatch(GetsSubject());
        navigation.goBack();
      }

      if (res?.status === false) {
        setloading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
      }
    });
  };

  useEffect(() => {
    if (sections) {
      const newArray = [...sections, {section: 'NONE', section: 'NONE'}];
      setsectionlist(newArray);
    }

    if (course) {
      setcourseList(course);
    }

    if (employees) {
      setEmpList(employees);
    }
    if (Classsubject) {
      setSubjectList(Classsubject);

      console.log('Subject list is ', SubjectList);
    }
  }, [course, employees, Classsubject, sections]);

  return (
    <View>
      <BackHeader title={'Add Time Table'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Day
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={daylist}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={dayname}
                    onChange={item => {
                      setdayname(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Class
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      courseList &&
                      courseList?.map(item => ({
                        label: `${item?.coursename}`,
                        value: `${item?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={classId}
                    onChange={item => {
                      setclassId(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Section
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      sectionlist &&
                      sectionlist?.map(item => ({
                        label: `${item?.section}`,
                        value: `${item?.section}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="NONE"
                    searchPlaceholder="Search..."
                    value={sectionname}
                    onChange={item => {
                      setsectionname(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '47%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Subject
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      SubjectList &&
                      SubjectList?.map(item => ({
                        label: `${item?.Subject}`,
                        value: `${item?.Subject}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={subject}
                    onChange={item => {
                      setsubject(item.value);
                    }}
                  />
                </View>
              </View>
              <View style={{width: '47%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Teacher
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      EmpList &&
                      EmpList?.map(item => ({
                        label: `${item?.name} ${item?.empId}`,
                        value: `${item?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={empID}
                    onChange={item => {
                      setempID(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNTimePicker
                  title="Start Time"
                  value={startTime}
                  onDateChange={date => setstartTime(handleTime(date))}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNTimePicker
                  title="End Time"
                  value={endtime}
                  onDateChange={date => setendtime(handleTime(date))}
                />
              </View>
            </FlexRowWrapper>
          </View>
          <RNButton
            loading={loading}
            onPress={submit}
            style={{marginHorizontal: 15, marginTop: 20, marginBottom: 10}}>
            Save & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdTimeTable;

const styles = StyleSheet.create({
  enquirymainview: {
    paddingTop: deviceHeight * 0.01,
  },
  dropstyle: {
    alignSelf: 'center',
    width: '100%',
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(10),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.fadeGray,
    color: 'white',
  },
});
