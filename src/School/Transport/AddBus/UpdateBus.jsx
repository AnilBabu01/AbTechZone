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
import {useNavigation, useRoute} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {GetVehiclelist} from '../../../redux/action/transportActions';
import RNBDropDown from '../../../Component/RNBDropDown';
const UpdateBus = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const RouteParms = useRoute();
  const [isdata, setisdata] = useState('');
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
      id: isdata?.bus?.id,
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
    serverInstance('transport/vehicledetails', 'put', data).then(res => {
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

  useEffect(() => {
    if (RouteParms.params?.data) {
      setisdata(RouteParms.params?.data);
      setColor(RouteParms.params?.data?.bus?.Color);
      setBusNumber(RouteParms.params?.data?.bus?.BusNumber);
      setFualType(RouteParms.params?.data?.bus?.FualType);
      setGPSDeviceURL(RouteParms.params?.data?.bus?.GPSDeviceURL);
      setvehicletypename(RouteParms.params?.data?.bus?.Vahicletype);
      setrouteId(RouteParms.params?.data?.bus?.routeId?.toString());
      setdriverid1(RouteParms.params?.data?.bus?.DriverId1?.toString());
      sethelperid1(RouteParms.params?.data?.bus?.HelferId1?.toString());
      setdriverid2(RouteParms.params?.data?.bus?.DriverId2?.toString());
      sethelperid2(RouteParms.params?.data?.bus?.HelferId2?.toString());
      setsheets(RouteParms.params?.data?.bus?.NoOfSheets?.toString());
    }
  }, []);

  return (
    <View>
      <BackHeader title={'Update Vehicle'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNBDropDown
                  label="Vehicle Type"
                  value={vehicletypename}
                  OptionsList={
                    vehiclelist &&
                    vehiclelist?.map(item => ({
                      label: `${item?.Vahicletype}`,
                      value: `${item?.id}`,
                    }))
                  }
                  onChange={data => setvehicletypename(data.value)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNBDropDown
                  label="Routes"
                  value={routeId}
                  OptionsList={
                    routelist &&
                    routelist?.map(item => ({
                      label: `${item?.routeName?.FromRoute} To ${item?.routeName?.ToRoute}`,
                      value: `${item?.routeName?.id}`,
                    }))
                  }
                  onChange={data => setrouteId(data.value)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNBDropDown
                  label="Driver No 1"
                  value={driverid1}
                  OptionsList={
                    emplist &&
                    emplist?.map(item => ({
                      label: ` ${item?.name}(${item?.empId} ${item?.employeeof}`,
                      value: `${item?.id}`,
                    }))
                  }
                  onChange={data => setdriverid1(data.value)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNBDropDown
                  label="Helper No 1"
                  value={helperid1}
                  OptionsList={
                    emplist &&
                    emplist?.map(item => ({
                      label: ` ${item?.name}(${item?.empId} ${item?.employeeof}`,
                      value: `${item?.id}`,
                    }))
                  }
                  onChange={data => sethelperid1(data.value)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNBDropDown
                  label="Driver No 2"
                  value={driverid2}
                  OptionsList={
                    emplist &&
                    emplist?.map(item => ({
                      label: ` ${item?.name}(${item?.empId} ${item?.employeeof}`,
                      value: `${item?.id}`,
                    }))
                  }
                  onChange={data => setdriverid2(data.value)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNBDropDown
                  label="Helper No 2"
                  value={helperid2}
                  OptionsList={
                    emplist &&
                    emplist?.map(item => ({
                      label: ` ${item?.name}(${item?.empId} ${item?.employeeof}`,
                      value: `${item?.id}`,
                    }))
                  }
                  onChange={data => sethelperid2(data.value)}
                />
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
            Update & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateBus;

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
