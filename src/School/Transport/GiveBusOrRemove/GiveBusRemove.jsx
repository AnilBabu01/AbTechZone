import {StyleSheet, View, ScrollView, Alert, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {getstudent} from '../../../redux/action/commanAction';
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
import {Switch} from 'react-native-paper';
import RNBDropDown from '../../../Component/RNBDropDown';
const GiveBusRemove = () => {
  const dispatch = useDispatch();
  const NewRoute = useRoute();
  const navigation = useNavigation();
  const [isdata, setisdata] = useState('');
  const [isSwitchOn, setisSwitchOn] = useState(false);
  const [oldbusId, setoldbusId] = useState('');
  const [cfromroute, setcfromroute] = useState('');
  const [ctoroute, setctoroute] = useState('');
  const [cbusnumber, setcbusnumber] = useState('');
  const [routeid, setrouteid] = useState('');
  const [busdata, setbusdata] = useState('');
  const [selectedbus, setselectedbus] = useState('');
  const [routelist, setroutelist] = useState([]);
  const [buslist, setbuslist] = useState([]);
  const [loading1, setloading1] = useState(false);
  const [loader, setloader] = useState(false);
  const {route} = useSelector(state => state.GetRoute);

  const toggleSwitch = () => {
    setisSwitchOn(!isSwitchOn);
  };
  const checkroom = () => {
    try {
      setloading1(true);
      serverInstance('transport/changebus', 'post', {
        studentid: isdata?.id,
        busdetails: busdata,
        cfromroute: isSwitchOn ? '' : selectedbus?.routeDetails?.FromRoute,
        ctoroute: isSwitchOn ? '' : selectedbus?.routeDetails?.ToRoute,
        oldbusId: oldbusId,
        removeBus: isSwitchOn,
      }).then(res => {
        if (res?.status === true) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
          dispatch(getstudent());
          navigation.goBack();
          setloading1(false);
        }
        if (res?.status === false) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res?.msg,
          });
          dispatch(getstudent());
          setloading1(false);

          console.log('erroe', res);
        }
      });
    } catch (error) {
      console.log('checkin', error);
    }
  };

  const confirmation = data => {
    Alert.alert(
      'Delete',
      `Do you really want to ${isSwitchOn ? 'Remove Bus' : 'Give Bus'} Bus?`,
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
    serverInstance('transport/getbusbyrouteid', 'post', {
      routeid: routeid,
    }).then(res => {
      if (res?.status === true) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });

        setbuslist(res?.data);
        setloader(false);
      }
      if (res?.status === false) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });

        setloader(false);
      }
    });
  };

  useEffect(() => {
    if (route) {
      setroutelist(route);
    }
  }, [route]);

  useEffect(() => {
    if (NewRoute.params?.data) {
      setisdata(NewRoute.params?.data);

      setcfromroute(NewRoute.params?.data?.FromRoute);
      setctoroute(NewRoute.params?.data?.ToRoute);
      setcbusnumber(NewRoute.params?.data?.BusNumber);
      setoldbusId(NewRoute.params?.data?.BusNumber);

      console.log('Updated daat is', NewRoute.params?.data?.FromRoute);
    }
  }, []);

  console.log('busdata ffff', busdata);

  return (
    <View>
      <BackHeader title={'Give_Bus_Remove'} />

      <View style={styles.enquirymainview}>
        <View style={styles.dateview}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 10,
              marginBottom: 10,
            }}>
            <Text style={{marginRight: 10}}>Remove Bus On/Off</Text>
            <Switch value={isSwitchOn} onValueChange={toggleSwitch} />
          </View>

          <View style={{paddingLeft: 10}}>
            <Text>Current From Route : {cfromroute}</Text>
            <Text>Current To Route : {ctoroute}</Text>
            <Text>Bus Number : {cbusnumber}</Text>
          </View>
          <FlexRowWrapper>
            <View style={{width: '95%'}}>
              <RNBDropDown
                label="Route"
                value={routeid}
                OptionsList={
                  routelist &&
                  routelist?.map(item => ({
                    label: `${item?.routeName?.FromRoute} TO ${item?.routeName?.ToRoute}`,
                    value: `${item?.routeName?.id}`,
                  }))
                }
                onChange={data => setrouteid(data.value)}
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
          {isSwitchOn ? 'Remove Bus' : 'Give Bus'}
        </RNButton>
      </View>

      <ScrollView>
        <View style={{paddingTop: 10}}>
          <View style={styles.titleview}>
            <Text style={{color: 'white'}}>Bus No</Text>
            <Text style={{color: 'white'}}>Available Sheets</Text>
            <Text style={{color: 'white'}}>Assign</Text>
          </View>
          {buslist &&
            buslist.map((item, index) => {
              return (
                <View key={index} style={styles.Sdataview}>
                  <Text>{item?.bus?.BusNumber}</Text>
                  <Text> {item?.bus?.NoOfSheets}</Text>
                  <Checkbox.Android
                    status={item?.bus === busdata ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setbusdata(item?.bus);

                      setselectedbus(item);
                    }}
                  />
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default GiveBusRemove;

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
