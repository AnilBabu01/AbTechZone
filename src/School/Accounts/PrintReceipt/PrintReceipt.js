import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Height, Width} from '../../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CardEnquiry from './Card';
import {primary, Colors} from '../../../utils/Colors';
import {
  getcourse,
  GetSession,
  GetSection,
  getPrintReceipt,
} from '../../../redux/action/commanAction';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholderLoader from '../../../Component/DashboardPlaceholderLoader';
import {deviceWidth} from '../../../utils/constant';
import RNTable from '../../../Component/RNTable';
import DownloadStudentData from '../../../Component/school/DownloadStudentData';
import BackHeader from '../../../Component/Header/BackHeader';
import SearchReceipt from '../../../Component/school/SearchReceipt';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
const PrintReceipt = () => {
  const dispatch = useDispatch();
  const [isdata, setisdata] = useState([]);
  const [Tabledata, setTabledata] = useState([]);
  const [viewdata, setviewdata] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const {loading, receiptdata} = useSelector(state => state.getReceiptPrint);

  useEffect(() => {
    dispatch(getcourse());
    dispatch(GetSession());
    dispatch(GetSection());
    dispatch(getPrintReceipt());
  }, []);

  const StudentTableList = [
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
      title: 'Course',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Paid_Date',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Receipt_Type',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Paid_Amount',
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

    {
      title: 'Action',
      items: [],
      width: 0.33,
      align: 'center',
    },
  ];

  const convertdata = async () => {
    await Promise.all(
      receiptdata?.length > 0 &&
        receiptdata?.map((item, index) => {
          StudentTableList[0].items.push({id: index, value: index + 1});
          StudentTableList[1].items.push({id: index, value: item.Session});
          StudentTableList[2].items.push({id: index, value: item.SNO});
          StudentTableList[3].items.push({
            id: index,
            value: item.RollNo,
          });
          StudentTableList[4].items.push({
            id: index,
            value: item.studentName,
          });
          StudentTableList[5].items.push({
            id: index,
            value: item.Course,
          });
          StudentTableList[6].items.push({
            id: index,
            value: item.PaidDate,
          });
          StudentTableList[7].items.push({
            id: index,
            value: item.Feetype,
          });
          StudentTableList[8].items.push({
            id: index,
            value: item.PaidAmount,
          });
          StudentTableList[9].items.push({
            id: index,
            value: item.PayOption,
          });

          StudentTableList[10].items.push({
            id: index,
            value: (
              <Ionicons
                name="print-outline"
                color={Colors.primary}
                size={18.3}
              />
            ),
            allDetails: item,
            redirect: 'FeeReceipt',
          });
        }),
    );
    setTabledata(StudentTableList);
  };

  useEffect(() => {
    if (receiptdata) {
      convertdata(receiptdata);
      setisdata(receiptdata);
      setShowModal(false);
    }
  }, [receiptdata]);

  return (
    <>
      <View style={{flex: 1}}>
        <BackHeader title={'Fee Receipt'} icon={'person'} />
        <View style={styles.headerTitleContainer}>
          <View>
            <Text style={styles.secondaryTitle}>Fee Receipt</Text>
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
                <ActivityIndicator size="large" animating={true} color={MD2Colors.red800} />
              </View>
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
            <SearchReceipt setShowModal={setShowModal} showModal={showModal} />
          </>
        )}

        <DownloadStudentData
          visible={showDocOptions}
          hideModal={setShowDocOptions}
        />
      </View>
    </>
  );
};

export default PrintReceipt;

const styles = StyleSheet.create({
  loaderCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:"50%"
  },
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
