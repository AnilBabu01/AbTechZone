import {StyleSheet, View, ScrollView, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {getfee} from '../../../redux/action/commanAction';
import {useSelector} from 'react-redux';
const AddFe = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
      Registractionfee: RegistrationFee,
      feepermonth: PerMonthFee,
      coursename: studentClassName,
      courseduration: courseduration,
    };
    serverInstance('comman/fee', 'post', data).then(res => {
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
    if (course) {
      setcourselist(course);
    }
  }, [course]);

  return (
    <View>
      <BackHeader title={'Add Fee'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Class
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      courselist &&
                      courselist?.map(item => ({
                        label: `${item?.coursename}`,
                        value: `${item?.coursename}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={studentClassName}
                    onChange={item => {
                      setstudentClassName(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>
            <View>
              <View
                style={{
                  marginHorizontal: deviceWidth * 0.04,
                  position: 'relative',
                  marginTop: 30,
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
                  marginTop: 30,
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
            Save & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddFe;

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
