import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import RNBDropDown from '../../../Component/RNBDropDown';
import RNButton from '../../../Component/RNButton';
import {useSelector, useDispatch} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import {Colors} from '../../../utils/Colors';
import {RadioButton} from 'react-native-paper';
import BackHeader from '../../../Component/Header/BackHeader';
import {GetPayRoll} from '../../../redux/action/payrollActions';
import {useNavigation} from '@react-navigation/native';
const AddPayRool = () => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [PayOption, setPayOption] = useState('Cash');
  const [allDetails, setallDetails] = useState('');
  const [sessionname, setsessionname] = useState('');
  const [empid, setempid] = useState('');
  const [paying, setpaying] = useState(false);
  const [getingmonths, setgetingmonths] = useState(false);
  const [monthlist, setmonthlist] = useState([]);
  const {Sessions} = useSelector(state => state.GetSession);
  const {employees} = useSelector(state => state.getemp);
  const {user} = useSelector(state => state.auth);
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);

  console.log('selectItem', allDetails);

  const getMonthList = () => {
    try {
      setgetingmonths(true);
      const data = {
        empid: Number(empid),
        Session: sessionname,
      };
      serverInstance('payroll/getMonths', 'post', data).then(res => {
        if (res?.status) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
          setmonthlist(res?.data);
          setgetingmonths(false);
        }
      });
    } catch (error) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Something Went Wrong',
      });
      setgetingmonths(false);
    }
  };

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

  const paysalary = payableamount => {
    try {
      setpaying(true);
      const data = {
        empid: empid,
        paidAmount: payableamount,
        allDetails: allDetails,
        sessionname: sessionname,
        PayOption: PayOption,
      };
      serverInstance('payroll/payempsalary', 'post', data).then(res => {
        if (res?.status) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
          dispatch(GetPayRoll());
          navigate.goBack();
          setpaying(false);
        }

        if (res?.status === false) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res?.msg,
          });
          dispatch(GetPayRoll());
        }
      });
    } catch (error) {
      setpaying(false);
    }
  };

  const totalopen = attendance => {
    let count = 0;
    (attendance &&
    attendance[0]?.monthNumber === Number(new Date().getMonth()) + 1
      ? attendance?.slice(0, Number(new Date()?.toISOString().substring(8, 10)))
      : attendance
    )?.filter(item => {
      if (
        item?.attendaceStatusIntext === 'Present' ||
        item?.attendaceStatusIntext === 'Absent' ||
        item?.attendaceStatusIntext === 'Present Half'
      ) {
        count = count + 1;
      }
    });

    return count;
  };

  const totalpresent = attendance => {
    let count = 0;
    (attendance &&
    attendance[0]?.monthNumber === Number(new Date().getMonth()) + 1
      ? attendance?.slice(0, Number(new Date()?.toISOString().substring(8, 10)))
      : attendance
    )?.filter(item => {
      if (
        item?.attendaceStatusIntext === 'Present' ||
        item?.attendaceStatusIntext === 'Present Half'
      ) {
        count = count + 1;
      }
    });

    return count;
  };

  const totalpresentIncludeSunday = attendance => {
    let count = 0;
    let absnt = 0;
    (attendance &&
    attendance[0]?.monthNumber === Number(new Date().getMonth()) + 1
      ? attendance?.slice(0, Number(new Date()?.toISOString().substring(8, 10)))
      : attendance
    )?.filter(item => {
      if (item?.attendaceStatusIntext === 'Present') {
        count = count + 1;
      }
    });

    (attendance &&
    attendance[0]?.monthNumber === Number(new Date().getMonth()) + 1
      ? attendance?.slice(0, Number(new Date()?.toISOString().substring(8, 10)))
      : attendance
    )?.filter(item => {
      if (item?.attendaceStatusIntext === 'Absent') {
        absnt = absnt + 1;
      }
    });

    if (
      (attendance && attendance[0]?.MonthName === 'January') ||
      (attendance && attendance[0]?.MonthName === 'March') ||
      (attendance && attendance[0]?.MonthName === 'May') ||
      (attendance && attendance[0]?.MonthName === 'July') ||
      (attendance && attendance[0]?.MonthName === 'August') ||
      (attendance && attendance[0]?.MonthName === 'October') ||
      (attendance && attendance[0]?.MonthName === 'December')
    ) {
      if (absnt > Number(allDetails?.monthdetials?.AllowLeave)) {
        return (count =
          count +
          absnt -
          (absnt - Number(allDetails?.monthdetials?.AllowLeave)));
      }
      return count + absnt;
    }

    if (attendance && attendance[0]?.MonthName === 'February') {
      if (absnt > Number(allDetails?.monthdetials?.AllowLeave)) {
        return (
          (count =
            count +
            absnt -
            (absnt - Number(allDetails?.monthdetials?.AllowLeave))) + 4
        );
      }
      return count + absnt + 4;
    }

    if (
      (attendance && attendance[0]?.MonthName === 'April') ||
      (attendance && attendance[0]?.MonthName === 'June') ||
      (attendance && attendance[0]?.MonthName === 'September') ||
      (attendance && attendance[0]?.MonthName === 'November')
    ) {
      if (absnt > Number(allDetails?.monthdetials?.AllowLeave)) {
        return (
          (count =
            count +
            absnt -
            (absnt - Number(allDetails?.monthdetials?.AllowLeave))) + 4
        );
      }
      return count + absnt + 4;
    }
  };

  const totalabsent = attendance => {
    let count = 0;
    (attendance &&
    attendance[0]?.monthNumber === Number(new Date().getMonth()) + 1
      ? attendance?.slice(0, Number(new Date()?.toISOString().substring(8, 10)))
      : attendance
    )?.filter(item => {
      if (item?.attendaceStatusIntext === 'Absent') {
        count = count + 1;
      }
    });

    return count;
  };

  const totalhalfdays = attendance => {
    let count = 0;
    attendance?.filter(item => {
      if (item?.attendaceStatusIntext === 'Present Half') {
        count = count + 1;
      }
    });

    return count;
  };

  useEffect(() => {
    if (CURRENTSESSION) {
      setsessionname(CURRENTSESSION);
    }
  }, [CURRENTSESSION]);

  return (
    <>
      <BackHeader title={'Pay Salary'} />
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.flexViewWrap}>
            <View style={{width: '45%'}}>
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

            <View style={{width: '45%'}}>
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

          <View>
            <RNButton
              loading={getingmonths}
              style={{paddingHorizontal: 25}}
              onPress={() => {
                getMonthList();
              }}>
              Get Month List
            </RNButton>
          </View>

          <View style={{paddingVertical: 20}}>
            {monthlist &&
              monthlist?.sort(compareMonths)?.map((item, index) => {
                return (
                  <View style={styles.flexmonthName} key={index}>
                    <RadioButton.Android
                      value={item?.MonthName}
                      disabled={item?.status}
                      status={
                        allDetails?.MonthName === item?.MonthName
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => setallDetails(item)}
                      color="#007BFF"
                    />

                    <Text style={{fontWeight: 'bold', color: Colors.black}}>
                      {item?.MonthName},{item?.Year}
                    </Text>
                  </View>
                );
              })}
          </View>

          <View>
            {allDetails && (
              <>
                <View style={styles.empView}>
                  <Text style={{fontWeight: 'bold', color: Colors.black}}>
                    Employee Id : {allDetails?.monthdetials?.empId}
                  </Text>
                  <Text style={{fontWeight: 'bold', color: Colors.black}}>
                    Employee Name : {allDetails?.monthdetials?.name}
                  </Text>
                  <Text style={{fontWeight: 'bold', color: Colors.black}}>
                    Designation : {allDetails?.monthdetials?.employeeof}
                  </Text>
                  <Text style={{fontWeight: 'bold', color: Colors.black}}>
                    Allow Leave : {allDetails?.monthdetials?.AllowLeave}
                  </Text>

                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: Colors.black,
                      fontSize: 25,
                      marginVertical: 10,
                    }}>
                    Salary Details
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', color: Colors.black}}>
                      Earnings
                    </Text>
                    <Text style={{fontWeight: 'bold', color: Colors.black}}>
                      Amount
                    </Text>
                    <Text style={{fontWeight: 'bold', color: Colors.black}}>
                      Deduction
                    </Text>
                    <Text style={{fontWeight: 'bold', color: Colors.black}}>
                      Amount
                    </Text>
                  </View>
                  {allDetails?.monthdetials?.Allowance1 && (
                    <>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontWeight: 'bold', color: Colors.black}}>
                          {allDetails?.monthdetials?.Allowance1}
                        </Text>
                        <Text style={{fontWeight: 'bold', color: Colors.black}}>
                          {allDetails?.monthdetials?.AllowanceAmount1}
                        </Text>
                        <Text style={{fontWeight: 'bold', color: Colors.black}}>
                          {allDetails?.monthdetials?.Deduction1}
                        </Text>
                        <Text style={{fontWeight: 'bold', color: Colors.black}}>
                          {allDetails?.monthdetials?.DeductionAmount1}
                        </Text>
                      </View>
                    </>
                  )}

                  {allDetails?.monthdetials?.Allowance2 && (
                    <>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontWeight: 'bold', color: Colors.black}}>
                          {allDetails?.monthdetials?.Allowance2}
                        </Text>
                        <Text style={{fontWeight: 'bold', color: Colors.black}}>
                          {allDetails?.monthdetials?.AllowanceAmount2}
                        </Text>
                        <Text style={{fontWeight: 'bold', color: Colors.black}}>
                          {allDetails?.monthdetials?.Deduction2}
                        </Text>
                        <Text style={{fontWeight: 'bold', color: Colors.black}}>
                          {allDetails?.monthdetials?.DeductionAmount2}
                        </Text>
                      </View>
                    </>
                  )}

                  {allDetails?.monthdetials?.Allowance3 && (
                    <>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontWeight: 'bold', color: Colors.black}}>
                          {allDetails?.monthdetials?.Allowance3}
                        </Text>
                        <Text style={{fontWeight: 'bold', color: Colors.black}}>
                          {allDetails?.monthdetials?.AllowanceAmount3}
                        </Text>
                        <Text style={{fontWeight: 'bold', color: Colors.black}}>
                          &nbsp;
                        </Text>
                        <Text style={{fontWeight: 'bold', color: Colors.black}}>
                          &nbsp;
                        </Text>
                      </View>
                    </>
                  )}

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', color: Colors.black}}>
                      Total
                    </Text>
                    <Text style={{fontWeight: 'bold', color: Colors.black}}>
                      {Number(allDetails?.monthdetials?.basicsalary) +
                        Number(allDetails?.monthdetials?.AllowanceAmount1) +
                        Number(allDetails?.monthdetials?.AllowanceAmount3) +
                        Number(allDetails?.monthdetials?.AllowanceAmount3)}
                    </Text>
                    <Text style={{fontWeight: 'bold', color: Colors.black}}>
                      &nbsp;
                    </Text>
                    <Text style={{fontWeight: 'bold', color: Colors.black}}>
                      {Number(allDetails?.monthdetials?.DeductionAmount1) +
                        Number(allDetails?.monthdetials?.DeductionAmount2)}
                    </Text>
                  </View>
                  <View style={styles.mainViewis}>
                    <View style={{paddingHorizontal: 10}}>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        Day
                      </Text>
                      {allDetails?.days?.map((item, index) => {
                        return (
                          <View key={index}>
                            <Text
                              style={{fontWeight: 'bold', color: Colors.black}}>
                              {item}
                            </Text>
                          </View>
                        );
                      })}
                    </View>

                    <View style={{paddingHorizontal: 10}}>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        Status
                      </Text>
                      {allDetails?.attendance != null &&
                        (allDetails?.attendance[0]?.monthNumber ===
                        Number(new Date().getMonth()) + 1
                          ? allDetails?.attendance?.slice(
                              0,
                              Number(
                                new Date()?.toISOString().substring(8, 10),
                              ),
                            )
                          : allDetails?.attendance
                        )?.map((item, index) => {
                          return (
                            <View key={index}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: Colors.black,
                                }}>
                                {item?.attendaceStatusIntext === 'Present' && (
                                  <>P</>
                                )}
                                {item?.attendaceStatusIntext ===
                                  'Present Half' && <>HD</>}
                                {item?.attendaceStatusIntext === 'Absent' && (
                                  <>A</>
                                )}
                                {item?.attendaceStatusIntext === 'Holiday' && (
                                  <>{item?.DayName === 'Sunday' ? 'S' : 'H'}</>
                                )}
                                {item?.attendaceStatusIntext === 'On Leave' && (
                                  <>L</>
                                )}
                              </Text>
                            </View>
                          );
                        })}
                    </View>
                    <View>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        Working days{' '}
                        {allDetails && totalopen(allDetails?.attendance)}
                      </Text>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        Total Present{' '}
                        {allDetails && totalpresent(allDetails?.attendance)}
                      </Text>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        Total Absent{' '}
                        {allDetails && totalabsent(allDetails?.attendance)}
                      </Text>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        Payable Amount (
                        {Math.abs(
                          Math.floor(
                            Number(allDetails?.monthdetials?.basicsalary) / 30,
                          ) *
                            totalpresentIncludeSunday(allDetails?.attendance) +
                            Number(allDetails?.monthdetials?.AllowanceAmount1) +
                            Number(allDetails?.monthdetials?.AllowanceAmount2) +
                            Number(allDetails?.monthdetials?.AllowanceAmount3) +
                            (Math.floor(
                              Number(allDetails?.monthdetials?.basicsalary) /
                                30,
                            ) /
                              2) *
                              totalhalfdays(allDetails?.attendance) -
                            (Number(
                              allDetails?.monthdetials?.DeductionAmount1,
                            ) +
                              Number(
                                allDetails?.monthdetials?.DeductionAmount2,
                              )),
                        )}
                        )
                      </Text>
                      <Text style={{fontWeight: 'bold', color: Colors.black}}>
                        Payment Mode
                      </Text>

                      <View style={styles.radioButton}>
                        <RadioButton.Android
                          value="Cash"
                          status={
                            PayOption === 'Cash' ? 'checked' : 'unchecked'
                          }
                          onPress={() => setPayOption('Cash')}
                          color="#007BFF"
                        />
                        <Text style={styles.radioLabel}>Cash</Text>
                      </View>

                      <View style={styles.radioButton}>
                        <RadioButton.Android
                          value="Online"
                          status={
                            PayOption === 'Online' ? 'checked' : 'unchecked'
                          }
                          onPress={() => setPayOption('Online')}
                          color="#007BFF"
                        />
                        <Text style={styles.radioLabel}>Online</Text>
                      </View>
                      <RNButton
                        disabled={
                          allDetails?.paidStatus === true ? true : false
                        }
                        loading={getingmonths}
                        style={{paddingHorizontal: 25}}
                        onPress={() => {
                          paysalary(
                            Math.abs(
                              Math.floor(
                                Number(allDetails?.monthdetials?.basicsalary) /
                                  30,
                              ) *
                                totalpresentIncludeSunday(
                                  allDetails?.attendance,
                                ) +
                                Number(
                                  allDetails?.monthdetials?.AllowanceAmount1,
                                ) +
                                Number(
                                  allDetails?.monthdetials?.AllowanceAmount2,
                                ) +
                                Number(
                                  allDetails?.monthdetials?.AllowanceAmount3,
                                ) +
                                (Math.floor(
                                  Number(
                                    allDetails?.monthdetials?.basicsalary,
                                  ) / 30,
                                ) /
                                  2) *
                                  totalhalfdays(allDetails?.attendance) -
                                (Number(
                                  allDetails?.monthdetials?.DeductionAmount1,
                                ) +
                                  Number(
                                    allDetails?.monthdetials?.DeductionAmount2,
                                  )),
                            ),
                          );
                        }}>
                        {allDetails?.paidStatus === true
                          ? 'Already Paid'
                          : 'Pay'}
                      </RNButton>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AddPayRool;

const styles = StyleSheet.create({
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
    color: Colors.black,
    fontWeight: 'bold',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainViewis: {
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: Colors.primary,
    marginVertical: 20,
    paddingVertical: 10,
  },
  empView: {
    borderWidth: 1,
    borderColor: Colors.black,
    padding: '1%',
  },
  flexmonthName: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexViewWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
