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
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {GetBooks} from '../../../redux/action/liraryAction';
import {handleDate, getTodaysDate} from '../../../utils/functions';
import RNDatePicker from '../../../Component/RNDatePicker';
import moment from 'moment';
import RNBDropDown from '../../../Component/RNBDropDown';
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
const AdBook = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
      courseorclass: courseorclass,
      BookId: BookId,
      BookTitle: BookTitle,
      auther: auther,
      quantity: quantity,
      addDate: moment(addDate, 'YYYY-MM-DD'),
      stream: stream,
    };
    serverInstance('library/addbook', 'post', data).then(res => {
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
      }
    });
  };

  useEffect(() => {
    if (course) {
      setclasslist(course);
    }
  }, [course]);

  return (
    <View>
      <BackHeader title={'Add Book'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNBDropDown
                  label="Stream"
                  value={stream}
                  OptionsList={streamlist}
                  onChange={data => setstream(data.value)}
                />
              </View>

              <View style={{width: '45%'}}>
                <RNBDropDown
                  label="Class"
                  value={courseorclass}
                  OptionsList={
                    classlist &&
                    classlist?.map(item => ({
                      label: `${item?.coursename}`,
                      value: `${item?.coursename}`,
                    }))
                  }
                  onChange={item => {
                    setcourseorclass(item.value);
                  }}
                />
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
            Save & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdBook;

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
