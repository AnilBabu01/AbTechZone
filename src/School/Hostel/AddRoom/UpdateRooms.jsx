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
import {GetRoom} from '../../../redux/action/hostelActions';
import RNBDropDown from '../../../Component/RNBDropDown';
const UpdateRooms = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isdata, setisdata] = useState('');
  const [loader, setloader] = useState(false);
  const [Facilitys, setFacilitys] = useState([]);
  const [Categorys, setCategorys] = useState([]);
  const [hostels, sethostels] = useState([]);

  const [hostelId, sethostelId] = useState('');
  const [CategoryId, setCategoryId] = useState('');
  const [FacilityId, setFacilityId] = useState('');
  const [Facilityname, setFacilityname] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [hostelname, sethostelname] = useState('');
  const [fromroom, setfromroom] = useState('');
  const [toroom, settoroom] = useState('');
  const [amountpermonth, setamountpermonth] = useState('');
  const {roomfacility} = useSelector(state => state.GetFacility);
  const {roomcategory} = useSelector(state => state.GetCategory);
  const {hostel} = useSelector(state => state.GetHostel);

  const submit = () => {
    setloader(true);
    const data = {
      id: isdata?.id,
      HostelName: hostelname,
      Category: categoryname,
      Facility: Facilityname,
      hostelId: hostelId,
      CategoryId: CategoryId,
      FacilityId: FacilityId,
      FromRoom: fromroom,
      ToRoom: toroom,
      PermonthFee: amountpermonth,
    };
    serverInstance('hostel/addroom', 'put', data).then(res => {
      if (res?.status) {
        setloader(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        dispatch(GetRoom());
        navigation.goBack();
      }

      if (res?.status === false) {
        setloader(false);
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
      setisdata(route.params?.data);
      console.log('type erroe is', route.params?.data);
      sethostelId(route.params?.data?.hostelId?.toString());
      setCategoryId(route.params?.data?.CategoryId?.toString());
      setFacilityId(route.params?.data?.FacilityId?.toString());

      setFacilityname(route.params?.data?.Facility);
      sethostelname(route.params?.data?.hostelname);
      setcategoryname(route.params?.data?.Category);

      setfromroom(route.params?.data?.FromRoom?.toString());
      settoroom(route.params?.data?.ToRoom?.toString());
      // setcomment(route.params?.data?.comment);
      setamountpermonth(route.params?.data?.PermonthFee?.toString());
    }
  }, []);

  useEffect(() => {
    if (roomcategory) {
      setCategorys(roomcategory);
    }
    if (roomfacility) {
      setFacilitys(roomfacility);
    }
    if (hostel) {
      sethostels(hostel);
    }
  }, [roomcategory, roomfacility, hostel]);
  return (
    <View>
      <BackHeader title={'Update Room'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
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
                  label="Hostel Category"
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

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNBDropDown
                  label="Hostel Facility"
                  value={Facilityname}
                  OptionsList={
                    Facilitys &&
                    Facilitys?.map(item => ({
                      label: `${item?.roomFacility}`,
                      value: `${item?.id}`,
                    }))
                  }
                  onChange={item => {
                    setFacilityname(item.label);
                    setFacilityId(item.value);
                  }}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="From Range"
                  placeholder="Enter From Range"
                  value={fromroom}
                  onChangeText={data => setfromroom(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="To Range"
                  placeholder="Enter To Range"
                  value={toroom}
                  onChangeText={data => settoroom(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Fee Per Month"
                  placeholder="Enter Fee"
                  value={amountpermonth}
                  onChangeText={data => setamountpermonth(data)}
                />
              </View>
            </FlexRowWrapper>
          </View>

          <RNButton
            loading={loader}
            onPress={submit}
            style={{marginHorizontal: 20, marginTop: 20}}>
            Update & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateRooms;

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
