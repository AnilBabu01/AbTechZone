import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {getenquiries} from '../../../redux/action/coachingAction';
import {useDispatch} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import {Colors} from '../../../utils/Colors';
import {deviceHeight} from '../../../utils/constant';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
const SendEmailToStudent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loader, setloader] = useState(false);
  const [subject, setsubject] = useState('');
  const [Sms, setSms] = useState('');

  const submit = () => {
    setloader(true);
    const data = {
      session: '',
      classname: '',
      section: '',
      subject: subject,
      Message: Sms,
    };
    serverInstance('comman/SendemailToStudent', 'post', data).then(res => {
      if (res?.status) {
        setloader(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        dispatch(getenquiries());
        navigation.goBack();
      }

      if (res?.status === false) {
        setloader(false);

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
        dispatch(getenquiries());
      }
    });
  };

  return (
    <View>
      <BackHeader title={'Send Mail'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNInputField
                  label="Subject"
                  placeholder="Enter Subject"
                  value={subject}
                  onChangeText={data => setsubject(data)}
                />
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNInputField
                  style={{backgroundColor: Colors.fadeGray, paddingTop: 10}}
                  label="Student SMS"
                  placeholder="Enter SMS"
                  value={Sms}
                  onChangeText={data => setSms(data)}
                  multiline
                  numberOfLines={5}
                  maxLength={500}
                />
              </View>
            </FlexRowWrapper>
          </View>
          <RNButton
            loading={loader}
            onPress={submit}
            style={{marginHorizontal: 20, marginTop: 20}}>
            Send Email & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default SendEmailToStudent;

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
    backgroundColor: Colors.fadeGray,
    color: 'white',
  },
});
