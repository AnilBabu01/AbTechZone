import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {primary, secondary} from '../utils/Colors';
import loginicon from '../assets/phonelogo.png';
import {Height, Width} from '../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {login, loadUser} from '../Redux/action/authActions';
import {
  alCoaching,
  allCollege,
  allschool,
  allClient,
} from '../Redux/action/commanAction';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Component/Loader/Loader';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
  {label: 'College', value: 'College'},
  {label: 'School', value: 'School'},
  {label: 'Coaching Institute', value: 'Coaching Institute'},
  {label: 'Employee', value: 'Employee'},
  {label: 'Student', value: 'Student'},
  {label: 'Parent', value: 'Parent'},
  {label: 'Others', value: 'Others'},
];
const dataguest = [
  {label: 'college', value: 'college'},
  {label: 'school', value: 'school'},
  {label: 'coaching Institute', value: 'institute'},
];

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [loader, setloader] = useState(false);
  const [sms, setsms] = useState('');
  const [showloginoption, setshowloginoption] = useState(false);
  const [value, setValue] = useState(null);
  const [loginas, setloginas] = useState('College');
  const [guestloginas, setguestloginas] = useState('college');
  const [loginfor, setloginfor] = useState('');
  const [userid, setuserid] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [phonono, setphonono] = useState('');
  const [useriderror, setuseriderror] = useState('');
  const [passworderror, setpassworderror] = useState('');
  const [Fullname, setFullname] = useState('');
  const [showonldpassword, setshowonldpassword] = useState(false);
  const {loading, isAuthenticated, user, error} = useSelector(
    state => state.auth,
  );
  const {college} = useSelector(state => state.college);
  const {coaching} = useSelector(state => state.coaching);
  const {school} = useSelector(state => state.school);
  const {client} = useSelector(state => state.client);

  const submit = () => {
    if (showloginoption === false) {
      if (userid === '') {
        setuseriderror('User id required');
      }
      if (password === '') {
        setpassworderror('Password is required');
      }
      if (userid && password) {
        setloader(true);
        setsms('Loging...');
        dispatch(login(userid, password, loginas, loginfor));
      }
    }
    if (showloginoption === true) {
      if (userid && password) {
        setloader(true);
        setsms('Loging...');
        dispatch(login(userid, password, guestloginas, Fullname));
      }
    }
  };

  const setauthtoken = async () => {
    await AsyncStorage.setItem('erptoken', user?.data[0]?.token);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.data[0]?.token) {
        setauthtoken();
        dispatch(loadUser());
      }

      // setOpen(false);
      // if (user?.data[0]?.newclient === true) {
      //   navigate.navigate('/pricing');
      // } else {
      if (user?.data[0]?.User?.userType === 'school') {
        navigation.navigate('DashboardCoaching');
        setloader(false);
        setsms('');
      }
      if (user?.data[0]?.User?.userType === 'college') {
        navigation.navigate('DashboardCoaching');
        setloader(false);
        setsms('');
      }
      if (user?.data[0]?.User?.userType === 'institute') {
        navigation.navigate('DashboardCoaching');
        setloader(false);
        setsms('');
      }
      // }

      if (user?.data[0]?.userType === 'admin') {
        navigate.navigate('DashboardCoaching');
        setloader(false);
        setsms('');
      }

      if (user?.data[0]?.User?.userType === 'employee') {
        navigation.navigate('DashboardCoaching');
        setloader(false);
        setsms('');
      }
      if (user?.data[0]?.User?.userType === 'student') {
        navigation.navigate('DashboardCoaching');
        setloader(false);
        setsms('');
      }
      if (user?.data[0]?.User?.userType === 'parent') {
        navigation.navigate('DashboardCoaching');
        setloader(false);
        setsms('');
      }

      if (user) {
        console.log('serror from login api', user);
      }
    }
    if (user) {
      console.log('serror from login api', user);
    }
  }, [user, error]);
  useEffect(() => {
    if (error) {
      if (error?.status === false) {
        setloader(false);
        setsms('');
      }
    }
  }, [error]);
  useEffect(() => {
    dispatch(alCoaching());
    dispatch(allCollege());
    dispatch(allschool());
    dispatch(allClient());
    dispatch(loadUser());
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={primary} />
      <Loader loader={loader} sms={sms} />
      <ScrollView>
        <View style={styles.connainer}>
          <Image source={loginicon} style={styles.imgtop} />
          <View style={styles.textcenter}>
            <Text style={styles.logintext}>Login</Text>
          </View>
          <View style={styles.btnsdiv}>
            <TouchableOpacity
              onPress={() => {
                setshowloginoption(false);
              }}>
              <View style={showloginoption ? styles.btn : styles.activebtn}>
                <Text style={{color: showloginoption ? 'black' : 'white'}}>
                  LOGIN
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setshowloginoption(true)}>
              <View style={showloginoption ? styles.activebtn : styles.btn}>
                <Text style={{color: showloginoption ? 'white' : 'black'}}>
                  GUEST
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {showloginoption === true && (
            <>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: Height(12),
                  marginTop: Height(10),
                  marginLeft: Width(40),
                }}>
                Login As<Text style={{color: primary}}> *</Text>
              </Text>
              <Dropdown
                style={{
                  alignSelf: 'center',
                  width: Width(315),
                  height: Height(40),
                  fontFamily: 'Gilroy-SemiBold',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  paddingHorizontal: Width(10),
                  fontSize: Height(16),
                  marginTop: Height(10),
                  borderColor: index === 1 ? primary : '#a9a9a9',
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dataguest}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Please Select"
                searchPlaceholder="Search..."
                value={guestloginas}
                onChange={item => {
                  setguestloginas(item.value);
                }}
              />

              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: Height(12),
                  marginTop: Height(10),
                  marginLeft: Width(40),
                }}>
                Full Name<Text style={{color: primary}}> *</Text>
              </Text>
              <TextInput
                placeholder="Enter full name"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  alignSelf: 'center',
                  width: Width(315),
                  height: Height(40),
                  fontFamily: 'Gilroy-SemiBold',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  paddingHorizontal: Width(10),
                  fontSize: Height(16),
                  marginTop: Height(10),
                  borderColor: index === 2 ? primary : '#a9a9a9',
                }}
                value={Fullname}
                // onBlur={() => Validation()}
                onChangeText={text => setFullname(text)}
                // keyboardType="email-address"
                onFocus={() => setIndex(2)}
              />
              {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}

              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: Height(12),
                  marginTop: Height(10),
                  marginLeft: Width(40),
                }}>
                Email<Text style={{color: primary}}> *</Text>
              </Text>
              <TextInput
                placeholder="Enter email"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  alignSelf: 'center',
                  width: Width(315),
                  height: Height(40),
                  fontFamily: 'Gilroy-SemiBold',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  paddingHorizontal: Width(10),
                  fontSize: Height(16),
                  marginTop: Height(10),
                  borderColor: index === 3 ? primary : '#a9a9a9',
                }}
                value={userid}
                // onBlur={() => Validation()}
                onChangeText={text => setuserid(text)}
                keyboardType="email-address"
                onFocus={() => setIndex(3)}
              />
              {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}

              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: Height(12),
                  marginTop: Height(10),
                  marginLeft: Width(40),
                }}>
                Phone Number<Text style={{color: primary}}> *</Text>
              </Text>
              <TextInput
                placeholder="Enter phone number"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  alignSelf: 'center',
                  width: Width(315),
                  height: Height(40),
                  fontFamily: 'Gilroy-SemiBold',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  paddingHorizontal: Width(10),
                  fontSize: Height(16),
                  marginTop: Height(10),
                  borderColor: index === 4 ? primary : '#a9a9a9',
                }}
                value={password}
                // onBlur={() => Validation()}
                onChangeText={text => setpassword(text)}
                // keyboardType="email-address"
                onFocus={() => setIndex(4)}
              />
              {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}

              <View style={styles.loginbtndiv}>
                <TouchableOpacity onPress={() => submit()}>
                  <View style={styles.loginbtn}>
                    <Text style={styles.logintextstyle}>Login</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}

          {showloginoption === false && (
            <>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: Height(12),
                  marginTop: Height(10),
                  marginLeft: Width(40),
                }}>
                Login As<Text style={{color: primary}}> *</Text>
              </Text>
              <Dropdown
                style={{
                  alignSelf: 'center',
                  width: Width(315),
                  height: Height(40),
                  fontFamily: 'Gilroy-SemiBold',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  paddingHorizontal: Width(10),
                  fontSize: Height(16),
                  marginTop: Height(10),
                  borderColor: index === 5 ? primary : '#a9a9a9',
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="loginas"
                placeholder="Please Select"
                searchPlaceholder="Search..."
                value={loginas}
                onChange={item => {
                  setloginas(item.value);
                }}
                // renderLeftIcon={() => (
                //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                // )}
              />
              {loginas === 'College' && (
                <>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Please Select College
                    <Text style={{color: primary}}> *</Text>
                  </Text>
                  {college?.length ? (
                    <>
                      <Dropdown
                        style={{
                          alignSelf: 'center',
                          width: Width(315),
                          height: Height(40),
                          fontFamily: 'Gilroy-SemiBold',
                          borderWidth: 1.5,
                          borderRadius: Width(10),
                          paddingHorizontal: Width(10),
                          fontSize: Height(16),
                          marginTop: Height(10),
                          borderColor: index === 6 ? primary : '#a9a9a9',
                        }}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={
                          college &&
                          college?.map(item => ({
                            label: `${item?.institutename} ${item?.ClientCode}`,
                            value: `${item?.institutename} ${item?.ClientCode}`,
                          }))
                        }
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Please Select"
                        searchPlaceholder="Search..."
                        value={loginfor}
                        onChange={item => {
                          setloginfor(item.value);
                        }}
                      />
                    </>
                  ) : (
                    ''
                  )}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    College Id<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter college Id"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 7 ? primary : '#a9a9a9',
                    }}
                    value={userid}
                    // onBlur={() => Validation()}
                    onChangeText={text => setuserid(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(7)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Password<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    secureTextEntry={true}
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 8 ? primary : '#a9a9a9',
                    }}
                    value={password}
                    // onBlur={() => Validation()}
                    onChangeText={text => setpassword(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(8)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}
                </>
              )}

              {loginas === 'School' && (
                <>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Please Select School
                    <Text style={{color: primary}}> *</Text>
                  </Text>
                  {school ? (
                    <>
                      <Dropdown
                        style={{
                          alignSelf: 'center',
                          width: Width(315),
                          height: Height(40),
                          fontFamily: 'Gilroy-SemiBold',
                          borderWidth: 1.5,
                          borderRadius: Width(10),
                          paddingHorizontal: Width(10),
                          fontSize: Height(16),
                          marginTop: Height(10),
                          borderColor: index === 9 ? primary : '#a9a9a9',
                        }}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={
                          school &&
                          school?.map(item => ({
                            label: `${item?.institutename} ${item?.ClientCode}`,
                            value: `${item?.institutename} ${item?.ClientCode}`,
                          }))
                        }
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Please Select"
                        searchPlaceholder="Search..."
                        value={loginfor}
                        onChange={item => {
                          setloginfor(item.value);
                        }}
                      />
                    </>
                  ) : (
                    ''
                  )}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    School Id<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter User Id"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 10 ? primary : '#a9a9a9',
                    }}
                    value={userid}
                    // onBlur={() => Validation()}
                    onChangeText={text => setuserid(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(10)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Password<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    secureTextEntry={true}
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 12 ? primary : '#a9a9a9',
                    }}
                    value={password}
                    // onBlur={() => Validation()}
                    onChangeText={text => setpassword(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(12)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}
                </>
              )}

              {loginas === 'Coaching Institute' && (
                <>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Please Select Coaching
                    <Text style={{color: primary}}> *</Text>
                  </Text>
                  {coaching ? (
                    <>
                      <Dropdown
                        style={{
                          alignSelf: 'center',
                          width: Width(315),
                          height: Height(40),
                          fontFamily: 'Gilroy-SemiBold',
                          borderWidth: 1.5,
                          borderRadius: Width(10),
                          paddingHorizontal: Width(10),
                          fontSize: Height(16),
                          marginTop: Height(10),
                          borderColor: index === 13 ? primary : '#a9a9a9',
                        }}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={
                          coaching &&
                          coaching?.map(item => ({
                            label: `${item?.institutename} ${item?.ClientCode}`,
                            value: `${item?.institutename} ${item?.ClientCode}`,
                          }))
                        }
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Please Select"
                        searchPlaceholder="Search..."
                        value={loginfor}
                        onChange={item => {
                          setloginfor(item.value);
                        }}
                      />
                    </>
                  ) : (
                    ''
                  )}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Coaching Id<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter Coaching Id"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 14 ? primary : '#a9a9a9',
                    }}
                    value={userid}
                    // onBlur={() => Validation()}
                    onChangeText={text => setuserid(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(14)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Password<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    secureTextEntry={true}
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 15 ? primary : '#a9a9a9',
                    }}
                    value={password}
                    // onBlur={() => Validation()}
                    onChangeText={text => setpassword(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(15)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}
                </>
              )}
              {loginas === 'Employee' && (
                <>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Please Select
                    <Text style={{color: primary}}> *</Text>
                  </Text>
                  {client ? (
                    <>
                      <Dropdown
                        style={{
                          alignSelf: 'center',
                          width: Width(315),
                          height: Height(40),
                          fontFamily: 'Gilroy-SemiBold',
                          borderWidth: 1.5,
                          borderRadius: Width(10),
                          paddingHorizontal: Width(10),
                          fontSize: Height(16),
                          marginTop: Height(10),
                          borderColor: index === 16 ? primary : '#a9a9a9',
                        }}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={
                          client &&
                          client?.map(item => ({
                            label: `${item?.institutename} ${item?.ClientCode}`,
                            value: `${item?.institutename} ${item?.ClientCode}`,
                          }))
                        }
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Please Select"
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={item => {
                          setloginfor(item.value);
                        }}
                      />
                    </>
                  ) : (
                    ''
                  )}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Employee Id
                    <Text style={{color: primary}}>*</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter User Id"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 17 ? primary : '#a9a9a9',
                    }}
                    value={userid}
                    // onBlur={() => Validation()}
                    onChangeText={text => setuserid(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(17)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Password<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    secureTextEntry={true}
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 18 ? primary : '#a9a9a9',
                    }}
                    value={password}
                    // onBlur={() => Validation()}
                    onChangeText={text => setpassword(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(18)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}
                </>
              )}
              {loginas === 'Student' && (
                <>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Please Select
                    <Text style={{color: primary}}> *</Text>
                  </Text>
                  {client ? (
                    <>
                      <Dropdown
                        style={{
                          alignSelf: 'center',
                          width: Width(315),
                          height: Height(40),
                          fontFamily: 'Gilroy-SemiBold',
                          borderWidth: 1.5,
                          borderRadius: Width(10),
                          paddingHorizontal: Width(10),
                          fontSize: Height(16),
                          marginTop: Height(10),
                          borderColor: index === 19 ? primary : '#a9a9a9',
                        }}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={
                          client &&
                          client?.map(item => ({
                            label: `${item?.institutename} ${item?.ClientCode}`,
                            value: `${item?.institutename} ${item?.ClientCode}`,
                          }))
                        }
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Please Select"
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={item => {
                          loginfor(item.value);
                        }}
                      />
                    </>
                  ) : (
                    ''
                  )}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Roll Number<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter Roll Number"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 20 ? primary : '#a9a9a9',
                    }}
                    value={userid}
                    // onBlur={() => Validation()}
                    onChangeText={text => setuserid(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(20)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Password<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    secureTextEntry={true}
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 21 ? primary : '#a9a9a9',
                    }}
                    value={password}
                    // onBlur={() => Validation()}
                    onChangeText={text => setpassword(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(21)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}
                </>
              )}

              {loginas === 'Parent' && (
                <>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Please Select Organization
                    <Text style={{color: primary}}> *</Text>
                  </Text>
                  {client ? (
                    <>
                      <Dropdown
                        style={{
                          alignSelf: 'center',
                          width: Width(315),
                          height: Height(40),
                          fontFamily: 'Gilroy-SemiBold',
                          borderWidth: 1.5,
                          borderRadius: Width(10),
                          paddingHorizontal: Width(10),
                          fontSize: Height(16),
                          marginTop: Height(10),
                          borderColor: index === 22 ? primary : '#a9a9a9',
                        }}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={
                          client &&
                          client?.map(item => ({
                            label: `${item?.institutename} ${item?.ClientCode}`,
                            value: `${item?.institutename} ${item?.ClientCode}`,
                          }))
                        }
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Please Select"
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={item => {
                          setloginfor(item.value);
                        }}
                      />
                    </>
                  ) : (
                    ''
                  )}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Phone Number<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter Phone Number"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 23 ? primary : '#a9a9a9',
                    }}
                    value={userid}
                    // onBlur={() => Validation()}
                    onChangeText={text => setuserid(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(23)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Password<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    secureTextEntry={true}
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 24 ? primary : '#a9a9a9',
                    }}
                    value={password}
                    // onBlur={() => Validation()}
                    onChangeText={text => setpassword(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(24)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}
                </>
              )}

              {loginas === 'Others' && (
                <>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Admin Id<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter Admin Id"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 25 ? primary : '#a9a9a9',
                    }}
                    value={userid}
                    // onBlur={() => Validation()}
                    onChangeText={text => setuserid(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(25)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Password<Text style={{color: primary}}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    secureTextEntry={true}
                    style={{
                      alignSelf: 'center',
                      width: Width(315),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
                      paddingHorizontal: Width(10),
                      fontSize: Height(16),
                      marginTop: Height(10),
                      borderColor: index === 26 ? primary : '#a9a9a9',
                    }}
                    value={password}
                    // onBlur={() => Validation()}
                    onChangeText={text => setpassword(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(26)}
                  />
                  {/* {emailError.length > 0 && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: Width(60),
                    fontSize: Height(11),
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  {emailError}
                </Text>
              )} */}
                </>
              )}

              <View style={styles.loginbtndiv}>
                <TouchableOpacity onPress={() => submit()}>
                  <View style={styles.loginbtn}>
                    <Text style={styles.logintextstyle}>Login</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  connainer: {
    height: windowHeight,
  },
  imgtop: {
    width: windowWidth,
    height: windowHeight / 3.3,
    // borderBottomRightRadius: windowHeight / 4,
    // borderBottomLeftRadius: windowHeight / 4,
  },
  textcenter: {
    alignItems: 'center',
    width: windowWidth,
  },
  btn: {
    width: 130,
    height: 35,
    backgroundColor: secondary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activebtn: {
    width: 130,
    height: 35,
    backgroundColor: primary,
    borderRadius: 10,
    borderColor: primary,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnsdiv: {
    width: windowWidth,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  logintext: {
    color: primary,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    // fontWeight: 900,
    fontSize: 30,
  },

  loginbtndiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: Height(30),
  },
  loginbtn: {
    width: Width(315),
    height: Height(45),
    backgroundColor: primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logintextstyle: {
    color: 'white',
    // fontWeight: 700,
    fontSize: 25,
  },

  icon: {
    marginRight: 5,
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
