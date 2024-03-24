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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {primary, Colors} from '../../../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholderLoader from '../../../Component/DashboardPlaceholderLoader';
import {deviceWidth} from '../../../utils/constant';
import RNTable from '../../../Component/RNTable';
import DownloadStudentData from '../../../Component/school/DownloadExcel';
import StudentFilter from '../../../Component/school/StudentFilter';
import {serverInstance} from '../../../API/ServerInstance';
const WeklyTimeTable = () => {
  const [loading, setloading] = useState(false);
  const [isdata, setisdata] = useState([]);
  const [todayTimeTable, settodayTimeTable] = useState([]);
  const [Tabledata, setTabledata] = useState([]);
  const [viewdata, setviewdata] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const {student} = useSelector(state => state.getstudent);

  const StudentTableList = [
    {
      title: 'Day',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Subject',
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
      title: 'Section',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: 'Start Time',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'End Time',
      items: [],
      width: 0.33,
      align: 'center',
    },
  ];

  const convertdata = async () => {
    await Promise.all(
      todayTimeTable?.length > 0 &&
        todayTimeTable?.sort(compareMonths)?.map((item, index) => {
          StudentTableList[0].items.push({
            id: index,
            value: item?.subject?.dayname,
          });
          StudentTableList[1].items.push({
            id: index,
            value: item?.subject?.subject,
          });
          StudentTableList[2].items.push({
            id: index,
            value: item?.classname?.coursename,
          });
          StudentTableList[3].items.push({
            id: index,
            value: item?.subject?.section,
          });
          StudentTableList[4].items.push({
            id: index,
            value: item?.subject?.starttime,
          });
          StudentTableList[5].items.push({
            id: index,
            value: item?.subject?.endtime,
          });
        }),
    );
    setTabledata(StudentTableList);
  };

  const GetTimeTable = () => {
    setloading(true);
    serverInstance('comman/GetEmpTimeTable', 'get').then(res => {
      if (res?.status === true) {
        settodayTimeTable(res?.data);
        setloading(false);
      }
      if (res?.status === false) {
        setloading(false);
      }
    });
  };

  function getDayName() {
    let date = new Date();
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  }
  const compareMonths = (a, b) => {
    const monthsOrder = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    return (
      monthsOrder.indexOf(a?.subject?.dayname) -
      monthsOrder.indexOf(b?.subject?.dayname)
    );
  };



  useEffect(() => {
    GetTimeTable();
  }, []);

  useEffect(() => {
    if (todayTimeTable) {
      convertdata(todayTimeTable);
      setisdata(todayTimeTable);
    }
  }, [todayTimeTable]);

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.headerTitleContainer}>
          <View>
            <Text style={styles.secondaryTitle}>Time Table</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Pressable
              onPress={() => setShowDocOptions(true)}
              style={styles.filterBtnContainer}>
              <FontAwesome6 name="download" color={Colors.primary} size={25} />
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
            <StudentFilter setShowModal={setShowModal} showModal={showModal} />
          </>
        )}

        <DownloadStudentData
          visible={showDocOptions}
          hideModal={setShowDocOptions}
          enquiry={todayTimeTable?.sort(compareMonths)}
          filename={'WeeklyTimeTable'}
        />
      </View>
    </>
  );
};

export default WeklyTimeTable;

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
