import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import CardEnquiry from './Card';
import {primary} from '../../../utils/Colors';
import {getcourse} from '../../../redux/action/commanAction';
import {AnimatedFAB} from 'react-native-paper';
import {Colors} from '../../../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholderLoader from '../../../Component/DashboardPlaceholderLoader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RNTable from '../../../Component/RNTable';
import DownEnquiry from '../../../Component/school/DownEnquiry';
import EnquiryFilter from '../../../Component/school/EnquiryFilter';
import FilterAnalysie from '../../../Component/school/FilterAnalysie';
import BackHeader from '../../../Component/Header/BackHeader';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {serverInstance} from '../../../API/ServerInstance';
const Analysie = ({navigation}) => {
  const dispatch = useDispatch();
  const [openModel, setopenModel] = useState(false);
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
  const [enquirylist, setenquirylist] = useState('');
  const [alltransferamount, setalltransferamount] = useState([]);
  const [viewdata, setviewdata] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const {course, loading} = useSelector(state => state.getcourse);
  const [assetlist, setassetlist] = useState([]);
  const [allExpensesList, setallExpensesList] = useState([]);
  const [allRecoveryList, setallRecoveryList] = useState([]);

  const [expensesTable, setexpensesTable] = useState([]);
  const [receveryTable, setreceveryTable] = useState([]);

  const ExpensesTableList = [
    {
      title: 'Sr.No',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: 'Type',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Amount',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Mode',
      items: [],
      width: 0.33,
      align: 'center',
    },
  ];

  const ReconveryTableList = [
    {
      title: 'Sr.No',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: 'Class',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Amount',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: 'Mode',
      items: [],
      width: 0.33,
      align: 'center',
    },
  ];

  const convertdata = async data => {
    await Promise.all(
      data?.map((item, index) => {
        ExpensesTableList[0].items.push({id: index, value: index + 1});
        ExpensesTableList[1].items.push({
          id: index,
          value: item.Expensestype,
        });
        ExpensesTableList[2].items.push({
          id: index,
          value: item.total_paidamount,
        });
        ExpensesTableList[3].items.push({
          id: index,
          value: item.PayOption,
        });
      }),
    );
    setexpensesTable(ExpensesTableList);
  };

  const convertdataRecovery = async data => {
    await Promise.all(
      data?.map((item, index) => {
        ReconveryTableList[0].items.push({id: index, value: index + 1});
        ReconveryTableList[1].items.push({
          id: index,
          value: item.Course,
        });
        ReconveryTableList[2].items.push({
          id: index,
          value: item.total_paidamount,
        });
        ReconveryTableList[3].items.push({
          id: index,
          value: item.PayOption,
        });
      }),
    );
    setreceveryTable(ReconveryTableList);
  };

  const filterdata = () => {
    try {
      let date = new Date();
      let fullyear = date.getFullYear();
      let lastyear = date.getFullYear() - 1;
      let combine = `${lastyear}-${fullyear}`;

      serverInstance('expenses/getexpensesanalysis', 'post', {
        sessionname: combine,
        month: month,
      }).then(res => {
        if (res?.status === true) {
          // Toast.show({
          //   type: 'success',
          //   text1: 'Success',
          //   text2: res?.msg,
          // });

          setallExpensesList(res?.data[0]?.allexpenses);
          setallRecoveryList(res?.data[0]?.allreceiptdata);
          setassetlist(res?.data[0]?.allexpensesAsset);

          convertdata(res?.data[0]?.allexpenses);
          convertdataRecovery(res?.data[0]?.allreceiptdata);
         
        }

        if (res?.status === false) {
          // Toast.show({
          //   type: 'error',
          //   text1: 'Error',
          //   text2: res?.msg,
          // });
        }
      });
    } catch (error) {}
  };

  const totalcashexpenses = data => {
    let total = 0;
    data?.map(item => {
      if (item?.PayOption === 'Cash') {
        total = total + Number(item?.total_paidamount);
      }
    });
    return total;
  };

  const totalonlineexpenses = data => {
    let total = 0;
    data?.map(item => {
      if (item?.PayOption === 'Online') {
        total = total + Number(item?.total_paidamount);
      }
    });
    return total;
  };

  const totalcashrecovery = data => {
    let total = 0;
    data?.map(item => {
      if (item?.PayOption === 'Cash') {
        total = total + Number(item?.total_paidamount);
      }
    });
    return total;
  };

  const totalonlineexrecovery = data => {
    let total = 0;
    data?.map(item => {
      if (item?.PayOption === 'Online') {
        total = total + Number(item?.total_paidamount);
      }
    });
    return total;
  };

  const GetTransferAmmountConslated = () => {
    serverInstance('expenses/GetTransferAmmountConslated', 'get').then(res => {
      if (res.status) {
        setalltransferamount(res?.data);
      }
    });
  };

  const totalcashTransferAmount = data => {
    let total = 0;
    alltransferamount?.map(item => {
      if (item?.Transfer_Mode === 'Cash') {
        total = total + Number(item?.total_amount);
      }
    });
    return total;
  };

  const totalonlineTransferAmount = data => {
    let total = 0;
    alltransferamount?.map(item => {
      if (item?.Transfer_Mode === 'Online') {
        total = total + Number(item?.total_amount);
      }
    });
    return total;
  };

  useEffect(() => {
    dispatch(getcourse());
    filterdata();
    GetTransferAmmountConslated();
  }, []);

  return (
    <View style={{flex: 1}}>
      <BackHeader title={'Analysie'} />
      <View style={styles.headerTitleContainer}>
        <View>
          <Text style={styles.secondaryTitle}>Analysie Management</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Pressable
            onPress={() => setShowDocOptions(true)}
            style={styles.filterBtnContainer}>
            <FontAwesome6 name="download" color={Colors.primary} size={25} />
          </Pressable>
          <Pressable
            onPress={() => setShowModal(true)}
            style={styles.filterBtnContainer}>
            <Ionicons name="filter" color={Colors.primary} size={25} />
          </Pressable>
          {/* <Pressable
            onPress={() => setviewdata(!viewdata)}
            style={styles.filterBtnContainer}>
            {viewdata ? (
              <>
                <Ionicons name="card" color={Colors.primary} size={25} />
              </>
            ) : (
              <>
                <FontAwesome6 name="table" color={Colors.primary} size={25} />
              </>
            )}
          </Pressable> */}
        </View>
      </View>

      <ScrollView>
        {loading ? (
          <>
            <DashboardPlaceholderLoader type="table" />
          </>
        ) : (
          <>
            {viewdata ? (
              <>
                <View style={styles.enquirymainview}>
                  {enquirylist?.length > 0 &&
                    enquirylist?.map((item, index) => {
                      return <CardEnquiry key={index} data={item} />;
                    })}
                </View>
              </>
            ) : (
              <>
                <View style={{padding: 15}}>
                  <Text>Expenses</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <RNTable theme="primary" data={expensesTable} />
                </ScrollView>
                <View style={{padding: 15}}>
                  <Text>
                    Total Cash Out : {totalcashexpenses(allExpensesList)}
                  </Text>
                  <Text>
                    Total Online Out : {totalonlineexpenses(allExpensesList)}{' '}
                  </Text>
                </View>

                <View
                  style={{
                    padding: 15,
                    borderTopWidth: 2,
                    borderTopColor: Colors.primary,
                  }}>
                  <Text>Recovery</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <RNTable theme="primary" data={receveryTable} />
                </ScrollView>

                <View style={{padding: 15}}>
                  <Text>
                    Total Cash :
                    {totalcashrecovery(allRecoveryList) -
                      totalcashexpenses(assetlist) +
                      totalcashTransferAmount()}
                  </Text>
                  <Text>
                    Total Bank :
                    {totalonlineexrecovery(allRecoveryList) -
                      totalonlineexpenses(assetlist) +
                      totalonlineTransferAmount()}
                  </Text>

                  <Text>
                    Total Profit :
                    {totalcashrecovery(allRecoveryList) +
                      totalonlineexrecovery(allRecoveryList) -
                      (totalcashexpenses(allExpensesList) +
                        totalonlineexpenses(allExpensesList))}
                  </Text>
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>

      {showModal && (
        <>
          <FilterAnalysie
            setallExpensesList={setallExpensesList}
            setallRecoveryList={setallRecoveryList}
            setassetlist={setassetlist}
            setShowModal={setShowModal}
            convertdata={convertdata}
            convertdataRecovery={convertdataRecovery}
            showModal={showModal}
          />
        </>
      )}
      <DownEnquiry visible={showDocOptions} hideModal={setShowDocOptions} />
    </View>
  );
};

export default Analysie;

const styles = StyleSheet.create({
  dateview: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  inputview: {
    width: Width(360),
    height: Height(50),
    backgroundColor: '#E9EAEC',
    alignSelf: 'center',
    borderRadius: Width(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Height(10),
  },
  inputsaerch: {
    paddingLeft: Width(30),
    fontFamily: 'Gilroy-SemiBold',
    color: 'black',
    fontSize: Height(16),
    width: Width(260),
  },
  enquirymainview: {
    paddingHorizontal: 10,
  },

  loginbtndiv: {
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  loginbtn: {
    width: Width(100),
    height: Height(40),
    backgroundColor: primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logintextstyle: {
    color: 'white',
    // fontWeight: 700,
    fontSize: 16,
  },
  searchtext: {
    fontSize: 20,
  },
  modal: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: '50%',
    marginLeft: 20,
    padding: 10,
  },
  elevation: {
    shadowColor: '#52006A',
    elevation: 20,
  },
  cancalView: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  baseinput: {
    width: Width(310),
    height: Height(45),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Width(10),
    // borderColor: index === 3 ? primary: '#a9a9a9',
    marginTop: Height(10),
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
    padding: 9,
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
    backgroundColor: primary,
  },
});
