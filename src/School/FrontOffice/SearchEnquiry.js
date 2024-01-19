import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {Height, Width} from '../../utils/responsive';
import {primary} from '../../utils/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CardEnquiry from './CardEnquiry';
import DashboardPlaceholderLoader from '../../Component/DashboardPlaceholderLoader';
import {useSelector} from 'react-redux'
const SearchEnquiry = () => {
  const [index, setIndex] = useState(0);
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loadering, setloadering] = useState(true);
  const {enquiry, loading} = useSelector(state => state.enquiry);
  const [enquirylist, setenquirylist] = useState('');
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

  useEffect(() => {
    if (enquiry) {
      setenquirylist(enquiry);
    }
  }, [enquiry]);
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
            {fromdate ? moment(fromdate).format('DD/MM/YYYY') : 'From Date'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <TouchableOpacity
          style={{
            height: Height(40),
            width: Width(170),
            borderWidth: 1.5,
            borderColor: index === 7 ? primary : '#a9a9a9',
            // alignSelf: 'center',
            borderRadius: Width(10),
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Height(10),
          }}
          onPress={() => {
            setIndex(7), showDatePickerto();
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
            {todate ? moment(todate).format('DD/MM/YYYY') : 'To Date'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisibleto}
          mode="date"
          onConfirm={handleConfirmto}
          onCancel={hideDatePickerto}
        />
      </View>

      <View style={styles.inputview}>
        <TextInput
          placeholder="Search here"
          style={styles.inputsaerch}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          // value={text}
          // onChangeText={text => setText(text)}
        />
        <Ionicons
          name="search-outline"
          size={Height(22)}
          style={{marginRight: Width(20)}}
          color="rgba(0, 0, 0, 0.5)"
        />
      </View>
      <ScrollView>
        {loading ? (
          <>
            <DashboardPlaceholderLoader type="datacard" />
          </>
        ) : (
          <>
            <View style={styles.enquirymainview}>
              {enquirylist &&
                enquirylist?.map((item, index) => {
                  return <CardEnquiry key={index} data={item} />;
                })}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchEnquiry;

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
});
