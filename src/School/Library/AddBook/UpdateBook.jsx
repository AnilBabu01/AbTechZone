import {StyleSheet, View, ScrollView, TextInput, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {GetBooks} from '../../../redux/action/liraryAction';
import {handleDate, getTodaysDate} from '../../../utils/functions';
import RNDatePicker from '../../../Component/RNDatePicker';
import moment from 'moment';
const streamlist = [
  {
    label: 'NONE',
    value: 'NONE',
  },
  {
    label: 'Arts',
    value: 'Arts',
  },
  {
    label: 'COMMERCE',
    value: 'COMMERCE',
  },
  {
    label: 'SCIENCE',
    value: 'SCIENCE',
  },
];
const UpdateBook = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isdata, setisdata] = useState('');
  const [loader, setloader] = useState(false);
  const [stream, setstream] = useState('NONE');
  const [courseorclass, setcourseorclass] = useState('');
  const [BookId, setBookId] = useState('');
  const [BookTitle, setBookTitle] = useState('');
  const [auther, setauther] = useState('');
  const [quantity, setquantity] = useState('');
  const [addDate, setaddDate] = useState(getTodaysDate());
  const [classlist, setclasslist] = useState([]);
  const {course} = useSelector(state => state.getcourse);

  const submit = () => {
    setloader(true);

    const data = {
      id: isdata?.id,
      courseorclass: courseorclass,
      BookId: BookId,
      BookTitle: BookTitle,
      auther: auther,
      quantity: quantity,
      addDate: moment(addDate, 'YYYY-MM-DD'),
      stream: stream,
    };
    serverInstance('library/addbook', 'put', data).then(res => {
      if (res?.status) {
        setloader(false);

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        dispatch(GetBooks());
        navigation.goBack();
      }

      if (res?.status === false) {
        setloader(false);

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
        dispatch(GetBooks());
        console.log('Update Book is', res);
      }
    });
  };

  useEffect(() => {
    if (course) {
      setclasslist(course);
    }
  }, [course]);

  useEffect(() => {
    if (route.params?.data) {
      setisdata(route.params?.data);
      setquantity(route.params?.data?.quantity?.toString());
      setcourseorclass(route.params?.data?.courseorclass);
      setBookId(route.params?.data?.BookId);
      setauther(route.params?.data?.auther);
      setBookTitle(route.params?.data?.BookTitle);
      const d = new Date(route.params?.data?.addDate);
      let newdate = `${d.getDate()}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${d.getFullYear()}`;
      setaddDate(newdate);
      setstream(route.params?.data?.stream);
    }
  }, []);

  return (
    <View>
      <BackHeader title={'Update Book'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Stream
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={streamlist}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={stream}
                    onChange={item => {
                      setstream(item.value);
                    }}
                  />
                </View>
              </View>
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Class
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={
                      classlist &&
                      classlist?.map(item => ({
                        label: `${item?.coursename}`,
                        value: `${item?.coursename}`,
                      }))
                    }
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={courseorclass}
                    onChange={item => {
                      setcourseorclass(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Book Id"
                  placeholder="Enter Book Id"
                  value={BookId}
                  onChangeText={data => setBookId(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Fee Book Title"
                  placeholder="Enter Bool Title"
                  value={BookTitle}
                  onChangeText={data => setBookTitle(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Author"
                  placeholder="Enter Author Name"
                  value={auther}
                  onChangeText={data => setauther(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Quantity"
                  placeholder="Enter Quantity"
                  value={quantity}
                  onChangeText={data => setquantity(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNDatePicker
                  title="Add Date"
                  value={addDate}
                  onDateChange={date => setaddDate(handleDate(date))}
                />
              </View>
            </FlexRowWrapper>
          </View>

          <RNButton
            loading={loader}
            onPress={submit}
            style={{marginHorizontal: 20, marginTop: 20}}>
            Update & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateBook;

const styles = StyleSheet.create({
  enquirymainview: {
    paddingTop: deviceHeight * 0.01,
  },
  dropstyle: {
    alignSelf: 'center',
    width: Width(170),
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(20),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.fadeGray,
    color: 'white',
  },
  dropstyle10: {
    alignSelf: 'center',
    width: Width(340),
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(20),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.fadeGray,
    color: 'white',
  },
});
