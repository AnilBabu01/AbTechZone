import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../../utils/responsive';
import {primary, savebtn, resetbtn} from '../../../../utils/Colors';
import {
  getcourse,
  getbatch,
  GetSession,
  GetSection,
  getcurrentsession,
} from '../../../../redux/action/commanAction';
import {useDispatch} from 'react-redux';
import {Colors} from '../../../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import DownloadStudentAttendance from '../../../../Component/school/DownloadStudentAttendance';
import RNTable from '../../../../Component/RNTable';
import EmpAnalasisAttendance from '../../../../Component/school/EmpAnalasisAttendance';
import DashboardPlaceholderLoader from '../../../../Component/DashboardPlaceholderLoader';

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

const Analysis = () => {
  const dispatch = useDispatch();
  const [Tabledata, setTabledata] = useState([]);
  const [loading, setloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const [attendancedetails, setattendancedetails] = useState([]);

  const AttendanceTableList = [
    {
      title: 'Sr.No',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: 'Employee_Id',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Name',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Month',
      items: [],
      width: 0.33,
      align: 'center',
    },
  ];

  const convertdata = async attendancedetails => {
    attendancedetails[0]?.days.map(item => {
      return AttendanceTableList.push({
        title: item,
        items: [],
        width: 0.33,
        align: 'center',
      });
    });

    await Promise.all(
      attendancedetails?.length > 0 &&
        attendancedetails?.map((item, index) => {
          AttendanceTableList[0].items.push({id: index, value: index + 1});
          AttendanceTableList[1].items.push({
            id: index,
            value: item?.student?.empId,
          });
          AttendanceTableList[2].items.push({
            id: index,
            value: item?.student?.name,
          });
          AttendanceTableList[3].items.push({
            id: index,
            value: monthnamelist[item?.attendance[0]?.MonthNo?.toString()],
          });

          item?.attendance?.map((data, index) => {
            return AttendanceTableList[index + 4].items.push({
              id: index,
              value: data?.attendaceStatusIntext,
            });
          });
        }),
    );

    setTabledata(AttendanceTableList);
  };

  useEffect(() => {
    setShowModal(false);

    convertdata(attendancedetails);
  }, [attendancedetails]);
  useEffect(() => {
    dispatch(getcourse());
    dispatch(getbatch());
    dispatch(GetSession());
    dispatch(GetSection());
    dispatch(getcurrentsession());
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerTitleContainer}>
        <View>
          <Text style={styles.secondaryTitle}>
            Employee Attendance Analysis
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
        </View>
      </View>

      <ScrollView>
        {loading ? (
          <>
            <DashboardPlaceholderLoader type="table" />
          </>
        ) : (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <RNTable theme="primary" data={Tabledata} />
            </ScrollView>
          </>
        )}
      </ScrollView>
      {showModal && (
        <>
          <EmpAnalasisAttendance
            setShowModal={setShowModal}
            showModal={showModal}
            setattendancedetails={setattendancedetails}
          />
        </>
      )}

      <DownloadStudentAttendance
        visible={showDocOptions}
        hideModal={setShowDocOptions}
      />
    </View>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  bottomBtn: {
    paddingHorizontal: Width(10),
    marginTop: Height(5),
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
    borderRadius: Width(10),
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
  loginbtndiv10: {
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  loginbtnsave: {
    width: Width(170),
    height: Height(45),
    backgroundColor: Colors.primary,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginbtn10: {
    width: Width(170),
    height: Height(45),
    backgroundColor: resetbtn,
    borderRadius: 15,
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
  card10: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  viewdel: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
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
  absentbtn: {
    backgroundColor: resetbtn,
    width: Width(80),
    height: Height(35),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  unabsentbtn: {
    borderColor: resetbtn,
    borderWidth: 1,
    width: Width(80),
    height: Height(35),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  presentbtn: {
    backgroundColor: savebtn,
    width: Width(80),
    height: Height(35),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  unpresentbtn: {
    borderColor: savebtn,
    width: Width(80),
    height: Height(35),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  textcolor: {
    color: primary,
  },
  textcolorwhite: {
    color: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    borderColor: primary,
    borderRadius: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    borderColor: primary,
    borderRadius: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: primary,
    borderRadius: 5,
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
});
