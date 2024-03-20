import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {primary} from '../../utils/Colors';
  import moment from 'moment';
  import {useNavigation} from '@react-navigation/native';
  import {useDispatch} from 'react-redux';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {Height, Width} from '../../utils/responsive';
  import {Colors} from '../../utils/Colors';
  import {deviceHeight, deviceWidth} from '../../utils/constant';
  
  const compareMonths = (a, b) => {
    const monthsOrder = [
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
      'January',
      'February',
      'March',
    ];
  
    return monthsOrder.indexOf(a.MonthName) - monthsOrder.indexOf(b.MonthName);
  };
  
  const MonthFee = ({data}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
  
    const [showinfo, setshowinfo] = useState('');
  
    return (
      <View>
        <ScrollView>
          <View style={styles.connainer}>
            <View style={styles.card10}>
              <View style={styles.headerarray}>
                <Text style={{color: Colors.white}}>
                  Session :{data?.student?.Session}
                </Text>
                <Text style={{color: Colors.white}}>
                  Section :{data?.student?.Section}
                </Text>
                <TouchableOpacity onPress={() => setshowinfo(!showinfo)}>
                  <Ionicons
                    name={showinfo ? 'arrow-down' : 'arrow-up'}
                    size={Height(22)}
                    color={Colors.white}
                  />
                </TouchableOpacity>
              </View>
  
              <View style={styles.dateview}>
                <View style={styles.cardContent}>
                  <Text style={styles.title}>SRNO</Text>
                  <Text style={styles.datatext}>
                    {data?.student?.SrNumber ? data?.student?.SrNumber : '-'}
                  </Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.title}>Roll_No</Text>
                  <Text style={styles.datatext}>
                    {data?.student?.rollnumber ? data?.student?.rollnumber : '-'}
                  </Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.title}>Student_Name</Text>
                  <Text style={styles.datatext}>
                    {data?.student?.name ? data?.student?.name : '-'}
                  </Text>
                </View>
              </View>
  
              {showinfo && (
                <>
                  <View style={styles.headerdata}>
                    <Text style={{color: Colors.white}}>Academin Fee</Text>
                  </View>
  
                  {data?.schollfee?.sort(compareMonths)?.map((data, index) => {
                    return (
                      <View style={styles.dateview} key={index}>
                        <View style={styles.statusview}>
                          <Text style={styles.title}>
                            MonthName :
                            <Text style={styles.datatext}>{data?.MonthName}</Text>
                          </Text>
                        </View>
  
                        <View style={styles.statusview}>
                          <Text style={styles.title}>
                            Status :
                            <Text style={styles.datatext}>
                              {data?.paidStatus
                                ? `Paid (${data?.PerMonthFee})`
                                : `Dues (${data?.PerMonthFee})`}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    );
                  })}
  
                  {data?.student?.hostal && (
                    <>
                      <View style={styles.headerdata}>
                        <Text style={{color: Colors.white}}>Hostel Fee</Text>
                      </View>
  
                      {data?.hostelfee
                        ?.sort(compareMonths)
                        ?.map((data, index) => {
                          return (
                            <View style={styles.dateview} key={index}>
                              <View style={styles.statusview}>
                                <Text style={styles.title}>
                                  MonthName :
                                  <Text style={styles.datatext}>
                                    {data?.MonthName}
                                  </Text>
                                </Text>
                              </View>
  
                              <View style={styles.statusview}>
                                <Text style={styles.title}>
                                  Status :
                                  <Text style={styles.datatext}>
                                    {data?.paidStatus
                                      ? `Paid ${data?.PerMonthFee}`
                                      : `Dues (${data?.PerMonthFee})`}
                                  </Text>
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                    </>
                  )}
  
                  {data?.student?.Transport && (
                    <>
                      <View style={styles.headerdata}>
                        <Text style={{color: Colors.white}}>Transport Fee</Text>
                      </View>
  
                      {data?.transportfee
                        ?.sort(compareMonths)
                        ?.map((data, index) => {
                          return (
                            <View style={styles.dateview} key={index}>
                              <View style={styles.statusview}>
                                <Text style={styles.title}>
                                  MonthName :
                                  <Text style={styles.datatext}>
                                    {data?.MonthName}
                                  </Text>
                                </Text>
                              </View>
  
                              <View style={styles.statusview}>
                                <Text style={styles.title}>
                                  Status :
                                  <Text style={styles.datatext}>
                                    {data?.paidStatus
                                      ? `Paid (${data?.PerMonthFee})`
                                      : `Dues (${data?.PerMonthFee})`}
                                  </Text>
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                    </>
                  )}
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default MonthFee;
  
  const styles = StyleSheet.create({
    statusview: {
      width: '50%',
      marginBottom: deviceHeight * 0.01,
      display:"flex",
      alignItems:"center"
    },
    cardContent: {
      width: '30%',
      marginBottom: deviceHeight * 0.01,
    },
    dateview: {
      display: 'flex',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
    },
    title: {
      fontSize: 14,
      color: Colors.black,
    },
    datatext: {
      fontSize: 17,
      fontWeight: 'bold',
      color: Colors.black,
    },
    mainActionView: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      width: '20%',
      justifyContent: 'space-between',
    },
    card10: {
      backgroundColor: 'white',
      borderRadius: 8,
      width: '100%',
      marginVertical: 10,
    },
    viewdel: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      marginBottom: 10,
      display: 'flex',
      justifyContent: 'space-around',
      paddingHorizontal: 10,
    },
    viewdelbtn: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    donationButton: {
      backgroundColor: primary,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 3,
      borderRadius: 10,
      width: '45%',
      height: 40,
    },
    avtiveText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 17,
    },
  
    headerarray: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      marginBottom: 10,
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: Colors.primary,
      borderTopLeftRadius: deviceWidth * 0.02,
      borderTopRightRadius: deviceWidth * 0.02,
      paddingVertical: deviceWidth * 0.02,
      paddingHorizontal: deviceWidth * 0.02,
    },
  
    headerdata: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      marginBottom: 10,
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: Colors.primary,
      // borderTopLeftRadius: deviceWidth * 0.02,
      // borderTopRightRadius: deviceWidth * 0.02,
      paddingVertical: deviceWidth * 0.02,
      paddingHorizontal: deviceWidth * 0.02,
    },
  });
  