import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
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
import {Checkbox} from 'react-native-paper';

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
              <Text style={{color: Colors.white}}>Emp Id : {data?.empId}</Text>
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
                  Name : <Text style={styles.dbData}>{data?.name}</Text>
                </Text>
              </View>

              {showinfo && (
                <>
                  <View style={styles.bottomheader}>
                    <Text style={{color: Colors.black}}>Front Office </Text>
                    <View style={styles.mainoptionView}>
                      <View style={styles.optionview}>
                        <Text>Read</Text>
                        <Checkbox
                          status={
                            data?.fronroficeRead ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Create</Text>
                        <Checkbox
                          status={
                            data?.fronroficeWrite ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Update</Text>
                        <Checkbox
                          status={
                            data?.fronroficeEdit ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Delete</Text>
                        <Checkbox
                          status={
                            data?.fronroficeDelete ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.bottomheader}>
                    <Text style={{color: Colors.black}}>Student</Text>
                    <View style={styles.mainoptionView}>
                      <View style={styles.optionview}>
                        <Text>Read</Text>
                        <Checkbox
                          status={data?.studentRead ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Create</Text>
                        <Checkbox
                          status={data?.studentWrite ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Update</Text>
                        <Checkbox
                          status={data?.studentEdit ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Delete</Text>
                        <Checkbox
                          status={data?.studentDelete ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.bottomheader}>
                    <Text style={{color: Colors.black}}>Attendance</Text>
                    <View style={styles.mainoptionView}>
                      <View style={styles.optionview}>
                        <Text>Read</Text>
                        <Checkbox
                          status={data?.studentRead ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Create</Text>
                        <Checkbox
                          status={
                            data?.attendanceWrite ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Update</Text>
                        <Checkbox
                          status={
                            data?.attendanceEdit ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Delete</Text>
                        <Checkbox
                          status={
                            data?.attendanceDelete ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.bottomheader}>
                    <Text style={{color: Colors.black}}>Accounts</Text>
                    <View style={styles.mainoptionView}>
                      <View style={styles.optionview}>
                        <Text>Read</Text>
                        <Checkbox
                          status={data?.accountsRead ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Create</Text>
                        <Checkbox
                          status={data?.accountsWrite ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Update</Text>
                        <Checkbox
                          status={data?.accountsEdit ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Delete</Text>
                        <Checkbox
                          status={
                            data?.accountsDelete ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.bottomheader}>
                    <Text style={{color: Colors.black}}>HR</Text>
                    <View style={styles.mainoptionView}>
                      <View style={styles.optionview}>
                        <Text>Read</Text>
                        <Checkbox
                          status={
                            data?.HumanResourceRead ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Create</Text>
                        <Checkbox
                          status={
                            data?.HumanResourceWrite ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Update</Text>
                        <Checkbox
                          status={
                            data?.HumanResourceEdit ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Delete</Text>
                        <Checkbox
                          status={
                            data?.HumanResourceDelete ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.bottomheader}>
                    <Text style={{color: Colors.black}}>Masters</Text>
                    <View style={styles.mainoptionView}>
                      <View style={styles.optionview}>
                        <Text>Read</Text>
                        <Checkbox
                          status={data?.masterRead ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Create</Text>
                        <Checkbox
                          status={data?.masterWrite ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Update</Text>
                        <Checkbox
                          status={data?.masterEdit ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Delete</Text>
                        <Checkbox
                          status={data?.masterDelete ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.bottomheader}>
                    <Text style={{color: Colors.black}}>Transport</Text>
                    <View style={styles.mainoptionView}>
                      <View style={styles.optionview}>
                        <Text>Read</Text>
                        <Checkbox
                          status={data?.transportRead ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Create</Text>
                        <Checkbox
                          status={
                            data?.transportWrite ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Update</Text>
                        <Checkbox
                          status={data?.transportEdit ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Delete</Text>
                        <Checkbox
                          status={
                            data?.transportDelete ? 'checked' : 'unchecked'
                          }
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.bottomheader}>
                    <Text style={{color: Colors.black}}>Hostel</Text>
                    <View style={styles.mainoptionView}>
                      <View style={styles.optionview}>
                        <Text>Read</Text>
                        <Checkbox
                          status={data?.hostelRead ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Create</Text>
                        <Checkbox
                          status={data?.hostelWrite ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Update</Text>
                        <Checkbox
                          status={data?.hostelEdit ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Delete</Text>
                        <Checkbox
                          status={data?.hostelDelete ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.bottomheader}>
                    <Text style={{color: Colors.black}}>Library</Text>
                    <View style={styles.mainoptionView}>
                      <View style={styles.optionview}>
                        <Text>Read</Text>
                        <Checkbox
                          status={data?.libraryRead ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Create</Text>
                        <Checkbox
                          status={data?.libraryWrite ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Update</Text>
                        <Checkbox
                          status={data?.libraryEdit ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                      <View style={styles.optionview}>
                        <Text>Delete</Text>
                        <Checkbox
                          status={data?.libraryDelete ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.bottomheader}>
                    <Text style={{color: Colors.black}}>Reports</Text>
                    <View style={styles.mainoptionView}>
                      <View style={styles.optionview}>
                        <Text>Read</Text>
                        <Checkbox
                          status={data?.report ? 'checked' : 'unchecked'}
                          color={Colors.primary}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.viewdel}>
                    <Text>Action</Text>
                    <View style={styles.mainActionView}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('UpdateRole', {data})
                        }>
                        <Ionicons
                          name="create"
                          size={Height(25)}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
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
  bottomborder: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  mainoptionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  optionview: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomheader: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  mainActionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
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
