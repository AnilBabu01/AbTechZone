import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import RNInputField from '../RNInputField';
import RNDatePicker from '../RNDatePicker';
import RNButton from '../RNButton';
import {Colors} from '../../utils/Colors';
import {Height, Width} from '../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {handleDate, getTodaysDate} from '../../utils/functions';
import {getPrintReceipt} from '../../redux/action/commanAction';
import moment from 'moment';
import RNBDropDown from '../RNBDropDown';

const SearchReceipt = ({showModal, setShowModal}) => {
  const dispatch = useDispatch();
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState();
  const [sno, setsno] = useState('');
  const [sessionname, setsessionname] = useState('');
  const [rollnumber, setrollnumber] = useState('');
  const [sectionname, setsectionname] = useState('NONE');
  const [scoursename, setscoursename] = useState('');
  const [sstudent, setsstudent] = useState('');
  const [courselist, setcourselist] = useState([]);
  const [sectionlist, setsectionlist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const {course} = useSelector(state => state.getcourse);
  const {sections} = useSelector(state => state.GetSection);
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);
  const {Sessions} = useSelector(state => state.GetSession);
  const {container, innerContainer, childContainer, mainContainer} = styles;
  const {loading} = useSelector(state => state.getReceiptPrint);

  const onSubmit = () => {
    let formattedDateStr = '';
    let todateDateStr = '';
    if (fromdate) {
      const [day, month, year] = fromdate?.split('/');
      formattedDateStr = fromdate ? `${year}-${month}-${day}` : '';
    }
    if (todate) {
      const [day1, month1, year1] = todate?.split('/');
      todateDateStr = todate ? `${year1}-${month1}-${day1}` : '';
    }

    dispatch(
      getPrintReceipt(
        formattedDateStr,
        scoursename,
        sstudent,
        rollnumber,
        sessionname,
        sectionname,
        sno,
        todateDateStr,
      ),
    );
  };

  useEffect(() => {
    if (sections) {
      const newArray = [...sections, {section: 'NONE', section: 'NONE'}];
      setsectionlist(newArray);
    }

    if (CURRENTSESSION) {
      setsessionname(CURRENTSESSION);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
    if (course) {
      setcourselist(course);
    }
  }, [sections, CURRENTSESSION, Sessions, course]);

  return (
    <>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={showModal}
        contentContainerStyle={container}>
        <View style={[innerContainer, mainContainer]}>
          <Text
            style={{
              color: Colors.white,
              fontSize: 17,
              fontWeight: '600',
              lineHeight: 20,
            }}>
            Filter
          </Text>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Ionicons name="close" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={[childContainer]}>
          <View
            style={{
              backgroundColor: Colors.white,
              // borderRadius: deviceWidth * 0.05,
              paddingHorizontal: deviceWidth * 0.02,
              paddingBottom: deviceHeight * 0.03,
            }}>
            <ScrollView
              style={{height: deviceHeight * 0.7}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: deviceWidth * 0.04,
                  marginTop: deviceHeight * 0.02,
                }}>
                <View style={styles.rowwrapper}>
                  <View style={{width: '49.3%'}}>
                    <RNDatePicker
                      title="From Date"
                      value={fromdate}
                      onDateChange={date => setfromdate(handleDate(date))}
                    />
                  </View>
                  <View style={{width: '49.3%'}}>
                    <RNDatePicker
                      title="To Date"
                      value={todate}
                      onDateChange={date => settodate(handleDate(date))}
                    />
                  </View>
                </View>
                <View style={styles.rowwrapper}>
                  <View style={{width: '49.3%'}}>
                    <RNBDropDown
                      label="Session"
                      value={sessionname}
                      OptionsList={
                        sessionList &&
                        sessionList?.map(item => ({
                          label: `${item?.Session}`,
                          value: `${item?.Session}`,
                        }))
                      }
                      onChange={data => setsessionname(data.value)}
                    />
                  </View>
                  <View style={{width: '49.3%'}}>
                    <RNBDropDown
                      label="Section"
                      value={sectionname}
                      OptionsList={
                        sectionlist &&
                        sectionlist?.map(item => ({
                          label: `${item?.section}`,
                          value: `${item?.section}`,
                        }))
                      }
                      onChange={data => setsectionname(data.value)}
                    />
                  </View>
                </View>
                <View style={styles.rowwrapper}>
                  <View style={{width: '49.3%'}}>
                    <RNBDropDown
                      label="Class"
                      value={scoursename}
                      OptionsList={
                        courselist &&
                        courselist?.map(item => ({
                          label: `${item?.coursename}`,
                          value: `${item?.coursename}`,
                        }))
                      }
                      onChange={data => setscoursename(data.value)}
                    />
                  </View>
                  <View style={{width: '49.3%'}}>
                    <RNInputField
                      label="Sr No"
                      placeholder="Enter Sr No"
                      value={sno}
                      onChangeText={data => setsno(data)}
                    />
                  </View>
                </View>

                <View style={styles.rowwrapper}>
                  <View style={{width: '49.3%'}}>
                    <RNInputField
                      label="Student Name"
                      placeholder="Enter Name"
                      value={sstudent}
                      onChangeText={data => setsstudent(data)}
                    />
                  </View>
                  <View style={{width: '49.3%'}}>
                    <RNInputField
                      label="Roll No"
                      placeholder="Enter Roll No"
                      value={rollnumber}
                      onChangeText={data => setrollnumber(data)}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>

            <RNButton loading={loading} onPress={onSubmit}>
              Submit
            </RNButton>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SearchReceipt;

const styles = StyleSheet.create({
  bottomBtn: {
    marginBottom: deviceHeight * 0.01,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 30,
    borderRadius: 20,
    position: 'relative',
    zIndex: 9999,
  },
  innerContainer: {
    backgroundColor: Colors.primary,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  childContainer: {
    marginHorizontal: deviceWidth * 0.04,
    marginBottom: deviceWidth * 0.06,
  },

  mainContainer: {
    marginHorizontal: deviceWidth * 0.04,
    marginTop: deviceWidth * 0.04,
  },
  rowwrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dropstyle: {
    width: Width(160),
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
