import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {primary} from '../../../utils/Colors';
import {useNavigation} from '@react-navigation/native';

const AddCourse = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

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
                borderColor: index === 7 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(7)}>
              <TextInput
                placeholder="Enter Course Name"
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
                placeholder="Duration In Month"
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
            <TouchableOpacity
              onPress={() => navigation.navigate('BatchCoaching')}>
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

export default AddCourse;

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
