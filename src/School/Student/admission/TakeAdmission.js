import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {primary} from '../../../utils/Colors';
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
import {useDispatch, useSelector} from 'react-redux';
import {
  getstudent,
  getbatch,
  getfeelist,
  Addstudent,
} from '../../../redux/action/commanAction';
import {useRouter} from 'next/router';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../Component/Loader/Loader';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import RNDatePicker from '../../../Component/RNDatePicker';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {handleDate, getTodaysDate} from '../../../utils/functions';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {Colors} from '../../../utils/Colors';
import {ADD_STUDENT_RESET} from '../../../redux/constants/commanConstants';
const studentStatus = [
  {label: 'Active', value: 'Active'},
  {label: 'On Leave', value: 'On Leave'},
  {label: 'Left In Middle', value: 'Left In Middle'},
  {label: 'Completed', value: 'Completed'},
  {label: 'Unknown', value: 'Unknown'},
];
const formData = new FormData();
const TakeAdmission = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const [index, setIndex] = useState(0);
  const [openModel, setopenModel] = useState(false);
  const [stream, setstream] = useState('NONE');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [SrNumber, setSrNumber] = useState('');
  const [sessionname, setsessionname] = useState('');
  const [sectionname, setsectionname] = useState('');
  const [sectionlist, setsectionlist] = useState([]);
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
  const [adminssiondate, setadminssiondate] = useState(getTodaysDate());
  const [dateofbirth, setdateofbirth] = useState(getTodaysDate());
  const [passProfile, setpassProfile] = useState('');
  const [passadharcard, setpassadharcard] = useState('');
  const [passmarksheet, setpassmarksheet] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [Pincode, setPincode] = useState('');
  const [pano, setpano] = useState('');
  const [courseorclass, setcourseorclass] = useState('');
  const [studentstatus, setstudentstatus] = useState('Active');
  const [adharcardno, setadharcardno] = useState('');
  const [fathersname, setfathersname] = useState('');
  const [fathersphone, setfathersphone] = useState('');
  const [studentrollno, setstudentrollno] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [categorylist, setcategorylist] = useState([]);
  const [hostellist, sethostellist] = useState([]);
  const [hostelcategorylist, sethostelcategorylist] = useState([]);
  const [hostelfacilitylist, sethostelfacilitylist] = useState([]);
  const [routelist, setroutelist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const {fee} = useSelector(state => state.getfee);
  const {batch} = useSelector(state => state.getbatch);
  const {user} = useSelector(state => state.auth);
  const {category} = useSelector(state => state.getcategory);
  // const {hostel} = useSelector(state => state.GetHostel);
  // const {roomcategory} = useSelector(state => state.GetCategory);
  // const {roomfacility} = useSelector(state => state.GetFacility);
  // const {route} = useSelector(state => state.GetRoute);
  const {sections} = useSelector(state => state.GetSection);
  const {studentaddstatus, student, loading} = useSelector(
    state => state.addstudent,
  );
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);
  const {Sessions} = useSelector(state => state.GetSession);

  console.log('session and section', batch);

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

  useEffect(() => {
    if (fee) {
      setisData(fee);
    }
    if (batch) {
      setbatchs(batch);
    }
    if (studentaddstatus) {
      setshowdownload(true);
    }
    if (category) {
      setcategorylist(category);
    }

    if (sections) {
      const newArray = [...sections, {section: 'NONE', section: 'NONE'}];
      setsectionlist(newArray);
    }
    dispatch({
      type: ADD_STUDENT_RESET,
    });
    if (CURRENTSESSION) {
      setsessionname(CURRENTSESSION);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
  }, [
    fee,
    batch,
    studentaddstatus,
    category,
    sections,
    CURRENTSESSION,
    Sessions,
  ]);

  useEffect(() => {
    dispatch(getbatch());
    dispatch(getfeelist());
  }, []);

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
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNDatePicker
                  title="Admission Date"
                  value={adminssiondate}
                  onDateChange={date => setadminssiondate(handleDate(date))}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Student Name"
                  placeholder="Enter Name"
                  value={studentname}
                  onChangeText={data => setstudentname(data)}
                />
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Roll No"
                  placeholder="Enter Roll No"
                  value={studentrollno}
                  onChangeText={data => setstudentrollno(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Sr Number"
                  placeholder="Enter Sr Number"
                  value={SrNumber}
                  onChangeText={data => setSrNumber(data)}
                />
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Session
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      sessionList &&
                      sessionList?.map(item => ({
                        label: `${item?.Session}`,
                        value: `${item?.Session}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Session"
                    searchPlaceholder="Search..."
                    value={sessionname}
                    onChange={item => {
                      setsessionname(item.value);
                    }}
                  />
                </View>
              </View>
              <View style={{width: '45%', marginBottom: deviceHeight * 0.02}}>
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
                    defaultValue={'NONE'}
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
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 15}}>
                    Caste
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      categorylist &&
                      categorylist?.map(item => ({
                        label: `${item?.category}`,
                        value: `${item?.category}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Caste"
                    searchPlaceholder="Search..."
                    value={categoryname}
                    onChange={item => {
                      setcategoryname(item.value);
                    }}
                  />
                </View>
              </View>
              <View style={{width: '45%', marginBottom: deviceHeight * 0.02}}>
                <RNDatePicker
                  title="Date Of Birth"
                  value={dateofbirth}
                  onDateChange={date => setdateofbirth(handleDate(date))}
                />
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Student Mobile No"
                  placeholder="Enter Mobile No"
                  value={studentphone}
                  onChangeText={data => setstudentphone(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Student Email"
                  placeholder="Enter Email"
                  value={studentemail}
                  onChangeText={data => setstudentemail(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Fathers Mobile No"
                  placeholder="Enter Mobile No"
                  value={fathersphone}
                  onChangeText={data => setfathersphone(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Father's Name"
                  placeholder="Enter Father's Name"
                  value={fathersname}
                  onChangeText={data => setfathersname(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="State"
                  placeholder="Enter State"
                  value={state}
                  onChangeText={data => setstate(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="City"
                  placeholder="Enter City"
                  value={city}
                  onChangeText={data => setcity(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Pin Code"
                  placeholder="Enter Pin Code"
                  value={Pincode}
                  onChangeText={data => setPincode(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Pan No"
                  placeholder="Enter Pan No"
                  value={pano}
                  onChangeText={data => setpano(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNInputField
                  label="Adhar Card No"
                  placeholder="Enter Adhar Card No"
                  value={adharcardno}
                  onChangeText={data => setadharcardno(data)}
                />
              </View>
            </FlexRowWrapper>

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

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
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
                    placeholder="Select Class"
                    searchPlaceholder="Search..."
                    value={courses}
                    onChange={item => {
                      setcourses(item.value);
                      console.log('data from select', item);
                    }}
                  />
                </View>
              </View>
              <View style={{width: '45%', marginBottom: deviceHeight * 0.02}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Status
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      studentStatus &&
                      studentStatus?.map(item => ({
                        label: `${item?.value}`,
                        value: `${item?.value}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Status"
                    searchPlaceholder="Search..."
                    value={studentstatus}
                    onChange={item => {
                      setstudentstatus(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="option1"
                  status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedValue('option1')}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Default Fee</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="option2"
                  status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedValue('option2')}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Manual Fee</Text>
              </View>
            </FlexRowWrapper>

            {selectedValue === 'option1' && (
              <>
                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <RNInputField
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Registration Fee"
                    value={regfee}
                    onChangeText={data => setamount(data)}
                    placeholder="0"
                  />
                </View>

                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <RNInputField
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Monthly Fee"
                    value={perFee}
                    onChangeText={data => setamount(data)}
                    placeholder="0"
                  />
                </View>

                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <Text style={styles.inputLabel}>Total Fee</Text>
                  <View
                    style={styles.totalamountstyle}
                    onStartShouldSetResponder={() => setIndex(5)}>
                    <Text
                      style={{
                        width: Width(280),
                        fontFamily: 'Gilroy-SemiBold',
                        paddingHorizontal: Width(20),
                        fontSize: Height(16),
                      }}>
                      {Number(perFee) * Number(12)}
                    </Text>
                  </View>
                </View>
              </>
            )}

            {selectedValue === 'option2' && (
              <>
                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <RNInputField
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Registration Fee"
                    value={amount}
                    onChangeText={data => setamount(data)}
                    placeholder="0"
                  />
                </View>

                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <RNInputField
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Monthly Fee"
                    value={monthlyfee}
                    onChangeText={data => setmonthlyfee(data)}
                    placeholder="0"
                  />
                </View>

                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <Text style={styles.inputLabel}>Total Fee</Text>
                  <View
                    style={styles.totalamountstyle}
                    onStartShouldSetResponder={() => setIndex(5)}>
                    <Text
                      style={{
                        width: Width(280),
                        fontFamily: 'Gilroy-SemiBold',
                        paddingHorizontal: Width(20),
                        fontSize: Height(16),
                      }}>
                      {Number(monthlyfee) * Number(12)}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>

          <RNButton
            onPress={submit}
            style={{marginHorizontal: 20, marginTop: 20}}>
            Save & Next
          </RNButton>
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
    backgroundColor: Colors.fadeGray,
    borderStyle: 'dotted',
    borderRadius: 20,
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
  dropstyle: {
    alignSelf: 'center',
    width: Width(170),
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(20),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.fadeGray,
    color: 'white',
  },
  totalamountstyle: {
    width: '100%',
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.fadeGray,
    color: 'white',
    paddingTop: deviceHeight * 0.01,
  },
  inputLabel: {
    fontSize: 16,
    color: Colors.textGrey,
  },
});
