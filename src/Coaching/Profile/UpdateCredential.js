import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import BackHeader from '../../Component/Header/BackHeader';
import RNInputField from '../../Component/RNInputField';
import RNButton from '../../Component/RNButton';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {backendApiUrl} from '../../Config/config';
import {useNavigation} from '@react-navigation/native';
import {loadUser} from '../../redux/action/authActions';
let formData = new FormData();
const UpdateCredential = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [owername, setowername] = useState('');
  const [email, setemail] = useState('');
  const [phoneno1, setphoneno1] = useState('');
  const [phoneno2, setphoneno2] = useState('');
  const [organizationName, setorganizationName] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setpincode] = useState('');
  const [studentpassword, setstudentpassword] = useState('');
  const [parentpassword, setparentpassword] = useState('');
  const [Employeepassword, setEmployeepassword] = useState('');
  const {user} = useSelector(state => state.auth);

  const submit = async () => {
    try {
      setloading(true);
      formData.append('name', owername);
      formData.append('email', email);
      formData.append('institutename', organizationName);
      formData.append('phoneno1', phoneno1);
      formData.append('phoneno2', phoneno2);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('pincode', pincode);
      formData.append('Studentpassword', studentpassword);
      formData.append('Parentpassword', parentpassword);
      formData.append('Employeepassword', Employeepassword);
      formData.append('profileurl', user?.data?.CredentailsData?.profileurl);
      formData.append(
        'certificatelogo',
        user?.data?.CredentailsData?.certificatelogo,
      );
      formData.append('logourl', user?.data?.CredentailsData?.logourl);

      let token = await AsyncStorage.getItem('erptoken');

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      };

      const {data} = await axios.put(
        `${backendApiUrl}comman/credentials`,
        formData,
        config,
      );

      console.log("'data", data);

      if (data?.status) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: data?.msg,
        });
        navigation.goBack();
        dispatch(loadUser());
        formData = new FormData();
      }

      if (data?.status === false) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: data?.msg,
        });

        formData = new FormData();
      }
    } catch (error) {
      formData = new FormData();
    }
  };
  useEffect(() => {
    if (user) {
      setowername(user?.data?.CredentailsData?.name);
      setemail(user?.data?.CredentailsData?.email);
      setaddress(user?.data?.CredentailsData?.address);
      setcity(user?.data?.CredentailsData?.city);
      setorganizationName(user?.data?.CredentailsData?.institutename);
      setpincode(user?.data?.CredentailsData?.pincode);
      setstate(user?.data?.CredentailsData?.state);
      setphoneno1(user?.data?.CredentailsData?.phoneno1);
      setphoneno2(user?.data?.CredentailsData?.phoneno1);

      setstudentpassword(user?.data?.CredentailsData?.Studentpassword);
      setparentpassword(user?.data?.CredentailsData?.Parentpassword);
      setEmployeepassword(user?.data?.CredentailsData?.Employeepassword);
    }
  }, []);

  useEffect(() => {
    formData = new FormData();
  }, []);

  return (
    <View>
      <BackHeader title={'Edit Profile'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.flexViewWrap}>
            <View style={{width: '100%'}}>
              <RNInputField
                label="Student Default Password"
                placeholder="Enter Student Default Password"
                value={studentpassword}
                onChangeText={data => setstudentpassword(data)}
              />
            </View>
          </View>
          <View style={styles.flexViewWrap}>
            <View style={{width: '100%'}}>
              <RNInputField
                label="Parent Default Password"
                placeholder="Enter Parent Default Password"
                value={parentpassword}
                onChangeText={data => setparentpassword(data)}
              />
            </View>
          </View>
          <View style={styles.flexViewWrap}>
            <View style={{width: '100%'}}>
              <RNInputField
                label="Employee Default Password"
                placeholder="Enter Employee Default Password"
                value={Employeepassword}
                onChangeText={data => setEmployeepassword(data)}
              />
            </View>
          </View>

          <RNButton
            loading={loading}
            style={{paddingHorizontal: 25}}
            onPress={() => {
              submit();
            }}>
            Update $ Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateCredential;

const styles = StyleSheet.create({
  flexViewWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  enquirymainview: {
    paddingHorizontal: 2,
    height: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
