import {StyleSheet, View, ScrollView, Alert, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {GetRoom} from '../../../redux/action/hostelActions';
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
import {primary} from '../../../utils/Colors';
import {Checkbox} from 'react-native-paper';
import RNBDropDown from '../../../Component/RNBDropDown';
const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const [isdata, setisdata] = useState('');
  const [selectedRoom, setselectedRoom] = useState('');
  const [loading1, setloading1] = useState(false);
  const [loader, setloader] = useState(false);
  const [roomlist, setroomlist] = useState([]);
  const [Categorys, setCategorys] = useState([]);
  const [hostels, sethostels] = useState([]);
  const [oldroomdetails, setoldroomdetails] = useState([]);
  const [hostelId, sethostelId] = useState('');
  const [CategoryId, setCategoryId] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [hostelname, sethostelname] = useState('');
  const {roomcategory} = useSelector(state => state.GetCategory);
  const {hostel} = useSelector(state => state.GetHostel);

  const checkroom = () => {
    try {
      setloading1(true);
      serverInstance('hostel/CheckinRoom', 'put', {
        roomdetails: oldroomdetails,
        studentdetails: isdata,
        CheckinId: selectedRoom?.id,
      }).then(res => {
        if (res?.status === true) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });

          setloading1(false);

          navigation.goBack();
        }
        if (res?.status === false) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res?.msg,
          });

          setloading1(false);
          navigation.goBack();
        }
      });
    } catch (error) {
      console.log('checkin', error);
    }
  };

  const confirmation = data => {
    Alert.alert(
      'Delete',
      'Do you really want to Room Shift ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => checkroom(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  const CheckAvailability = () => {
    setloader(true);
    serverInstance('hostel/CheckAvailability', 'post', {
      hostelname: hostelId,
      Category: CategoryId,
    }).then(res => {
      if (res?.status === true) {
        setroomlist(res?.data);
        setloader(false);
      }
    });
  };

  useEffect(() => {
    if (roomcategory) {
      setCategorys(roomcategory);
    }

    if (hostel) {
      sethostels(hostel);
    }
  }, [roomcategory, hostel]);

  useEffect(() => {
    if (route.params?.data) {
      setisdata(route.params?.data);
      serverInstance('hostel/GetCheckingRoom', 'post', {
        hostelname: '',
        Category: '',
        StudentId: route.params?.data?.id,
      }).then(res => {
        if (res?.status === true) {
          setoldroomdetails(res?.data);
        }
      });
    }
  }, []);

  return (
    <View>
      <BackHeader title={'Room Change'} />
      <View style={styles.enquirymainview}>
        <View style={styles.dateview}>
          <View style={{paddingTop: 10}}>
            <View style={styles.titleview}>
              <Text style={{color: 'white'}}>Student_Name</Text>
              <Text style={{color: 'white'}}>Room No</Text>
              <Text style={{color: 'white'}}>Category</Text>
              <Text style={{color: 'white'}}>Facility</Text>
            </View>

            <View style={styles.Sdataview}>
              <Text>{oldroomdetails?.StudentName}</Text>
              <Text>
                {selectedRoom ? selectedRoom?.RoomNo : oldroomdetails?.RoomNo}
              </Text>
              <Text>
                {selectedRoom
                  ? selectedRoom?.Category
                  : oldroomdetails?.Category}
              </Text>
              <Text>
                {selectedRoom
                  ? selectedRoom?.Facility
                  : oldroomdetails?.Facility}
              </Text>
            </View>
          </View>
          <FlexRowWrapper>
            <View style={{width: '45%'}}>
              <RNBDropDown
                label="Hostel Name"
                value={hostelname}
                OptionsList={
                  hostels &&
                  hostels?.map(item => ({
                    label: `${item?.HostelName}`,
                    value: `${item?.id}`,
                  }))
                }
                onChange={item => {
                  sethostelId(item.value);
                  sethostelname(item.label);
                }}
              />
            </View>

            <View style={{width: '45%'}}>
              <RNBDropDown
                label=" Hostel Category"
                value={categoryname}
                OptionsList={
                  Categorys &&
                  Categorys?.map(item => ({
                    label: `${item?.roomCategory}`,
                    value: `${item?.id}`,
                  }))
                }
                onChange={item => {
                  setcategoryname(item.label);
                  setCategoryId(item.value);
                }}
              />
            </View>
          </FlexRowWrapper>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <RNButton
          loading={loader}
          onPress={CheckAvailability}
          style={{marginHorizontal: 20, marginTop: 20}}>
          Check Availability
        </RNButton>

        <RNButton
          loading={loading1}
          onPress={confirmation}
          style={{marginHorizontal: 20, marginTop: 20}}>
          Change
        </RNButton>
      </View>

      <ScrollView>
        <View style={{paddingTop: 10}}>
          <View style={styles.titleview}>
            <Text style={{color: 'white'}}>Booked</Text>
            <Text style={{color: 'white'}}>Room No</Text>
            <Text style={{color: 'white'}}>Category</Text>
            <Text style={{color: 'white'}}>Facility</Text>
          </View>
          {roomlist &&
            roomlist.map((item, index) => {
              return (
                <View key={index} style={styles.Sdataview}>
                  <Checkbox.Android
                    status={item === selectedRoom ? 'checked' : 'unchecked'}
                    onPress={() => setselectedRoom(item)}
                  />

                  <Text>{item?.RoomNo}</Text>
                  <Text> {item?.category_name}</Text>
                  <Text> {item?.facility_name}</Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  Sdataview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: deviceWidth * 0.06,
    paddingVertical: deviceWidth * 0.02,
  },
  titleview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: deviceWidth * 0.06,
    paddingVertical: deviceWidth * 0.02,
    backgroundColor: primary,
  },
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
