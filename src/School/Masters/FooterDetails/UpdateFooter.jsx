import {StyleSheet, View, ScrollView, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {useDispatch} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {GetFooterDetails} from '../../../redux/action/commanAction';
const UpdateFooter = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isdata, setisdata] = useState('');
  const [facebookurl, setfacebookurl] = useState('');
  const [instagramurl, setinstagramurl] = useState('');
  const [twiterurl, settwiterurl] = useState('');
  const [linkedinurl, setlinkedinurl] = useState('');
  const [PrincipalNo, setPrincipalNo] = useState('');
  const [Chairman, setChairman] = useState('');
  const [Email, setEmail] = useState('');
  const [MapURL, setMapURL] = useState('');
  const [Facilities, setFacilities] = useState('');
  const [loading, setloading] = useState(false);

  const submit = () => {
    setloading(true);
    const data = {
      id: isdata?.id,
      facilitycontent: Facilities,
      facebookurl: facebookurl,
      instagramurl: instagramurl,
      twiterurl: twiterurl,
      linkldlurl: linkedinurl,
      ChairmanContactNo: Chairman,
      PrincipalContactNo: PrincipalNo,
      Email: Email,
      Mapurl: MapURL,
    };
    serverInstance('comman/footer', 'put', data).then(res => {
      if (res?.status) {
        setloading(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });

        dispatch(GetFooterDetails());
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
      setEmail(route.params?.data?.Email);
      setChairman(route.params?.data?.ChairmanContactNo);
      setPrincipalNo(route.params?.data?.PrincipalContactNo);
      setfacebookurl(route.params?.data?.facebookurl);
      setinstagramurl(route.params?.data?.instagramurl);
      setlinkedinurl(route.params?.data?.linkldlurl);
      setMapURL(route.params?.data?.Mapurl);
      setFacilities(route.params?.data?.facilitycontent);
      settwiterurl(route.params?.data?.twiterurl);
    }
  }, []);

  return (
    <View>
      <BackHeader title={'Update Footer'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View
            style={{
              marginHorizontal: deviceWidth * 0.04,
              position: 'relative',
              marginTop: 15,
            }}>
            <RNInputField
              style={{backgroundColor: Colors.fadeGray}}
              label="Facebook Url"
              value={facebookurl}
              onChangeText={data => setfacebookurl(data)}
              placeholder="Enter Facebook Url"
            />
          </View>
          <View
            style={{
              marginHorizontal: deviceWidth * 0.04,
              position: 'relative',
              marginTop: 15,
            }}>
            <RNInputField
              style={{backgroundColor: Colors.fadeGray}}
              label="Instagram URL"
              value={instagramurl}
              onChangeText={data => setinstagramurl(data)}
              placeholder="Enter Instagram URL"
            />
          </View>
          <View
            style={{
              marginHorizontal: deviceWidth * 0.04,
              position: 'relative',
              marginTop: 15,
            }}>
            <RNInputField
              style={{backgroundColor: Colors.fadeGray}}
              label="Twitter URL"
              value={twiterurl}
              onChangeText={data => settwiterurl(data)}
              placeholder="Enter Twitter URL"
            />
          </View>
          <View
            style={{
              marginHorizontal: deviceWidth * 0.04,
              position: 'relative',
              marginTop: 15,
            }}>
            <RNInputField
              style={{backgroundColor: Colors.fadeGray}}
              label="linkedin URL"
              value={linkedinurl}
              onChangeText={data => setlinkedinurl(data)}
              placeholder="Enter linkedin URL"
            />
          </View>
          <View
            style={{
              marginHorizontal: deviceWidth * 0.04,
              position: 'relative',
              marginTop: 15,
            }}>
            <RNInputField
              style={{backgroundColor: Colors.fadeGray}}
              label="Principal Contact No"
              value={PrincipalNo}
              onChangeText={data => setPrincipalNo(data)}
              placeholder="Enter Contact No"
            />
          </View>
          <View
            style={{
              marginHorizontal: deviceWidth * 0.04,
              position: 'relative',
              marginTop: 15,
            }}>
            <RNInputField
              style={{backgroundColor: Colors.fadeGray}}
              label="Chairman Contact No"
              value={Chairman}
              onChangeText={data => setChairman(data)}
              placeholder="Enter Contact No"
            />
          </View>
          <View
            style={{
              marginHorizontal: deviceWidth * 0.04,
              position: 'relative',
              marginTop: 15,
            }}>
            <RNInputField
              style={{backgroundColor: Colors.fadeGray}}
              label="Email"
              value={Email}
              onChangeText={data => setEmail(data)}
              placeholder="Enter Email"
            />
          </View>
          <View
            style={{
              marginHorizontal: deviceWidth * 0.04,
              position: 'relative',
              marginTop: 15,
            }}>
            <RNInputField
              style={{backgroundColor: Colors.fadeGray}}
              label="Map URL"
              value={MapURL}
              onChangeText={data => setMapURL(data)}
              placeholder="Enter Map URL"
            />
          </View>
          <View
            style={{
              marginHorizontal: deviceWidth * 0.04,
              position: 'relative',
              marginTop: 15,
            }}>
            <RNInputField
              style={{backgroundColor: Colors.fadeGray, paddingTop: 10}}
              label="Facility Content"
              value={Facilities}
              onChangeText={data => setFacilities(data)}
              placeholder="Enter Facilities"
              multiline
              numberOfLines={5}
              maxLength={500}
            />
          </View>

          <RNButton
            loading={loading}
            onPress={submit}
            style={{marginHorizontal: 20, marginTop: 10, marginBottom: 80}}>
            Update & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateFooter;

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
