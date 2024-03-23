import {StyleSheet, View, ScrollView, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import RNDatePicker from '../../../Component/RNDatePicker';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {GeOtherFees} from '../../../redux/action/commanAction';
import {useSelector} from 'react-redux';
import {handleDate, getTodaysDate} from '../../../utils/functions';
import moment from 'moment';
import RNBDropDown from '../../../Component/RNBDropDown';
const UpdateOtherFee = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isdata, setisdata] = useState('');
  const [sessionList, setsessionList] = useState([]);
  const [courseList, setcourseList] = useState([]);
  const [coursename, setcoursename] = useState('Please Select');
  const [sessionname, setsessionname] = useState('');
  const [sectionname, setsectionname] = useState('NONE');
  const [amount, setamount] = useState('');
  const [duesDate, setduesDate] = useState(getTodaysDate());
  const [comment, setcomment] = useState('');
  const [sectionlist, setsectionlist] = useState([]);
  const {sections} = useSelector(state => state.GetSection);
  const {Sessions} = useSelector(state => state.GetSession);
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);
  const [loading, setloading] = useState(false);
  const {course} = useSelector(state => state.getcourse);

  const submit = () => {
    setloading(true);
    var momentDate = moment(duesDate, 'DD/MM/YYYY');
    const data = {
      othersfeeobj: isdata,
      OtherFeeName: comment,
      FeeAmount: amount,
      DuesDate: momentDate,
    };
    serverInstance('student/otherfee', 'put', data).then(res => {
      if (res?.status) {
        setloading(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });

        dispatch(GeOtherFees());
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
    if (Sessions) {
      setsessionList(Sessions);
    }
    if (course) {
      setcourseList(course);
    }
    if (CURRENTSESSION) {
      setsessionname(CURRENTSESSION);
    }
  }, [sections, Sessions, course, CURRENTSESSION]);

  useEffect(() => {
    if (route.params?.data) {
      setisdata(route.params.data);
      setsessionname(route.params?.data?.Session);
      setsectionname(route.params?.data?.Section);
      setcoursename(route.params?.data?.Course);
      setcomment(route.params?.data?.OtherFeeName);
      setamount(route.params?.data?.FeeAmount?.toString());
      setduesDate(moment(route.params?.data?.newdate).format('DD/MM/YYYY'));

      console.log('Other Fee is', route.params?.data);
    }
  }, []);

  return (
    <View>
      <BackHeader title={'Update Other Fee'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
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
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Class"
                    value={coursename}
                    OptionsList={
                      courseList &&
                      courseList?.map(item => ({
                        label: `${item?.coursename}`,
                        value: `${item?.coursename}`,
                      }))
                    }
                    onChange={data => setcoursename(data.value)}
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
            <View>
              <View
                style={{
                  marginHorizontal: deviceWidth * 0.04,
                  position: 'relative',
                  marginTop: 10,
                }}>
                <RNDatePicker
                  title="Select Date"
                  value={duesDate}
                  onDateChange={date => setduesDate(handleDate(date))}
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  marginHorizontal: deviceWidth * 0.04,
                  position: 'relative',
                  marginTop: 10,
                }}>
                <RNInputField
                  style={{backgroundColor: Colors.fadeGray}}
                  label="Amount"
                  value={amount}
                  onChangeText={data => setamount(data)}
                  placeholder="Enter Amount"
                />
              </View>
            </View>

            <View>
              <View
                style={{
                  marginHorizontal: deviceWidth * 0.04,
                  position: 'relative',
                  marginTop: 1,
                }}>
                <RNInputField
                  style={{backgroundColor: Colors.fadeGray}}
                  label="Comment"
                  value={comment}
                  onChangeText={data => setcomment(data)}
                  placeholder="Enter Comment"
                />
              </View>
            </View>
          </View>
          <View style={{marginBottom: 50}}>
            <RNButton
              loading={loading}
              onPress={submit}
              style={{marginHorizontal: 20, marginTop: 20}}>
              Update & Next
            </RNButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateOtherFee;

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
