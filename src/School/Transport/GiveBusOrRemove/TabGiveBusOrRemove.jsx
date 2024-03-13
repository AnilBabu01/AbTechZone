import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Height, Width} from '../../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Card from './Card';
import {primary, Colors} from '../../../utils/Colors';

import {
  GetVehicleType,
  GetRoute,
  GetVehiclelist,
} from '../../../redux/action/transportActions';
import {getstudent}  from '../../../redux/action/commanAction';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholderLoader from '../../../Component/DashboardPlaceholderLoader';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import RNTable from '../../../Component/RNTable';
import DownloadStudentData from '../../../Component/school/DownloadStudentData';
import BackHeader from '../../../Component/Header/BackHeader';
import StudentFilter from '../../../Component/school/StudentFilter';
const TabGiveBusOrRemove = () => {
  const dispatch = useDispatch();
  const [isdata, setisdata] = useState([]);
  const [Tabledata, setTabledata] = useState([]);
  const [viewdata, setviewdata] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const {loading, student} = useSelector(state => state.getstudent);

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
      title: 'SNO',
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
      title: 'Section',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Stream',
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
      title: 'Student_Email',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Student_Phone',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Adminssion_Date',
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
      title: 'Category',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Per_month_Fee',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: 'Total_fee',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Transport_Status',
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
    if (StudentTableList?.length > 13) {
      await Promise.all(
        student?.length > 0 &&
          student?.map((item, index) => {
            StudentTableList[0].items.push({id: index, value: index + 1});
            StudentTableList[1].items.push({id: index, value: item.Session});
            StudentTableList[2].items.push({id: index, value: item.SrNumber});
            StudentTableList[3].items.push({
              id: index,
              value: item.rollnumber,
            });
            StudentTableList[4].items.push({
              id: index,
              value: item.Section,
            });
            StudentTableList[5].items.push({
              id: index,
              value: item.Stream,
            });
            StudentTableList[6].items.push({
              id: index,
              value: item.name,
            });
            StudentTableList[7].items.push({
              id: index,
              value: item.email,
            });
            StudentTableList[8].items.push({
              id: index,
              value: item.phoneno1,
            });
            StudentTableList[9].items.push({
              id: index,
              value: item.admissionDate,
            });
            StudentTableList[10].items.push({
              id: index,
              value: item.courseorclass,
            });
            StudentTableList[11].items.push({
              id: index,
              value: item.StudentCategory,
            });
            StudentTableList[12].items.push({
              id: index,
              value: item.TransportPerMonthFee,
            });
            StudentTableList[13].items.push({
              id: index,
              value: item.TransportTotalHostelFee,
            });
            StudentTableList[14].items.push({
              id: index,
              value: item?.Transport ? 'Active' : 'Disable',
            });
            StudentTableList[15].items.push({
              id: index,
              value: (
                <Ionicons
                  name="create-outline"
                  color={Colors.primary}
                  size={18.3}
                />
              ),
              allDetails: item,
              redirect: 'GiveBusRemove',
            });
          }),
      );
      setTabledata(StudentTableList);
    }
  };

  useEffect(() => {
    if (student) {
      convertdata(student);
      setisdata(student);
      setShowModal(false);
    }
  }, [student]);

  useEffect(() => {
    dispatch(GetRoute());
    dispatch(GetVehiclelist());
    dispatch(GetVehicleType());
    dispatch(getstudent());
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <BackHeader title={'Give Bus Or Remove'} icon={'person'} />
        <View style={styles.headerTitleContainer}>
          <View>
            <Text style={styles.secondaryTitle}>
              Give Bus Or Remove Management
            </Text>
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
                        return <Card key={index} data={item} />;
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
            <StudentFilter setShowModal={setShowModal} showModal={showModal} />
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

export default TabGiveBusOrRemove;

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
