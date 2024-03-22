import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {primary, Colors} from '../../../utils/Colors';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {getenquiries} from '../../../redux/action/coachingAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Component/Loader/Loader';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Height, Width} from '../../../utils/responsive';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import profileimg from '../../../assets/profileimg.jpg';
import RNButton from '../../../Component/RNButton';

const PrintCard = ({data}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showinfo, setshowinfo] = useState('');
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const {enquiry, error} = useSelector(state => state.deleteenqury);
  const {user} = useSelector(state => state.auth);

  
  const submit = id => {
    setsms('Deleting...');
    setloader(true);
    serverInstance('coaching/enquiry', 'delete', {
      id: id,
    }).then(res => {
      if (res?.status) {
        setloader(false);
        setsms('');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        dispatch(getenquiries());
      }

      if (res?.status === false) {
        setloader(false);
        setsms('');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
        dispatch(getenquiries());
      }
    });
  };

  useEffect(() => {
    if (enquiry?.status) {
      dispatch(getenquiries());
      setsms('');
      setloader(false);
      setshowinfo(false);
    }
  }, [enquiry]);

  useEffect(() => {
    if (error) {
      if (error?.status === false) {
        setloader(false);
        setsms('');
      }
    }
  }, [error]);

  return (
    <View>
      <Loader loader={loader} sms={sms} />
      <ScrollView>
        <View style={styles.connainer}>
          <View style={styles.card10}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              Session : {data?.Session}
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              File No : {data?.fileNo}
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              TC No : {data?.TcNo}
            </Text>

            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              Class : {data?.ClassinWhich}
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              Section : {data?.Section}
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              Sr Number : {data?.SrNo}
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              Student Name : {data?.NameofStudent}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrintCard;

const styles = StyleSheet.create({
  mainActionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '20%',
    justifyContent: 'space-between',
  },
  card10: {
    //   backgroundColor: 'white',
    //   borderRadius: 8,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  viewdel: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  viewdelbtn: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  donationButton: {
    backgroundColor: primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    borderRadius: 10,
    width: '45%',
    height: 40,
  },
  avtiveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
