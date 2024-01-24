import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {primary, savebtn, resetbtn} from '../../../utils/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CardEnquiry from './StudentCard';
import {Dropdown} from 'react-native-element-dropdown';
import {
  getcourse,
  GetSession,
  GetSection,
  getcurrentsession,
} from '../../../redux/action/commanAction';
import {useDispatch, useSelector} from 'react-redux';


const TodayAttendance = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [batch, setbatch] = useState('');
  const [attendancedetails, setattendancedetails] = useState([
    {
      id: '',
      userId: '',
      parentId: '',
      studentid: '',
      fathersName: '',
      MathersName: '',
      fathersPhoneNo: '',
      name: '',
      email: '',
      courseorclass: '',
      batch: '',
      rollnumber: '',
      institutename: '',
      attendaceStatus: '',
      attendancedate: '',
    },
  ]);

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

  useEffect(() => {
    dispatch(getcourse());
    dispatch(GetSession());
    dispatch(GetSection());
    dispatch(getcurrentsession());
  }, []);
  return (
    <View>
      <View style={styles.dateview}>
       
      </View>
      <View style={styles.loginbtndiv10}>
        <TouchableOpacity
        //  onPress={() => setshowfeeandfinal(true)}
        >
          <View style={styles.loginbtn10}>
            <Text style={styles.logintextstyle}>cjhc</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.enquirymainview}>
          {attendancedetails?.map((item, index) => {
            return (
              <View key={index}>
                <View style={styles.connainer}>
                  <View style={styles.card10}>
                    <View style={styles.viewdel}>
                      <Text>Roll No</Text>
                      <Text>name</Text>
                      <Text>Course</Text>
                    </View>
                    <View style={styles.viewdel}>
                      <Text>0002</Text>
                      <Text>Akash</Text>
                      <Text>DCA</Text>
                    </View>
                    <View style={styles.viewdel}>
                      <Text>Attendance Status</Text>
                      <TouchableOpacity
                      // onPress={() =>
                      //   handleItemUpdate(item, 'attendaceStatus', false)
                      // }
                      >
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
                      // onPress={() =>
                      //   handleItemUpdate(item, 'attendaceStatus', true)
                      // }
                      >
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
    </View>
  );
};

export default TodayAttendance;

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
    height: Height(40),
    backgroundColor: savebtn,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginbtn10: {
    width: Width(355),
    height: Height(45),
    backgroundColor: resetbtn,
    borderRadius: 10,
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
});
