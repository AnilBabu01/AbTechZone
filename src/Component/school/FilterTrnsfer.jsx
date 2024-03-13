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
import {Height, Width} from '../../utils/responsive';
import RNDatePicker from '../RNDatePicker';
import RNButton from '../RNButton';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {handleDate, getTodaysDate} from '../../utils/functions';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector, useDispatch} from 'react-redux';
import {GetTransferAmmount} from '../../redux/action/expensesActions';
import moment from 'moment';
const PayModes = [
  {
    label: 'Cash',
    value: 'Cash',
  },
  {
    label: 'Online',
    value: 'Online',
  },
  {
    label: 'Dues',
    value: 'Dues',
  },
];

const FilterTrnsfer = ({showModal, setShowModal}) => {
  const dispatch = useDispatch();
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [sessionname, setsessionname] = useState('');
  const [PayOption, setPayOption] = useState('');
  const [sessionList, setsessionList] = useState([]);
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);
  const {Sessions} = useSelector(state => state.GetSession);
  const {container, innerContainer, childContainer, mainContainer} = styles;
  const {loading} = useSelector(state => state.GetExpenses);
  const onSubmit = () => {
    let fromdatenew = fromdate ? moment(fromdate, 'YYYY-MM-DD') : '';
    let todatenew = todate ? moment(todate, 'YYYY-MM-DD') : '';
    dispatch(
      GetTransferAmmount(fromdatenew, todatenew, PayOption, sessionname),
    );
  };

  useEffect(() => {
    if (CURRENTSESSION) {
      setsessionname(CURRENTSESSION);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
  }, [CURRENTSESSION, Sessions]);
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
              position: 'relative',
              backgroundColor: Colors.white,
            }}>
            <ScrollView
              style={{height: deviceHeight * 0.3}}
              showsVerticalScrollIndicator={false}>
              <View style={styles.rowwrapper}>
                <View style={{width: '49.3%'}}>
                  <View style={{marginHorizontal: deviceWidth * 0.01}}>
                    <Text
                      style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                      Session
                    </Text>
                    <Dropdown
                      style={styles.dropstyle10}
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
                      placeholder="Please Select"
                      searchPlaceholder="Search..."
                      value={sessionname}
                      onChange={item => {
                        setsessionname(item.value);
                      }}
                    />
                  </View>
                </View>
                <View style={{width: '49.3%'}}>
                  <View style={{marginHorizontal: deviceWidth * 0.01}}>
                    <Text
                      style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                      PayMent Mode
                    </Text>
                    <Dropdown
                      style={styles.dropstyle10}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={PayModes}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="All"
                      searchPlaceholder="Search..."
                      value={PayOption}
                      onChange={item => {
                        setPayOption(item.value);
                      }}
                    />
                  </View>
                </View>
              </View>

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
            </ScrollView>
            <View style={styles.bottomBtn}>
              <RNButton loading={loading} onPress={onSubmit}>
                Submit
              </RNButton>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FilterTrnsfer;

const styles = StyleSheet.create({
  dropstyle: {
    alignSelf: 'center',
    width: Width(325),
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
    marginHorizontal: deviceWidth * 0.02,
    marginVertical: deviceHeight * 0.01,
  },
});
