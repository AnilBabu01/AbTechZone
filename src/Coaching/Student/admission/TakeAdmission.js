import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {primary} from '../../../utils/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import check from '../../../assets/check1.png';
import {
  serverFormdataInstance,
  serverInstance,
} from '../../../API/ServerInstance';
import {backendApiUrl} from '../../../Config/config';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  getstudent,
  getbatch,
  getfeelist,
  Addstudent,
} from '../../../Redux/action/commanAction';
import {useRouter} from 'next/router';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../Component/Loader/Loader';
const formData = new FormData();
const TakeAdmission = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const [index, setIndex] = useState(0);
  const [openModel, setopenModel] = useState(false);
  const [selectedValue, setSelectedValue] = useState('option1');
  const [passportsize, setpassportsize] = useState('');
  const [adharno, setadharno] = useState('');
  const [premarksheet, setpremarksheet] = useState('');
  const [amount, setamount] = useState('');
  const [monthlyfee, setmonthlyfee] = useState('');
  const [getfee, setgetfee] = useState('default');
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const [courses, setcourses] = useState('');
  const [batchname, setbatchname] = useState('');
  const [studentname, setstudentname] = useState('');
  const [studentemail, setstudentemail] = useState('');
  const [studentphone, setstudentphone] = useState('');
  const [adminssiondate, setadminssiondate] = useState('');
  const [passProfile, setpassProfile] = useState('');
  const [passadharcard, setpassadharcard] = useState('');
  const [passmarksheet, setpassmarksheet] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [Pincode, setPincode] = useState('');
  const [pano, setpano] = useState('');
  const [adharcardno, setadharcardno] = useState('');
  const [fathersname, setfathersname] = useState('');
  const [fathersphone, setfathersphone] = useState('');
  const [studentrollno, setstudentrollno] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {fee} = useSelector(state => state.getfee);
  const {batch} = useSelector(state => state.getbatch);
  const {user} = useSelector(state => state.auth);

  const {studentaddstatus, student, error} = useSelector(
    state => state.addstudent,
  );

  console.log(student, error);

  let regfee = courses?.split(' ').pop();
  var lastIndex = courses?.lastIndexOf(' ');
  let first = courses?.substring(0, lastIndex);

  let perFee = first?.split(' ').pop();
  var lastIndex = first?.lastIndexOf(' ');
  let coursein = first?.substring(0, lastIndex);
  var lastIndex = perFee?.lastIndexOf(' ');

  let Duration = coursein?.split(' ').pop();
  var lastIndex = coursein?.lastIndexOf(' ');
  let regcoursein = coursein?.substring(0, lastIndex);

  const submit = async () => {
    try {
      formData.append('name', studentname);
      formData.append('email', studentemail);
      formData.append('phoneno1', studentphone);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('pincode', Pincode);
      formData.append('fathersPhoneNo', fathersphone);
      formData.append('fathersName', fathersname);
      formData.append('courseorclass', regcoursein);
      formData.append('rollnumber', studentrollno);
      formData.append('StudentStatus', 'admission');
      formData.append('batch', batchname);
      formData.append('admissionDate', adminssiondate);
      formData.append('regisgrationfee', amount);
      formData.append('courseduration', Duration);
      formData.append('adharno', adharcardno);
      formData.append('pancardnno', pano);
      formData.append(
        'permonthfee',
        getfee === 'default' ? Number(perFee) : Number(monthlyfee),
      );
      formData.append(
        'studentTotalFee',
        getfee === 'default'
          ? Number(perFee) * Number(Duration)
          : Number(monthlyfee) * Number(Duration),
      );
      formData.append(
        'Studentpassword',
        user?.data[0]?.Studentpassword
          ? user?.data[0]?.Studentpassword
          : 'student',
      );
      formData.append(
        'Parentpassword',
        user?.data[0]?.Parentpassword
          ? user?.data[0]?.Parentpassword
          : 'parent',
      );

      setloader(true);
      setsms('Adding...');
      console.log(formData);
      serverFormdataInstance('student/addstudent', 'post', formData).then(
        res => {
          if (res?.status) {
            setloader(false);
            setsms('');
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: res?.msg,
            });
            // dispatch(getstudent());
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
            console.log(res);
            // dispatch(getstudent());
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log('course', isdata);
  useEffect(() => {
    if (fee) {
      setisData(fee);
    }
    if (batch) {
      setbatchs(batch);
    }
    if (studentaddstatus) {
      // setshowdownload(true);
    }
    // dispatch({
    //   type: ADD_STUDENT_RESET,
    // });
  }, [fee, batch, studentaddstatus]);

  useEffect(() => {
    dispatch(getbatch());
    dispatch(getfeelist());
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setadminssiondate(date);
  };
  const handleChoosePhotoSignature = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setpassportsize(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;
        console.log('dd', imageBase64);
        setpassProfile(imageBase64);
        if (file != null) {
          formData.append('profileurl', file);
        }
      }
    });
  };

  const handleTakePhotoSignature = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setpassportsize(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;
        console.log('dd', imageBase64);
        setpassProfile(imageBase64);
        if (file != null) {
          formData.append('profileurl', file);
        }
      }
    });
  };

  const handleChoosePhotoAdhar = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setadharno(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;
        console.log('dd', imageBase64);
        setpassadharcard(imageBase64);
        if (file != null) {
          formData.append('adharcard', file);
        }
      }
    });
  };

  const handleTakePhotoAdhar = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setadharno(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;
        console.log('dd', imageBase64);
        setpassadharcard(imageBase64);
        if (file != null) {
          formData.append('adharcard', file);
        }
      }
    });
  };

  const handleChoosePhotoMarksheet = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setpremarksheet(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;
        console.log('dd', imageBase64);
        setpassmarksheet(imageBase64);
        if (file != null) {
          formData.append('markSheet', file);
        }
      }
    });
  };

  const handleTakePhotoMarksheet = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setpremarksheet(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;
        console.log('dd', imageBase64);
        setpassmarksheet(imageBase64);
        if (file != null) {
          formData.append('markSheet', file);
        }
      }
    });
  };

  return (
    <View>
      {/* <Loader loader={loader} sms={sms} /> */}
      <Modal animationType={'fade'} transparent={true} visible={openModel}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={[styles.modal, styles.elevation]}>
            <View style={styles.cancalView}>
              <TouchableOpacity>
                <Image source={check} style={styles.checkstyleimg} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonmodal}>
              <TouchableOpacity style={styles.processpatbtn}>
                <View>
                  <Text style={{color: 'white', fontSize: 16}}>
                    Process To Fee
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.okbtn}>
                <View>
                  <Text style={{color: 'white', fontSize: 16}}>Ok!</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <TouchableOpacity
              style={styles.addinput}
              onPress={() => {
                setIndex(6), showDatePicker();
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
                {adminssiondate
                  ? moment(adminssiondate).format('DD/MM/YYYY')
                  : 'Admission Date'}
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
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 3 ? primary : '#a9a9a9',
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
                onFocus={() => setIndex(3)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 4 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(4)}>
              <TextInput
                placeholder="Student Phone No"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={studentphone}
                onChangeText={text => setstudentphone(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(4)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 5 ? primary : '#a9a9a9',
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
                value={studentemail}
                onChangeText={text => setstudentemail(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(5)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 6 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(6)}>
              <TextInput
                placeholder="Fathers Phone No"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={fathersphone}
                onChangeText={text => setfathersphone(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(6)}
              />
            </View>

            <View
              style={{
                width: Width(355),
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
                placeholder="Fathers Name"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={fathersname}
                onChangeText={text => setfathersname(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(7)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 8 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(8)}>
              <TextInput
                placeholder="State"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={state}
                onChangeText={text => setstate(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(8)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 9 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(9)}>
              <TextInput
                placeholder="City"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={city}
                onChangeText={text => setcity(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(9)}
              />
            </View>
            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 10 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(10)}>
              <TextInput
                placeholder="Pin Code"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={Pincode}
                onChangeText={text => setPincode(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(10)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 11 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(11)}>
              <TextInput
                placeholder="Pan No"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={pano}
                onChangeText={text => setpano(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(11)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 12 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(12)}>
              <TextInput
                placeholder="Adhar Card No"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={adharcardno}
                onChangeText={text => setadharcardno(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(12)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 13 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(13)}>
              <TextInput
                placeholder="Sr Number"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={studentrollno}
                onChangeText={text => setstudentrollno(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(13)}
              />
            </View>

            <View style={{paddingHorizontal: 10}}>
              <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
                Password Size Photo
              </Text>
              <View>
                {passportsize ? (
                  <>
                    <Image
                      source={{uri: passportsize}}
                      style={styles.imgprestyle}
                    />
                  </>
                ) : (
                  <>
                    <View style={styles.imgpreview}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoSignature()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                          {/* <Text>Camera</Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoSignature()}>
                        <View>
                          <Ionicons name="image" size={50} />
                          {/* <Text>Gallery</Text> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
              <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
                Adhar Card
              </Text>
              <View>
                {adharno ? (
                  <>
                    <Image source={{uri: adharno}} style={styles.imgprestyle} />
                  </>
                ) : (
                  <>
                    <View style={styles.imgpreview}>
                      <TouchableOpacity onPress={() => handleTakePhotoAdhar()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                          {/* <Text>Camera</Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoAdhar()}>
                        <View>
                          <Ionicons name="image" size={50} />
                          {/* <Text>Gallery</Text> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
              <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
                Previous MarkSheet
              </Text>
              <View>
                {premarksheet ? (
                  <>
                    <Image
                      source={{uri: premarksheet}}
                      style={styles.imgprestyle}
                    />
                  </>
                ) : (
                  <>
                    <View style={styles.imgpreview}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoMarksheet()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                          {/* <Text>Camera</Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoMarksheet()}>
                        <View>
                          <Ionicons name="image" size={50} />
                          {/* <Text>Gallery</Text> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
            {batchs && (
              <>
                <Dropdown
                  style={{
                    alignSelf: 'center',
                    width: Width(355),
                    height: Height(45),
                    fontFamily: 'Gilroy-SemiBold',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    paddingHorizontal: Width(20),
                    fontSize: 55,
                    marginTop: Height(10),
                    borderColor: index === 1 ? primary : '#a9a9a9',
                  }}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={
                    batchs &&
                    batchs?.map(item => ({
                      label: `${item?.StartingTime} TO ${item?.EndingTime}`,
                      value: `${item?.StartingTime} TO ${item?.EndingTime}`,
                    }))
                  }
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Batch"
                  searchPlaceholder="Search..."
                  value={batchname}
                  onChange={item => {
                    setbatchname(item.value);
                  }}
                />
              </>
            )}

            {isdata && (
              <>
                <Dropdown
                  style={{
                    alignSelf: 'center',
                    width: Width(355),
                    height: Height(45),
                    fontFamily: 'Gilroy-SemiBold',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    paddingHorizontal: Width(20),
                    fontSize: 55,
                    marginTop: Height(10),
                    borderColor: index === 1 ? primary : '#a9a9a9',
                  }}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={
                    isdata &&
                    isdata?.map(item => ({
                      label: `${item?.coursename}`,
                      value: `${item?.coursename} ${item?.courseduration} ${item?.feepermonth} ${item?.Registractionfee}`,
                    }))
                  }
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Course"
                  searchPlaceholder="Search..."
                  value={courses}
                  onChange={item => {
                    setcourses(item.value);
                  }}
                />
              </>
            )}

            <View
              style={{
                width: Width(355),
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
                placeholder="Course Duration"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(7)}
              />
            </View>

            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="option1"
                  status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedValue('option1')}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Default fee Structure</Text>
              </View>
            </View>

            {selectedValue === 'option1' && (
              <>
                <Text style={styles.inputLabel}>Registration Fee</Text>
                <View
                  style={{
                    width: Width(355),
                    height: Height(45),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    borderColor: index === 5 ? primary : '#a9a9a9',
                    marginTop: Height(10),
                  }}
                  onStartShouldSetResponder={() => setIndex(5)}>
                  <TextInput
                    placeholder="Registration Fee"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      width: Width(280),
                      fontFamily: 'Gilroy-SemiBold',
                      paddingHorizontal: Width(20),
                      fontSize: Height(16),
                    }}
                    // secureTextEntry={passwordVisible}
                    // onBlur={() => Validation()}
                    value={regfee}
                    onChangeText={text => setamount(text)}
                    onFocus={() => setIndex(5)}
                  />
                </View>
                <Text style={styles.inputLabel}>Monthly Fee</Text>
                <View
                  style={{
                    width: Width(355),
                    height: Height(45),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    borderColor: index === 5 ? primary : '#a9a9a9',
                    marginTop: Height(10),
                  }}
                  onStartShouldSetResponder={() => setIndex(5)}>
                  <Text
                    style={{
                      width: Width(280),
                      fontFamily: 'Gilroy-SemiBold',
                      paddingHorizontal: Width(20),
                      fontSize: Height(16),
                    }}>
                    {perFee ? perFee : '0'}
                  </Text>
                </View>
                <Text style={styles.inputLabel}>Total Fee</Text>
                <View
                  style={{
                    width: Width(355),
                    height: Height(45),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    borderColor: index === 5 ? primary : '#a9a9a9',
                    marginTop: Height(10),
                  }}
                  onStartShouldSetResponder={() => setIndex(5)}>
                  <Text
                    style={{
                      width: Width(280),
                      fontFamily: 'Gilroy-SemiBold',
                      paddingHorizontal: Width(20),
                      fontSize: Height(16),
                    }}>
                    {Number(perFee) * Number(Duration)}
                  </Text>
                </View>
              </>
            )}
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="option2"
                  status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedValue('option2')}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Manual fee Structure</Text>
              </View>
            </View>

            {selectedValue === 'option2' && (
              <>
                <Text style={styles.inputLabel}>Registration Fee</Text>
                <View
                  style={{
                    width: Width(355),
                    height: Height(45),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    borderColor: index === 5 ? primary : '#a9a9a9',
                    marginTop: Height(10),
                  }}
                  onStartShouldSetResponder={() => setIndex(5)}>
                  <TextInput
                    placeholder="Registration Fee"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      width: Width(280),
                      fontFamily: 'Gilroy-SemiBold',
                      paddingHorizontal: Width(20),
                      fontSize: Height(16),
                    }}
                    // secureTextEntry={passwordVisible}
                    // onBlur={() => Validation()}
                    value={amount}
                    onChangeText={text => setamount(text)}
                    onFocus={() => setIndex(5)}
                  />
                </View>
                <Text style={styles.inputLabel}>Monthly Fee</Text>
                <View
                  style={{
                    width: Width(355),
                    height: Height(45),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    borderColor: index === 5 ? primary : '#a9a9a9',
                    marginTop: Height(10),
                  }}
                  onStartShouldSetResponder={() => setIndex(5)}>
                  <TextInput
                    placeholder="Monthly Fee"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      width: Width(280),
                      fontFamily: 'Gilroy-SemiBold',
                      paddingHorizontal: Width(20),
                      fontSize: Height(16),
                    }}
                    // secureTextEntry={passwordVisible}
                    // onBlur={() => Validation()}
                    value={monthlyfee}
                    onChangeText={text => setmonthlyfee(text)}
                    onPressIn={() => setIndex(3)}
                    onFocus={() => setIndex(5)}
                  />
                </View>
                <Text style={styles.inputLabel}>Total Fee</Text>
                <View
                  style={{
                    width: Width(355),
                    height: Height(45),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    borderColor: index === 5 ? primary : '#a9a9a9',
                    marginTop: Height(10),
                  }}
                  onStartShouldSetResponder={() => setIndex(5)}>
                  <Text
                    style={{
                      width: Width(280),
                      fontFamily: 'Gilroy-SemiBold',
                      paddingHorizontal: Width(20),
                      fontSize: Height(16),
                    }}>
                    {Number(monthlyfee) * Number(Duration)}
                  </Text>
                </View>
              </>
            )}
          </View>
          <View style={styles.loginbtndiv}>
            <TouchableOpacity onPress={() => submit()}>
              <View style={styles.loginbtn}>
                <Text style={styles.logintextstyle}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TakeAdmission;

const styles = StyleSheet.create({
  inputview: {
    width: Width(355),
    height: Height(50),
    backgroundColor: '#E9EAEC',
    alignSelf: 'center',
    borderRadius: Width(10),
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
    paddingBottom: 10,
  },
  baseinput: {
    width: Width(355),
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
    width: Width(355),
    borderWidth: 1,
    // borderColor: index === 7 ? primary : '#a9a9a9',
    alignSelf: 'center',
    borderRadius: Width(5),
    borderColor: 'gray',
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
    width: Width(355),
    height: Height(40),
    backgroundColor: primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginbtndiv10: {
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  loginbtn10: {
    width: Width(80),
    height: Height(40),
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
  chooseview: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imgpreview: {
    height: 200,
    borderWidth: 1.5,
    borderColor: primary,
    borderStyle: 'dotted',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgprestyle: {
    width: '100%',
    height: 200,
  },
  radioGroup: {
    paddingHorizontal: 5,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  inputLabel: {
    marginLeft: 13,
    fontSize: 16,
    color: '#333',
  },
  modal: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    position: 'relative',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // marginTop: '15%',
    paddingBottom: 10,
    height: '25%',
    // position: 'relative',
  },
  elevation: {
    shadowColor: '#52006A',
    elevation: 20,
  },
  cancalView: {
    position: 'absolute',
    bottom: Height(170),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 5,
  },
  buttonmodal: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  checkstyleimg: {
    height: 50,
    width: 50,
  },
  processpatbtn: {
    width: Width(120),
    height: Height(40),
    backgroundColor: primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  okbtn: {
    width: Width(50),
    height: Height(50),
    backgroundColor: primary,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    marginTop: 25,
  },
});
