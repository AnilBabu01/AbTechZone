import {StyleSheet, View, ScrollView, Text} from 'react-native';
import React, {useState} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {getVisitor} from '../../../redux/action/commanAction';
import {useDispatch} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import RNDatePicker from '../../../Component/RNDatePicker';
import {
  handleDate,
  getTodaysDate,
  handleTime,
  getCurrentTime,
} from '../../../utils/functions';
import {Colors, primary} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import BackHeader from '../../../Component/Header/BackHeader';
import RNTimePicker from '../../../Component/RNTimePicker';

const AddVisitor = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loader, setloader] = useState(false);
  const [VehicleNo, setVehicleNo] = useState('');
  const [visitTime, setvisitTime] = useState(getCurrentTime());
  const [enquirydate, setenquirydate] = useState(getTodaysDate());
  const [studentname, setstudentname] = useState('');
  const [studentPhone, setstudentPhone] = useState('');
  const [address, setaddress] = useState('');
  const [comment, setcomment] = useState('');

  const submit = () => {
    if (enquirydate) {
      setloader(true);

      const data = {
        VisitDate: moment(enquirydate, 'YYYY-MM-DD'),
        VisitorName: studentname,
        VisitorMobile: studentPhone,
        VisitTime: visitTime,
        Address: address,
        comment: comment,
        VehicleNo: VehicleNo,
      };

      serverInstance('comman/visitor', 'post', data).then(res => {
        if (res?.status) {
          setloader(false);

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
          dispatch(getVisitor('', '', ''));
          navigation.goBack();
        }

        if (res?.status === false) {
          setloader(false);

          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res?.msg,
          });
        }
      });
    } else {
      setloader(false);
    }
  };

  return (
    <View>
      <BackHeader title={'Add Visitor'} />
      <ScrollView>
        <View style={styles.dateview}>
          <FlexRowWrapper>
            <View style={{width: '45%'}}>
              <RNDatePicker
                title="Date In"
                value={enquirydate}
                onDateChange={date => setenquirydate(handleDate(date))}
              />
            </View>
            <View style={{width: '45%'}}>
              <RNTimePicker
                title="Time In"
                value={visitTime}
                onDateChange={date => setvisitTime(handleTime(date))}
              />
            </View>
          </FlexRowWrapper>
          <FlexRowWrapper>
            <View style={{width: '45%'}}>
              <RNInputField
                label="Visitor Name"
                placeholder="Enter Name"
                value={studentname}
                onChangeText={data => setstudentname(data)}
              />
            </View>
            <View style={{width: '45%'}}>
              <RNInputField
                label="Visitor Mobile"
                placeholder="Enter Visitor Mobile"
                value={studentPhone}
                onChangeText={data => setstudentPhone(data)}
                keyboardType="number-pad"
              />
            </View>
          </FlexRowWrapper>
          <FlexRowWrapper>
            <View style={{width: '45%'}}>
              <RNInputField
                label="Address"
                placeholder="Enter Address"
                value={address}
                onChangeText={data => setaddress(data)}
              />
            </View>
            <View style={{width: '45%'}}>
              <RNInputField
                label="Vehicle No"
                placeholder="Enter Vehicle No"
                value={VehicleNo}
                onChangeText={data => setVehicleNo(data)}
              />
            </View>
          </FlexRowWrapper>

          <View
            style={{
              marginHorizontal: deviceWidth * 0.04,
              position: 'relative',
            }}>
            <Text
              style={{
                textAlign: 'right',
                fontWeight: '800',
                position: 'absolute',
                right: deviceWidth * 0.05,
              }}>
              {comment.length} / 500
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

          <View style={{marginBottom: deviceHeight * 0.08}}>
            <RNButton
              loading={loader}
              onPress={submit}
              style={{marginHorizontal: 20, marginTop: 20}}>
              Save & Next
            </RNButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddVisitor;

const styles = StyleSheet.create({
  enquirymainview: {
    paddingTop: deviceHeight * 0.01,
  },
  dropstyle: {
    alignSelf: 'center',
    width: Width(170),
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(20),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.lightGrey,
    color: Colors.black,
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
});
