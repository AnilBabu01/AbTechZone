import {StyleSheet, View, ScrollView, TextInput, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {GetRoom} from '../../../redux/action/hostelActions';
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
import {primary} from '../../../utils/Colors';
import {Checkbox} from 'react-native-paper';
const IssueBookScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [isdata, setisdata] = useState('');
  const [loader, setloader] = useState(false);
  const [rollnumber, setrollnumber] = useState('');
  const [courseorclass, setcourseorclass] = useState('');
  const [studentname, setstudentname] = useState('');
  const [studentbooklist, setstudentbooklist] = useState([]);
  const [sendStudentBookList, setsendStudentBookList] = useState([]);
  const [AlreadyIssuedbooklist, setAlreadyIssuedbooklist] = useState([]);

  const handleCheckboxBookListToggle = index => {
    const updatedMonths = [...studentbooklist];
    updatedMonths[index].checked = !updatedMonths[index].checked;

    setstudentbooklist(updatedMonths);
    if (updatedMonths[index].checked) {
      // If checked, add to selectedMonths
      setsendStudentBookList(prevSelectedMonths => [
        ...prevSelectedMonths,
        updatedMonths[index],
      ]);
    } else {
      // If unchecked, remove from selectedMonths

      setsendStudentBookList(prevSelectedMonths =>
        prevSelectedMonths.filter(
          month => month?.id !== updatedMonths[index].id,
        ),
      );
    }
  };

  const submit = () => {
    setloader(true);

    const data = {
      studentid: isdata?.id,
      rollnumber: isdata?.rollnumber,
      courseorclass: isdata?.courseorclass,
      bookDeatils: sendStudentBookList,
    };
    serverInstance('library/bookissue', 'post', data).then(res => {
      if (res?.status) {
        setloader(false);

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        // dispatch(GetRoom());
        navigation.goBack();
      }

      if (res?.status === false) {
        setloader(false);

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
        // dispatch(GetRoom());
      }
    });
  };

  useEffect(() => {
    if (route.params?.data) {
      setisdata(route.params?.data);
      setcourseorclass(route.params?.data?.courseorclass);
      setstudentname(route.params?.data?.name);
      setrollnumber(route.params?.data?.rollnumber);

      serverInstance(
        `library/addbook?courseorclass=${route.params?.data?.courseorclass}&studentid=${route.params?.data?.id}&rollnumber=${route.params?.data?.rollnumber}&stream=${route.params?.data?.Stream}`,
        'get',
      ).then(res => {
        if (res?.status) {
          setstudentbooklist(res?.data?.book);
          setAlreadyIssuedbooklist(res?.data?.BookedBooks);
        }
      });
    }
  }, []);

  return (
    <View>
      <BackHeader title={'Issue Book'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <View style={{paddingLeft: 20}}>
              <Text>Session : {isdata?.Session}</Text>
              <Text>Sr No : {isdata?.SrNumber}</Text>
              <Text>Class : {isdata?.courseorclass}</Text>
              <Text>Section : {isdata?.Section}</Text>
              <Text>Roll No : {isdata?.rollnumber}</Text>
              <Text>Student Name : {isdata?.name}</Text>
            </View>
            <View style={{marginTop: 20}}>
              <Text
                style={{marginLeft: 10, marginBottom: 10, fontWeight: 'bold'}}>
                Already Issued These Books
              </Text>
              <View style={styles.titleview}>
                <Text style={{color: 'white'}}>BookId</Text>
                <Text style={{color: 'white'}}>Title</Text>
                <Text style={{color: 'white'}}>Issue</Text>
              </View>

              {AlreadyIssuedbooklist &&
                AlreadyIssuedbooklist?.map((item, index) => {
                  return (
                    <View key={index} style={styles.Sdataview}>
                      <Text>{item?.BookId}</Text>
                      <Text> {item?.BookTitle}</Text>
                      <Text>
                        {item?.issueStatus === true ? 'Issued' : 'No Isseue'}
                      </Text>
                    </View>
                  );
                })}
            </View>

            <View style={{marginTop: 20}}>
              <Text
                style={{marginLeft: 10, marginBottom: 10, fontWeight: 'bold'}}>
                Issue From These Books
              </Text>
              <View style={styles.titleview}>
                <Text style={{color: 'white'}}>BookId</Text>
                <Text style={{color: 'white'}}>Title</Text>
                <Text style={{color: 'white'}}>Books</Text>
                <Text style={{color: 'white'}}>In Library</Text>
                <Text style={{color: 'white'}}>Issue</Text>
              </View>

              {studentbooklist &&
                studentbooklist.map((item, index) => {
                  return (
                    <View key={index} style={styles.Sdataview}>
                      <Text>{item?.BookId}</Text>
                      <Text> {item?.BookTitle}</Text>
                      <Text> {item?.Realquantity}</Text>
                      <Text> {item?.quantity}</Text>
                      <Checkbox.Android
                        status={item.checked ? 'checked' : 'unchecked'}
                        onPress={() => handleCheckboxBookListToggle(index)}
                      />
                    </View>
                  );
                })}
            </View>
          </View>

          <RNButton
            loading={loader}
            onPress={submit}
            style={{marginHorizontal: 20, marginTop: 20}}>
            Issue Book & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default IssueBookScreen;

const styles = StyleSheet.create({
  Sdataview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: deviceWidth * 0.06,
    paddingVertical: deviceWidth * 0.02,
  },
  titleview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: deviceWidth * 0.06,
    paddingVertical: deviceWidth * 0.02,
    backgroundColor: primary,
  },
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
});
