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
import RNDatePicker from '../RNDatePicker';
import RNButton from '../RNButton';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {handleDate, getTodaysDate} from '../../utils/functions';
import RNBDropDown from '../RNBDropDown';
import RNInputField from '../RNInputField';
import {useDispatch, useSelector} from 'react-redux';
import {GetPayRoll} from '../../redux/action/payrollActions';
import moment from 'moment';
const SalaryFilter = ({showModal, setShowModal}) => {
  const dispatch = useDispatch();
  const [empId, setempId] = useState('');
  const [sessionname, setsessionname] = useState('');
  const [empname, setempname] = useState('');
  const [empid, setempid] = useState('');
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const {Sessions} = useSelector(state => state.GetSession);
  const {employees} = useSelector(state => state.getemp);
  const {user} = useSelector(state => state.auth);
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);
  const {container, innerContainer, childContainer, mainContainer} = styles;
  const {loading, payroll} = useSelector(state => state.GetPayRoll);
  const onSubmit = () => {
    var momentfromdate = moment(fromdate, 'DD/MM/YYYY');
    var newadminssiondate = momentfromdate.format('YYYY-MM-DD');
    var momenttodate = moment(todate, 'DD/MM/YYYY');
    var newDateOfBirth = momenttodate.format('YYYY-MM-DD');

    dispatch(
      GetPayRoll(
        empid,
        empname,
        sessionname,
        newadminssiondate,
        newDateOfBirth,
      ),
    );
  };

  useEffect(() => {
    if (CURRENTSESSION) {
      setsessionname(CURRENTSESSION);
    }
  }, [CURRENTSESSION]);
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
              style={{height: deviceHeight * 0.5}}
              showsVerticalScrollIndicator={false}>
              <View style={styles.rowwrapper}>
                <View style={{width: '49.3%'}}>
                  <RNBDropDown
                    label="Session"
                    value={sessionname}
                    OptionsList={
                      Sessions &&
                      Sessions?.map(item => ({
                        label: `${item?.Session}`,
                        value: `${item?.Session}`,
                      }))
                    }
                    onChange={data => setsessionname(data.value)}
                  />
                </View>
                <View style={{width: '49.3%'}}>
                  <RNBDropDown
                    label="Emp Id"
                    value={empid}
                    OptionsList={
                      employees &&
                      employees?.map(item => ({
                        label: `${item?.name}`,
                        value: `${item?.id}`,
                      }))
                    }
                    onChange={data => setempid(data.value)}
                  />
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

              <View style={styles.rowwrapper}>
                <View style={{width: '100%'}}>
                  <RNInputField
                    title="Emp Id"
                    value={empId}
                    onChangeText={data => setempId(data)}
                    placeholder="Enter Emp Id"
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

export default SalaryFilter;

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
    marginHorizontal: deviceWidth * 0.02,
  },
});
