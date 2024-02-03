import {StyleSheet, View, ScrollView, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import RNDatePicker from '../../../Component/RNDatePicker';
import {handleDate, getTodaysDate} from '../../../utils/functions';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import moment from 'moment';
const statuslist = [
  {label: 'Enable', value: 'Enable'},
  {label: 'disabled', value: 'disabled'},
];
const Updateholiday = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setdata] = useState('');
  const [status, setstatus] = useState('Enable');
  const [comment, setcomment] = useState('');
  const [Holidaydate, setHolidaydate] = useState(getTodaysDate());
  const [loading, setloading] = useState(false);

  const submit = () => {
    setloading(true);
    const data = {
      id: data?.is,
      holidaydate: moment(Holidaydate, 'YYYY-MM-DD'),
      comment: comment,
      status: status,
    };
    serverInstance('EmployeeAttendance/holidy', 'put', data).then(res => {
      if (res?.status) {
        setloading(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });

        console.log('holidat res is', res);

        // navigation.goBack();
      }

      if (res?.status === false) {
        setloading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
      }
    });
  };

  useEffect(() => {
    if (route.params?.data) {
      setdata(route.params.data);
      const d = new Date(route.params?.data?.attendancedate);
      let newdate = `${d.getDate()}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${d.getFullYear()}`;
      setHolidaydate(newdate);
      setcomment(route.params?.data?.Comment);
    }
  }, []);

  return (
    <View>
      <BackHeader title={'Update Holiday'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNDatePicker
                  title="Enquiry Date"
                  value={Holidaydate}
                  onDateChange={date => setHolidaydate(handleDate(date))}
                />
              </View>
            </FlexRowWrapper>

            <View
              style={{
                marginHorizontal: deviceWidth * 0.04,
                position: 'relative',
                marginTop: 30,
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  fontWeight: '800',
                  position: 'absolute',
                  right: deviceWidth * 0.05,
                }}>
                {comment?.length} / 500
              </Text>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray, paddingTop: 10}}
                label="Comment"
                value={comment}
                onChangeText={data => setcomment(data)}
                placeholder="Enter Comment"
                multiline
                numberOfLines={5}
                maxLength={500}
              />
            </View>
          </View>
          <FlexRowWrapper>
            <View style={{width: '95%'}}>
              <View style={{marginHorizontal: deviceWidth * 0.01}}>
                <Text style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                  Status
                </Text>
                <Dropdown
                  style={styles.dropstyle}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={statuslist}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Enable"
                  searchPlaceholder="Search..."
                  value={status}
                  onChange={item => {
                    setstatus(item.value);
                  }}
                />
              </View>
            </View>
          </FlexRowWrapper>
          <RNButton
            loading={loading}
            onPress={submit}
            style={{marginHorizontal: 20, marginTop: 20}}>
            Update & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default Updateholiday;

const styles = StyleSheet.create({
  enquirymainview: {
    paddingTop: deviceHeight * 0.01,
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
});
