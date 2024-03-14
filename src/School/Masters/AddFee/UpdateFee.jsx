import {StyleSheet, View, ScrollView, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {getfee} from '../../../redux/action/commanAction';
import RNBDropDown from '../../../Component/RNBDropDown';
const UpdateFee = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isdata, setisdata] = useState('');
  const [adminssionfee, setadminssionfee] = useState('');
  const [AnnualFee, setAnnualFee] = useState('');
  const [studentClassName, setstudentClassName] = useState('');
  const [RegistrationFee, setRegistrationFee] = useState('');
  const [courseduration, setcourseduration] = useState('');
  const [PerMonthFee, setPerMonthFee] = useState('');
  const [courselist, setcourselist] = useState([]);
  const [loading, setloading] = useState(false);
  const {course} = useSelector(state => state.getcourse);

  const submit = () => {
    setloading(true);
    const data = {
      id: isdata?.id,
      Registractionfee: RegistrationFee,
      feepermonth: PerMonthFee,
      coursename: studentClassName,
      adminssionfee: adminssionfee,
      AnnualFee: AnnualFee,
      courseduration: courseduration,
    };
    serverInstance('comman/fee', 'put', data).then(res => {
      if (res?.status) {
        setloading(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        dispatch(getfee());
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
      setPerMonthFee(route.params?.data?.feepermonth?.toString());
      setRegistrationFee(route.params?.data?.Registractionfee?.toString());
      setstudentClassName(route.params?.data?.coursename);
      setAnnualFee(route.params?.data?.AnnualFee?.toString());
      setadminssionfee(route.params?.data?.adminssionfee?.toString());
    }
  }, []);

  useEffect(() => {
    if (course) {
      setcourselist(course);
    }
  }, [course]);

  return (
    <View>
      <BackHeader title={'Update Fee'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNBDropDown
                  label="Class"
                  value={studentClassName}
                  OptionsList={
                    courselist &&
                    courselist?.map(item => ({
                      label: `${item?.coursename}`,
                      value: `${item?.coursename}`,
                    }))
                  }
                  onChange={data => setstudentClassName(data.value)}
                />
              </View>
            </FlexRowWrapper>
            <View>
              <View
                style={{
                  marginHorizontal: deviceWidth * 0.04,
                  position: 'relative',
                  // marginTop: 30,
                }}>
                <RNInputField
                  style={{backgroundColor: Colors.fadeGray}}
                  label="Registration Fee"
                  value={RegistrationFee}
                  onChangeText={data => setRegistrationFee(data)}
                  placeholder="Enter Registration Fee"
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  marginHorizontal: deviceWidth * 0.04,
                  position: 'relative',
                  // marginTop: 30,
                }}>
                <RNInputField
                  style={{backgroundColor: Colors.fadeGray}}
                  label="Admission Fee"
                  value={adminssionfee}
                  onChangeText={data => setadminssionfee(data)}
                  placeholder="Enter Admission Fee"
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  marginHorizontal: deviceWidth * 0.04,
                  position: 'relative',
                  // marginTop: 30,
                }}>
                <RNInputField
                  style={{backgroundColor: Colors.fadeGray}}
                  label="Annual Fee"
                  value={AnnualFee}
                  onChangeText={data => setAnnualFee(data)}
                  placeholder="Enter Annual Fee"
                />
              </View>
            </View>

            <View>
              <View
                style={{
                  marginHorizontal: deviceWidth * 0.04,
                  position: 'relative',
                  // marginTop: 30,
                }}>
                <RNInputField
                  style={{backgroundColor: Colors.fadeGray}}
                  label="Per Month Fee"
                  value={PerMonthFee}
                  onChangeText={data => setPerMonthFee(data)}
                  placeholder="Enter Per Month Fee"
                />
              </View>
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

export default UpdateFee;

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
