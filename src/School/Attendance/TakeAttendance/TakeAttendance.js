import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {primary, savebtn, resetbtn} from '../../../utils/Colors';
import {
  getcourse,
  getbatch,
  GetSession,
  GetSection,
  getcurrentsession,
} from '../../../redux/action/commanAction';

import {
  DoneStudentAttendance,
  MonthlyStudentAttendance,
} from '../../../redux/action/attendanceActions';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import DownloadStudentAttendance from '../../../Component/school/DownloadExcel';
import FilterStudentAttendance from '../../../Component/school/FilterStudentAttendance';
import RNButton from '../../../Component/RNButton';
import moment from 'moment';
const TakeAttendance = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const [attendancedetails, setattendancedetails] = useState([]);
  const {markattendance} = useSelector(state => state.markatten);

  function handleItemUpdate(originalItem, key, value) {
    setattendancedetails(
      attendancedetails.map(Item =>
        Item.id === originalItem.id
          ? {
              ...Item,
              [key]: value,
            }
          : Item,
      ),
    );
  }

  const saveAttendance = () => {
    dispatch(DoneStudentAttendance(attendancedetails));
  };
  useEffect(() => {
    dispatch(getcourse());
    dispatch(getbatch());
    dispatch(GetSession());
    dispatch(GetSection());
    dispatch(getcurrentsession());
  }, []);

  useEffect(() => {
    if (markattendance) {
      setattendancedetails(markattendance);
      setShowModal(false);
    }
  }, [markattendance]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerTitleContainer}>
        <View>
          <Text style={styles.secondaryTitle}>Take Attendance</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          {/* <Pressable
            onPress={() => setShowDocOptions(true)}
            style={styles.filterBtnContainer}>
            <FontAwesome6 name="download" color={Colors.primary} size={25} />
          </Pressable> */}
          <Pressable
            onPress={() => setShowModal(true)}
            style={styles.filterBtnContainer}>
            <Ionicons name="filter" color={Colors.primary} size={25} />
          </Pressable>
        </View>
      </View>

      <View style={styles.bottomBtn}>
        <RNButton onPress={() => saveAttendance()}>Save Attendance</RNButton>
      </View>

      <ScrollView>
        <View style={styles.enquirymainview}>
          {attendancedetails?.map((item, index) => {
            return (
              <View key={index}>
                <View style={styles.connainer}>
                  <View style={styles.card10}>
                    <View style={styles.viewdel}>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        Date :{' '}
                        {moment(item?.attendancedate).format('DD/MM/YYYY')}
                      </Text>
                    </View>
                    <View style={styles.viewdel}>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        Roll No
                      </Text>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        name
                      </Text>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        Course
                      </Text>
                    </View>
                    <View style={styles.viewdel}>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        {item?.rollnumber}
                      </Text>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        {item?.name}
                      </Text>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        {item?.courseorclass}
                      </Text>
                    </View>
                    <View style={styles.viewdel}>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        Attendance Status
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          handleItemUpdate(item, 'attendaceStatus', false)
                        }>
                        <View
                          style={
                            item?.attendaceStatus === false
                              ? styles.absentbtn
                              : styles.unabsentbtn
                          }>
                          <Text
                            style={
                              item?.attendaceStatus === false
                                ? styles.textcolorwhite
                                : styles.textcolor
                            }>
                            A
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          handleItemUpdate(item, 'attendaceStatus', true)
                        }>
                        <View
                          style={
                            item?.attendaceStatus === true
                              ? styles.presentbtn
                              : styles.unpresentbtn
                          }>
                          <Text
                            style={
                              item?.attendaceStatus === true
                                ? styles.textcolorwhite
                                : styles.textcolor
                            }>
                            P
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      {showModal && (
        <>
          <FilterStudentAttendance
            setShowModal={setShowModal}
            showModal={showModal}
          />
        </>
      )}

      <DownloadStudentAttendance
        enquiry={attendancedetails}
        filename={'StudentattendaneList'}
        visible={showDocOptions}
        hideModal={setShowDocOptions}
      />
    </View>
  );
};

export default TakeAttendance;

const styles = StyleSheet.create({
  bottomBtn: {
    paddingHorizontal: Width(10),
    marginTop: Height(5),
  },
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
    borderRadius: Width(10),
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
  loginbtndiv10: {
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  loginbtnsave: {
    width: Width(170),
    height: Height(45),
    backgroundColor: Colors.primary,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginbtn10: {
    width: Width(170),
    height: Height(45),
    backgroundColor: resetbtn,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logintextstyle: {
    color: 'white',
    // fontWeight: 700,
    fontSize: 16,
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
  absentbtn: {
    backgroundColor: resetbtn,
    width: Width(80),
    height: Height(35),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  unabsentbtn: {
    borderColor: resetbtn,
    borderWidth: 1,
    width: Width(80),
    height: Height(35),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  presentbtn: {
    backgroundColor: savebtn,
    width: Width(80),
    height: Height(35),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  unpresentbtn: {
    borderColor: savebtn,
    width: Width(80),
    height: Height(35),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  textcolor: {
    color: primary,
  },
  textcolorwhite: {
    color: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    borderColor: primary,
    borderRadius: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    borderColor: primary,
    borderRadius: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: primary,
    borderRadius: 5,
  },
  headerTitleContainer: {
    backgroundColor: Colors.fadeGray,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondaryTitle: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    color: Colors.primary,
  },
  accordionTitle: {
    color: Colors.primary,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20,
  },
  filterBtnContainer: {
    padding: 2,
    borderRadius: 10,
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
});
