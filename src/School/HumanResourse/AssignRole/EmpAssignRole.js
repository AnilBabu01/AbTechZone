import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import CardEnquiry from './Card';
import {primary} from '../../../utils/Colors';
import {AnimatedFAB} from 'react-native-paper';
import {Colors} from '../../../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholderLoader from '../../../Component/DashboardPlaceholderLoader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RNTable from '../../../Component/RNTable';
import DownEnquiry from '../../../Component/school/DownloadExcel';
import BackHeader from '../../../Component/Header/BackHeader';
import {
  getEmployee,
  getDepartment,
  getDesignation,
} from '../../../redux/action/commanAction';
import EmployeeFilter from '../../../Component/school/EmployeeFilter';

const EmpAssignRole = ({navigation}) => {
  const dispatch = useDispatch();
  const [enquirylist, setenquirylist] = useState('');
  const [Tabledata, setTabledata] = useState([]);
  const [viewdata, setviewdata] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const {loading, employees} = useSelector(state => state.getemp);

  const empsTableList = [
    {
      title: 'Sr.No',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Emp_Id',
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
      title: 'Emp_Email',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: 'Emp_Phone',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Emp_Phone',
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
      title: 'Joining_Date',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Resign_Date',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Status',
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
      employees?.map((item, index) => {
        empsTableList[0].items.push({id: index, value: index + 1});
        empsTableList[1].items.push({
          id: index,
          value: item.empId,
        });

        empsTableList[2].items.push({
          id: index,
          value: item.name,
        });
        empsTableList[3].items.push({
          id: index,
          value: item.email,
        });
        empsTableList[4].items.push({
          id: index,
          value: item.phoneno1,
        });
        empsTableList[5].items.push({
          id: index,
          value: item.phoneno2,
        });
        empsTableList[6].items.push({
          id: index,
          value: item.employeeof,
        });
        empsTableList[7].items.push({
          id: index,
          value: item.department,
        });
        empsTableList[8].items.push({
          id: index,
          value: item.joiningdate,
        });
        empsTableList[9].items.push({
          id: index,
          value: item.resigndate,
        });
        empsTableList[10].items.push({
          id: index,
          value: item.status,
        });

        empsTableList[11].items.push({
          id: index,
          value: (
            <Ionicons
              name="create-outline"
              color={Colors.primary}
              size={18.3}
            />
          ),
          allDetails: item,
          redirect: 'UpdateRole',
        });
      }),
    );

    setTabledata(empsTableList);
  };

  useEffect(() => {
    if (employees) {
      setenquirylist(employees);
      convertdata(employees);
      setShowModal(false);
    }
  }, [employees]);

  useEffect(() => {
    dispatch(getEmployee());
    dispatch(getDepartment());
    dispatch(getDesignation());
  }, []);
  const {fabStyle} = styles;

  return (
    <View style={{flex: 1}}>
      <BackHeader title={'Assign Role'} />
      <View style={styles.headerTitleContainer}>
        <View>
          <Text style={styles.secondaryTitle}>Role Management</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
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
            <DashboardPlaceholderLoader type="Student" />
          </>
        ) : (
          <>
            <View style={styles.enquirymainview}>
              {enquirylist?.length > 0 &&
                enquirylist?.map((item, index) => {
                  return <CardEnquiry key={index} data={item} />;
                })}
            </View>
          </>
        )}
      </ScrollView>
      {showModal && (
        <>
          <EmployeeFilter setShowModal={setShowModal} showModal={showModal} />
        </>
      )}
      <DownEnquiry visible={showDocOptions} hideModal={setShowDocOptions} />
    </View>
  );
};

export default EmpAssignRole;

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
   display:"flex",
   justifyContent:"center",
   alignItems:"center"
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
