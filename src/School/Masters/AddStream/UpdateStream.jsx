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
import {GetClassSubject} from '../../../redux/action/commanAction';
import RNBDropDown from '../../../Component/RNBDropDown';
const Streamlist = [
  {label: 'Arts', value: 'Arts'},
  {label: 'COMMERCE', value: 'COMMERCE'},
  {label: 'SCIENCE', value: 'SCIENCE'},
];

const UpdateStream = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isdata, setisdata] = useState('');
  const [Streanname, setStreanname] = useState('');
  const [studentClassName, setstudentClassName] = useState('');
  const [SubjectName, setSubjectName] = useState('');
  const [courselist, setcourselist] = useState([]);
  const {course} = useSelector(state => state.getcourse);
  const [loading, setloading] = useState(false);

  const submit = () => {
    setloading(true);
    const data = {
      id: isdata?.id,
      Stream: Streanname,
      Subject: SubjectName,
      courses: studentClassName,
    };
    serverInstance('comman/stream', 'put', data).then(res => {
      if (res?.status) {
        setloading(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });

        dispatch(GetClassSubject());
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
      setstudentClassName(route.params?.data?.Class);
      setSubjectName(route.params?.data?.Subject);
      setStreanname(route.params?.data?.Stream);
    }
  }, []);

  useEffect(() => {
    if (course) {
      setcourselist(course);
    }
  }, [course]);

  return (
    <View>
      <BackHeader title={'Update Stream'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <FlexRowWrapper>
            <View style={{width: '95%'}}>
              <RNBDropDown
                label="Stream"
                value={Streanname}
                OptionsList={Streamlist}
                onChange={data => setStreanname(data.value)}
              />
            </View>
          </FlexRowWrapper>

          <FlexRowWrapper>
            <View style={{width: '95%'}}>
              <RNBDropDown
                label="Stream"
                value={Streanname}
                OptionsList={Streamlist}
                onChange={data => setStreanname(data.value)}
              />
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
                label="Subject Name"
                value={SubjectName}
                onChangeText={data => setSubjectName(data)}
                placeholder="Enter Subject Name"
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

export default UpdateStream;

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
