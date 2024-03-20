import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Height, Width} from '../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CardEnquiry from './Card';
import {primary, Colors} from '../../utils/Colors';
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
} from '../../redux/action/commanAction';
import {
  GetHostel,
  GetFacility,
  GetCategory,
} from '../../redux/action/hostelActions';
import {GetRoute} from '../../redux/action/transportActions';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholderLoader from '../../Component/DashboardPlaceholderLoader';
import {deviceWidth} from '../../utils/constant';
import RNTable from '../../Component/RNTable';
import DownloadStudentData from '../../Component/school/DownloadExcel';
import BackHeader from '../../Component/Header/BackHeader';
import StudentFilter from '../../Component/school/StudentFilter';
const StudentListReport = ({navigation}) => {
  const dispatch = useDispatch();
  const [isdata, setisdata] = useState([]);
  const [Tabledata, setTabledata] = useState([]);
  const [viewdata, setviewdata] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const {loading, student} = useSelector(state => state.getstudent);

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
      title: 'Student_Status',
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
              value: item.StudentStatus,
            });
            StudentTableList[13].items.push({
              id: index,
              value: (
                <Ionicons
                  name="create-outline"
                  color={Colors.primary}
                  size={18.3}
                />
              ),
              Deleteicon: (
                <Ionicons name="trash-outline" color={Colors.red} size={18.3} />
              ),
              deleteUrl: 'student/addstudent',
              allDetails: item,
              redirect: 'UpdateAdmission',
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

  return (
    <>
      <View style={{flex: 1}}>
        <BackHeader title={'Student Report'} icon={'person'} />
        <View style={styles.headerTitleContainer}>
          <View>
            <Text style={styles.secondaryTitle}>Student</Text>
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
            <StudentFilter setShowModal={setShowModal} showModal={showModal} />
          </>
        )}

        <DownloadStudentData
          enquiry={student}
          filename={'StudentList'}
          visible={showDocOptions}
          hideModal={setShowDocOptions}
        />
      </View>
    </>
  );
};

export default StudentListReport;

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
