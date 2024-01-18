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
import {Height, Width} from '../../utils/responsive';
import {primary, hightlight} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {Adddepartment, getDepartment} from '../../redux/action/commanAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../Component/Loader/Loader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Dropdown} from 'react-native-element-dropdown';
import {RadioButton} from 'react-native-paper';
const testtype = [
  {label: 1, value: 'Upload Pdf Test'},
  {label: 2, value: 'Add MCQ'},
];

const hours = [
  {label: '01', value: '01'},
  {label: '02', value: '02'},
  {label: '03', value: '03'},
  {label: '04', value: '04'},
  {label: '05', value: '05'},
  {label: '06', value: '06'},
  {label: '07', value: '07'},
  {label: '08', value: '08'},
  {label: '09', value: '09'},
  {label: '10', value: '10'},
  {label: '11', value: '11'},
  {label: '12', value: '12'},
];

const minutes = [
  {label: '01', value: '01'},
  {label: '02', value: '02'},
  {label: '03', value: '03'},
  {label: '04', value: '04'},
  {label: '05', value: '05'},
  {label: '06', value: '06'},
  {label: '07', value: '07'},
  {label: '08', value: '08'},
  {label: '09', value: '09'},
  {label: '10', value: '10'},
  {label: '11', value: '11'},
  {label: '12', value: '12'},
  {label: '13', value: '13'},
  {label: '14', value: '14'},
  {label: '15', value: '15'},
  {label: '16', value: '16'},
  {label: '17', value: '17'},
  {label: '18', value: '18'},
  {label: '19', value: '19'},
  {label: '20', value: '20'},
  {label: '21', value: '21'},
  {label: '22', value: '22'},
  {label: '23', value: '23'},
  {label: '24', value: '24'},
  {label: '25', value: '25'},
  {label: '26', value: '26'},
  {label: '27', value: '27'},
  {label: '28', value: '28'},
  {label: '29', value: '29'},
  {label: '30', value: '30'},
  {label: '31', value: '31'},
  {label: '32', value: '32'},
  {label: '33', value: '33'},
  {label: '34', value: '34'},
  {label: '35', value: '35'},
  {label: '36', value: '36'},
  {label: '37', value: '37'},
  {label: '38', value: '38'},
  {label: '39', value: '39'},
  {label: '40', value: '40'},
  {label: '41', value: '41'},
  {label: '42', value: '42'},
  {label: '43', value: '43'},
  {label: '44', value: '44'},
  {label: '45', value: '45'},
  {label: '46', value: '46'},
  {label: '47', value: '47'},
  {label: '48', value: '48'},
  {label: '49', value: '49'},
  {label: '50', value: '50'},
  {label: '51', value: '51'},
  {label: '52', value: '52'},
  {label: '53', value: '53'},
  {label: '54', value: '54'},
  {label: '55', value: '55'},
  {label: '56', value: '56'},
  {label: '57', value: '57'},
  {label: '58', value: '58'},
  {label: '59', value: '59'},
  {label: '60', value: '60'},
  {label: '00', value: '00'},
];

