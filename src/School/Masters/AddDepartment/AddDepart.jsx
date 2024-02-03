import {StyleSheet, View, ScrollView, Text} from 'react-native';
import React, {useState} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {useDispatch} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {getDepartment} from '../../../redux/action/commanAction';
const AddDepart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [DepartName, setDepartName] = useState('');
  const [loading, setloading] = useState(false);

  const submit = () => {
    setloading(true);

    const data = {
      DepartmentName: DepartName,
    };
    serverInstance('comman/department', 'post', data).then(res => {
      if (res?.status) {
        setloading(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        dispatch(getDepartment());
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

  return (
    <View>
      <BackHeader title={'Add Department'} />
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
                label="Department"
                value={DepartName}
                onChangeText={data => setDepartName(data)}
                placeholder="Enter Department"
              />
            </View>
          </View>

          <RNButton
            loading={loading}
            onPress={submit}
            style={{marginHorizontal: 20, marginTop: 10}}>
            Save & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddDepart;

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
