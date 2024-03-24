import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {primary, secondary, Colors} from '../utils/Colors';
import {Height, Width} from '../utils/responsive';
import {useDispatch, useSelector} from 'react-redux';
import {login, loadUser} from '../redux/action/authActions';
import {
  alCoaching,
  allCollege,
  allschool,
  allClient,
} from '../redux/action/commanAction';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Component/Loader/Loader';
import BackHeader from '../Component/Header/BackHeader';
import RNButton from '../Component/RNButton';
import RNInputField from '../Component/RNInputField';
import {deviceHeight, deviceWidth} from '../utils/constant';
import {Checkbox} from 'react-native-paper';
import RNBDropDown from '../Component/RNBDropDown';

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
  const [showPassword, setShowPassword] = useState(true);
  const [loader, setloader] = useState(false);
  const [sms, setsms] = useState('');
  const [showloginoption, setshowloginoption] = useState(false);
  const [value, setValue] = useState(null);
  const [loginas, setloginas] = useState('College');
  const [guestloginas, setguestloginas] = useState('college');
  const [loginfor, setloginfor] = useState('');
  const [userid, setuserid] = useState('');
  const [password, setpassword] = useState('');
  const [useriderror, setuseriderror] = useState('');
  const [passworderror, setpassworderror] = useState('');
  const [Fullname, setFullname] = useState('');

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
    if (user?.data[0]?.user) {
      await AsyncStorage.setItem('erptoken', user?.data[0]?.token);
      await AsyncStorage.setItem('userType', user?.data[0]?.user?.userType);
    }

    if (user?.data[0]?.User) {
      await AsyncStorage.setItem('erptoken', user?.data[0]?.token);
      await AsyncStorage.setItem('userType', user?.data[0]?.User?.userType);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user?.data[0]?.token) {
        setauthtoken();
        dispatch(loadUser());
      }

      if (user?.data[0]?.User?.userType === 'school') {
        navigation.navigate('DashboardSchool');
        setloader(false);
        setsms('');
      }
      if (user?.data[0]?.User?.userType === 'college') {
        navigation.navigate('DashboardCollege');
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
        navigate.navigate('DashboardOwner');
        setloader(false);
        setsms('');
      }

      if (user?.data[0]?.user?.userType === 'employee') {
        navigation.navigate('DashboardEmplyee');
        setloader(false);
        setsms('');
      }
      if (user?.data[0]?.User?.userType === 'student') {
        navigation.navigate('DashboardStudent');
        setloader(false);
        setsms('');
      }
      if (user?.data[0]?.User?.userType === 'parent') {
        navigation.navigate('DashboardParent');
        setloader(false);
        setsms('');
      }
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
    <>
      <BackHeader title={'Sign-in'} />
      <StatusBar backgroundColor={primary} />
      <Loader loader={loader} sms={sms} />
      <ScrollView>
        <View style={styles.Content}>
          <View
            style={{
              display: 'flex',

              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <View style={{width: '45%'}}>
              <RNButton
                style={{paddingHorizontal: 20}}
                onPress={() => {
                  setshowloginoption(false);
                }}>
                Login
              </RNButton>
            </View>

            <View style={{width: '45%'}}>
              <RNButton
                style={{paddingHorizontal: 20}}
                onPress={() => setshowloginoption(true)}>
                GUEST
              </RNButton>
            </View>
          </View>
          {showloginoption === true && (
            <>
              <RNBDropDown
                label="Login As"
                value={guestloginas}
                OptionsList={dataguest}
                onChange={data => setguestloginas(data.value)}
              />

              <View>
                <RNInputField
                  label="Full Name"
                  placeholder="Enter Full Name"
                  value={Fullname}
                  onChangeText={data => setFullname(data)}
                />
              </View>
              <View>
                <RNInputField
                  label="Email"
                  placeholder="Enter Email"
                  value={userid}
                  onChangeText={data => setuserid(data)}
                />
              </View>

              <RNInputField
                label="Mobile No"
                placeholder="Enter Mobile NO"
                value={userid}
                onChangeText={data => setuserid(data)}
              />

              <RNButton
                style={{paddingHorizontal: 25}}
                onPress={() => {
                  submit();
                }}>
                Login
              </RNButton>
            </>
          )}

          {showloginoption === false && (
            <>
              <RNBDropDown
                label=" Login As"
                value={loginas}
                OptionsList={data}
                onChange={data => setloginas(data.value)}
              />

              {loginas === 'College' && (
                <>
                  {college?.length ? (
                    <>
                      <RNBDropDown
                        label=" Please Select College"
                        value={loginfor}
                        OptionsList={
                          college &&
                          college?.map(item => ({
                            label: `${item?.institutename} ${item?.ClientCode}`,
                            value: `${item?.institutename} ${item?.ClientCode}`,
                          }))
                        }
                        onChange={data => setloginfor(data.value)}
                      />
                    </>
                  ) : (
                    ''
                  )}

                  <View>
                    <RNInputField
                      label="College Id"
                      placeholder="Enter College Id"
                      value={userid}
                      onChangeText={data => setuserid(data)}
                    />
                  </View>
                  <View>
                    <RNInputField
                      label="Password"
                      placeholder="Enter Password"
                      ispassword
                      passwordShow={showPassword}
                      setShowPassword={setShowPassword}
                      value={password}
                      onChangeText={data => setpassword(data)}
                    />
                  </View>
                </>
              )}

              {loginas === 'School' && (
                <>
                  {school ? (
                    <>
                      <RNBDropDown
                        label="Please Select School"
                        value={loginfor}
                        OptionsList={
                          school &&
                          school?.map(item => ({
                            label: `${item?.institutename} ${item?.ClientCode}`,
                            value: `${item?.institutename} ${item?.ClientCode}`,
                          }))
                        }
                        onChange={data => setloginfor(data.value)}
                      />
                    </>
                  ) : (
                    ''
                  )}
                  <View>
                    <RNInputField
                      label="School Id"
                      placeholder="Enter College Id"
                      value={userid}
                      onChangeText={data => setuserid(data)}
                    />
                  </View>

                  <View>
                    <RNInputField
                      label="Password"
                      placeholder="Enter Password"
                      ispassword
                      passwordShow={showPassword}
                      setShowPassword={setShowPassword}
                      value={password}
                      onChangeText={data => setpassword(data)}
                    />
                  </View>
                </>
              )}

              {loginas === 'Coaching Institute' && (
                <>
                  {coaching ? (
                    <>
                      <RNBDropDown
                        label="Please Select Coaching"
                        value={loginfor}
                        OptionsList={
                          coaching &&
                          coaching?.map(item => ({
                            label: `${item?.institutename} ${item?.ClientCode}`,
                            value: `${item?.institutename} ${item?.ClientCode}`,
                          }))
                        }
                        onChange={data => setloginfor(data.value)}
                      />
                    </>
                  ) : (
                    ''
                  )}
                  <View>
                    <RNInputField
                      label="Coaching Id"
                      placeholder="Enter Coaching Id"
                      value={userid}
                      onChangeText={data => setuserid(data)}
                    />
                  </View>

                  <View>
                    <RNInputField
                      label="Password"
                      placeholder="Enter Password"
                      ispassword
                      passwordShow={showPassword}
                      setShowPassword={setShowPassword}
                      value={password}
                      onChangeText={data => setpassword(data)}
                    />
                  </View>
                </>
              )}
              {loginas === 'Employee' && (
                <>
                  {client ? (
                    <>
                      <RNBDropDown
                        label="Please Select"
                        value={loginfor}
                        OptionsList={
                          client &&
                          client?.map(item => ({
                            label: `${item?.institutename} ${item?.ClientCode}`,
                            value: `${item?.institutename} ${item?.ClientCode}`,
                          }))
                        }
                        onChange={data => setloginfor(data.value)}
                      />
                    </>
                  ) : (
                    ''
                  )}

                  <View>
                    <RNInputField
                      label="Employee Id"
                      placeholder="Enter Employee Id"
                      value={userid}
                      onChangeText={data => setuserid(data)}
                    />
                  </View>

                  <View>
                    <RNInputField
                      label="Password"
                      placeholder="Enter Password"
                      ispassword
                      passwordShow={showPassword}
                      setShowPassword={setShowPassword}
                      value={password}
                      onChangeText={data => setpassword(data)}
                    />
                  </View>
                </>
              )}
              {loginas === 'Student' && (
                <>
                  {client ? (
                    <>
                      <RNBDropDown
                        label="Please Select"
                        value={loginfor}
                        OptionsList={
                          client &&
                          client?.map(item => ({
                            label: `${item?.institutename} ${item?.ClientCode}`,
                            value: `${item?.institutename} ${item?.ClientCode}`,
                          }))
                        }
                        onChange={data => setloginfor(data.value)}
                      />
                    </>
                  ) : (
                    ''
                  )}
                  <View>
                    <RNInputField
                      label="Roll No"
                      placeholder="Enter Roll No"
                      value={userid}
                      onChangeText={data => setuserid(data)}
                    />
                  </View>

                  <View>
                    <RNInputField
                      label="Password"
                      placeholder="Enter Password"
                      ispassword
                      passwordShow={showPassword}
                      setShowPassword={setShowPassword}
                      value={password}
                      onChangeText={data => setpassword(data)}
                    />
                  </View>
                </>
              )}

              {loginas === 'Parent' && (
                <>
                  {client ? (
                    <>
                      <RNBDropDown
                        label="Please Select Organization"
                        value={loginfor}
                        OptionsList={
                          client &&
                          client?.map(item => ({
                            label: `${item?.institutename} ${item?.ClientCode}`,
                            value: `${item?.institutename} ${item?.ClientCode}`,
                          }))
                        }
                        onChange={data => setloginfor(data.value)}
                      />
                    </>
                  ) : (
                    ''
                  )}
                  <View>
                    <RNInputField
                      label="Mobile No"
                      placeholder="Enter Mobile NO"
                      value={userid}
                      onChangeText={data => setuserid(data)}
                    />
                  </View>

                  <View>
                    <RNInputField
                      label="Password"
                      placeholder="Enter Password"
                      ispassword
                      passwordShow={showPassword}
                      setShowPassword={setShowPassword}
                      value={password}
                      onChangeText={data => setpassword(data)}
                    />
                  </View>
                </>
              )}

              {loginas === 'Others' && (
                <>
                  <View>
                    <RNInputField
                      label="Admin Id"
                      placeholder="Enter Admin Id"
                      value={userid}
                      onChangeText={data => setuserid(data)}
                    />
                  </View>

                  <View>
                    <RNInputField
                      label="Password"
                      placeholder="Enter Password"
                      ispassword
                      passwordShow={showPassword}
                      setShowPassword={setShowPassword}
                      value={password}
                      onChangeText={data => setpassword(data)}
                    />
                  </View>
                </>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: deviceHeight * 0.02,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Checkbox status="checked" />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      lineHeight: 18,
                      color: Colors.primary,
                    }}>
                    Remember Me!
                  </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        lineHeight: 18,
                        color: Colors.primary,
                      }}>
                      Don't have An Account?
                    </Text>
                    <Text style={{color: Colors.black, marginLeft: 5}}>
                      Sign-Up
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <RNButton
                style={{paddingHorizontal: 25}}
                onPress={() => {
                  submit();
                }}>
                Sign-in
              </RNButton>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  connainer: {
    height: windowHeight,
  },
  imgtop: {
    width: '100%',
    height: windowHeight / 6,
  },
  mainlogo: {
    paddingHorizontal: 20,
  },
  textcenter: {
    alignItems: 'center',
    width: windowWidth,
  },
  btn: {
    width: 130,
    height: 35,
    backgroundColor: secondary,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activebtn: {
    width: 130,
    height: 35,
    backgroundColor: primary,
    borderRadius: 5,
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
    justifyContent: 'space-between',
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
  showpassView: {
    position: 'relative',
  },
  showpassIcon: {
    position: 'absolute',
    left: Width(310),
    top: Height(20),
  },
  mainprofile: {
    paddingTop: deviceWidth * 0.05,
    display: 'flex',
    justifyContent: 'center',
  },
  innearview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  innearviewprofile: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 5,
  },
  dropstyle: {
    alignSelf: 'center',
    width: '100%',
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(20),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.lightGrey,
    color: Colors.black,
  },

  Content: {
    // position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    // borderTopRightRadius: 31,
    // borderTopLeftRadius: 31,
    paddingTop: 28,
    paddingHorizontal: deviceWidth * 0.05,
    height: deviceHeight * 0.9,
    width: '100%',
  },
  imagestyle: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
});
