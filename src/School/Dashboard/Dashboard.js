import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import {List} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import TotalCard from './Card/TotalCard';
import Staff from '../../assets/staff.png';
import Student from '../../assets/students.webp';
import Parent from '../../assets/parents.png';
import rupppe from '../../assets/rupppe.png';
import Rupee1 from '../../assets/rupee1.png';
import Rupee2 from '../../assets/rupee2.png';
import redrupee from '../../assets/redrupee.png';
import Linechart from './Chart/Linechart';
import ExpensexLineChart from './Chart/ExpensexLineChart';
import Header from '../../Component/Header/Header';
import {primary} from '../../utils/Colors';
import {GetSession, getcurrentsession} from '../../redux/action/commanAction';
import {serverInstance} from '../../API/ServerInstance';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DashboardPlaceholderLoader from '../../Component/DashboardPlaceholderLoader';
import Toast from 'react-native-toast-message';
import RNBDropDown from '../../Component/RNBDropDown';
import RNButton from '../../Component/RNButton';

const searchbydata = [
  {
    label: 'Search By Month',
    value: 'Month',
  },
  {
    label: 'Search By Session',
    value: 'session',
  },
];

const monthlist = [
  {
    id: 1,
    name: 'April',
  },
  ,
  {
    id: 2,
    name: 'May',
  },
  {
    id: 3,
    name: 'June',
  },
  {
    id: 4,
    name: 'July',
  },
  {
    id: 5,
    name: 'August',
  },
  {
    id: 6,
    name: 'September',
  },
  {
    id: 7,
    name: 'October',
  },
  {
    id: 8,
    name: 'November',
  },
  {
    id: 9,
    name: 'December',
  },
  {
    id: 10,
    name: 'January',
  },
  {
    id: 11,
    name: 'February',
  },
  {
    id: 12,
    name: 'March',
  },
];

const monthnamelist = {
  1: 'April',

  2: 'May',

  3: 'June',

  4: 'July',

  5: 'August',

  6: 'September',

  7: 'October',

  8: 'November',

  9: 'December',
  10: 'January',

  11: 'February',

  12: 'March',
};

const MonthNolist = {
  April: 1,
  May: 2,
  June: 3,
  July: 4,
  August: 5,
  September: 6,
  October: 7,
  November: 8,
  December: 9,
  January: 10,
  February: 11,
  March: 12,
};

