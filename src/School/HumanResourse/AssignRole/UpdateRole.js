import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {primary} from '../../../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  getEmployee,
  getbatch,
  getfeelist,
} from '../../../redux/action/commanAction';
import {useNavigation, useRoute} from '@react-navigation/native';
import RNButton from '../../../Component/RNButton';
import {getTodaysDate} from '../../../utils/functions';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {Colors} from '../../../utils/Colors';
import moment from 'moment';
import BackHeader from '../../../Component/Header/BackHeader';
import {backendApiUrl} from '../../../Config/config';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Checkbox} from 'react-native-paper';


let formData = new FormData();
const UpdateRole = () => {
  const newroute = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [openModel, setopenModel] = useState(false);
  const [isdata, setisData] = useState([]);
  const [isdata1, setisdata1] = useState([]);
  const [emplyeetype, setemplyeetype] = useState('employee');
  const [designationname, setdesignationname] = useState('');
  const [depart, setdepart] = useState('');
  const [status, setstatus] = useState('Active');
  const [empname, setempname] = useState('');
  const [empemail, setempemail] = useState('');
  const [empphone1, setempphone1] = useState('');
  const [empphone2, setempphone2] = useState('');
  const [joiningdate, setjoiningdate] = useState(getTodaysDate());
  const [resigndate, setresigndate] = useState('');
  const [leaveNo, setleaveNo] = useState('');
  const [address, setaddress] = useState('');
  const [empId, setempId] = useState('');
  const [pincode, setpincode] = useState('');
  // const [resumeimg, setresumeimg] = useState('');
  // const [offerlater, setofferlater] = useState('');
  // const [joninglater, setjoninglater] = useState('');
  const [accountholdername, setaccountholdername] = useState('');
  const [accountNumber, setaccountNumber] = useState('');
  const [bankName, setbankName] = useState('');
  const [branchname, setbranchname] = useState('');
  const [ifscCode, setifscCode] = useState('');
  const [basicsalary, setbasicsalary] = useState('');
  const [allowance1, setallowance1] = useState('');
  const [allowanceAmount1, setallowanceAmount1] = useState('');
  const [allowance2, setallowance2] = useState('');
  const [allowanceAmount2, setallowanceAmount2] = useState('');
  const [allowance3, setallowance3] = useState('');
  const [allowanceAmount3, setallowanceAmount3] = useState('');
  const [deduction1, setdeduction1] = useState('');
  const [deductionAmount1, setdeductionAmount1] = useState('');
  const [deduction2, setdeduction2] = useState('');
  const [deductionAmount2, setdeductionAmount2] = useState('');
  const [fathetrsname, setfathetrsname] = useState('');
  const [totalsalary, settotalsalary] = useState('');
  const [passportsize, setpassportsize] = useState('');
  const [city, setcity] = useState('');
  const [transport, settransport] = useState(false);
  const [transportRead, settransportRead] = useState(false);
  const [transportWrite, settransportWrite] = useState(false);
  const [transportEdit, settransportEdit] = useState(false);
  const [transportDelete, settransportDelete] = useState(false);
  const [library, setlibrary] = useState(false);
  const [libraryRead, setlibraryRead] = useState(false);
  const [libraryWrite, setlibraryWrite] = useState(false);
  const [libraryEdit, setlibraryEdit] = useState(false);
  const [libraryDelete, setlibraryDelete] = useState(false);
  const [hostel, sethostel] = useState(false);
  const [hostelRead, sethostelRead] = useState(false);
  const [hostelWrite, sethostelWrite] = useState(false);
  const [hostelEdit, sethostelEdit] = useState(false);
  const [hostelDelete, sethostelDelete] = useState(false);
  const [frontoffice, setfrontoffice] = useState(false);
  const [frontofficeR, setfrontofficeR] = useState(false);
  const [frontofficeW, setfrontofficeW] = useState(false);
  const [frontofficeE, setfrontofficeE] = useState(false);
  const [frontofficeD, setfrontofficeD] = useState(false);
  const [student, setstudent] = useState(false);
  const [studentR, setstudentR] = useState(false);
  const [studentW, setstudentW] = useState(false);
  const [studentE, setstudentE] = useState(false);
  const [studentD, setstudentD] = useState(false);
  const [Attendance, setAttendance] = useState(false);
  const [AttendanceR, setAttendanceR] = useState(false);
  const [AttendanceW, setAttendanceW] = useState(false);
  const [AttendanceE, setAttendanceE] = useState(false);
  const [AttendanceD, setAttendanceD] = useState(false);
  const [Accounts, setAccounts] = useState(false);
  const [AccountsR, setAccountsR] = useState(false);
  const [AccountsW, setAccountsW] = useState(false);
  const [AccountsE, setAccountsE] = useState(false);
  const [AccountsD, setAccountsD] = useState(false);
  const [HumanResourse, setHumanResourse] = useState(false);
  const [HumanResourseR, setHumanResourseR] = useState(false);
  const [HumanResourseW, setHumanResourseW] = useState(false);
  const [HumanResourseE, setHumanResourseE] = useState(false);
  const [HumanResourseD, setHumanResourseD] = useState(false);
  const [Masters, setMasters] = useState(false);
  const [MastersR, setMastersR] = useState(false);
  const [MastersW, setMastersW] = useState(false);
  const [MastersE, setMastersE] = useState(false);
  const [MastersD, setMastersD] = useState(false);
  const [reports, setreports] = useState(false);
  const [state, setstate] = useState('');
  const [updatedata, setupdatedata] = useState('');
  const {designation} = useSelector(state => state.getdesignation);
  const {department} = useSelector(state => state.getpart);

  const submit = async () => {
    try {
      setloading(true);
      let token = await AsyncStorage.getItem('erptoken');
      var momentDate = moment(joiningdate, 'DD/MM/YYYY');
      var joiningdatenew = momentDate.format('YYYY-MM-DD');
      var resigndateDate = moment(resigndate, 'DD/MM/YYYY');
      var resigndatenew = resigndateDate.format('YYYY-MM-DD');
      formData.append('id', updatedata?.id);
      formData.append('name', empname);
      formData.append('email', empemail);
      formData.append('phoneno1', empphone1);
      formData.append('phoneno2', empphone2);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('pincode', pincode);
      formData.append('employeeof', designationname);
      formData.append('department', depart);
      formData.append('joiningdate', joiningdatenew);
      formData.append('resigndate', resigndatenew);
      formData.append('address', address);
      // formData.append('profileurl', profileimg);
      formData.append('basicsalary', Number(basicsalary));
      formData.append('Allowance1', allowance1);
      formData.append('AllowanceAmount1', Number(allowanceAmount1));
      formData.append('Allowance2', allowance2);
      formData.append('AllowanceAmount2', Number(allowanceAmount2));
      formData.append('Allowance3', allowance3);
      formData.append('AllowanceAmount3', Number(allowanceAmount3));
      formData.append('Deduction1', deduction1);
      formData.append('DeductionAmount1', Number(deductionAmount1));
      formData.append('Deduction2', deduction2);
      formData.append('userType', emplyeetype);
      formData.append('DeductionAmount2', Number(deductionAmount2));
      formData.append('AllowLeave', Number(leaveNo));
      formData.append('FathersName', fathetrsname);

      formData.append(
        'TotalSalary',
        Number(basicsalary) +
          Number(allowanceAmount1) +
          Number(allowanceAmount2) +
          Number(allowanceAmount3) -
          Number(deductionAmount1) -
          Number(deductionAmount2),
      );
      formData.append('empId', empId);
      formData.append('AccountHolder', accountholdername);
      formData.append('AccountNumber', accountNumber);
      formData.append('BankName', bankName);
      formData.append('Branch', branchname);
      formData.append('IfscCode', ifscCode);
      formData.append('ResumeFile', '');
      formData.append('OfferLater', '');
      formData.append('JoningLater', '');

      formData.append('fronrofice', frontoffice);
      formData.append('fronroficeRead', frontoffice);
      formData.append('fronroficeWrite', frontofficeW);
      formData.append('fronroficeEdit', frontofficeE);
      formData.append('fronroficeDelete', frontofficeD);

      formData.append('student', student);
      formData.append('studentRead', student);
      formData.append('studentWrite', studentW);
      formData.append('studentEdit', studentE);
      formData.append('studentDelete', studentD);

      formData.append('attendance', Attendance);
      formData.append('attendanceRead', Attendance);
      formData.append('attendanceWrite', AttendanceW);
      formData.append('attendanceEdit', AttendanceE);
      formData.append('attendanceDelete', AttendanceD);

      formData.append('accounts', Accounts);
      formData.append('accountsRead', Accounts);
      formData.append('accountsWrite', AccountsW);
      formData.append('accountsEdit', AccountsE);
      formData.append('accountsDelete', AccountsD);

      formData.append('HumanResource', HumanResourse);
      formData.append('HumanResourceRead', HumanResourse);
      formData.append('HumanResourceWrite', HumanResourseW);
      formData.append('HumanResourceEdit', HumanResourseE);
      formData.append('HumanResourceDelete', HumanResourseD);

      formData.append('master', Masters);
      formData.append('masterRead', Masters);
      formData.append('masterWrite', MastersW);
      formData.append('masterEdit', MastersE);
      formData.append('masterDelete', MastersD);

      formData.append('transport', transport);
      formData.append('transportRead', transport);
      formData.append('transportWrite', transportWrite);
      formData.append('transportEdit', transportEdit);
      formData.append('transportDelete', transportDelete);

      formData.append('hostel', hostel);
      formData.append('hostelRead', hostel);
      formData.append('hostelWrite', hostelWrite);
      formData.append('hostelEdit', hostelEdit);
      formData.append('hostelDelete', hostelDelete);

      formData.append('library', library);
      formData.append('libraryRead', library);
      formData.append('libraryWrite', libraryWrite);
      formData.append('libraryEdit', libraryEdit);
      formData.append('libraryDelete', libraryDelete);

      formData.append('report', reports);
      formData.append('status', status);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      };
      const {data} = await axios.put(
        `${backendApiUrl}comman/updateemployee`,
        formData,
        config,
      );

      if (data?.status === true) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: data?.msg,
        });

        setloading(false);
        dispatch(getEmployee());
        navigation.goBack();
        formData = new FormData();
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.response?.data?.msg,
      });
    }
  };

  useEffect(() => {
    dispatch(getbatch());
    dispatch(getfeelist());
    formData = new FormData();
  }, []);

  useEffect(() => {
    if (newroute?.params?.data) {
      setupdatedata(newroute?.params?.data);
      setaddress(updatedata?.address);
      setempname(updatedata?.name);
      setempemail(updatedata?.email);
      setdesignationname(updatedata?.employeeof);
      setdepart(updatedata?.department);
      setcity(updatedata?.city);
      setstate(updatedata?.state);
      setpincode(updatedata?.pincode);
      setempphone1(updatedata?.phoneno1);
      setempphone2(updatedata?.phoneno2);
      setjoiningdate(moment(updatedata?.joiningdate).format('DD/MM/YYYY'));
      setresigndate(moment(updatedata?.resigndate).format('DD/MM/YYYY'));
      setstatus(updatedata?.status);
      setfrontoffice(updatedata?.fronrofice);
      setstudent(updatedata?.student);
      setAttendance(updatedata?.attendance);
      setAccounts(updatedata?.accounts);
      setHumanResourse(updatedata?.HumanResource);
      setMasters(updatedata?.master);
      setreports(updatedata?.report);
      setfrontofficeR(updatedata?.fronroficeRead);
      setfrontofficeW(updatedata?.fronroficeWrite);
      setfrontofficeE(updatedata?.fronroficeEdit);
      setfrontofficeD(updatedata?.fronroficeDelete);
      setstudentR(updatedata?.studentRead);
      setstudentW(updatedata?.studentWrite);
      setstudentE(updatedata?.studentEdit);
      setstudentD(updatedata?.studentDelete);
      setAttendance(updatedata?.attendance);
      setAttendanceR(updatedata?.attendanceRead);
      setAttendanceW(updatedata?.attendanceWrite);
      setAttendanceE(updatedata?.attendanceEdit);
      setAttendanceD(updatedata?.attendanceDelete);
      setMastersR(updatedata?.masterRead);
      setMastersW(updatedata?.masterWrite);
      setMastersE(updatedata?.masterEdit);
      setMastersD(updatedata?.masterDelete);
      setHumanResourseR(updatedata?.HumanResourceRead);
      setHumanResourseW(updatedata?.HumanResourceWrite);
      setHumanResourseE(updatedata?.HumanResourceEdit);
      setHumanResourseD(updatedata?.HumanResourceDelete);
      setAccountsR(updatedata?.accountsRead);
      setAccountsW(updatedata?.accountsWrite);
      setAccountsE(updatedata?.accountsEdit);
      setAccountsD(updatedata?.accountsDelete);
      setbasicsalary(updatedata?.basicsalary?.toString());
      // setallowance(updatedata?.Allowance);
      // setdeduction(updatedata?.Deduction);
      settotalsalary(updatedata?.TotalSalary);
      setaccountholdername(updatedata?.AccountHolder);
      setaccountNumber(updatedata?.AccountNumber);
      setbankName(updatedata?.BankName);
      setbranchname(updatedata?.Branch);
      setifscCode(updatedata?.IfscCode);
      setempId(updatedata?.empId);
      setfathetrsname(updatedata?.FathersName);
      setleaveNo(updatedata?.AllowLeave?.toString());
      setallowance1(updatedata?.Allowance1);
      setallowanceAmount1(updatedata?.AllowanceAmount1?.toString());
      setallowance2(updatedata?.Allowance2);
      setallowanceAmount2(updatedata?.AllowanceAmount2?.toString());
      setallowance3(updatedata?.Allowance3);
      setallowanceAmount3(updatedata?.AllowanceAmount3?.toString());
      setdeduction1(updatedata?.Deduction1);
      setdeductionAmount1(updatedata?.DeductionAmount1?.toString());
      setdeduction2(updatedata?.Deduction2);
      setdeductionAmount2(updatedata?.DeductionAmount2?.toString());
      settransport(updatedata?.transport);
      settransportRead(updatedata?.transportRead);
      settransportEdit(updatedata?.transportEdit);
      settransportWrite(updatedata?.transportWrite);
      settransportDelete(updatedata?.transportDelete);
      sethostel(updatedata?.hostel);
      sethostelRead(updatedata?.hostelRead);
      sethostelWrite(updatedata?.hostelWrite);
      sethostelEdit(updatedata?.hostelEdit);
      sethostelDelete(updatedata?.hostelDelete);
      setlibrary(updatedata?.library);
      setlibraryRead(updatedata?.libraryRead);
      setlibraryWrite(updatedata?.libraryWrite);
      setlibraryDelete(updatedata?.libraryDelete);
      setlibraryEdit(updatedata?.libraryEdit);
    }
  }, [updatedata]);

  useEffect(() => {
    setisData(designation);
    setisdata1(department, department);
  }, [designation, department]);

  console.log('role is ', frontofficeR);

  return (
    <View>
      <BackHeader title={'Assign Role'} icon={'person'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.bottomheader}>
            <Text style={{color: Colors.black}}>Front Office </Text>
            <View style={styles.mainoptionView}>
              <View style={styles.optionview}>
                <Text>Read</Text>
                <Checkbox
                  status={frontofficeR ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setfrontofficeR(!frontofficeR)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Create</Text>
                <Checkbox
                  status={frontofficeW ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setfrontofficeW(!frontofficeW)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Update</Text>
                <Checkbox
                  status={frontofficeE ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setfrontofficeE(!frontofficeE)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Delete</Text>
                <Checkbox
                  status={frontofficeD ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setfrontofficeD(!frontofficeD)}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottomheader}>
            <Text style={{color: Colors.black}}>Student</Text>
            <View style={styles.mainoptionView}>
              <View style={styles.optionview}>
                <Text>Read</Text>
                <Checkbox
                  status={studentR ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setstudentR(!studentR)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Create</Text>
                <Checkbox
                  status={studentW ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setstudentW(!studentW)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Update</Text>
                <Checkbox
                  status={studentW ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setstudentE(!studentE)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Delete</Text>
                <Checkbox
                  status={studentD ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setstudentD(!studentD)}
                />
              </View>
            </View>
          </View>

          <View style={styles.bottomheader}>
            <Text style={{color: Colors.black}}>Attendance</Text>
            <View style={styles.mainoptionView}>
              <View style={styles.optionview}>
                <Text>Read</Text>
                <Checkbox
                  status={Attendance ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setAttendance(!Attendance)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Create</Text>
                <Checkbox
                  status={AttendanceW ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setAttendanceW(!AttendanceW)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Update</Text>
                <Checkbox
                  status={AttendanceE ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setAttendanceE(!AttendanceE)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Delete</Text>
                <Checkbox
                  status={AttendanceD ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setAttendanceD(!AttendanceD)}
                />
              </View>
            </View>
          </View>

          <View style={styles.bottomheader}>
            <Text style={{color: Colors.black}}>Accounts</Text>
            <View style={styles.mainoptionView}>
              <View style={styles.optionview}>
                <Text>Read</Text>
                <Checkbox
                  status={Accounts ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setAccounts(!Accounts)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Create</Text>
                <Checkbox
                  status={AccountsW ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setAccountsW(!AccountsW)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Update</Text>
                <Checkbox
                  status={AccountsE ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setAccountsE(!AccountsE)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Delete</Text>
                <Checkbox
                  status={AccountsD ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setAccountsD(!AccountsD)}
                />
              </View>
            </View>
          </View>

          <View style={styles.bottomheader}>
            <Text style={{color: Colors.black}}>HR</Text>
            <View style={styles.mainoptionView}>
              <View style={styles.optionview}>
                <Text>Read</Text>
                <Checkbox
                  status={HumanResourse ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setHumanResourse(!HumanResourse)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Create</Text>
                <Checkbox
                  status={HumanResourseW ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setHumanResourseW(!HumanResourseW)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Update</Text>
                <Checkbox
                  status={HumanResourseE ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setHumanResourseE(!HumanResourseE)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Delete</Text>
                <Checkbox
                  status={HumanResourseD ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setHumanResourseD(!HumanResourseD)}
                />
              </View>
            </View>
          </View>

          <View style={styles.bottomheader}>
            <Text style={{color: Colors.black}}>Masters</Text>
            <View style={styles.mainoptionView}>
              <View style={styles.optionview}>
                <Text>Read</Text>
                <Checkbox
                  status={Masters ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setMasters(!Masters)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Create</Text>
                <Checkbox
                  status={MastersW ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setMastersW(!MastersW)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Update</Text>
                <Checkbox
                  status={MastersE ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setMastersE(!MastersE)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Delete</Text>
                <Checkbox
                  status={MastersD ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setMastersD(!MastersD)}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottomheader}>
            <Text style={{color: Colors.black}}>Transport</Text>
            <View style={styles.mainoptionView}>
              <View style={styles.optionview}>
                <Text>Read</Text>
                <Checkbox
                  status={transport ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => settransport(!transport)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Create</Text>
                <Checkbox
                  status={transportWrite ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => settransportWrite(!transportWrite)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Update</Text>
                <Checkbox
                  status={transportEdit ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => settransportEdit(!transportEdit)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Delete</Text>
                <Checkbox
                  status={transportDelete ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => settransportDelete(!transportDelete)}
                />
              </View>
            </View>
          </View>

          <View style={styles.bottomheader}>
            <Text style={{color: Colors.black}}>Hostel</Text>
            <View style={styles.mainoptionView}>
              <View style={styles.optionview}>
                <Text>Read</Text>
                <Checkbox
                  status={hostel ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => sethostel(!hostel)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Create</Text>
                <Checkbox
                  status={hostelWrite ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => sethostelWrite(!hostelWrite)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Update</Text>
                <Checkbox
                  status={hostelEdit ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => sethostelEdit(!hostelEdit)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Delete</Text>
                <Checkbox
                  status={hostelDelete ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => sethostelDelete(!hostelDelete)}
                />
              </View>
            </View>
          </View>

          <View style={styles.bottomheader}>
            <Text style={{color: Colors.black}}>Library</Text>
            <View style={styles.mainoptionView}>
              <View style={styles.optionview}>
                <Text>Read</Text>
                <Checkbox
                  status={library ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setlibrary(!library)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Create</Text>
                <Checkbox
                  status={libraryWrite ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setlibraryWrite(!libraryWrite)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Update</Text>
                <Checkbox
                  status={libraryEdit ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setlibraryEdit(!libraryEdit)}
                />
              </View>
              <View style={styles.optionview}>
                <Text>Delete</Text>
                <Checkbox
                  status={libraryDelete ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setlibraryDelete(!libraryDelete)}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottomheader}>
            <Text style={{color: Colors.black}}>Reports</Text>
            <View style={styles.mainoptionView}>
              <View style={styles.optionview}>
                <Text>Read</Text>
                <Checkbox
                  status={reports ? 'checked' : 'unchecked'}
                  color={Colors.primary}
                  onPress={() => setreports(!reports)}
                />
              </View>
            </View>
          </View>
          <RNButton
            loading={loading}
            onPress={submit}
            style={{
              marginHorizontal: 20,
              marginBottom: Height(50),
              marginTop: Height(10),
            }}>
            Update & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateRole;

const styles = StyleSheet.create({
  bottomheader: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  mainoptionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  getfeeview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: deviceWidth * 0.04,
  },
  inputview: {
    width: Width(355),
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
    paddingHorizontal: 20,
    paddingBottom: 10,
    padding: 20,
  },
  baseinput: {
    width: Width(355),
    height: Height(40),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Width(10),
    // borderColor: index === 3 ? primary: '#a9a9a9',
    marginTop: Height(10),
  },

  addinput: {
    height: Height(45),
    width: Width(355),
    borderWidth: 1,
    // borderColor: index === 7 ? primary : '#a9a9a9',
    alignSelf: 'center',
    borderRadius: Width(5),
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Height(10),
  },
  loginbtndiv: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  loginbtn: {
    width: Width(355),
    height: Height(40),
    backgroundColor: primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginbtndiv10: {
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  loginbtn10: {
    width: Width(80),
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
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  chooseview: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imgpreview: {
    height: 200,
    borderWidth: 1.5,
    borderColor: primary,
    backgroundColor: Colors.fadeGray,
    borderStyle: 'dotted',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imgprestyle: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  radioGroup: {
    paddingHorizontal: 5,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },

  modal: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    position: 'relative',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // marginTop: '15%',
    paddingBottom: 10,
    height: '25%',
    // position: 'relative',
  },
  elevation: {
    shadowColor: '#52006A',
    elevation: 20,
  },
  cancalView: {
    position: 'absolute',
    bottom: Height(170),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 5,
  },
  buttonmodal: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  checkstyleimg: {
    height: 50,
    width: 50,
  },
  processpatbtn: {
    width: Width(120),
    height: Height(40),
    backgroundColor: primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  okbtn: {
    width: Width(50),
    height: Height(50),
    backgroundColor: primary,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    marginTop: 25,
  },
  dropstyle: {
    alignSelf: 'center',
    width: Width(170),
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(20),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.fadeGray,
    color: 'white',
  },
  dropstyleStream: {
    alignSelf: 'center',
    width: Width(350),
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(20),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.fadeGray,
    color: 'white',
  },
  totalamountstyle: {
    width: '100%',
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.fadeGray,
    color: 'white',
    paddingTop: deviceHeight * 0.01,
  },
  inputLabel: {
    fontSize: 16,
    color: Colors.textGrey,
  },
});
