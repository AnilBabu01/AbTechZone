import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import CardEnquiry from './Card';
import {GetPayRoll} from '../../../redux/action/payrollActions';
import {
  getEmployee,
  GetSession,
  getcurrentsession,
} from '../../../redux/action/commanAction';
import {primary} from '../../../utils/Colors';
import {AnimatedFAB} from 'react-native-paper';
import {Colors} from '../../../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RNTable from '../../../Component/RNTable';
import DownEnquiry from '../../../Component/school/DownloadExcel';
import EnquiryFilter from '../../../Component/school/EnquiryFilter';
import BackHeader from '../../../Component/Header/BackHeader';
import moment from 'moment';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import SalaryFilter from '../../../Component/school/SalaryFilter';
const EmpAddpayroll = ({navigation}) => {
  const dispatch = useDispatch();
  const [enquirylist, setenquirylist] = useState('');
  const [Tabledata, setTabledata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const {user} = useSelector(state => state.auth);
  const {loading, payroll} = useSelector(state => state.GetPayRoll);

  const enquiryTableList = [
    {
      title: 'Sr.No',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Session',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Month Name',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Emp_ID',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: 'Emp_Name',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Designation',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Department',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Paid Amount',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Paid Date',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Action',
      items: [],
      width: 0.33,
      align: 'center',
    },
  ];

  const convertdata = async () => {
    await Promise.all(
      payroll?.map((item, index) => {
        enquiryTableList[0].items.push({id: index, value: index + 1});
        enquiryTableList[1].items.push({
          id: index,
          value: item?.monthdetials?.Session,
        });

        enquiryTableList[2].items.push({
          id: index,
          value: item?.monthdetials?.MonthName,
        });
        enquiryTableList[3].items.push({
          id: index,
          value: item?.monthdetials?.OrEmpId,
        });
        enquiryTableList[4].items.push({
          id: index,
          value: item?.monthdetials?.name,
        });
        enquiryTableList[5].items.push({
          id: index,
          value: item?.monthdetials?.employeeof,
        });
        enquiryTableList[6].items.push({
          id: index,
          value: item?.monthdetials?.department,
        });
        enquiryTableList[7].items.push({
          id: index,
          value: item?.monthdetials?.PaidAmount,
        });

        enquiryTableList[8].items.push({
          id: index,
          value: moment(item?.monthdetials?.PaidDate).format('DD/MM/YYYY'),
        });

        enquiryTableList[9].items.push({
          id: index,
          value: (
            <Ionicons
              name="create-outline"
              color={Colors.primary}
              size={18.3}
            />
          ),
          allDetails: item,
          redirect: 'UpdateEnquirySchool',
        });
      }),
    );
    setTabledata(enquiryTableList);
  };

  useEffect(() => {
    if (payroll) {
      setenquirylist(payroll);
      convertdata(payroll);
      setShowModal(false);
    }
  }, [payroll]);

  useEffect(() => {
    dispatch(getEmployee());
    dispatch(GetSession());
    dispatch(getcurrentsession());
    dispatch(GetPayRoll());
  }, []);
  const {fabStyle} = styles;

  return (
    <View style={{flex: 1}}>
      <BackHeader title={'Add PayRoll'} />
      <View style={styles.headerTitleContainer}>
        <View>
          <Text style={styles.secondaryTitle}>PayRoll Management</Text>
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
            <View style={styles.loaderCenter}>
              <ActivityIndicator
                size="large"
                animating={true}
                color={MD2Colors.red800}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.enquirymainview}>
              {enquirylist?.length > 0 &&
                enquirylist?.map((item, index) => {
                  return <CardEnquiry key={index} allDetails={item} />;
                })}
            </View>
          </>
        )}
      </ScrollView>
      {showModal && (
        <>
          <SalaryFilter setShowModal={setShowModal} showModal={showModal} />
        </>
      )}
      <DownEnquiry visible={showDocOptions} hideModal={setShowDocOptions} />

      <AnimatedFAB
        icon={'plus'}
        onPress={() => navigation.navigate('AddPayRool')}
        label="Add"
        extended={false}
        color={Colors.white}
        style={[fabStyle]}
      />
    </View>
  );
};

export default EmpAddpayroll;

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
  loaderCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '50%',
  },
});
