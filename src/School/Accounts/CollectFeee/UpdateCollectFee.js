import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {primary} from '../../../utils/Colors';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Updatebatch, getbatch} from '../../../redux/action/commanAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Component/Loader/Loader';
const data = [
  {label: '01:00 AM', value: '01:00 AM'},
  {label: '02:00 AM', value: '02:00 AM'},
  {label: '03:00 AM', value: '03:00 AM'},
  {label: '04:00 AM', value: '04:00 AM'},
  {label: '05:00 AM', value: '05:00 AM'},
  {label: '06:00 AM', value: '06:00 AM'},
  {label: '07:00 AM', value: '07:00 AM'},
  {label: '08:00 AM', value: '08:00 AM'},
  {label: '09:00 AM', value: '09:00 AM'},
  {label: '10:00 AM', value: '10:00 AM'},
  {label: '11:00 AM', value: '11:00 AM'},
  {label: '12:00 AM', value: '12:00 AM'},
  {label: '01:00 PM', value: '01:00 PM'},
  {label: '02:00 PM', value: '02:00 PM'},
  {label: '03:00 PM', value: '03:00 PM'},
  {label: '04:00 PM', value: '04:00 PM'},
  {label: '05:00 PM', value: '05:00 PM'},
  {label: '06:00 PM', value: '06:00 PM'},
  {label: '07:00 PM', value: '07:00 PM'},
  {label: '08:00 PM', value: '08:00 PM'},
  {label: '09:00 PM', value: '09:00 PM'},
  {label: '10:00 PM', value: '10:00 PM'},
  {label: '11:00 PM', value: '11:00 PM'},
  {label: '12:00 PM', value: '12:00 PM'},
];
const UpdateCollectFee = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [index, setIndex] = useState(0);
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const [endtime, setendtime] = useState('');
  const [starttime, setstarttime] = useState('');
  const [isData, setisData] = useState('');
  const {error, isUpdated} = useSelector(state => state.editbatch);
  const submit = () => {
    if (starttime && endtime) {
      setloader(true);
      setsms('Updating...');
      const data = {
        id: isData?.id,
        StartingTime: starttime,
        EndingTime: endtime,
      };
      dispatch(Updatebatch(data));
    } else {
      setsms('');
      setloader(false);
    }
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(getbatch());
      setsms('');
      setloader(false);
    }
  }, [isUpdated]);
  useEffect(() => {
    if (error) {
      if (error?.status === false) {
        setloader(false);
        setsms('');
      }
    }
  }, [error]);

  useEffect(() => {
    if (route.params?.data) {
      setendtime(route.params?.data?.EndingTime);
      setstarttime(route.params?.data?.StartingTime);
      setisData(route.params?.data);
    }
  }, []);

  return (
    <View>
      <Loader loader={loader} sms={sms} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
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
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Start Time"
              searchPlaceholder="Search..."
              value={starttime}
              onFocus={() => setIndex(1)}
              onChange={item => {
                setstarttime(item.value);
              }}
            />
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
                borderColor: index === 2 ? primary : '#a9a9a9',
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
              placeholder="End Time"
              searchPlaceholder="Search..."
              onFocus={() => setIndex(2)}
              value={endtime}
              onChange={item => {
                setendtime(item.value);
              }}
            />
          </View>

          <View style={styles.loginbtndiv}>
            <TouchableOpacity onPress={() => submit()}>
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

export default UpdateCollectFee;

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
