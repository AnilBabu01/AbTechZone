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
const UpdateInstitute = () => {
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
              onStartShouldSetResponder={() => setIndex(3)}>
              <TextInput
                placeholder="Owner Name"
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
              onStartShouldSetResponder={() => setIndex(4)}>
              <TextInput
                placeholder="Official Email"
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
              onStartShouldSetResponder={() => setIndex(5)}>
              <TextInput
                placeholder="Institute Name"
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
                width: Width(360),
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
                placeholder="Phone No1"
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
                placeholder="Phone No2"
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
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(7)}
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
                borderColor: index === 7 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(7)}>
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
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(7)}
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
                borderColor: index === 7 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(7)}>
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
                onFocus={() => setIndex(7)}
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
                borderColor: index === 7 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(7)}>
              <TextInput
                placeholder="PinCode"
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
                <Text style={styles.logintextstyle}>Update</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateInstitute;

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
    height: 'auto',
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