const amOrpm = [
  {label: 'AM', value: 'AM'},
  {label: 'PM', value: 'PM'},
];
const AddTest = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [courselist, setcourselist] = useState('');
  const [departmentname, setdepartmentneme] = useState('');
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const [fromdate, setfromdate] = useState('');
  const [batctlist, setbatctlist] = useState('');
  const [batchname, setbatchname] = useState('');
  const [coursename, setcoursename] = useState('');
  const [testtypename, settesttypename] = useState('Add MCQ');
  const [startmin, setstartmin] = useState('');
  const [starthour, setstarthour] = useState('');
  const [startamorpm, setstartamorpm] = useState('AM');
  const [endmin, setendmin] = useState('');
  const [endhour, setendhour] = useState('');
  const [endamorpm, setendamorpm] = useState('AM');
  const {course} = useSelector(state => state.getcourse);
  const {batch} = useSelector(state => state.getbatch);
  const {department, error} = useSelector(state => state.adddepart);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [questionItems, setquestionItems] = useState([
    {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctoption: '',
    },
  ]);

  console.log('questions list ', questionItems);

  function addQuestionItem() {
    setquestionItems([
      ...questionItems,
      {
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctoption: '',
      },
    ]);
  }

  function removeQuestionItem(item) {
    setquestionItems(
      questionItems.filter(questionItem => questionItem !== item),
    );
  }

  function handleQuestionItemUpdate(originalDonationItem, key, value) {
    setquestionItems(
      questionItems.map(questionItem =>
        questionItem === originalDonationItem
          ? {
              ...questionItem,
              [key]: value,
            }
          : questionItem,
      ),
    );
  }

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
  const submit = () => {
    if (departmentname) {
      setloader(true);
      setsms('Adding...');
      const data = {
        DepartmentName: departmentname,
      };
      dispatch(Adddepartment(data));
    } else {
      setsms('');
      setloader(false);
    }
  };

  useEffect(() => {
    if (department?.status) {
      dispatch(getDepartment());
      setsms('');
      setloader(false);
    } else {
      setsms('');
      setloader(false);
    }
  }, [department]);
  useEffect(() => {
    if (error) {
      if (error?.status === false) {
        setloader(false);
        setsms('');
      }
    }
  }, [error]);
  useEffect(() => {
    if (course) {
      setcourselist(course);
    }
    if (batch) {
      setbatctlist(batch);
    }
  }, [course, batch]);
  return (
    <View>
      <Loader loader={loader} sms={sms} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <TouchableOpacity
              style={{
                width: Width(360),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 7 ? primary : '#a9a9a9',
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
                {fromdate
                  ? moment(fromdate).format('DD/MM/YYYY')
                  : 'Select Test Date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>

          {courselist && (
            <>
              <Dropdown
                style={{
                  alignSelf: 'center',
                  width: Width(360),
                  height: Height(45),
                  fontFamily: 'Gilroy-SemiBold',
                  borderWidth: 1.5,
                  borderRadius: Width(5),
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                  marginTop: Height(10),
                  borderColor: index === 1 ? primary : '#a9a9a9',
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={
                  courselist &&
                  courselist?.map(item => ({
                    label: `${item?.coursename}`,
                    value: `${item?.coursename} ${item?.courseduration}`,
                  }))
                }
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Course"
                searchPlaceholder="Search..."
                value={coursename}
                onChange={item => {
                  setcoursename(item.value);
                }}
              />
            </>
          )}
          {batctlist && (
            <>
              <Dropdown
                style={{
                  alignSelf: 'center',
                  width: Width(360),
                  height: Height(45),
                  fontFamily: 'Gilroy-SemiBold',
                  borderWidth: 1.5,
                  borderRadius: Width(5),
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                  marginTop: Height(10),
                  borderColor: index === 1 ? primary : '#a9a9a9',
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={
                  batctlist &&
                  batctlist?.map(item => ({
                    label: `${item?.StartingTime} TO ${item?.EndingTime}`,
                    value: `${item?.StartingTime} TO ${item?.EndingTime}`,
                  }))
                }
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Batch"
                searchPlaceholder="Search..."
                value={batchname}
                onChange={item => {
                  setbatchname(item.value);
                }}
              />
            </>
          )}

          <View
            style={{
              marginTop: Height(5),
              paddingHorizontal: Width(5),
            }}>
            <Text>Starting Time</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: Width(5),
            }}>
            {hours && (
              <>
                <Dropdown
                  style={{
                    alignSelf: 'center',
                    width: Width(110),
                    height: Height(45),
                    fontFamily: 'Gilroy-SemiBold',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    paddingHorizontal: Width(20),
                    fontSize: Height(16),
                    marginTop: Height(10),
                    borderColor: index === 1 ? primary : '#a9a9a9',
                  }}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={hours}
                  // search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Min"
                  searchPlaceholder="Search..."
                  value={starthour}
                  onChange={item => {
                    setstarthour(item.value);
                  }}
                />
              </>
            )}
            {minutes && (
              <>
                <Dropdown
                  style={{
                    alignSelf: 'center',
                    width: Width(110),
                    height: Height(45),
                    fontFamily: 'Gilroy-SemiBold',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    paddingHorizontal: Width(20),
                    fontSize: Height(16),
                    marginTop: Height(10),
                    borderColor: index === 1 ? primary : '#a9a9a9',
                  }}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={minutes}
                  // search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Sec"
                  searchPlaceholder="Search..."
                  value={startmin}
                  onChange={item => {
                    setstartmin(item.value);
                  }}
                />
              </>
            )}
            {amOrpm && (
              <>
                <Dropdown
                  style={{
                    alignSelf: 'center',
                    width: Width(110),
                    height: Height(45),
                    fontFamily: 'Gilroy-SemiBold',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    paddingHorizontal: Width(20),
                    fontSize: Height(16),
                    marginTop: Height(10),
                    borderColor: index === 1 ? primary : '#a9a9a9',
                  }}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={amOrpm}
                  // search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="AM"
                  searchPlaceholder="Search..."
                  value={startamorpm}
                  onChange={item => {
                    setstartamorpm(item.value);
                  }}
                />
              </>
            )}
          </View>

          <View
            style={{
              marginTop: Height(5),
              paddingHorizontal: Width(5),
            }}>
            <Text>Ending Time</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: Width(5),
            }}>
            {hours && (
              <>
                <Dropdown
                  style={{
                    alignSelf: 'center',
                    width: Width(110),
                    height: Height(45),
                    fontFamily: 'Gilroy-SemiBold',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    paddingHorizontal: Width(20),
                    fontSize: Height(16),
                    marginTop: Height(10),
                    borderColor: index === 1 ? primary : '#a9a9a9',
                  }}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={hours}
                  // search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Min"
                  searchPlaceholder="Search..."
                  value={endhour}
                  onChange={item => {
                    setendhour(item.value);
                  }}
                />
              </>
            )}
            {minutes && (
              <>
                <Dropdown
                  style={{
                    alignSelf: 'center',
                    width: Width(110),
                    height: Height(45),
                    fontFamily: 'Gilroy-SemiBold',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    paddingHorizontal: Width(20),
                    fontSize: Height(16),
                    marginTop: Height(10),
                    borderColor: index === 1 ? primary : '#a9a9a9',
                  }}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={minutes}
                  // search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Sec"
                  searchPlaceholder="Search..."
                  value={endmin}
                  onChange={item => {
                    setendhour(item.value);
                  }}
                />
              </>
            )}
            {amOrpm && (
              <>
                <Dropdown
                  style={{
                    alignSelf: 'center',
                    width: Width(110),
                    height: Height(45),
                    fontFamily: 'Gilroy-SemiBold',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    paddingHorizontal: Width(20),
                    fontSize: Height(16),
                    marginTop: Height(10),
                    borderColor: index === 1 ? primary : '#a9a9a9',
                  }}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={amOrpm}
                  // search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="AM"
                  searchPlaceholder="Search..."
                  value={endamorpm}
                  onChange={item => {
                    setendamorpm(item.value);
                  }}
                />
              </>
            )}
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: Width(360),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 7 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(7)}>
              <TextInput
                placeholder="Test Title"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                value={departmentname}
                onChangeText={text => setdepartmentneme(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(7)}
              />
            </View>
          </View>
          {testtype && (
            <>
              <Dropdown
                style={{
                  alignSelf: 'center',
                  width: Width(360),
                  height: Height(45),
                  fontFamily: 'Gilroy-SemiBold',
                  borderWidth: 1.5,
                  borderRadius: Width(5),
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                  marginTop: Height(10),
                  borderColor: index === 1 ? primary : '#a9a9a9',
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={
                  testtype &&
                  testtype?.map(item => ({
                    label: `${item?.value}`,
                    value: `${item?.value}`,
                  }))
                }
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Test Type"
                searchPlaceholder="Search..."
                value={testtypename}
                onChange={item => {
                  settesttypename(item.value);
                }}
              />
            </>
          )}
          {testtypename === 'Add MCQ' ? (
            <>
              <View style={{paddingHorizontal: 5, paddingTop: 5}}>
                <Text>MCQ Questions</Text>
                {questionItems?.map((item, index) => {
                  return (
                    <View key={index}>
                      <Text>Question No : {index + 1}</Text>
                      <View style={styles.dateview}>
                        <View
                          style={{
                            width: Width(360),
                            height: Height(45),
                            alignSelf: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1.5,
                            borderRadius: Width(5),
                            borderColor: index === 7 ? primary : '#a9a9a9',
                            marginTop: Height(10),
                          }}
                          onStartShouldSetResponder={() => setIndex(7)}>
                          <TextInput
                            placeholder="Question"
                            placeholderTextColor="rgba(0, 0, 0, 0.6)"
                            style={{
                              width: Width(280),
                              fontFamily: 'Gilroy-SemiBold',
                              paddingHorizontal: Width(20),
                              fontSize: Height(16),
                            }}
                            // secureTextEntry={passwordVisible}
                            // onBlur={() => Validation()}
                            value={item?.question}
                            onChangeText={text =>
                              handleQuestionItemUpdate(item, 'question', text)
                            }
                            // onPressIn={() => setIndex(3)}
                            onFocus={() => setIndex(7)}
                          />
                        </View>
                      </View>
                      <View style={styles.dateview}>
                        <View
                          style={{
                            width: Width(360),
                            height: Height(45),
                            alignSelf: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1.5,
                            borderRadius: Width(5),
                            borderColor: index === 7 ? primary : '#a9a9a9',
                            marginTop: Height(10),
                          }}
                          onStartShouldSetResponder={() => setIndex(7)}>
                          <TextInput
                            placeholder="A"
                            placeholderTextColor="rgba(0, 0, 0, 0.6)"
                            style={{
                              width: Width(280),
                              fontFamily: 'Gilroy-SemiBold',
                              paddingHorizontal: Width(20),
                              fontSize: Height(16),
                            }}
                            // secureTextEntry={passwordVisible}
                            // onBlur={() => Validation()}
                            value={item.option1}
                            onChangeText={text =>
                              handleQuestionItemUpdate(item, 'option1', text)
                            }
                            // onPressIn={() => setIndex(3)}
                            onFocus={() => setIndex(7)}
                          />
                        </View>
                      </View>
                      <View style={styles.dateview}>
                        <View
                          style={{
                            width: Width(360),
                            height: Height(45),
                            alignSelf: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1.5,
                            borderRadius: Width(5),
                            borderColor: index === 7 ? primary : '#a9a9a9',
                            marginTop: Height(10),
                          }}
                          onStartShouldSetResponder={() => setIndex(7)}>
                          <TextInput
                            placeholder="B"
                            placeholderTextColor="rgba(0, 0, 0, 0.6)"
                            style={{
                              width: Width(280),
                              fontFamily: 'Gilroy-SemiBold',
                              paddingHorizontal: Width(20),
                              fontSize: Height(16),
                            }}
                            // secureTextEntry={passwordVisible}
                            // onBlur={() => Validation()}
                            value={item.option2}
                            onChangeText={text =>
                              handleQuestionItemUpdate(item, 'option2', text)
                            }
                            // onPressIn={() => setIndex(3)}
                            onFocus={() => setIndex(7)}
                          />
                        </View>
                      </View>
                      <View style={styles.dateview}>
                        <View
                          style={{
                            width: Width(360),
                            height: Height(45),
                            alignSelf: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1.5,
                            borderRadius: Width(5),
                            borderColor: index === 7 ? primary : '#a9a9a9',
                            marginTop: Height(10),
                          }}
                          onStartShouldSetResponder={() => setIndex(7)}>
                          <TextInput
                            placeholder="C"
                            placeholderTextColor="rgba(0, 0, 0, 0.6)"
                            style={{
                              width: Width(280),
                              fontFamily: 'Gilroy-SemiBold',
                              paddingHorizontal: Width(20),
                              fontSize: Height(16),
                            }}
                            // secureTextEntry={passwordVisible}
                            // onBlur={() => Validation()}
                            value={item.option3}
                            onChangeText={text =>
                              handleQuestionItemUpdate(item, 'option3', text)
                            }
                            // onPressIn={() => setIndex(3)}
                            onFocus={() => setIndex(7)}
                          />
                        </View>
                      </View>
                      <View style={styles.dateview}>
                        <View
                          style={{
                            width: Width(360),
                            height: Height(45),
                            alignSelf: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1.5,
                            borderRadius: Width(5),
                            borderColor: index === 7 ? primary : '#a9a9a9',
                            marginTop: Height(10),
                          }}
                          onStartShouldSetResponder={() => setIndex(7)}>
                          <TextInput
                            placeholder="D"
                            placeholderTextColor="rgba(0, 0, 0, 0.6)"
                            style={{
                              width: Width(280),
                              fontFamily: 'Gilroy-SemiBold',
                              paddingHorizontal: Width(20),
                              fontSize: Height(16),
                            }}
                            // secureTextEntry={passwordVisible}
                            // onBlur={() => Validation()}
                            value={item.option4}
                            onChangeText={text =>
                              handleQuestionItemUpdate(item, 'option4', text)
                            }
                            // onPressIn={() => setIndex(3)}
                            onFocus={() => setIndex(7)}
                          />
                        </View>
                      </View>
                      <Text style={{marginTop: 10}}>Select Correct Opton</Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                        }}>
                        <View style={styles.radioGroup}>
                          <View style={styles.radioButton}>
                            <RadioButton.Android
                              value="option1"
                              status={
                                item?.option1 === item?.correctoption
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() =>
                                handleQuestionItemUpdate(
                                  item,
                                  'correctoption',
                                  item?.option1,
                                )
                              }
                              color="#007BFF"
                            />
                            <Text style={styles.radioLabel}>A</Text>
                          </View>
                        </View>
                        <View style={styles.radioGroup}>
                          <View style={styles.radioButton}>
                            <RadioButton.Android
                              value="option2"
                              status={
                                item?.option2 === item?.correctoption
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() =>
                                handleQuestionItemUpdate(
                                  item,
                                  'correctoption',
                                  item?.option2,
                                )
                              }
                              color="#007BFF"
                            />
                            <Text style={styles.radioLabel}>B</Text>
                          </View>
                        </View>

                        <View style={styles.radioGroup}>
                          <View style={styles.radioButton}>
                            <RadioButton.Android
                              value="option3"
                              status={
                                item?.option3 === item?.correctoption
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() =>
                                handleQuestionItemUpdate(
                                  item,
                                  'correctoption',
                                  item?.option3,
                                )
                              }
                              color="#007BFF"
                            />
                            <Text style={styles.radioLabel}>C</Text>
                          </View>
                        </View>

                        <View style={styles.radioGroup}>
                          <View style={styles.radioButton}>
                            <RadioButton.Android
                              value="option4"
                              status={
                                item?.option4 === item?.correctoption
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() =>
                                handleQuestionItemUpdate(
                                  item,
                                  'correctoption',
                                  item?.option4,
                                )
                              }
                              color="#007BFF"
                            />
                            <Text style={styles.radioLabel}>D</Text>
                          </View>
                        </View>
                      </View>
                      {index > 0 && (
                        <>
                          <TouchableOpacity onPress={()=>removeQuestionItem(item)}>
                            <View
                              style={{
                                backgroundColor: hightlight,
                                width: Width(35),
                                borderRadius: 10,
                              }}>
                              <FontAwesome5
                                name="minus"
                                size={Height(20)}
                                color="white"
                                style={{marginLeft: Width(10)}}
                              />
                            </View>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  );
                })}
                <View style={styles.loginbtndiv}>
                  <TouchableOpacity onPress={() => addQuestionItem()}>
                    <View style={styles.loginbtn}>
                      <Text style={styles.logintextstyle}>
                        Add More Question
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.questionView}>
                <Text>Upload PDF</Text>
              </View>
            </>
          )}
          <View style={styles.loginbtndiv}>
            <TouchableOpacity onPress={() => submit()}>
              <View style={styles.loginbtn}>
                <Text style={styles.logintextstyle}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddTest;

const styles = StyleSheet.create({
  radioGroup: {
    paddingHorizontal: 5,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  questionView: {
    alignSelf: 'center',
    width: Width(360),
    height: Height(45),
    fontFamily: 'Gilroy-SemiBold',
    paddingHorizontal: Width(5),
    fontSize: Height(16),
    marginTop: Height(10),
  },
  inputview: {
    width: Width(360),
    height: Height(50),
    backgroundColor: '#E9EAEC',
    alignSelf: 'center',
    borderRadius: Width(5),
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
    paddingHorizontal: 2,
  },
  baseinput: {
    width: Width(310),
    height: Height(40),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Width(10),
    // borderColor: index === 3 ? primary: '#a9a9a9',
    marginTop: Height(10),
  },

  addinput: {
    height: Height(45),
    width: Width(360),
    borderWidth: 1.5,
    // borderColor: index === 7 ? primary : '#a9a9a9',
    alignSelf: 'center',
    borderRadius: Width(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Height(10),
  },
  loginbtndiv: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  loginbtn: {
    width: Width(360),
    height: Height(45),
    backgroundColor: primary,
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
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
