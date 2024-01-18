import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {primary} from '../../../utils/Colors';
import Delete from '../../../assets/Delete.png';
import Edit from '../../../assets/Edit.png';
import {deletefee, getfee} from '../../../redux/action/commanAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Component/Loader/Loader';
import {useNavigation} from '@react-navigation/native';
const FeeCard = ({data}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const {fee, error} = useSelector(state => state.getfee);
  const submit = id => {
    setsms('Deleting...');
    setloader(true);
    dispatch(deletefee(id));
  };

  useEffect(() => {
    if (fee) {
      dispatch(getfee());
      setsms('');
      setloader(false);
    }
  }, [fee]);
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
            <View style={styles.viewdel}>
              <Text>Course</Text>
              <Text>Registration Fee</Text>
              <Text>Per Month Fee</Text>
            </View>
            <View style={styles.viewdel}>
              <Text>{data?.coursename}</Text>
              <Text>{data?.Registractionfee}</Text>
              <Text>{data?.feepermonth}</Text>
            </View>
            <View style={styles.viewdel}>
              <Text></Text>
              <View style={styles.mainActionView}>
                <TouchableOpacity onPress={() => confirmation(data?.id)}>
                  <Image source={Delete} style={styles.actionimg10} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UpdateAddFeeCoaching', {data})
                  }>
                  <Image source={Edit} style={styles.actionimg} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FeeCard;

const styles = StyleSheet.create({
  card10: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  viewdel: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  actionimg: {
    width: 39,
    height: 40,
  },
  actionimg10: {
    width: 40,
    height: 40,
  },
  mainActionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '30%',
    justifyContent: 'space-between',
  },
});
