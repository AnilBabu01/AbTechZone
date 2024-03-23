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
import Delete from '../../../assets/Delete.png';
import Edit from '../../../assets/Edit.png';
import {getenquiries} from '../../../redux/action/coachingAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Component/Loader/Loader';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Height, Width} from '../../../utils/responsive';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import RNButton from '../../../Component/RNButton';
const Card = ({data}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setloading] = useState('');
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
          <View style={styles.card10}>
            <View style={styles.headerarray}>
              <Text style={{color: Colors.white}}>
                Admission Date :
                {moment(data?.admissionDate).format('DD/MM/YYYY')}
              </Text>
              <TouchableOpacity onPress={() => setshowinfo(!showinfo)}>
                <Ionicons
                  name={showinfo ? 'arrow-down' : 'arrow-up'}
                  size={Height(22)}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.dateview}>
              <View style={styles.cardContent}>
                <Text style={styles.title}>Sr Number</Text>
                <Text style={styles.datatext}>
                  {data?.SrNumber ? data?.SrNumber : '-'}
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.datatext}>
                  {data?.name ? data?.name : '-'}
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.title}>Roll Number</Text>
                <Text style={styles.datatext}>
                  {data?.rollnumber ? data?.rollnumber : '-'}
                </Text>
              </View>
            </View>

            {showinfo && (
              <>
                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Section</Text>
                    <Text style={styles.datatext}>
                      {data?.Section ? data?.Section : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Class</Text>
                    <Text style={styles.datatext}>
                      {data?.name ? data?.name : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Addmission_Fee</Text>
                    <Text style={styles.datatext}>
                      {data?.admissionfeeStatus == true
                        ? `Paid (${data?.admissionfee})`
                        : data?.admissionfee === 0
                        ? `NO (${data?.admissionfee})`
                        : `Dues (${data?.admissionfee})`}
                    </Text>
                  </View>
                </View>

                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Registration_Fee</Text>
                    <Text style={styles.datatext}>
                      {data?.admissionfeeStatus == true
                        ? `Paid (${data?.admissionfee})`
                        : data?.admissionfee === 0
                        ? `NO (${data?.admissionfee})`
                        : `Dues (${data?.admissionfee})`}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Annual_Fee</Text>
                    <Text style={styles.datatext}>
                      {data?.AnnualFeeStatus == true
                        ? `Paid (${data?.AnnualFee})`
                        : data?.AnnualFee === 0
                        ? `NO (${data?.AnnualFee})`
                        : `Dues (${data?.AnnualFee})`}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Addmission_Fee</Text>
                    <Text style={styles.datatext}>
                      {data?.admissionfeeStatus == true
                        ? `Paid (${data?.admissionfee})`
                        : data?.admissionfee === 0
                        ? `NO (${data?.admissionfee})`
                        : `Dues (${data?.admissionfee})`}
                    </Text>
                  </View>
                </View>

                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Academy_Fee</Text>
                    <Text style={styles.datatext}>{data?.studentTotalFee}</Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Paid_Fee</Text>
                    <Text style={styles.datatext}>{data?.paidfee}</Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Hostel_Fee</Text>
                    <Text style={styles.datatext}>{data?.TotalHostelFee}</Text>
                  </View>
                </View>

                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Paid_Fee</Text>
                    <Text style={styles.datatext}>{data?.HostelPaidFee}</Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Transport_Fee</Text>
                    <Text style={styles.datatext}>
                      {data?.TransportTotalHostelFee}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Paid_Fee</Text>
                    <Text style={styles.datatext}>
                      {data?.TransportPaidFee}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContent: {
    width: '25%',
    marginBottom: deviceHeight * 0.01,
  },
  dateview: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  title: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
  },
  datatext: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.black,
  },
  mainActionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '20%',
    justifyContent: 'space-between',
  },
  card10: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    marginVertical: 10,
  },
  viewdel: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
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
});
