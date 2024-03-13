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
import {GetVehiclelist} from '../../../redux/action/transportActions';
const AddNewBus = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [routeId, setrouteId] = useState('');
  const [driverid1, setdriverid1] = useState('');
  const [helperid1, sethelperid1] = useState('');
  const [driverid2, setdriverid2] = useState('');
  const [helperid2, sethelperid2] = useState('');
  const [BusNumber, setBusNumber] = useState('');
  const [sheets, setsheets] = useState('');
  const [FualType, setFualType] = useState('');
  const [Color, setColor] = useState('');
  const [vehicletypename, setvehicletypename] = useState('');
  const [GPSDeviceURL, setGPSDeviceURL] = useState('');
  const [loading, setloading] = useState(false);
  const [routelist, setroutelist] = useState([]);
  const [vehiclelist, setvehiclelist] = useState([]);
  const [emplist, setemplist] = useState([]);
  const {route} = useSelector(state => state.GetRoute);
  const {vehicletype} = useSelector(state => state.GetVehicleType);
  const {employees} = useSelector(state => state.getemp);

  const submit = () => {
    setloading(true);

    const data = {
      routeId: routeId,
      Vahicletype: vehicletypename,
      BusNumber: BusNumber,
      FualType: FualType,
      Color: Color,
      GPSDeviceURL: GPSDeviceURL,
      NoOfSheets: sheets,
      DriverId1: driverid1,
      DriverId2: driverid2,
      HelferId1: helperid1,
      HelferId2: helperid2,
    };
    serverInstance('transport/vehicledetails', 'post', data).then(res => {
      if (res?.status) {
        setloading(false);

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        dispatch(GetVehiclelist());
        navigation.goBack();
      }

      if (res?.status === false) {
        setloading(false);

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
        dispatch(GetVehiclelist());
      }
    });
  };

  useEffect(() => {
    if (route) {
      setroutelist(route);
    }
    if (vehicletype) {
      setvehiclelist(vehicletype);
    }
    if (employees) {
      setemplist(employees);
    }
  }, [route, vehicletype, employees]);

  return (
    <View>
      <BackHeader title={'Add Vehicle'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Vehicle Type
                  </Text>
                  <Dropdown
                    style={styles.dropstyle10}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      vehiclelist &&
                      vehiclelist?.map(item => ({
                        label: `${item?.Vahicletype}`,
                        value: `${item?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={vehicletypename}
                    onChange={item => {
                      setvehicletypename(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Routes
                  </Text>
                  <Dropdown
                    style={styles.dropstyle10}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      routelist &&
                      routelist?.map(item => ({
                        label: `${item?.routeName?.FromRoute} To ${item?.routeName?.ToRoute}`,
                        value: `${item?.routeName?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={routeId}
                    onChange={item => {
                      setrouteId(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Driver No 1
                  </Text>
                  <Dropdown
                    style={styles.dropstyle10}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      emplist &&
                      emplist?.map(item => ({
                        label: ` ${item?.name}(${item?.empId} ${item?.employeeof}`,
                        value: `${item?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={driverid1}
                    onChange={item => {
                      setdriverid1(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Helper No 1
                  </Text>
                  <Dropdown
                    style={styles.dropstyle10}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      emplist &&
                      emplist?.map(item => ({
                        label: ` ${item?.name}(${item?.empId} ${item?.employeeof}`,
                        value: `${item?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={helperid1}
                    onChange={item => {
                      sethelperid1(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Driver No 2
                  </Text>
                  <Dropdown
                    style={styles.dropstyle10}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      emplist &&
                      emplist?.map(item => ({
                        label: ` ${item?.name}(${item?.empId} ${item?.employeeof}`,
                        value: `${item?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={driverid2}
                    onChange={item => {
                      setdriverid2(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Helper No 2
                  </Text>
                  <Dropdown
                    style={styles.dropstyle10}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      emplist &&
                      emplist?.map(item => ({
                        label: ` ${item?.name}(${item?.empId} ${item?.employeeof}`,
                        value: `${item?.id}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={helperid2}
                    onChange={item => {
                      sethelperid2(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Vehicle No"
                  placeholder="Enter Vehicle No"
                  value={BusNumber}
                  onChangeText={data => setBusNumber(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Fuel Type"
                  placeholder="Enter Fuel Type"
                  value={FualType}
                  onChangeText={data => setFualType(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Color"
                  placeholder="Enter Color"
                  value={Color}
                  onChangeText={data => setColor(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="No Of Sheets"
                  placeholder="Enter No Of Sheets"
                  value={sheets}
                  onChangeText={data => setsheets(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNInputField
                  label="Vehicle GPS Url"
                  placeholder="Enter Vehicle GPS Url"
                  value={GPSDeviceURL}
                  onChangeText={data => setGPSDeviceURL(data)}
                />
              </View>
            </FlexRowWrapper>
          </View>

          <RNButton
            loading={loading}
            onPress={submit}
            style={{marginHorizontal: 20, marginBottom: 60}}>
            Save & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddNewBus;

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

  dropstyle10: {
    alignSelf: 'center',
    width: Width(340),
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
