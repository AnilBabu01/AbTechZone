import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../utils/responsive';
import {primary} from '../../utils/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import {Updateenquiry, getenquiries} from '../../redux/action/coachingAction';
import {getcourse} from '../../redux/action/commanAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../Component/Loader/Loader';
import {useNavigation, useRoute} from '@react-navigation/native';
const data = [
  {label: 'DCA', value: 'DCA'},
  {label: 'ADCA', value: 'ADCA'},
  {label: 'CCC', value: 'CCC'},
  {label: 'O-LEVEL', value: 'O-LEVEL'},
];
const UpdateEnquiry = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const [isdata, setisdata] = useState('');
  const [index, setIndex] = useState(0);
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const [fromdate, setfromdate] = useState('');
  const [coursename, setcoursename] = useState('');
  const [courselist, setcourselist] = useState('');
  const [studentname, setstudentname] = useState('');
  const [studentPhone, setstudentPhone] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [comment, setcomment] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {enquiry, error} = useSelector(state => state.updatenequiry);
  const {course} = useSelector(state => state.getcourse);

  const submit = () => {
    if (fromdate) {
      setloader(true);
      setsms('Updating...');
      const data = {
        id: isdata?.id,
        EnquiryDate: fromdate,
        StudentName: studentname,
        StudentNumber: studentPhone,
        StudentEmail: email,
        Address: address,
        Course: coursename,
        Comment: comment,
      };
      dispatch(Updateenquiry(data));
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setfromdate(date);
  };

  useEffect(() => {
    if (route.params?.data) {
      console.log('enqury data from params ', route.params?.data);
      setisdata(route.params?.data);
      setfromdate(route.params?.data?.EnquiryDate);
      setstudentname(route.params?.data?.StudentName);
      setstudentPhone(route.params?.data?.StudentNumber);
      setemail(route.params?.data?.StudentEmail);
      setaddress(route.params?.data?.Address);
      setcoursename(route.params?.data?.Course);
      setcomment(route.params?.data?.Comment);
    }
  }, []);

  return (
    <View>
      <Loader loader={loader} sms={sms} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <TouchableOpacity
              style={{
                height: Height(45),
                width: Width(360),
                borderWidth: 1.5,
                borderColor: index === 1 ? primary : '#a9a9a9',
                alignSelf: 'center',
                borderRadius: Width(5),
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Height(10),
              }}
              onPress={() => {
                setIndex(1), showDatePicker();
              }}>
              <FontAwesome5
                name="calendar"
                size={Height(20)}
                color="#666666"
                style={{marginLeft: Width(10)}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: Height(16),
                  marginLeft: Width(20),
                }}>
                {fromdate
                  ? moment(fromdate).format('DD/MM/YYYY')
                  : 'Enquiry Date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <View
              style={{
                width: Width(360),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 2 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(3)}>
              <TextInput
                placeholder="Student Name"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={studentname}
                onChangeText={text => setstudentname(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(2)}
              />
            </View>

            <View
              style={{
                width: Width(360),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 3 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(4)}>
              <TextInput
                placeholder="Student Number"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={studentPhone}
                onChangeText={text => setstudentPhone(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(3)}
              />
            </View>

            <View
              style={{
                width: Width(360),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 4 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(5)}>
              <TextInput
                placeholder="Student Email"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={email}
                onChangeText={text => setemail(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(4)}
              />
            </View>

            <View
              style={{
                width: Width(360),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 5 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(6)}>
              <TextInput
                placeholder="Address"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={address}
                onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(5)}
              />
            </View>
            {courselist && (
              <>
                <Dropdown
                  style={{
                    alignSelf: 'center',
                    width: Width(360),
                    height: Height(45),
                    fontFamily: 'Gilroy-SemiBold',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    paddingHorizontal: Width(20),
                    fontSize: Height(16),
                    marginTop: Height(10),
                    borderColor: index === 6 ? primary : '#a9a9a9',
                  }}
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
                  onFocus={() => setIndex(6)}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Please Select"
                  searchPlaceholder="Search..."
                  value={coursename}
                  onChange={item => {
                    setcoursename(item.value);
                  }}
                />
              </>
            )}

            <View
              style={{
                width: Width(360),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 7 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(7)}>
              <TextInput
                placeholder="Comment"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={comment}
                onChangeText={text => setcomment(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(7)}
              />
            </View>
          </View>
          <View style={styles.loginbtndiv}>
            <TouchableOpacity onPress={() => submit()}>
              <View style={styles.loginbtn}>
                <Text style={styles.logintextstyle}>Update</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateEnquiry;

const styles = StyleSheet.create({
  inputview: {
    width: Width(360),
    height: Height(50),
    backgroundColor: '#E9EAEC',
    alignSelf: 'center',
    borderRadius: Width(5),
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
    paddingHorizontal: 2,
  },
  baseinput: {
    width: Width(310),
    height: Height(40),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Width(10),
    // borderColor: index === 3 ? primary: '#a9a9a9',
    marginTop: Height(10),
  },

  addinput: {
    height: Height(45),
    width: Width(360),
    borderWidth: 1.5,
    // borderColor: index === 7 ? primary : '#a9a9a9',
    alignSelf: 'center',
    borderRadius: Width(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Height(10),
  },
  loginbtndiv: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  loginbtn: {
    width: Width(360),
    height: Height(45),
    backgroundColor: primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logintextstyle: {
    color: 'white',
    // fontWeight: 700,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
