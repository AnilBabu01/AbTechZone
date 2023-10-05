import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {primary, savebtn, resetbtn} from '../../../utils/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CardEnquiry from './StudentCard';
import {Dropdown} from 'react-native-element-dropdown';
const data = [
  {label: 'DCA', value: 'DCA'},
  {label: 'ADCA', value: 'ADCA'},
  {label: 'CCC', value: 'CCC'},
  {label: 'O-LEVEL', value: 'O-LEVEL'},
];
const TakeAttendance = () => {
  const [index, setIndex] = useState(0);
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [batch, setbatch] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setfromdate(date);
  };

  const [isDatePickerVisibleto, setDatePickerVisibilityto] = useState(false);

  const showDatePickerto = () => {
    setDatePickerVisibilityto(true);
  };

  const hideDatePickerto = () => {
    setDatePickerVisibilityto(false);
  };

  const handleConfirmto = date => {
    hideDatePickerto();
    settodate(date);
  };

  return (
    <View>
      <View style={styles.dateview}>
        <TouchableOpacity
          style={{
            height: Height(40),
            width: Width(170),
            borderWidth: 1.5,
            borderColor: index === 6 ? primary : '#a9a9a9',
            // alignSelf: 'center',
            borderRadius: Width(10),
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Height(10),
          }}
          onPress={() => {
            setIndex(6), showDatePicker();
          }}>
          <FontAwesome5
            name="calendar"
            size={Height(20)}
            color="#666666"
            style={{marginLeft: Width(10)}}
          />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: Height(16),
              marginLeft: Width(20),
            }}>
            {fromdate ? moment(fromdate).format('DD/MM/YYYY') : 'Select Date'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Dropdown
          style={{
            alignSelf: 'center',
            width: Width(170),
            height: Height(40),
            fontFamily: 'Gilroy-SemiBold',
            borderWidth: 1.5,
            borderRadius: Width(10),
            paddingHorizontal: Width(20),
            fontSize: Height(16),
            marginTop: Height(10),
            borderColor: index === 1 ? primary : '#a9a9a9',
          }}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Batch"
          searchPlaceholder="Search..."
          value={batch}
          onChange={item => {
            setbatch(item.value);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          // )}
        />
      </View>
      <View style={styles.loginbtndiv10}>
        <TouchableOpacity
        // onPress={() => {
        //   setshowimaginput(true);
        //   setshowfeeandfinal(false);
        // }}
        >
          <View style={styles.loginbtnsave}>
            <Text style={styles.logintextstyle}>Save</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        //  onPress={() => setshowfeeandfinal(true)}
        >
          <View style={styles.loginbtn10}>
            <Text style={styles.logintextstyle}>Reset</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.enquirymainview}>
          <CardEnquiry />
        </View>
      </ScrollView>
    </View>
  );
};

export default TakeAttendance;

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
    width: Width(170),
    height: Height(40),
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
});
