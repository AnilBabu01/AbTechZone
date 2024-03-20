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
const UpdateInstitute = () => {
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
            <View style={{width: '49%'}}>
              <RNInputField
                label="Owner Name"
                placeholder="Enter Owner Name"
                value={owername}
                onChangeText={data => setowername(data)}
              />
            </View>
            <View style={{width: '49%'}}>
              <RNInputField
                label="Official Email"
                placeholder="Enter Official Email"
                value={email}
                onChangeText={data => setemail(data)}
              />
            </View>
          </View>

          <View style={styles.flexViewWrap}>
            <View style={{width: '49%'}}>
              <RNInputField
                label="Institute Name"
                placeholder="Enter Institute Name"
                value={organizationName}
                onChangeText={data => setorganizationName(data)}
              />
            </View>
            <View style={{width: '49%'}}>
              <RNInputField
                label="Phone No1"
                placeholder="Enter Phone No1"
                value={phoneno1}
                onChangeText={data => setphoneno1(data)}
              />
            </View>
          </View>

          <View style={styles.flexViewWrap}>
            <View style={{width: '49%'}}>
              <RNInputField
                label="Phone No2"
                placeholder="Enter Phone No1"
                value={phoneno2}
                onChangeText={data => phoneno2(data)}
              />
            </View>
            <View style={{width: '49%'}}>
              <RNInputField
                label="City"
                placeholder="Enter City"
                value={city}
                onChangeText={data => setcity(data)}
              />
            </View>
          </View>
          <View style={styles.flexViewWrap}>
            <View style={{width: '100%'}}>
              <RNInputField
                label="Address"
                placeholder="Enter Address"
                value={address}
                onChangeText={data => setaddress(data)}
              />
            </View>
          </View>
          <View style={styles.flexViewWrap}>
            <View style={{width: '49%'}}>
              <RNInputField
                label="State"
                placeholder="Enter State"
                value={state}
                onChangeText={data => setstate(data)}
              />
            </View>
            <View style={{width: '49%'}}>
              <RNInputField
                label="Pin Code"
                placeholder="Enter Pin Code"
                value={pincode}
                onChangeText={data => setpincode(data)}
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

export default UpdateInstitute;

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
