import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {primary} from '../../../utils/Colors';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import {AddFee, getfee, getcourse} from '../../../redux/action/commanAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Component/Loader/Loader';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
const AddFees = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const [coursename, setcoursename] = useState('');
  const [permonthfee, setpermonthfee] = useState('');
  const [regfee, setregfee] = useState('');
  const [courselist, setcourselist] = useState('');
  const {course} = useSelector(state => state.getcourse);
  const {fee, error} = useSelector(state => state.addfee);

  const submit = () => {
    let last = coursename?.split(' ').pop();
    var lastIndex = coursename?.lastIndexOf(' ');
    let first = coursename?.substring(0, lastIndex);

    if (regfee && permonthfee && coursename) {
      setloader(true);
      setsms('Adding...');
      const data = {
        Registractionfee: regfee,
        feepermonth: permonthfee,
        coursename: first,
        courseduration: last,
      };
      serverInstance('comman/fee', 'post', data).then(res => {
        if (res?.status) {
          setloader(false);
          setsms('');
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
          dispatch(getfee());
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
          dispatch(getfee());
        }
      });
    } else {
      setsms('');
      setloader(false);
    }
  };

  useEffect(() => {
    if (fee?.status) {
      dispatch(getfee());
      setsms('');
      setloader(false);
    } else {
      setsms('');
      setloader(false);
    }
  }, [fee]);

  useEffect(() => {
    if (error) {
      if (error?.status === false) {
        setloader(false);
        setsms('');
      }
    }
  }, [error]);

  useEffect(() => {
    dispatch(getcourse());
  }, []);

  useEffect(() => {
    if (course) {
      setcourselist(course);
    }
  }, [course]);

  return (
    <View>
      <Loader loader={loader} sms={sms} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            {courselist && (
              <>
                <Dropdown
                  style={{
                    alignSelf: 'center',
                    width: Width(360),
                    height: Height(45),
                    fontFamily: 'Gilroy-SemiBold',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    paddingHorizontal: Width(20),
                    fontSize: Height(16),
                    marginTop: Height(10),
                    borderColor: index === 1 ? primary : '#a9a9a9',
                  }}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={
                    courselist &&
                    courselist?.map(item => ({
                      label: `${item?.coursename}`,
                      value: `${item?.coursename} ${item?.courseduration}`,
                    }))
                  }
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Course"
                  searchPlaceholder="Search..."
                  value={coursename}
                  onChange={item => {
                    setcoursename(item.value);
                  }}
                />
              </>
            )}

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
                placeholder="Enter registration Fee"
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
                onChangeText={text => setregfee(text)}
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
                borderColor: index === 8 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(7)}>
              <TextInput
                placeholder="Enter per month fee"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={permonthfee}
                onChangeText={text => setpermonthfee(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(8)}
              />
            </View>
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

export default AddFees;

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
