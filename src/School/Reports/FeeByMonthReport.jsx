import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Height, Width} from '../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CardEnquiry from './MonthFee';
import {primary, Colors} from '../../utils/Colors';
import {
  getcourse,
  GetSession,
  getcurrentsession,
} from '../../redux/action/commanAction';
import {useDispatch} from 'react-redux';
import DashboardPlaceholderLoader from '../../Component/DashboardPlaceholderLoader';
import {deviceWidth} from '../../utils/constant';
import RNTable from '../../Component/RNTable';
import DownloadStudentData from '../../Component/school/DownloadExcel';
import SearchMonthltFee from '../../Component/school/SearchMonthltFee';
import BackHeader from '../../Component/Header/BackHeader';

const monthnamelist = {
  1: 'January',

  2: 'February',

  3: 'March',

  4: 'April',

  5: 'May',

  6: 'Jun',

  7: 'July',

  8: 'August',

  9: 'September',

  10: 'October',

  11: 'November',

  12: 'December',
};
const FeeByMonthReport = ({navigation}) => {
  const dispatch = useDispatch();
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
  const [data, setdata] = useState('');
  const [isdata, setisdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [Tabledata, setTabledata] = useState([]);
  const [viewdata, setviewdata] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);

  useEffect(() => {
    dispatch(getcourse());
    dispatch(GetSession());
    dispatch(getcurrentsession());
  }, []);

  console.log('datajsdjsfjd', data);

  const StudentTableList = [
    {
      title: 'Session',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'SRNO',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Roll_No',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Student_Name',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Gender',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: `Academin_Fee (${monthnamelist[month]})`,
      items: [],
      width: 0.5,
      align: 'center',
    },
    {
      title: `Hostel_Fee (${monthnamelist[month]})`,
      items: [],
      width: 0.5,
      align: 'center',
    },
    {
      title: `Transport_fee (${monthnamelist[month]})`,
      items: [],
      width: 0.5,
      align: 'center',
    },
  ];

  const convertdata = async () => {
    await Promise.all(
      data?.length > 0 &&
        data?.map((item, index) => {
          StudentTableList[0].items.push({
            id: index,
            value: item?.student?.Session,
          });
          StudentTableList[1].items.push({
            id: index,
            value: item?.student?.SrNumber,
          });
          StudentTableList[2].items.push({
            id: index,
            value: item?.student?.rollnumber,
          });
          StudentTableList[3].items.push({
            id: index,
            value: item?.student?.name,
          });
          StudentTableList[4].items.push({
            id: index,
            value: item?.student?.Gender,
          });
          StudentTableList[5].items.push({
            id: index,
            value: item?.schollfee[0]?.paidStatus
              ? `Paid (${item?.schollfee[0]?.PerMonthFee})`
              : `Dues(${item?.schollfee[0]?.PerMonthFee})`,
          });
          StudentTableList[6].items.push({
            id: index,
            value: item?.student?.hostal
              ? item?.hostelfee[0]?.paidStatus
                ? `Paid (${item?.hostelfee[0]?.PerMonthFee})`
                : `Dues(${item?.hostelfee[0]?.PerMonthFee})`
              : 'Not Have',
          });
          StudentTableList[7].items.push({
            id: index,
            value: item?.student?.Transport
              ? item?.transportfee[0]?.paidStatus
                ? `Paid (${item?.transportfee[0]?.PerMonthFee})`
                : `Dues(${item?.transportfee[0]?.PerMonthFee})`
              : 'Not Have',
          });
        }),
    );
    setTabledata(StudentTableList);
  };

  useEffect(() => {
    if (data) {
      convertdata(data);
    }
  }, [data]);

  return (
    <>
      <View style={{flex: 1}}>
        <BackHeader title={'Monthly Fee Report'} />
        <View style={styles.headerTitleContainer}>
          <View>
            <Text style={styles.secondaryTitle}>Monthly Fee</Text>
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
                    {isdata?.length > 0 &&
                      isdata?.map((item, index) => {
                        return <CardEnquiry key={index} data={item} />;
                      })}
                  </View>
                </>
              ) : (
                <>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <RNTable theme="primary" data={Tabledata} />
                  </ScrollView>
                </>
              )}
            </>
          )}
        </ScrollView>
        {showModal && (
          <>
            <SearchMonthltFee
              setShowModal={setShowModal}
              showModal={showModal}
              setloading={setloading}
              loading={loading}
              setdata={setdata}
              month={month}
              setmonth={setmonth}
            />
          </>
        )}

        <DownloadStudentData
          enquiry={data}
          filename={'MonthlyFeeReport'}
          visible={showDocOptions}
          hideModal={setShowDocOptions}
        />
      </View>
    </>
  );
};

export default FeeByMonthReport;

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

  searchtext: {
    fontSize: 20,
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
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    backgroundColor: primary,
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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 1,
    marginVertical: 300,
    borderRadius: 20,
    position: 'relative',
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
    marginTop: deviceWidth * 0.045,
    marginBottom: deviceWidth * 0.06,
  },
});
