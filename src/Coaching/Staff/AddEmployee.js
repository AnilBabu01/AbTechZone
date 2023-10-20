import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    ScrollView,
    TextInput,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Height, Width} from '../../utils/responsive';
  import {primary} from '../../utils/Colors';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import DateTimePickerModal from 'react-native-modal-datetime-picker';
  import moment from 'moment';
  import {Dropdown} from 'react-native-element-dropdown';
  const data = [
    {label: 'DCA', value: 'DCA'},
    {label: 'ADCA', value: 'ADCA'},
    {label: 'CCC', value: 'CCC'},
    {label: 'O-LEVEL', value: 'O-LEVEL'},
  ];
  const AddEmployee= () => {
    const [index, setIndex] = useState(0);
    const [fromdate, setfromdate] = useState('');
    const [course, setcourse] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
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
  
    return (
      <View>
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
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
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
                  // value={address}
                  // onChangeText={text => setaddress(text)}
                  // onPressIn={() => setIndex(3)}
                  onFocus={() => setIndex(3)}
                />
              </View>
  
              <View
                style={{
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  borderColor: index === 4 ? primary : '#a9a9a9',
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
                  // value={address}
                  // onChangeText={text => setaddress(text)}
                  // onPressIn={() => setIndex(3)}
                  onFocus={() => setIndex(4)}
                />
              </View>
  
              <View
                style={{
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
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
                  // value={address}
                  // onChangeText={text => setaddress(text)}
                  // onPressIn={() => setIndex(3)}
                  onFocus={() => setIndex(5)}
                />
              </View>
  
              <View
                style={{
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  borderColor: index === 6 ? primary : '#a9a9a9',
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
                  // value={address}
                  // onChangeText={text => setaddress(text)}
                  // onPressIn={() => setIndex(3)}
                  onFocus={() => setIndex(6)}
                />
              </View>
              <Dropdown
                style={{
                  alignSelf: 'center',
                  width: Width(310),
                  height: Height(40),
                  fontFamily: 'Gilroy-SemiBold',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  paddingHorizontal: Width(20),
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
                value={course}
                onChange={item => {
                  setcourse(item.value);
                }}
                // renderLeftIcon={() => (
                //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                // )}
              />
              <View
                style={{
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
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
                  // value={address}
                  // onChangeText={text => setaddress(text)}
                  // onPressIn={() => setIndex(3)}
                  onFocus={() => setIndex(7)}
                />
              </View>
            </View>
  
            <View style={styles.loginbtndiv}>
              <TouchableOpacity onPress={() => setopenModel(true)}>
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
  
  export default AddEmployee;
  
  const styles = StyleSheet.create({
    inputview: {
      width: Width(360),
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
      height: Height(40),
      width: Width(310),
      borderWidth: 1.5,
      // borderColor: index === 7 ? primary : '#a9a9a9',
      alignSelf: 'center',
      borderRadius: Width(10),
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
      width: Width(310),
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
  });
  