const MonthNolistForExpenses = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [searching, setsearching] = useState(false);
  let currmonth = new Date().getMonth();

  const currentDate = new Date();
  const currentMonthName = currentDate.toLocaleString('default', {
    month: 'long',
  });
  const currentMonthNumber = MonthNolist[currentMonthName];
  const [searchMon, setsearchMon] = useState(monthnamelist[currentMonthNumber]);

  const [monthExpenses, setmonthExpenses] = useState(currmonth + 1);
  const [searchoptiond, setsearchoptiond] = useState('Month');
  const [searchsession, setsearchsession] = useState('');

  const [loading, setloading] = useState(false);
  const [loadingpaidfee, setloadingpaidfee] = useState(false);
  const [loadingexpenses, setloadingexpenses] = useState(false);
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [alltotaldata, setalltotaldata] = useState('');
  const [sessionList, setsessionList] = useState([]);
  const [LineChartSession, setLineChartSession] = useState('Short by Session');
  const [BarCharSession, setBarCharSession] = useState('Short by Session');
  const [LinstFeepaidList, setLinstFeepaidList] = useState([]);
  const [BarFeepaidList, setBarFeepaidList] = useState([]);

  const [LineChartSessionExpenses, setLineChartSessionExpenses] =
    useState('Short by Session');
  const [BarCharSessionExpenses, setBarCharSessionExpenses] =
    useState('Short by Session');
  const [LinstExpensesList, setLinstExpensesList] = useState([]);
  const [BarExpensesList, setBarExpensesList] = useState([]);
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);
  const {Sessions} = useSelector(state => state.GetSession);
  const {secondaryTitle, accordionTitle, filterBtnContainer, fabStyle} = styles;

  const getTotalDashborData = () => {
    try {
      setloading(true);

      serverInstance('dashboard/GetAllTotalData', 'post', {
        searchmonth: searchMon,
        searchsession: searchsession,
        searchoption: searchoptiond,
        monthExpenses: MonthNolist[searchMon],
        originMonthNo: MonthNolistForExpenses[searchMon],
      }).then(res => {
        if (res?.status === true) {
          setalltotaldata(res?.data);
          // setLinstFeepaidList(res?.data?.ReceiptChartdata);
          // setBarFeepaidList(res?.data?.ReceiptChartdata);
          setBarExpensesList(res?.data?.ExpensesChartdata);
          setLinstExpensesList(res?.data?.ExpensesChartdata);
          // Toast.show({
          //   type: 'success',
          //   text1: 'Success',
          //   text2: res?.msg,
          // });
          setloading(false);
        }

        console.log('res?.data', res?.data?.OverallCollectedFee);

        if (res?.status === false) {
          setloading(false);
        }
      });
    } catch (error) {
      setloading(false);
    }
  };

  const getPaidFeeLineChart = session => {
    setloadingpaidfee(true);
    serverInstance('dashboard/GetFeePaidChart', 'post', {
      sessionname: session ? session : LineChartSession,
    }).then(res => {
      if (res?.status === true) {
        setLinstFeepaidList(res?.data);
        setloadingpaidfee(false);
      }
      if (res?.status === false) {
        setloadingpaidfee(false);
      }
    });
  };

  // const getPaidFeeBarChart = session => {
  //   serverInstance('dashboard/GetFeePaidChart', 'post', {
  //     sessionname: session ? session : LineChartSession,
  //   }).then(res => {
  //     if (res?.status === true) {
  //       setBarFeepaidList(res?.data);
  //     }
  //   });
  // };

  const getExpensesLineChart = session => {
    setloadingexpenses(true);
    serverInstance('dashboard/GetExpensesChart', 'post', {
      sessionname: session ? session : LineChartSession,
    }).then(res => {
      if (res?.status === true) {
        setLinstExpensesList(res?.data);
        setloadingexpenses(false);
        console.log('line exgfhdvcxbvcxnvbnpenses data is', res?.data);
      }

      if (res?.status === false) {
        setLinstExpensesList(res?.data);
        setloadingexpenses(false);
        console.log('line exgfhdvcxbvcxnvbnpenses data is', res?.data);
      }
    });
  };

  // const getExpensesBarChart = session => {
  //   serverInstance('dashboard/GetExpensesChart', 'post', {
  //     sessionname: session ? session : LineChartSession,
  //   }).then(res => {
  //     if (res?.status === true) {
  //       setBarExpensesList(res?.data);
  //     }
  //   });
  // };

  const totalpresent = attendance => {
    let count = 0;
    attendance?.filter(item => {
      if (
        item?.attendaceStatusIntext === 'Present' ||
        item?.attendaceStatusIntext === 'Present Half'
      ) {
        count = count + 1;
      }
    });

    return count;
  };

  const totalexpenses = data => {
    let total = 0;
    data?.map(item => {
      total = total + Number(item?.total_paidamount);
    });
    return total;
  };

  const totalrecovery10 = data => {
    let total = 0;
    data?.map(item => {
      total = total + Number(item?.PaidAmount);
    });
    return total;
  };
  const totalrecovery = data => {
    let totalamount = 0;

    data?.OverallCollectedFee?.map(item => {
      totalamount = totalamount + Number(item?.PaidAmount);
    });

    return totalamount;
  };

  useEffect(() => {
    getTotalDashborData();
    getExpensesLineChart();
    dispatch(GetSession());
    dispatch(getcurrentsession());
  }, []);

  useEffect(() => {
    if (Sessions) {
      setsessionList(Sessions);
    }
    setLineChartSession(CURRENTSESSION);
    setBarCharSession(CURRENTSESSION);
    setLineChartSessionExpenses(CURRENTSESSION);
    setBarCharSessionExpenses(CURRENTSESSION);
    if (CURRENTSESSION) {
      getPaidFeeLineChart();
      setsearchsession(CURRENTSESSION);
      // getPaidFeeBarChart();

      // getExpensesBarChart();
    }
  }, [Sessions, CURRENTSESSION]);

  const comparePaidFeeMonths = (a, b) => {
    const monthsOrder = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];

    return monthsOrder.indexOf(a.monthno) - monthsOrder.indexOf(b.monthno);
  };

  const compareExpensesFeeMonths = (a, b) => {
    const monthsOrder = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];

    return monthsOrder.indexOf(a.MonthNO) - monthsOrder.indexOf(b.MonthNO);
  };

  return (
    <>
      <Header />
      <StatusBar backgroundColor={primary} />
      <ScrollView>
        {/* <List.Accordion
          title="Overall Statistics"
          expanded={expanded}
          titleStyle={accordionTitle}
          style={{backgroundColor: Colors.fadeGray, padding: 0, margin: 0}}
          right={props => (
            <MaterialIcons
              name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={25}
              color={Colors.primary}
            />
          )}
          onPress={handlePress}>
          {loading ? (
            <DashboardPlaceholderLoader type="header" />
          ) : (
            <View>
              <View style={styles.minacardinfo}>
                <TotalCard
                  bgcolor="#00C0EF26"
                  img={Staff}
                  value={
                    alltotaldata?.TotalEmployee
                      ? alltotaldata?.TotalEmployee
                      : 0
                  }
                  name={'Employees'}
                />
                <TotalCard
                  bgcolor="#00A65A24"
                  img={Student}
                  value={
                    alltotaldata?.TotalStudent ? alltotaldata?.TotalStudent : 0
                  }
                  name={'Students'}
                />
                <TotalCard
                  bgcolor="#CD8DFF4D"
                  img={Parent}
                  value={
                    alltotaldata?.TotalParents ? alltotaldata?.TotalParents : 0
                  }
                  name={'Parents'}
                />
                <TotalCard
                  bgcolor="#FFDAE7"
                  img={Staff}
                  value={
                    alltotaldata?.AllEmployeeAttendance
                      ? totalpresent(alltotaldata?.AllEmployeeAttendance)
                      : 0
                  }
                  name={'Present Teacher'}
                />
                <TotalCard
                  bgcolor="#00C0EF26"
                  img={Student}
                  value={
                    alltotaldata?.AllStudentAttendance
                      ? totalpresent(alltotaldata?.AllStudentAttendance)
                      : 0
                  }
                  name={'Present Student'}
                />
                <TotalCard
                  bgcolor="#00A65A24"
                  img={Rupee1}
                  value={
                    alltotaldata?.allreceiptdata
                      ? `₹${totalrecovery10(alltotaldata?.allTodayreceiptdata)}`
                      : '₹0'
                  }
                  name={'Today Collected Fee'}
                />

                <View style={{width: '97%', paddingBottom: 20}}>
                  <View>
                    <View style={{width: '100%'}}>
                      <RNBDropDown
                        label="Search By"
                        value={searchoptiond}
                        OptionsList={searchbydata}
                        onChange={data => setsearchoptiond(data.value)}
                      />
                    </View>

                    <View style={{width: '100%'}}>
                      {searchoptiond === 'Month' && (
                        <>
                          <RNBDropDown
                            label="Select Month"
                            value={searchMon}
                            OptionsList={
                              monthlist &&
                              monthlist?.map(item => ({
                                label: `${item?.name}`,
                                value: `${item?.name}`,
                              }))
                            }
                            onChange={data => setsearchMon(data.value)}
                          />
                        </>
                      )}

                      {searchoptiond === 'session' && (
                        <>
                          <RNBDropDown
                            label="Select Session"
                            value={searchsession}
                            OptionsList={
                              sessionList &&
                              sessionList?.map(item => ({
                                label: `${item?.Session}`,
                                value: `${item?.Session}`,
                              }))
                            }
                            onChange={data => setsearchsession(data.value)}
                          />
                        </>
                      )}
                    </View>
                  </View>
                  <View style={{width: '100%'}}>
                    <RNButton
                      loading={loading}
                      style={{paddingHorizontal: 25}}
                      onPress={() => {
                        getTotalDashborData();
                      }}>
                      Search
                    </RNButton>
                  </View>
                </View>

                <TotalCard
                  bgcolor="#FFEBD8"
                  img={Rupee1}
                  value={
                    alltotaldata?.allreceiptdata
                      ? `₹${totalrecovery(alltotaldata)}`
                      : '₹0'
                  }
                  name={'Overall Collected Fee'}
                />
                <TotalCard
                  bgcolor="#FFDAE7"
                  img={redrupee}
                  value={`₹${
                    Number(
                      alltotaldata &&
                        alltotaldata?.TotalAcademinPending[0]
                          ?.total_Pendingamount
                        ? alltotaldata?.TotalAcademinPending[0]
                            ?.total_Pendingamount
                        : 0,
                    ) +
                    Number(
                      alltotaldata &&
                        alltotaldata?.TotalHostelPending[0]?.total_Pendingamount
                        ? alltotaldata?.TotalHostelPending[0]
                            ?.total_Pendingamount
                        : 0,
                    ) +
                    Number(
                      alltotaldata &&
                        alltotaldata?.TotalTransportPending[0]
                          ?.total_Pendingamount
                        ? alltotaldata?.TotalTransportPending[0]
                            ?.total_Pendingamount
                        : 0,
                    )
                  }`}
                  name={'Overall Pending Fee'}
                />
                <TotalCard
                  bgcolor="#CD8DFF4D"
                  img={rupppe}
                  value={
                    alltotaldata?.allexpenses
                      ? `₹${totalexpenses(alltotaldata?.allexpenses)}`
                      : '₹0'
                  }
                  name={'Overall Expenses'}
                />
                <TotalCard
                  bgcolor="#F5FFBA"
                  img={Rupee2}
                  value={
                    Number(totalrecovery(alltotaldata)) -
                    (totalexpenses(alltotaldata?.allexpenses)
                      ? totalexpenses(alltotaldata?.allexpenses)
                      : 0)
                  }
                  name={'Overall Profit'}
                />
              </View>
            </View>
          )}
        </List.Accordion> */}

        {loading ? (
          <DashboardPlaceholderLoader type="header" />
        ) : (
          <View>
            <View style={styles.minacardinfo}>
              <TotalCard
                bgcolor="#488A99"
                img={Staff}
                value={
                  alltotaldata?.TotalEmployee ? alltotaldata?.TotalEmployee : 0
                }
                name={'Employees'}
              />
              <TotalCard
                bgcolor="#484848"
                img={Student}
                value={
                  alltotaldata?.TotalStudent ? alltotaldata?.TotalStudent : 0
                }
                name={'Students'}
              />
              <TotalCard
                bgcolor="#DBAE58"
                img={Parent}
                value={
                  alltotaldata?.TotalParents ? alltotaldata?.TotalParents : 0
                }
                name={'Parents'}
              />
              <TotalCard
                bgcolor="#AC3E31"
                img={Staff}
                value={
                  alltotaldata?.AllEmployeeAttendance
                    ? totalpresent(alltotaldata?.AllEmployeeAttendance)
                    : 0
                }
                name={'Present Teacher'}
              />
              <TotalCard
                bgcolor="#B3C100"
                img={Student}
                value={
                  alltotaldata?.AllStudentAttendance
                    ? totalpresent(alltotaldata?.AllStudentAttendance)
                    : 0
                }
                name={'Present Student'}
              />
              <TotalCard
                bgcolor="#4CB5F5"
                img={Rupee1}
                value={
                  alltotaldata?.allreceiptdata
                    ? `₹${totalrecovery10(alltotaldata?.allTodayreceiptdata)}`
                    : '₹0'
                }
                name={'Today Collected Fee'}
              />

              <View style={{width: '97%', paddingBottom: 20}}>
                <View>
                  <View style={{width: '100%'}}>
                    <RNBDropDown
                      label="Search By"
                      borderRad={20}
                      value={searchoptiond}
                      OptionsList={searchbydata}
                      onChange={data => setsearchoptiond(data.value)}
                    />
                  </View>

                  <View style={{width: '100%'}}>
                    {searchoptiond === 'Month' && (
                      <>
                        <RNBDropDown
                          label="Select Month"
                          value={searchMon}
                          borderRad={20}
                          OptionsList={
                            monthlist &&
                            monthlist?.map(item => ({
                              label: `${item?.name}`,
                              value: `${item?.name}`,
                            }))
                          }
                          onChange={data => setsearchMon(data.value)}
                        />
                      </>
                    )}

                    {searchoptiond === 'session' && (
                      <>
                        <RNBDropDown
                          label="Select Session"
                          value={searchsession}
                          borderRad={20}
                          OptionsList={
                            sessionList &&
                            sessionList?.map(item => ({
                              label: `${item?.Session}`,
                              value: `${item?.Session}`,
                            }))
                          }
                          onChange={data => setsearchsession(data.value)}
                        />
                      </>
                    )}
                  </View>
                </View>
                <View style={{width: '100%'}}>
                  <RNButton
                    loading={loading}
                    style={{paddingHorizontal: 25}}
                    onPress={() => {
                      getTotalDashborData();
                    }}>
                    {searchoptiond === 'Month'
                      ? 'Search By Month'
                      : 'Search By Session'}
                  </RNButton>
                </View>
              </View>

              <TotalCard
                bgcolor="#6AB187"
                img={Rupee1}
                value={
                  alltotaldata?.allreceiptdata
                    ? `₹${totalrecovery(alltotaldata)}`
                    : '₹0'
                }
                name={'Overall Collected Fee'}
              />
              <TotalCard
                bgcolor="#1F3F49"
                img={redrupee}
                value={`₹${
                  Number(
                    alltotaldata &&
                      alltotaldata?.TotalAcademinPending[0]?.total_Pendingamount
                      ? alltotaldata?.TotalAcademinPending[0]
                          ?.total_Pendingamount
                      : 0,
                  ) +
                  Number(
                    alltotaldata &&
                      alltotaldata?.TotalHostelPending[0]?.total_Pendingamount
                      ? alltotaldata?.TotalHostelPending[0]?.total_Pendingamount
                      : 0,
                  ) +
                  Number(
                    alltotaldata &&
                      alltotaldata?.TotalTransportPending[0]
                        ?.total_Pendingamount
                      ? alltotaldata?.TotalTransportPending[0]
                          ?.total_Pendingamount
                      : 0,
                  )
                }`}
                name={'Overall Pending Fee'}
              />
              <TotalCard
                bgcolor="#D32D41"
                img={rupppe}
                value={
                  alltotaldata?.allexpenses
                    ? `₹${totalexpenses(alltotaldata?.allexpenses)}`
                    : '₹0'
                }
                name={'Overall Expenses'}
              />
              <TotalCard
                bgcolor="#0091D5"
                img={Rupee2}
                value={
                  Number(totalrecovery(alltotaldata)) -
                  (totalexpenses(alltotaldata?.allexpenses)
                    ? totalexpenses(alltotaldata?.allexpenses)
                    : 0)
                }
                name={'Overall Profit'}
              />
            </View>
          </View>
        )}

        <View style={styles.maintotalview}>
          {loadingpaidfee ? (
            <>
              <DashboardPlaceholderLoader type="card" />
            </>
          ) : (
            <>
              {/* <View style={styles.card}> */}
              <Text
                style={{
                  color: Colors.black,
                  fontWeight: 'bold',
                  marginVertical: deviceHeight * 0.02,
                  fontSize: 16,
                }}>
                Monthly Fee Collection
              </Text>
              <Linechart
                color={'#0091D5'}
                pdata={LinstFeepaidList?.pendingAmount?.sort(
                  comparePaidFeeMonths,
                )}
                pdata1={LinstFeepaidList?.PaidFee?.sort(comparePaidFeeMonths)}
              />
              {/* </View> */}
            </>
          )}

          {loadingexpenses ? (
            <>
              <DashboardPlaceholderLoader type="card" />
            </>
          ) : (
            <>
              {/* <View style={styles.card}> */}
              <Text
                style={{
                  color: Colors.black,
                  fontWeight: 'bold',
                  marginVertical: deviceHeight * 0.02,
                  fontSize: 16,
                }}>
                Monthly Expenses
              </Text>
              {LinstExpensesList?.length > 0 && (
                <>
                  <ExpensexLineChart
                    color={'#488A99'}
                    pdata={LinstExpensesList?.sort(compareExpensesFeeMonths)}
                  />
                </>
              )}
              {/* </View> */}
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  maintotalview: {
    paddingHorizontal: 10,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  minacardinfo: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: deviceWidth * 0.03,
    paddingTop: deviceWidth * 0.03,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  textContainer: {
    width: deviceWidth * 0.28,
    borderRadius: 20,
    // elevation: 6,
    backgroundColor: Colors.white,
    padding: deviceWidth * 0.03,
    marginBottom: 0,
  },
  topStyle: {
    fontSize: deviceWidth * 0.027,
    fontWeight: '400',
    lineHeight: 12,
    color: Colors.grey2,
  },
  headerTitleContainer: {
    backgroundColor: Colors.fadeGray,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondaryTitle: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    color: Colors.primary,
  },
  accordionTitle: {
    color: Colors.primary,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20,
  },
  filterBtnContainer: {
    padding: 2,
    borderRadius: 10,
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    backgroundColor: Colors.primary,
  },
});
