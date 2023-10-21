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
import {primary} from '../../utils/Colors';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Delete from '../../assets/Delete.png';
import Edit from '../../assets/Edit.png';
import {deleteenquiry, getenquiries} from '../../Redux/action/coachingAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../Component/Loader/Loader';

const CardEnquiry = ({data}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showinfo, setshowinfo] = useState('');
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const {enquiry, error} = useSelector(state => state.deleteenqury);
  const submit = id => {
    setsms('Deleting...');
    setloader(true);
    dispatch(deleteenquiry(id));
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
        <TouchableOpacity onPress={() => setshowinfo(!showinfo)}>
          <View style={styles.connainer}>
            <View style={styles.card10}>
              <View style={styles.viewdel}>
                <Text>{moment(data?.EnquiryDate).format('DD/MM/YYYY')}</Text>
                <Text></Text>
              </View>
              <View style={styles.viewdel}>
                <Text>Student Number</Text>
                <Text>{data?.StudentNumber}</Text>
              </View>

              {showinfo && (
                <>
                  <View style={styles.viewdel}>
                    <Text>Student Email</Text>
                    <Text>{data?.StudentEmail}</Text>
                  </View>
                  <View style={styles.viewdel}>
                    <Text>Address</Text>
                    <Text>{data?.Address}</Text>
                  </View>
                  <View style={styles.viewdel}>
                    <Text>Course</Text>
                    <Text>{data?.Course}</Text>
                  </View>
                  <View style={styles.viewdel}>
                    <Text>Comment</Text>
                    <Text></Text>
                  </View>
                  <Text>{data?.Comment}</Text>
                  <View style={styles.viewdel}>
                    <Text>Action</Text>
                    <View style={styles.mainActionView}>
                      <TouchableOpacity onPress={() => confirmation(data?.id)}>
                        <Image source={Delete} style={styles.actionimg10} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={
                          () =>
                            navigation.navigate('UpdateEnquiryCoaching', {data})
                          // navigation.navigate('UpdateEnquiryCoaching')
                        }>
                        <Image source={Edit} style={styles.actionimg} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CardEnquiry;

const styles = StyleSheet.create({
  mainActionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '30%',
    justifyContent: 'space-between',
  },
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
