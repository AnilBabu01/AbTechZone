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
import {GetNotic} from '../../../redux/action/commanAction';
const statuslist = [
  {label: 'Enable', value: 'Enable'},
  {label: 'disabled', value: 'disabled'},
];
const UpdateNotice = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isdata, setisdata] = useState('');
  const [Notestext, setNotestext] = useState('');
  const [loading, setloading] = useState(false);

  const submit = () => {
    setloading(true);
    const data = {
      id: isdata?.id,
      Notestext: Notestext,
    };
    serverInstance('comman/notes', 'put', data).then(res => {
      if (res?.status) {
        setloading(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });

        dispatch(GetNotic());
        navigation.goBack();
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
      setisdata(route.params.data);

      setNotestext(route.params?.data?.Notestext);
    }
  }, []);

  return (
    <View>
      <BackHeader title={'Update Notice'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <View
              style={{
                marginHorizontal: deviceWidth * 0.04,
                position: 'relative',
                marginTop: 30,
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Notice"
                value={Notestext}
                onChangeText={data => setNotestext(data)}
                placeholder="Enter Notice"
              />
            </View>
          </View>
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

export default UpdateNotice;

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
