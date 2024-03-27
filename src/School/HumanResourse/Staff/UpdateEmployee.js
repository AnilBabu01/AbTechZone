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
import {Dropdown} from 'react-native-element-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import check from '../../../assets/check1.png';
import {useDispatch, useSelector} from 'react-redux';
import {
  getEmployee,
  getbatch,
  getfeelist,
} from '../../../redux/action/commanAction';
import {useNavigation, useRoute} from '@react-navigation/native';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import RNDatePicker from '../../../Component/RNDatePicker';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {handleDate, getTodaysDate} from '../../../utils/functions';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {Colors} from '../../../utils/Colors';
import moment from 'moment';
import BackHeader from '../../../Component/Header/BackHeader';
import {backendApiUrl} from '../../../Config/config';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBDropDown from '../../../Component/RNBDropDown';
import {
  indiaStatesData,
  CasteList,
  BloodGroupList,
  religionList,
  GenderListList,
  EmpStatusList,
} from '../../Student/StaticData';

let formData = new FormData();
const UpdateEmployee = () => {
  const newroute = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [categoryname, setcategoryname] = useState('');
  const [Religion, setReligion] = useState('');
  const [Nationality, setNationality] = useState('Indian');
  const [gender, setgender] = useState('Male');
  const [BloodGroup, setBloodGroup] = useState('');

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
  const [aadharcard, setaadharcard] = useState('');
  const [Drivingimg, setDrivingimg] = useState('');
  const [tenthimg, settenthimg] = useState('');
  const [twethimg, settwethimg] = useState('');
  const [Graduationimg, setGraduationimg] = useState('');
  const [postgraduationimg, setpostgraduationimg] = useState('');
  const [certificateimg1, setcertificateimg1] = useState('');
  const [certificateimg2, setcertificateimg2] = useState('');
  const [certificateimg3, setcertificateimg3] = useState('');
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
  const [statename, setstatename] = useState('');
  const [cityname, setcityname] = useState('');
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
      formData.append('city', cityname);
      formData.append('state', statename);
      formData.append('pincode', pincode);
      formData.append('employeeof', designationname);
      formData.append('department', depart);
      formData.append('joiningdate', joiningdatenew);
      formData.append('resigndate', resigndatenew);
      formData.append('address', address);

      formData.append('Caste', categoryname);
      formData.append('Religion', Religion);
      formData.append('Nationality', Nationality);
      formData.append('Gender', gender);
      formData.append('BloodGroup', BloodGroup);

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

      setNationality(updatedata?.Nationality);
      setReligion(updatedata?.Religion);
      setgender(updatedata?.Gender);
      setBloodGroup(updatedata?.BloodGroup);
      setcategoryname(updatedata?.Caste);
    }
  }, [updatedata]);

  const handleChooseProfilePhoto = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setpassportsize(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('profileurl', file);
        }
      }
    });
  };

  const handleTakeProfilePhoto = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setpassportsize(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('profileurl', file);
        }
      }
    });
  };

  const handleChoosePhotoAdhar = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setaadharcard(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('Aadharurl', file);
        }
      }
    });
  };

  const handleTakePhotoAdhar = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setaadharcard(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('Aadharurl', file);
        }
      }
    });
  };

  const handleChoosePhotoMarksheet10 = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        settenthimg(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('tenurl', file);
        }
      }
    });
  };

  const handleTakePhotoMarksheet10 = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        settenthimg(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('tenurl', file);
        }
      }
    });
  };

  const handleChoosePhotoDriving = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setDrivingimg(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('Drivingurl', file);
        }
      }
    });
  };

  const handleTakePhotoDriving = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setDrivingimg(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('Drivingurl', file);
        }
      }
    });
  };

  const handleChoosePhotoMarksheet12 = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        settwethimg(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('twelturl', file);
        }
      }
    });
  };

  const handleTakePhotoMarksheet12 = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        settwethimg(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('twelturl', file);
        }
      }
    });
  };

  const handleChoosePhotoGraduation = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setGraduationimg(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('Graduationurl', file);
        }
      }
    });
  };

  const handleTakePhotoGraduation = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setGraduationimg(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('Graduationurl', file);
        }
      }
    });
  };

  const handleChoosePhotoPostGraduation = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setpostgraduationimg(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('PostGraduationurl', file);
        }
      }
    });
  };

  const handleTakePhotoPostGraduation = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setpostgraduationimg(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('PostGraduationurl', file);
        }
      }
    });
  };

  const handleChoosePhotoBirthCert1 = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setcertificateimg1(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('Certificate1url', file);
        }
      }
    });
  };

  const handleTakePhotoBirthCert1 = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setcertificateimg1(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('Certificate1url', file);
        }
      }
    });
  };

  const handleChoosePhotoBirthCert2 = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setcertificateimg2(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('Certificate2url', file);
        }
      }
    });
  };

  const handleTakePhotoBirthCert2 = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setcertificateimg2(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('Certificate2url', file);
        }
      }
    });
  };

  const handleChoosePhotoBirthCert3 = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setcertificateimg3(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('Certificate3url', file);
        }
      }
    });
  };

  const handleTakePhotoBirthCert3 = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setcertificateimg3(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          formData.append('Certificate3url', file);
        }
      }
    });
  };

  useEffect(() => {
    setisData(designation);
    setisdata1(department, department);
  }, [designation, department]);

  const filterData = () => {
    let FilteredData;
    if (state) {
      FilteredData = indiaStatesData?.states
        ?.find(item => item?.id === Number(state))
        ?.districts?.map(item => ({
          label: item?.name,
          value: item?.id,
        }));
    } else {
      FilteredData = [{label: '', value: 'Please Select'}];
    }

    return FilteredData;
  };

  return (
    <View>
      <BackHeader title={'Update Employee'} icon={'person'} />
      <Modal animationType={'fade'} transparent={true} visible={openModel}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={[styles.modal, styles.elevation]}>
            <View style={styles.cancalView}>
              <TouchableOpacity>
                <Image source={check} style={styles.checkstyleimg} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonmodal}>
              <TouchableOpacity style={styles.processpatbtn}>
                <View>
                  <Text style={{color: 'white', fontSize: 16}}>
                    Process To Fee
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.okbtn}>
                <View>
                  <Text style={{color: 'white', fontSize: 16}}>Ok!</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Employee Id"
                  placeholder="Enter Employee Id"
                  value={empId}
                  onChangeText={data => setempId(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Employee Name"
                  placeholder="Enter Name"
                  value={empname}
                  onChangeText={data => setempname(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Gender"
                    value={gender}
                    OptionsList={GenderListList}
                    onChange={data => setgender(data.value)}
                  />
                </View>
              </View>
              <View style={{width: '45%', marginBottom: deviceHeight * 0.02}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Blood Group"
                    value={BloodGroup}
                    OptionsList={BloodGroupList}
                    onChange={data => setBloodGroup(data.value)}
                  />
                </View>
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Religion"
                    value={Religion}
                    OptionsList={religionList}
                    onChange={data => setReligion(data.value)}
                  />
                </View>
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Nationality"
                  placeholder="Enter Nationality"
                  value={Nationality}
                  onChangeText={data => setNationality(data)}
                  keyboardType="number-pad"
                />
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Caste"
                    value={categoryname}
                    OptionsList={CasteList}
                    onChange={data => setcategoryname(data.value)}
                  />
                </View>
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Allow Leave"
                  placeholder="Enter Allow Leave "
                  value={leaveNo}
                  onChangeText={data => setleaveNo(data)}
                />
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Employee Email"
                  placeholder="Enter Email"
                  value={empemail}
                  onChangeText={data => setempemail(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Father's Name"
                  placeholder="Enter Father's Name"
                  value={fathetrsname}
                  onChangeText={data => setfathetrsname(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Mobile No1"
                  placeholder="Enter Mobile No1"
                  value={empphone1}
                  onChangeText={data => setempphone1(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Mobile No2"
                  placeholder="Enter Mobile No2"
                  value={empphone2}
                  onChangeText={data => setempphone2(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="State"
                  placeholder="Enter State"
                  value={state}
                  onChangeText={data => setstate(data)}
                />
                {/* <RNBDropDown
                  label="State"
                  value={state}
                  OptionsList={indiaStatesData?.states?.map(item => ({
                    label: item?.state,
                    value: item?.id,
                  }))}
                  onChange={data => {
                    setstate(data.value);
                    setstatename(data.label);
                  }}
                /> */}
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="District"
                  placeholder="Enter District"
                  value={city}
                  onChangeText={data => setcity(data)}
                />
                {/* <RNBDropDown
                  label="District"
                  value={city}
                  OptionsList={filterData()}
                  onChange={data => {
                    setcity(data.value);
                    setcityname(data.label);
                  }}
                /> */}
              </View>
            </FlexRowWrapper>
            <View
              style={{
                marginHorizontal: deviceWidth * 0.04,
                position: 'relative',
              }}>
              <RNInputField
                label="Pin Code"
                placeholder="Enter Pin Code"
                value={pincode}
                onChangeText={data => setpincode(data)}
              />
            </View>

            <View
              style={{
                marginHorizontal: deviceWidth * 0.04,
                position: 'relative',
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  fontWeight: '800',
                  position: 'absolute',
                  right: deviceWidth * 0.05,
                  color: Colors.black,
                }}>
                {address?.length} / 500
              </Text>
              <RNInputField
                style={{paddingTop: 10}}
                label="Address"
                placeholder="Enter Address"
                value={address}
                onChangeText={data => setaddress(data)}
                multiline
                numberOfLines={5}
                maxLength={500}
              />
            </View>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Status"
                    value={status}
                    OptionsList={EmpStatusList}
                    onChange={data => setstatus(data.value)}
                  />
                </View>
              </View>
              <View style={{width: '45%', marginBottom: deviceHeight * 0.02}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Designation"
                    value={designationname}
                    OptionsList={
                      isdata &&
                      isdata?.map(item => ({
                        label: `${item?.employeetype}`,
                        value: `${item?.employeetype}`,
                      }))
                    }
                    onChange={data => setdesignationname(data.value)}
                  />
                </View>
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Deparment"
                    value={depart}
                    OptionsList={
                      isdata1 &&
                      isdata1?.map(item => ({
                        label: `${item?.DepartmentName}`,
                        value: `${item?.DepartmentName}`,
                      }))
                    }
                    onChange={data => setdepart(data.value)}
                  />
                </View>
              </View>
              <View style={{width: '45%', marginBottom: deviceHeight * 0.02}}>
                <RNDatePicker
                  title="Joining Date"
                  value={joiningdate}
                  onDateChange={date => setjoiningdate(handleDate(date))}
                />
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNInputField
                  label="Basic Salary"
                  placeholder="Enter Basic Salary"
                  value={basicsalary}
                  onChangeText={data => setbasicsalary(data)}
                  keyboardType="number-pad"
                />
              </View>
            </FlexRowWrapper>
            <View
              style={{backgroundColor: Colors.primary, paddingVertical: 10}}>
              <Text style={{textAlign: 'center', color: Colors.white}}>
                Allowances
              </Text>
            </View>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Allowances1 Name"
                  placeholder="Enter Name"
                  value={allowance1}
                  onChangeText={data => setallowance1(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Allowances1 Amount"
                  placeholder="Enter Amount"
                  value={allowanceAmount1}
                  onChangeText={data => setallowanceAmount1(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Allowances2 Name"
                  placeholder="Enter Name"
                  value={allowance2}
                  onChangeText={data => setallowance2(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Allowances2 Amount"
                  placeholder="Enter Amount"
                  value={allowanceAmount2}
                  onChangeText={data => setallowanceAmount2(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Allowances3 Name"
                  placeholder="Enter Name"
                  value={allowance3}
                  onChangeText={data => setallowance3(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Allowances3 Amount"
                  placeholder="Enter Amount"
                  value={allowanceAmount3}
                  onChangeText={data => setallowanceAmount3(data)}
                />
              </View>
            </FlexRowWrapper>
            <View
              style={{backgroundColor: Colors.primary, paddingVertical: 10}}>
              <Text style={{textAlign: 'center', color: Colors.white}}>
                Deductions
              </Text>
            </View>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Deduction1"
                  placeholder="Enter Deduction1"
                  value={deduction1}
                  onChangeText={data => setdeduction1(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Deduction1 Amount"
                  placeholder="Enter Amount"
                  value={deductionAmount1}
                  onChangeText={data => setdeductionAmount1(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Deduction2"
                  placeholder="Enter Deduction2"
                  value={deduction2}
                  onChangeText={data => setdeduction2(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Deduction2 Amount"
                  placeholder="Enter Amount"
                  value={deductionAmount2}
                  onChangeText={data => setdeductionAmount2(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNInputField
                  label="Total Amount Salary"
                  placeholder="Total Amount Salary"
                  value={(
                    Number(basicsalary) +
                    Number(allowanceAmount1) +
                    Number(allowanceAmount2) +
                    Number(allowanceAmount3) -
                    Number(deductionAmount1) -
                    Number(deductionAmount2)
                  ).toString()}
                  onChangeText={data => settotalsalary(data)}
                />
              </View>
            </FlexRowWrapper>

            <View
              style={{backgroundColor: Colors.primary, paddingVertical: 10}}>
              <Text style={{textAlign: 'center', color: Colors.white}}>
                Bank Details
              </Text>
            </View>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Account Holder Name"
                  placeholder="Enter Account Holder Name"
                  value={accountholdername}
                  onChangeText={data => setaccountholdername(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Account Number"
                  placeholder="Enter Account Number"
                  value={accountNumber}
                  onChangeText={data => setaccountNumber(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Account Bank Name"
                  placeholder="Enter Bank Name"
                  value={bankName}
                  onChangeText={data => setbankName(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Branch"
                  placeholder="Enter Branch"
                  value={branchname}
                  onChangeText={data => setbranchname(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNInputField
                  label="IFSC CODE"
                  placeholder="Enter IFSC CODE"
                  value={ifscCode}
                  onChangeText={data => setifscCode(data)}
                />
              </View>
            </FlexRowWrapper>
          </View>

          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
              Profile
            </Text>
            <View>
              {updatedata?.profileurl || passportsize ? (
                <>
                  <View style={{position: 'relative'}}>
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: Width(150),
                        top: Height(40),
                      }}>
                      <TouchableOpacity
                        onPress={() => handleTakeProfilePhoto()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChooseProfilePhoto()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{
                        uri: passportsize
                          ? passportsize
                          : updatedata?.profileurl,
                      }}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity onPress={() => handleTakeProfilePhoto()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChooseProfilePhoto()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
              Adhar Card
            </Text>
            <View>
              {updatedata?.Aadharurl || aadharcard ? (
                <>
                  <View style={{position: 'relative'}}>
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: Width(150),
                        top: Height(40),
                      }}>
                      <TouchableOpacity onPress={() => handleTakePhotoAdhar()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoAdhar()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{
                        uri: aadharcard ? aadharcard : updatedata?.Aadharurl,
                      }}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity onPress={() => handleTakePhotoAdhar()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleChoosePhotoAdhar()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
              Driving Licence
            </Text>
            <View>
              {updatedata?.Drivingurl || Drivingimg ? (
                <>
                  <View style={{position: 'relative'}}>
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: Width(150),
                        top: Height(40),
                      }}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoDriving()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoDriving()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{
                        uri: Drivingimg ? Drivingimg : updatedata?.Drivingurl,
                      }}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity onPress={() => handleTakePhotoDriving()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChoosePhotoDriving()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
              10Th Marksheet
            </Text>

            <View>
              {updatedata?.tenurl || tenthimg ? (
                <>
                  <View style={{position: 'relative'}}>
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: Width(150),
                        top: Height(40),
                      }}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoMarksheet10()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoMarksheet10()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{uri: tenthimg ? tenthimg : updatedata?.tenurl}}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity
                      onPress={() => handleTakePhotoMarksheet10()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChoosePhotoMarksheet10()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
              12Th Marksheet
            </Text>

            <View>
              {updatedata?.twelturl || twethimg ? (
                <>
                  <View style={{position: 'relative'}}>
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: Width(150),
                        top: Height(40),
                      }}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoMarksheet12()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoMarksheet12()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{uri: twethimg ? twethimg : updatedata?.twelturl}}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity
                      onPress={() => handleTakePhotoMarksheet12()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChoosePhotoMarksheet12()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
              Graduation Final Year
            </Text>

            <View>
              {updatedata?.Graduationurl || Graduationimg ? (
                <>
                  <View style={{position: 'relative'}}>
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: Width(150),
                        top: Height(40),
                      }}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoGraduation()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoGraduation()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{
                        uri: Graduationimg
                          ? Graduationimg
                          : updatedata?.Graduationurl,
                      }}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity
                      onPress={() => handleTakePhotoGraduation()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChoosePhotoGraduation()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
              Post Graduation Final Year
            </Text>

            <View>
              {updatedata?.PostGraduationurl || postgraduationimg ? (
                <>
                  <View style={{position: 'relative'}}>
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: Width(150),
                        top: Height(40),
                      }}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoPostGraduation()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoPostGraduation()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{
                        uri: postgraduationimg
                          ? postgraduationimg
                          : updatedata?.PostGraduationurl,
                      }}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity
                      onPress={() => handleTakePhotoPostGraduation()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChoosePhotoPostGraduation()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
              Cartificate 1
            </Text>

            <View style={{marginBottom: 10}}>
              {updatedata?.Certificate1url || certificateimg1 ? (
                <>
                  <View style={{position: 'relative'}}>
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: Width(150),
                        top: Height(40),
                      }}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoBirthCert1()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoBirthCert1()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{
                        uri: certificateimg1
                          ? certificateimg1
                          : updatedata?.Certificate1url,
                      }}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity
                      onPress={() => handleTakePhotoBirthCert1()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChoosePhotoBirthCert1()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            <View style={{marginBottom: 10}}>
              {updatedata?.Certificate2url || certificateimg2 ? (
                <>
                  <View style={{position: 'relative'}}>
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: Width(150),
                        top: Height(40),
                      }}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoBirthCert2()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoBirthCert2()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{
                        uri: certificateimg2
                          ? certificateimg2
                          : updatedata?.Certificate2url,
                      }}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity
                      onPress={() => handleTakePhotoBirthCert2()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChoosePhotoBirthCert2()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            <View style={{marginBottom: 10}}>
              {updatedata?.Certificate3url || certificateimg3 ? (
                <>
                  <View style={{position: 'relative'}}>
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: Width(150),
                        top: Height(40),
                      }}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoBirthCert3()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoBirthCert3()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{
                        uri: certificateimg3
                          ? certificateimg3
                          : updatedata?.Certificate3url,
                      }}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity
                      onPress={() => handleTakePhotoBirthCert3()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChoosePhotoBirthCert3()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
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

export default UpdateEmployee;

const styles = StyleSheet.create({
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
    paddingHorizontal: 2,
    paddingBottom: 10,
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
