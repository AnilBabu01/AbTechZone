import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {primary, secondary} from '../utils/Colors';
import loginicon from '../assets/logoblue1.png';
import {Height, Width} from '../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Loader from '../Component/Loader/Loader';
import BackHeader from '../Component/Header/BackHeader';
import RNButton from '../Component/RNButton';
import RNInputField from '../Component/RNInputField';
import {Colors} from '../utils/Colors';
import {deviceHeight, deviceWidth} from '../utils/constant';
import bgImg from '../assets/bg.jpeg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
  {label: 'College', value: 'College'},
  {label: 'School', value: 'School'},
  {label: 'Coaching Institute', value: 'Coaching Institute'},
];

const SignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loader, setloader] = useState(false);
  const [sms, setsms] = useState('');
  const [loginas, setloginas] = useState('College');
  const [userid, setuserid] = useState('');
  const [Fullname, setFullname] = useState('');

  const submit = () => {};

  return (
    <>
      <BackHeader title={'Sign-Up'} />
      <StatusBar backgroundColor={primary} />
      <ImageBackground source={bgImg} style={styles.imagestyle}>
        <View style={{flex: 1}}>
          <View style={styles.mainprofile}>
            <View style={styles.innearviewprofile}>
              <Image
                source={loginicon}
                style={{
                  width: '100%',
                  height: 80,
                  borderRadius: 50,
                }}
              />
            </View>
          </View>
          <View style={styles.Content}>
            <Loader loader={loader} sms={sms} />
            <ScrollView>
              <Text style={styles.creatstyle}>Create Account</Text>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: Height(12),
                  marginTop: Height(10),
                }}>
                Login As<Text style={{color: primary}}> *</Text>
              </Text>
              <Dropdown
                style={styles.dropstyle}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Please Select"
                searchPlaceholder="Search..."
                value={loginas}
                onChange={item => {
                  setloginas(item.value);
                }}
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
                SignUp
              </RNButton>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
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
    backgroundColor: Colors.fadeGray,
    color: 'white',
  },
  Content: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    borderTopRightRadius: 31,
    borderTopLeftRadius: 31,
    paddingTop: 28,
    paddingHorizontal: deviceWidth * 0.05,
    height: deviceHeight * 0.7,
    width: '100%',
  },
  imagestyle: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  creatstyle: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
