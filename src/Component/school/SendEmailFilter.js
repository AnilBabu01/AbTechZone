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
  import {getEmployee} from '../../redux/action/commanAction';
  
  const EmpStatus = [
    {label: 'Active', value: 'Active'},
    {label: 'On Leave', value: 'On Leave'},
    {label: 'Left', value: 'Left'},
  ];
  
  const SendEmailFilter = ({showModal, setShowModal}) => {
    const dispatch = useDispatch();
    const [empId, setempId] = useState('');
    const [empdeparment, setempdeparment] = useState('');
    const [empdesination, setempdesination] = useState('');
    const [status, setstatus] = useState('');
    const [isdata, setisData] = useState([]);
    const [isdata1, setisdata1] = useState([]);
    const {loading} = useSelector(state => state.getemp);
    const {designation} = useSelector(state => state.getdesignation);
    const {department} = useSelector(state => state.getpart);
  
    const {container, innerContainer, childContainer, mainContainer} = styles;
  
    const onSubmit = () => {
      dispatch(
        getEmployee('', '', '', status, empId, empdeparment, empdesination),
      );
    };
  
    useEffect(() => {
      setisData(designation);
      setisdata1(department, department);
    }, []);
  
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
  
                paddingHorizontal: deviceWidth * 0.02,
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
                          Designation
                        </Text>
                        <Dropdown
                          style={styles.dropstyle}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={
                            isdata &&
                            isdata?.map(item => ({
                              label: `${item?.employeetype}`,
                              value: `${item?.employeetype}`,
                            }))
                          }
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select "
                          searchPlaceholder="Search..."
                          value={empdesination}
                          onChange={item => {
                            setempdesination(item.value);
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
                          Deparment
                        </Text>
                        <Dropdown
                          style={styles.dropstyle}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={
                            isdata1 &&
                            isdata1?.map(item => ({
                              label: `${item?.DepartmentName}`,
                              value: `${item?.DepartmentName}`,
                            }))
                          }
                          search
                          maxHeight={300}
                          defaultValue={'NONE'}
                          labelField="label"
                          valueField="value"
                          placeholder="Select "
                          searchPlaceholder="Search..."
                          value={empdeparment}
                          onChange={item => {
                            setempdeparment(item.value);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.rowwrapper}>
                    <View style={{width: '49.3%'}}>
                      <View style={{marginHorizontal: deviceWidth * 0.01}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '600',
                            lineHeight: 19,
                          }}>
                          Status
                        </Text>
                        <Dropdown
                          style={styles.dropstyle}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={EmpStatus}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select Status"
                          searchPlaceholder="Search..."
                          value={status}
                          onChange={item => {
                            setstatus(item.value);
                          }}
                        />
                      </View>
                    </View>
                    <View style={{width: '49.3%'}}>
                      <RNInputField
                        label="Employee Id"
                        placeholder="Enter Emp Id"
                        value={empId}
                        onChangeText={data => setempId(data)}
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
  
  export default SendEmailFilter;
  
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
      marginBottom: deviceWidth * 0.01,
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
  