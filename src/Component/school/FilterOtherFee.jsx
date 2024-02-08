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
import {GeOtherFees} from '../../redux/action/commanAction';
import moment from 'moment';

const FilterOtherFee = ({showModal, setShowModal}) => {
  const dispatch = useDispatch();
  const [duesDate, setduesDate] = useState(getTodaysDate());
  const [sessionname, setsessionname] = useState('');
  const [sectionname, setsectionname] = useState('NONE');
  const [courseorclass, setcourseorclass] = useState('');
  const [courselist, setcourselist] = useState([]);
  const [sectionlist, setsectionlist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const {course} = useSelector(state => state.getcourse);
  const {sections} = useSelector(state => state.GetSection);
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);
  const {Sessions} = useSelector(state => state.GetSession);
  const {container, innerContainer, childContainer, mainContainer} = styles;
  const {loading} = useSelector(state => state.getstudent);
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

  const onSubmit = () => {
    var momentDate = moment(duesDate, 'DD/MM/YYYY');

    dispatch(GeOtherFees(courseorclass, momentDate, sessionname, sectionname));
  };

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
              style={{height: deviceHeight * 0.3}}
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
                  <View style={{width: '45%'}}>
                    <View style={{marginHorizontal: deviceWidth * 0.01}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          lineHeight: 19,
                        }}>
                        Session
                      </Text>
                      <Dropdown
                        style={styles.dropstyle}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={
                          sessionList &&
                          sessionList?.map(item => ({
                            label: `${item?.Session}`,
                            value: `${item?.Session}`,
                          }))
                        }
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Session"
                        searchPlaceholder="Search..."
                        value={sessionname}
                        onChange={item => {
                          setsessionname(item.value);
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{width: '45%', marginBottom: deviceHeight * 0.02}}>
                    <View style={{marginHorizontal: deviceWidth * 0.01}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          lineHeight: 19,
                        }}>
                        Section
                      </Text>
                      <Dropdown
                        style={styles.dropstyle}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={
                          sectionlist &&
                          sectionlist?.map(item => ({
                            label: `${item?.section}`,
                            value: `${item?.section}`,
                          }))
                        }
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Section"
                        searchPlaceholder="Search..."
                        value={sectionname}
                        onChange={item => {
                          setsectionname(item.value);
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.rowwrapper}>
                  <View style={{width: '45%'}}>
                    <View style={{marginHorizontal: deviceWidth * 0.01}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          lineHeight: 19,
                        }}>
                        Class
                      </Text>
                      <Dropdown
                        style={styles.dropstyle}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={
                          courselist &&
                          courselist?.map(item => ({
                            label: `${item?.coursename}`,
                            value: `${item?.coursename}`,
                          }))
                        }
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Class"
                        searchPlaceholder="Search..."
                        value={courseorclass}
                        onChange={item => {
                          setcourseorclass(item.value);
                        }}
                      />
                    </View>
                  </View>

                  <View style={{width: '49%', marginLeft: 20}}>
                    <RNDatePicker
                      title="Select Date"
                      value={duesDate}
                      onDateChange={date => setduesDate(handleDate(date))}
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

export default FilterOtherFee;

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
