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
import {AnimatedFAB} from 'react-native-paper';
import {
  getcourse,
  getbatch,
  getstudent,
  getfee,
  getcategory,
  GetSession,
  GetSection,
  getcurrentsession,
} from '../../../redux/action/commanAction';
import {
  GetHostel,
  GetFacility,
  GetCategory,
  GetCheckin,
} from '../../../redux/action/hostelActions';
import {GetRoute} from '../../../redux/action/transportActions';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholderLoader from '../../../Component/DashboardPlaceholderLoader';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import RNTable from '../../../Component/RNTable';
import DownloadStudentData from '../../../Component/school/DownloadStudentData';
import BackHeader from '../../../Component/Header/BackHeader';
import StudentFilter from '../../../Component/school/StudentFilter';
import moment from 'moment';
const Checkout = () => {
  const dispatch = useDispatch();
  const [isdata, setisdata] = useState([]);
  const [Tabledata, setTabledata] = useState([]);
  const [viewdata, setviewdata] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const {loading, checkin} = useSelector(state => state.GetCheckin);

  useEffect(() => {
    dispatch(getcourse());
    dispatch(getbatch());
    dispatch(getstudent());
    dispatch(getfee());
    dispatch(getcategory());
    dispatch(GetSession());
    dispatch(GetSection());
    dispatch(getcurrentsession());
    dispatch(GetHostel());
    dispatch(GetFacility());
    dispatch(GetCategory());
    dispatch(GetRoute());
  }, []);

  const StudentTableList = [
    {
      title: 'Sr.No',
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
      title: 'Session',
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
      title: 'Student_Name',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Checkin_Date',
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
      title: 'Room_No',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Hostel',
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
      title: 'Facility',
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
      checkin?.length > 0 &&
        checkin?.map((item, index) => {
          StudentTableList[0].items.push({id: index, value: index + 1});
          StudentTableList[1].items.push({id: index, value: item.SNO});
          StudentTableList[2].items.push({id: index, value: item.Session});
          StudentTableList[3].items.push({
            id: index,
            value: item.Section,
          });
          StudentTableList[4].items.push({
            id: index,
            value: item.StudentName,
          });
          StudentTableList[5].items.push({
            id: index,
            value: moment(item?.CheckinDate).format('DD/MM/YYYY'),
          });
          StudentTableList[6].items.push({
            id: index,
            value: item.StudentClass,
          });
          StudentTableList[7].items.push({
            id: index,
            value: item.RoomNo,
          });
          StudentTableList[8].items.push({
            id: index,
            value: item.hostelname,
          });
          StudentTableList[9].items.push({
            id: index,
            value: item.Category,
          });
          StudentTableList[10].items.push({
            id: index,
            value: item.Facility,
          });

          StudentTableList[11].items.push({
            id: index,

            allDetails: item?.id,
            redirect: 'hostel/ReleaseRoom',
            checkout: (
              <FontAwesome6 name="xmark" color={Colors.primary} size={18.3} />
            ),
          });
        }),
    );
    setTabledata(StudentTableList);
  };

  useEffect(() => {
    if (checkin) {
      convertdata(checkin);
      setisdata(checkin);
    }
  }, [checkin]);

  useEffect(() => {
    dispatch(GetCheckin());
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <BackHeader title={'Checkout'} icon={'person'} />
        <View style={styles.headerTitleContainer}>
          <View>
            <Text style={styles.secondaryTitle}>Checkout Management</Text>
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

export default Checkout;

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
