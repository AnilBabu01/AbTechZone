import {StyleSheet, View, ScrollView, TextInput, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {getenquiries} from '../../redux/action/coachingAction';
import {getcourse} from '../../redux/action/commanAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../Component/Loader/Loader';
import {serverInstance} from '../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../Component/RNButton';
import RNInputField from '../../Component/RNInputField';
import RNDatePicker from '../../Component/RNDatePicker';
import {handleDate, getTodaysDate} from '../../utils/functions';
import {Colors, primary} from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import {FlexRowWrapper} from '../../Component/FlexRowWrapper';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import BackHeader from '../../Component/Header/BackHeader';
import RNBDropDown from '../../Component/RNBDropDown';
const AddEnquiry = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const [enquirydate, setenquirydate] = useState(getTodaysDate());
  const [coursename, setcoursename] = useState('');
  const [courselist, setcourselist] = useState([{label: null, value: ''}]);
  const [studentname, setstudentname] = useState('');
  const [studentPhone, setstudentPhone] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [comment, setcomment] = useState('');
  const {enquiry, error, loading} = useSelector(state => state.addenqury);
  const {course} = useSelector(state => state.getcourse);

  const submit = () => {
    if (enquirydate) {
      setloader(true);
      setsms('Adding...');
      const data = {
        EnquiryDate: moment(enquirydate, 'YYYY-MM-DD'),
        StudentName: studentname,
        StudentNumber: studentPhone,
        StudentEmail: email,
        Address: address,
        Course: coursename,
        Comment: comment,
      };
      serverInstance('coaching/enquiry', 'post', data).then(res => {
        if (res?.status) {
          setloader(false);
          setsms('');
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
          dispatch(getenquiries());
          navigation.goBack();
        }

        if (res?.status === false) {
          setloader(false);
          setsms('');
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res?.msg,
          });
          dispatch(getenquiries());
        }
      });
    } else {
      setsms('');
      setloader(false);
    }
  };

  useEffect(() => {
    if (enquiry) {
      dispatch(getenquiries());
      setsms('');
      setloader(false);
    }
  }, [enquiry]);
  useEffect(() => {
    dispatch(getcourse());
  }, []);

  useEffect(() => {
    if (course) {
      setcourselist(course);
    }
  }, [course]);

  useEffect(() => {
    if (error) {
      setloader(false);
      setsms('');
    }
  }, [error]);

  return (
    <View>
      <BackHeader title={'Add Enquiry'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <View
              style={{
                marginHorizontal: deviceWidth * 0.04,
                position: 'relative',
              }}>
              <RNDatePicker
                title="Enquiry Date"
                value={enquirydate}
                onDateChange={date => setenquirydate(handleDate(date))}
              />
            </View>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Student Name"
                  placeholder="Enter Name"
                  value={studentname}
                  onChangeText={data => setstudentname(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Student Mobile No"
                  placeholder="Enter Mobile No"
                  value={studentPhone}
                  onChangeText={data => setstudentPhone(data)}
                  keyboardType="number-pad"
                />
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Student Email"
                  placeholder="Enter Email"
                  value={email}
                  onChangeText={data => setemail(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNBDropDown
                  label="Class"
                  value={coursename}
                  OptionsList={
                    courselist &&
                    courselist?.map(item => ({
                      label: `${item?.coursename}`,
                      value: `${item?.coursename}`,
                    }))
                  }
                  onChange={data => setcoursename(data.value)}
                />
              </View>
            </FlexRowWrapper>

            <View
              style={{
                marginHorizontal: deviceWidth * 0.04,
                position: 'relative',
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  fontWeight: '800',
                  position: 'absolute',
                  right: deviceWidth * 0.05,
                }}>
                {address.length} / 500
              </Text>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray, paddingTop: 10}}
                label="address"
                value={address}
                onChangeText={data => setaddress(data)}
                placeholder="Enter Address"
                multiline
                numberOfLines={5}
                maxLength={500}
              />
            </View>

            <View
              style={{
                marginHorizontal: deviceWidth * 0.04,
                position: 'relative',
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  fontWeight: '800',
                  position: 'absolute',
                  right: deviceWidth * 0.05,
                }}>
                {comment.length} / 500
              </Text>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray, paddingTop: 10}}
                label="Comment"
                value={comment}
                onChangeText={data => setcomment(data)}
                placeholder="Enter Comment"
                multiline
                numberOfLines={5}
                maxLength={500}
              />
            </View>
          </View>

          <RNButton
            loading={loading}
            onPress={submit}
            style={{marginHorizontal: 20, marginTop: 20}}>
            Save & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddEnquiry;

const styles = StyleSheet.create({
  enquirymainview: {
    paddingTop: deviceHeight * 0.01,
  },
  dropstyle: {
    alignSelf: 'center',
    width: Width(170),
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(20),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.lightGrey,
    color: Colors.black,
  },
  placeholderStyle: {
    fontSize: 16,
    borderColor: primary,
    borderRadius: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    borderColor: primary,
    borderRadius: 10,
    color: Colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: primary,
    borderRadius: 5,
    color: Colors.black,
  },
});
