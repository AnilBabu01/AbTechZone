import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Dimensions,
  StyleSheet,
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
import PlansList from './PlansList';
import {serverInstance} from '../API/ServerInstance';
import {backendApiUrl} from '../Config/config';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const dataguest = [
  {label: 'College', value: 'College'},
  {label: 'School', value: 'School'},
  {label: 'Coaching Institute', value: 'Coaching Institute'},
];

const SignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [sendingPhone, setsendingPhone] = useState(false);
  const [sendingEmail, setsendingEmail] = useState(false);
  const [creating, setcreating] = useState(false);
  const [verifyemail, setverifyemail] = useState(false);
  const [verifyphone, setverifyphone] = useState(false);
  const [proceed, setproceed] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [password, setpassword] = useState('');
  const [passwordconfirm, setpasswordconfirm] = useState('');
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);
  const [selctplanSkip, setselctplanSkip] = useState(true);
  const [planId, setplanId] = useState('');
  // const [loader, setloader] = useState(false);
  // const [sms, setsms] = useState('');
  const [owername, setowername] = useState('');
  const [email, setemail] = useState('');
  const [phoneno1, setphoneno1] = useState('');
  const [organizationName, setorganizationName] = useState('');
  const [address, setaddress] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [phoneotp, setphoneotp] = useState('');
  const [emailOtp, setemailOtp] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setpincode] = useState('');
  const [guestloginas, setguestloginas] = useState('college');
  const [userid, setuserid] = useState('');
  const [Fullname, setFullname] = useState('');
  const [time, setTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timeemail, setTimeemail] = useState(60);
  const [isRunningemail, setIsRunningemail] = useState(false);
  const [intervalIdemail, setIntervalIdemail] = useState(null);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunningemail(false);
    setTimeemail(60);
  };

  const startTimeremail = () => {
    setIsRunningemail(true);
  };

  const stopTimeremail = () => {
    setIsRunningemail(false);
    setTimeemail(60);
  };

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTime(prevSeconds => {
          if (prevSeconds === 0) {
            clearInterval(id);
            setIsRunning(false);
            return 60;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);

      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (isRunningemail) {
      const id = setInterval(() => {
        setTimeemail(prevSeconds => {
          if (prevSeconds === 0) {
            clearInterval(id);
            setIsRunningemail(false);
            return 60;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);

      setIntervalIdemail(id);
    } else {
      clearInterval(intervalIdemail);
    }

    return () => clearInterval(intervalId);
  }, [isRunningemail]);

  const sendOtpOnPhone = () => {
    serverInstance('clientVerify/phondverification', 'post', {
      phone: phoneno1,
    }).then(res => {
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });

        startTimer();
      }
      if (res?.status === false) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });

        stopTimer();
      }
    });
  };

  const PhoneOtpVerify = () => {
    serverInstance('clientVerify/phondverification', 'put', {
      otp: phoneotp,
    }).then(res => {
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        stopTimer();
      }

      console.log('fhfjhdgf', res);

      if (res?.status === false) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
      }
    });
  };

  const sendOtpOnEmail = () => {
    serverInstance('clientVerify/emailverification', 'post', {
      email: email,
      phone: phoneno1,
    }).then(res => {
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        startTimeremail();
      }
      if (res?.status === false) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
        stopTimeremail();
      }
    });
  };

  const EmailOtpVerify = () => {
    serverInstance('clientVerify/emailverification', 'put', {
      otp: emailOtp,
      email: email,
      phone: phoneno1,
    }).then(res => {
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        stopTimeremail();
        setproceed(true);
      }
      if (res?.status === false) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
        stopTimeremail();
      }
    });
  };

  const submit = async () => {
    if (password !== confirmpassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Must be password and confirm password sam',
      });
      return 0;
    }

    formData.set('name', owername);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('institutename', organizationName);
    formData.set('phoneno1', phoneno1);
    formData.set('address', address);
    formData.set('city', city);
    formData.set('state', state);
    formData.set('pincode', pincode);
    formData.set('userType', guestloginas);
    formData.set('planId', planId);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const {data} = await axios.post(
      `${backendApiUrl}college/register`,
      formData,
      config,
    );

    if (data?.status === true) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: res?.msg,
      });

      dispatch(alCoaching());
      dispatch(allCollege());
      dispatch(allschool());
      dispatch(allClient());

      navigation.navigate('Login');
    }
  };

  return (
    <>
      <BackHeader title={'Sign-up'} />
      <StatusBar backgroundColor={primary} />
      {/* <Loader loader={loader} sms={sms} /> */}
      <ScrollView>
        {selctplanSkip === true ? (
          <>
            <PlansList
              setselctplanSkip={setselctplanSkip}
              planId={planId}
              setplanId={setplanId}
            />
          </>
        ) : (
          <>
            <View style={styles.Content}>
              {proceed === false ? (
                <>
                  <View>
                    <RNInputField
                      label="Phone No"
                      placeholder="Enter Phone No"
                      value={phoneno1}
                      onChangeText={data => setphoneno1(data)}
                    />
                  </View>
                  <View>
                    <RNButton
                      style={{paddingHorizontal: 25}}
                      loading={sendingPhone}
                      onPress={() => {
                        sendOtpOnPhone();
                      }}>
                      {isRunning ? time : 'Get Otp On Phone No'}
                    </RNButton>
                  </View>

                  <View>
                    <RNInputField
                      label="Phone OTP"
                      placeholder="Enter Phone OTP"
                      value={phoneotp}
                      onChangeText={data => setphoneotp(data)}
                    />
                  </View>
                  <View>
                    <RNButton
                      style={{paddingHorizontal: 25}}
                      loading={verifyphone}
                      onPress={() => {
                        PhoneOtpVerify();
                      }}>
                      Verify
                    </RNButton>
                  </View>
                  <View>
                    <RNInputField
                      label="Email"
                      placeholder="Enter Email"
                      value={email}
                      onChangeText={data => setemail(data)}
                    />
                  </View>
                  <View>
                    <RNButton
                      style={{paddingHorizontal: 25}}
                      loading={sendingEmail}
                      onPress={() => {
                        sendOtpOnEmail();
                      }}>
                      {isRunningemail ? timeemail : 'Get Otp On Email'}
                    </RNButton>
                  </View>
                  <View>
                    <RNInputField
                      label="Phone OTP"
                      placeholder="Enter Phone OTP"
                      value={emailOtp}
                      onChangeText={data => setemailOtp(data)}
                    />
                  </View>
                  <View>
                    <RNButton
                      loading={verifyemail}
                      onPress={() => EmailOtpVerify()}>
                      Verify
                    </RNButton>
                  </View>
                  <View style={{marginVertical: 20}}>
                    <RNButton
                      onPress={() => {
                        setproceed(true);
                      }}>
                      Proceed
                    </RNButton>
                  </View>
                </>
              ) : (
                <>
                  <RNInputField
                    label="Owner Name"
                    placeholder="Enter Owner Name"
                    value={owername}
                    onChangeText={data => setowername(data)}
                  />
                  <RNInputField
                    label="Institute/School Name"
                    placeholder="Enter Institute/School Name"
                    value={organizationName}
                    onChangeText={data => setorganizationName(data)}
                  />

                  <RNBDropDown
                    label="Register As"
                    value={guestloginas}
                    OptionsList={dataguest}
                    onChange={data => setguestloginas(data.value)}
                  />
                  <View
                    style={{
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
                      label="Address"
                      placeholder="Address"
                      value={address}
                      onChangeText={data => setaddress(data)}
                      multiline
                      numberOfLines={5}
                      maxLength={500}
                    />
                  </View>

                  <RNInputField
                    label="State"
                    placeholder="Enter State"
                    value={state}
                    onChangeText={data => setState(data)}
                  />

                  <RNInputField
                    label="District"
                    placeholder="Enter District"
                    value={Fullname}
                    onChangeText={data => setDistrict(data)}
                  />

                  <RNInputField
                    label="pincode"
                    placeholder="Enter pincode"
                    value={pincode}
                    onChangeText={data => setpincode(data)}
                  />
                  <RNInputField
                    label="Password"
                    placeholder="Enter Password"
                    ispassword
                    passwordShow={showPassword}
                    setShowPassword={setShowPassword}
                    value={password}
                    onChangeText={data => setpassword(data)}
                  />
                  <RNInputField
                    label="Confirm Password"
                    placeholder="Enter Confirm Password"
                    ispassword
                    passwordShow={showPasswordConfirm}
                    setShowPassword={setShowPasswordConfirm}
                    value={passwordconfirm}
                    onChangeText={data => setpasswordconfirm(data)}
                  />
                  <View style={{marginBottom: 50}}>
                    <RNButton
                      style={{paddingHorizontal: 25}}
                      onPress={() => {
                        submit();
                      }}>
                      Sign-up
                    </RNButton>
                  </View>
                </>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default SignUp;

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
    // height: deviceHeight * 0.9,
    width: '100%',
  },
  imagestyle: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
});
