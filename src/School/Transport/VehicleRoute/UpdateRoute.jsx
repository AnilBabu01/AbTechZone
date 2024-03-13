import {StyleSheet, View, ScrollView, Text, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {useDispatch} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import {Colors} from '../../../utils/Colors';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {primary} from '../../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {GetRoute} from '../../../redux/action/transportActions';
const UpdateRoute = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [isdata, setisdata] = useState('');
  const [loader, setloader] = useState(false);
  const [fromroute, setfromroute] = useState('');
  const [toroute, settoroute] = useState('');
  const [permonthRent, setpermonthRent] = useState('');

  const [stop, setstop] = useState([
    {
      StopName: '',
      StopStatus: true,
    },
  ]);

  function addQuestionItem() {
    setstop([
      ...stop,
      {
        StopName: '',
        StopStatus: true,
      },
    ]);
  }

  function removeQuestionItem(item) {
    setstop(stop.filter(stop => stop !== item));
  }

  function handleQuestionItemUpdate(originalDonationItem, key, value) {
    setstop(
      stop.map(stop =>
        stop === originalDonationItem
          ? {
              ...stop,
              [key]: value,
            }
          : stop,
      ),
    );
  }

  const submit = () => {
    setloader(true);

    const data = {
      id: isdata?.routeName?.id,
      FromRoute: fromroute,
      ToRoute: toroute,
      BusRentPermonth: permonthRent,
      stopslist: stop,
    };
    serverInstance('transport/vehicleroute', 'put', data).then(res => {
      if (res?.status) {
        setloader(false);

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        dispatch(GetRoute());
        navigation.goBack();
      }

      if (res?.status === false) {
        setloader(false);

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
        dispatch(GetRoute());
      }
    });
  };

  useEffect(() => {
    if (route.params?.data) {
      setisdata(route.params?.data);
      setfromroute(route.params?.data?.routeName?.FromRoute);
      settoroute(route.params?.data?.routeName?.ToRoute);
      setpermonthRent(
        route.params?.data?.routeName?.BusRentPermonth?.toString(),
      );
      setstop(route.params?.data?.StopName);
    }
  }, []);

  return (
    <View>
      <BackHeader title={'Update Route'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="From Route"
                  placeholder="Enter From Route"
                  value={fromroute}
                  onChangeText={data => setfromroute(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="To Route"
                  placeholder="Enter To Route"
                  value={toroute}
                  onChangeText={data => settoroute(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNInputField
                  label="Per Month Fee"
                  placeholder="Enter Per Month Fee"
                  value={permonthRent}
                  onChangeText={data => setpermonthRent(data)}
                />
              </View>
            </FlexRowWrapper>
          </View>

          <View style={styles.titleview}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', marginRight: 10}}>Stop Name</Text>
              <Pressable>
                <Ionicons
                  name="add-circle-outline"
                  color={Colors.white}
                  size={25}
                  onPress={() => addQuestionItem()}
                />
              </Pressable>
            </View>

            <Text style={{color: 'white'}}>Action</Text>
          </View>
          {stop &&
            stop.map((item, index) => {
              return (
                <View key={index} style={styles.Sdataview}>
                  <FlexRowWrapper>
                    <View style={{width: '45%'}}>
                      <RNInputField
                        label="Stop Name"
                        placeholder="Enter Stop Name"
                        value={item.StopName}
                        onChangeText={data =>
                          handleQuestionItemUpdate(item, 'StopName', data)
                        }
                      />
                    </View>
                    <View
                      style={{
                        width: '45%',
                        display: 'flex',
                        flexDirection: 'row-reverse',
                      }}>
                      {index > 0 && (
                        <Pressable>
                          <Ionicons
                            name="remove-outline"
                            color={Colors.black}
                            size={25}
                            onPress={() => removeQuestionItem(item)}
                          />
                        </Pressable>
                      )}
                    </View>
                  </FlexRowWrapper>
                </View>
              );
            })}

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

export default UpdateRoute;

const styles = StyleSheet.create({
  titleview: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
