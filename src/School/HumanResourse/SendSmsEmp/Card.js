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
import {primary} from '../../../utils/Colors';
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
import {Colors} from '../../../utils/Colors';

const Card = ({data}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showinfo, setshowinfo] = useState('');
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const {enquiry, error} = useSelector(state => state.deleteenqury);
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
  const confirmation = id => {
    Alert.alert(
      'Delete',
      'Do you really want to Delete ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => submit(id),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };
  return (
    <View>
      <Loader loader={loader} sms={sms} />
      <ScrollView>
        <View style={styles.connainer}>
          <View style={styles.card}>
            <View style={styles.headerarray}>
              <Text style={{color: Colors.white}}>
                Sent Date : {moment(data?.date).format('DD/MM/YYYY')}
              </Text>
              <TouchableOpacity onPress={() => setshowinfo(!showinfo)}>
                <Ionicons
                  name={showinfo ? 'arrow-down' : 'arrow-up'}
                  size={Height(22)}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.cardonnear}>
              <View style={styles.viewdel}>
                <Text>
                  Subject : <Text style={styles.dbData}>{data?.Subject}</Text>
                </Text>
              </View>

              {showinfo && (
                <>
                  <View style={styles.viewdel}>
                    <Text>
                      SMS : <Text style={styles.dbData}>{data?.Sms}</Text>
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  mainActionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '16%',
    justifyContent: 'space-between',
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: Width(357),
    marginVertical: 10,
  },
  cardonnear: {
    paddingVertical: deviceWidth * 0.02,
    paddingHorizontal: deviceWidth * 0.02,
  },
  viewdel: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },

  headerarray: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: deviceWidth * 0.02,
    borderTopRightRadius: deviceWidth * 0.02,
    paddingVertical: deviceWidth * 0.02,
    paddingHorizontal: deviceWidth * 0.02,
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
  dbData: {
    color: Colors.black,
    fontWeight: 'bold',
  },
});
