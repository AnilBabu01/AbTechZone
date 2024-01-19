import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardEnquiry from './Card';
import {primary, Colors} from '../../../utils/Colors';
import {AnimatedFAB} from 'react-native-paper';
import {
  getcourse,
  getbatch,
  getstudent,
  getfee,
  getcategory,
  GetSession,
  GetSection,
  getcurrentsession,
} from '../../../redux/action/commanAction';
import {
  GetHostel,
  GetFacility,
  GetCategory,
} from '../../../redux/action/hostelActions';
import {GetRoute} from '../../../redux/action/transportActions';
import {useDispatch} from 'react-redux';
const Admission = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getcourse());
    dispatch(getbatch());
    dispatch(getstudent());
    dispatch(getfee());
    dispatch(getcategory());
    dispatch(GetSession());
    dispatch(GetSection());
    dispatch(getcurrentsession());
    dispatch(GetHostel());
    dispatch(GetFacility());
    dispatch(GetCategory());
    dispatch(GetRoute());
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SearchEnquirySchool')}>
        <View style={styles.inputview}>
          <View style={styles.inputsaerch}>
            <Text style={styles.searchtext}>Search here</Text>
          </View>
          <Ionicons
            name="search-outline"
            size={Height(22)}
            style={{marginRight: Width(20)}}
            color="rgba(0, 0, 0, 0.5)"
          />
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.enquirymainview}>
          <CardEnquiry />
        </View>
      </ScrollView>

      <AnimatedFAB
        icon={'plus'}
        onPress={() => navigation.navigate('TakeAdmissionSchool')}
        label="Add"
        extended={false}
        color={Colors.white}
        style={styles.fabStyle}
      />
    </View>
  );
};

export default Admission;

const styles = StyleSheet.create({
  dateview: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  inputview: {
    width: Width(360),
    height: Height(50),
    backgroundColor: '#E9EAEC',
    alignSelf: 'center',
    borderRadius: Width(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Height(10),
  },
  inputsaerch: {
    paddingLeft: Width(30),
    fontFamily: 'Gilroy-SemiBold',
    color: 'black',
    fontSize: Height(16),
    width: Width(260),
  },
  enquirymainview: {
    paddingHorizontal: 10,
  },

  searchtext: {
    fontSize: 20,
  },

  cancalView: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  baseinput: {
    width: Width(310),
    height: Height(45),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Width(10),
    // borderColor: index === 3 ? primary: '#a9a9a9',
    marginTop: Height(10),
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    backgroundColor: primary,
  },
});
