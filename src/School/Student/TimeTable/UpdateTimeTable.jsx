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
import {useNavigation, useRoute} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {GetsSubject} from '../../../redux/action/commanAction';
import {useSelector} from 'react-redux';
import {getCurrentTime, handleTime} from '../../../utils/functions';
import RNBDropDown from '../../../Component/RNBDropDown';
const daylist = [
  {label: 'Monday', value: 'Monday'},
  {label: 'Tuesday', value: 'Tuesday'},
  {label: 'Wednesday', value: 'Wednesday'},
  {label: 'Thursday', value: 'Thursday'},
  {label: 'Friday', value: 'Friday'},
  {label: 'Saturday', value: 'Saturday'},
  {label: 'Sunday', value: 'Sunday'},
];
const UpdateTimeTable = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isdata, setisdata] = useState('');
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
      id: isdata?.id,
      section: sectionname,
      dayname: dayname,
      classId: classId,
      empID: empID,
      starttime: startTime,
      endtime: endtime,
      subject: subject,
    };

    serverInstance('comman/subject', 'put', data).then(res => {
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
    }
  }, [course, employees, Classsubject, sections]);

  useEffect(() => {
    if (route.params?.data) {
      setisdata(route.params.data);
      setdayname(route.params?.data?.subject?.dayname);
      setempID(route.params?.data?.empname?.id);
      setclassId(route.params?.data?.classname?.coursename);
      setsubject(route.params?.data?.subject?.subject);
      setstartTime(route.params?.data?.subject?.starttime);
      setendtime(route.params?.data?.subject?.endtime);
    }
  }, []);

  return (
    <View>
      <BackHeader title={'Update Time Table'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Day"
                    value={dayname}
                    OptionsList={daylist}
                    onChange={data => setdayname(data.value)}
                  />
                </View>
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Class"
                    value={classId}
                    OptionsList={
                      courseList &&
                      courseList?.map(item => ({
                        label: `${item?.coursename}`,
                        value: `${item?.id}`,
                      }))
                    }
                    onChange={data => setclassId(data.value)}
                  />
                </View>
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
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
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '47%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Subject"
                    value={subject}
                    OptionsList={
                      SubjectList &&
                      SubjectList?.map(item => ({
                        label: `${item?.Subject}`,
                        value: `${item?.Subject}`,
                      }))
                    }
                    onChange={data => setsubject(data.value)}
                  />
                </View>
              </View>
              <View style={{width: '47%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
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
            Update & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateTimeTable;

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
