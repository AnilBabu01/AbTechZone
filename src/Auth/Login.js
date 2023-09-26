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
import React, {useState} from 'react';
import {primary, secondary} from '../utils/Colors';
import loginicon from '../assets/phonelogo.png';
import {Height, Width} from '../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
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

const Login = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [showloginoption, setshowloginoption] = useState(false);
  const [value, setValue] = useState(null);
  const [loginas, setloginas] = useState('College');

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={primary} />
      <ScrollView>
        <View style={styles.connainer}>
          <Image source={loginicon} style={styles.imgtop} />
          <View style={styles.textcenter}>
            <Text style={styles.logintext}>Login</Text>
          </View>
          <View style={styles.btnsdiv}>
            <TouchableOpacity onPress={() => setshowloginoption(false)}>
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
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Please Select"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
                // renderLeftIcon={() => (
                //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                // )}
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
                  borderColor: index === 1 ? primary : '#a9a9a9',
                }}
                // value={email}
                // onBlur={() => Validation()}
                // onChangeText={text => setEmail(text)}
                // keyboardType="email-address"
                onFocus={() => setIndex(1)}
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
                  borderColor: index === 1 ? primary : '#a9a9a9',
                }}
                // value={email}
                // onBlur={() => Validation()}
                // onChangeText={text => setEmail(text)}
                // keyboardType="email-address"
                onFocus={() => setIndex(1)}
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
                  borderColor: index === 1 ? primary : '#a9a9a9',
                }}
                // value={email}
                // onBlur={() => Validation()}
                // onChangeText={text => setEmail(text)}
                // keyboardType="email-address"
                onFocus={() => setIndex(1)}
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
                <TouchableOpacity>
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
                  borderColor: index === 1 ? primary : '#a9a9a9',
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
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                      setValue(item.value);
                    }}
                    // renderLeftIcon={() => (
                    //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    // )}
                  />

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    User Id<Text style={{color: primary}}> *</Text>
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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                      setValue(item.value);
                    }}
                    // renderLeftIcon={() => (
                    //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    // )}
                  />

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    User Id<Text style={{color: primary}}> *</Text>
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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                      setValue(item.value);
                    }}
                    // renderLeftIcon={() => (
                    //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    // )}
                  />

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    User Id<Text style={{color: primary}}> *</Text>
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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                      setValue(item.value);
                    }}
                    // renderLeftIcon={() => (
                    //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    // )}
                  />

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: Height(12),
                      marginTop: Height(10),
                      marginLeft: Width(40),
                    }}>
                    Employee import { second } from 'first'<Text style={{color: primary}}> *</Text>
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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                      setValue(item.value);
                    }}
                    // renderLeftIcon={() => (
                    //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    // )}
                  />

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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                      setValue(item.value);
                    }}
                    // renderLeftIcon={() => (
                    //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    // )}
                  />

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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                      borderColor: index === 1 ? primary : '#a9a9a9',
                    }}
                    // value={email}
                    // onBlur={() => Validation()}
                    // onChangeText={text => setEmail(text)}
                    // keyboardType="email-address"
                    onFocus={() => setIndex(1)}
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
                <TouchableOpacity onPress={()=>  navigation.navigate('CollegeOptions')}>
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
