import {StyleSheet, View, ScrollView, TextInput, Text} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
const AdRooms = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
    serverInstance('hostel/addroom', 'post', data).then(res => {
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
        dispatch(GetRoom());
      }
    });
  };

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
      <BackHeader title={'Add Room'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Hostel Name
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      hostels &&
                      hostels?.map(item => ({
                        label: `${item?.HostelName}`,
                        value: `${item?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={hostelname}
                    onChange={item => {
                      sethostelId(item.value);
                      sethostelname(item.label);
                    }}
                  />
                </View>
              </View>
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Hostel Category
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      Categorys &&
                      Categorys?.map(item => ({
                        label: `${item?.roomCategory}`,
                        value: `${item?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={categoryname}
                    onChange={item => {
                      setcategoryname(item.label);
                      setCategoryId(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Hostel Facility
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      Facilitys &&
                      Facilitys?.map(item => ({
                        label: `${item?.roomFacility}`,
                        value: `${item?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={Facilityname}
                    onChange={item => {
                      setFacilityname(item.label);
                      setFacilityId(item.value);
                    }}
                  />
                </View>
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
            Save & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdRooms;

const styles = StyleSheet.create({
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
