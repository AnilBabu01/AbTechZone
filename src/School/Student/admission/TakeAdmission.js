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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import check from '../../../assets/check1.png';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {
  getstudent,
  getbatch,
  getfeelist,
  Addstudent,
} from '../../../redux/action/commanAction';
import {useNavigation} from '@react-navigation/native';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import RNDatePicker from '../../../Component/RNDatePicker';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {handleDate, getTodaysDate} from '../../../utils/functions';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {Colors} from '../../../utils/Colors';
import {ADD_STUDENT_RESET} from '../../../redux/constants/commanConstants';
import moment from 'moment';
import BackHeader from '../../../Component/Header/BackHeader';
import {
  indiaStatesData,
  streamlist,
  studentStatus,
  CasteList,
  BloodGroupList,
  religionList,
  GenderListList,
} from '../StaticData';
import RNBDropDown from '../../../Component/RNBDropDown';

let formData = new FormData();
const TakeAdmission = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const [index, setIndex] = useState(0);
  const [openModel, setopenModel] = useState(false);
  const [whatsaapnumber, setwhatsaapnumber] = useState('');

  const [Religion, setReligion] = useState('');
  const [Nationality, setNationality] = useState('Indian');
  const [address, setaddress] = useState('');
  const [gender, setgender] = useState('Male');
  const [BloodGroup, setBloodGroup] = useState('');
  const [mothersname, setmothersname] = useState('');
  const [mothersPhoneNo, setmothersPhoneNo] = useState('');
  const [PreviousTcNo, setPreviousTcNo] = useState('');
  const [PreviousSchool, setPreviousSchool] = useState('');
  const [PreviousSchoolAddress, setPreviousSchoolAddress] = useState('');

  const [stream, setstream] = useState('NONE');
  const [DateOfBirth, setDateOfBirth] = useState(getTodaysDate());
  const [datecertificatePreview, setdatecertificatePreview] = useState('');
  const [islibrary, setislibrary] = useState(false);
  const [ishostel, setishostel] = useState(false);
  const [istransport, setistransport] = useState(false);
  const [SrNumber, setSrNumber] = useState('');
  const [sessionname, setsessionname] = useState('');
  const [sectionname, setsectionname] = useState('NONE');
  const [sectionlist, setsectionlist] = useState([]);
  const [selectedValue, setSelectedValue] = useState('option1');
  const [passportsize, setpassportsize] = useState('');
  const [adharno, setadharno] = useState('');
  const [amount, setamount] = useState('');
  const [monthlyfee, setmonthlyfee] = useState('');
  const [getfee, setgetfee] = useState('default');
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const [courses, setcourses] = useState('');
  const [batchname, setbatchname] = useState('');
  const [studentname, setstudentname] = useState('');
  const [studentemail, setstudentemail] = useState('');
  const [studentphone, setstudentphone] = useState('');
  const [adminssiondate, setadminssiondate] = useState(getTodaysDate());
  const [passProfile, setpassProfile] = useState('');
  const [premarksheet, setpremarksheet] = useState('');
  const [passmarksheet, setpassmarksheet] = useState('');
  const [marksheetName, setmarksheetName] = useState('');
  const [otherspreview, setotherspreview] = useState('');
  const [othersname, setothersname] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [statename, setstatename] = useState('');
  const [cityname, setcityname] = useState('');
  const [Pincode, setPincode] = useState('');
  const [pano, setpano] = useState('');
  const [courseorclass, setcourseorclass] = useState('');
  const [studentstatus, setstudentstatus] = useState('Active');
  const [adharcardno, setadharcardno] = useState('');
  const [fathersname, setfathersname] = useState('');
  const [fathersphone, setfathersphone] = useState('');
  const [studentrollno, setstudentrollno] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [categorylist, setcategorylist] = useState([]);
  const [hostellist, sethostellist] = useState([]);
  const [hostelcategorylist, sethostelcategorylist] = useState([]);
  const [hostelfacilitylist, sethostelfacilitylist] = useState([]);
  const [routelist, setroutelist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [hostelname, sethostelname] = useState('');
  const [hostelcategoryname, sethostelcategoryname] = useState('');
  const [hostlefacility, sethostlefacility] = useState('');
  const [hosteldefaultfee, sethosteldefaultfee] = useState(0);
  const [hosteldefaultfeepermonth, sethosteldefaultfeepermonth] =
    useState(true);
  const [transportdefaultfee, settransportdefaultfee] = useState(true);
  const [hostelmanualpermonthfee, sethostelmanualpermonthfee] = useState('0');
  const [onlyHostelFee, setonlyHostelFee] = useState('');
  const [hostelfeeperMonth, sethostelfeeperMonth] = useState('');
  const [fromroute, setfromroute] = useState('');
  const [toroute, settoroute] = useState('');
  const [onlyTransport, setonlyTransport] = useState('');
  const [TransportFeePermonth, setTransportFeePermonth] = useState('');
  const [loading1, setloading1] = useState(false);
  const [loading2, setloading2] = useState(false);

  const [annualfee, setannualfee] = useState('');
  const [annualmanualfee, setannualmanualfee] = useState('');

  const [AdmissionFee, setAdmissionFee] = useState('');
  const [AdmissionFeeManual, setAdmissionFeeManual] = useState('');

  const {fee} = useSelector(state => state.getfee);
  const {batch} = useSelector(state => state.getbatch);
  const {user} = useSelector(state => state.auth);
  const {category} = useSelector(state => state.getcategory);
  const {hostel} = useSelector(state => state.GetHostel);
  const {roomcategory} = useSelector(state => state.GetCategory);
  const {roomfacility} = useSelector(state => state.GetFacility);
  const {route} = useSelector(state => state.GetRoute);
  const {sections} = useSelector(state => state.GetSection);

  const {studentaddstatus, student, loading, error} = useSelector(
    state => state.addstudent,
  );
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);
  const {Sessions} = useSelector(state => state.GetSession);

  let regfee = courses?.split(' ').pop();
  var lastIndex = courses?.lastIndexOf(' ');
  let first = courses?.substring(0, lastIndex);

  let perFee = first?.split(' ').pop();
  var lastIndex = first?.lastIndexOf(' ');
  let coursein = first?.substring(0, lastIndex);
  var lastIndex = perFee?.lastIndexOf(' ');

  var lastIndex = coursein?.lastIndexOf(' ');
  let regcoursein = coursein?.substring(0, lastIndex);

  let valuesArray = courses?.split(' ');
  let [
    coursename,
    courseduration,
    feepermonth,
    Registractionfee,
    adminssionfee,
    AnnualFee,
  ] = valuesArray;

  const submit = async () => {
    try {
      var momentDate = moment(adminssiondate, 'DD/MM/YYYY');
      var newadminssiondate = momentDate.format('YYYY-MM-DD');
      var momentDateOfBirth = moment(DateOfBirth, 'DD/MM/YYYY');
      var newDateOfBirth = momentDateOfBirth.format('YYYY-MM-DD');

      formData.append('name', studentname);
      formData.append('email', studentemail);
      formData.append('phoneno1', studentphone);
      formData.append('Religion', Religion);
      formData.append('Nationality', Nationality);
      formData.append('Gender', gender);
      formData.append('BloodGroup', BloodGroup);
      formData.append('address', address);
      formData.append('PreviousTcNo', PreviousTcNo);
      formData.append('PreviousSchoolName', PreviousSchool);
      formData.append('PreviousSchoolAddress', PreviousSchoolAddress);

      formData.append('whatsappNo', fathersphone);
      formData.append('MathersName', mothersname);
      formData.append('MathersPhoneNo', mothersPhoneNo);
      formData.append('MatherswhatsappNo', mothersPhoneNo);

      formData.append('othersdoc', '');
      formData.append('BirthDocument', '');
      formData.append('fathersPhoneNo', fathersphone);
      formData.append('fathersName', fathersname);
      formData.append('courseorclass', coursename);
      formData.append('rollnumber', studentrollno);
      formData.append('StudentStatus', studentstatus);
      formData.append('batch', batchname);
      formData.append('city', cityname);
      formData.append('state', statename);
      formData.append('admissionDate', newadminssiondate);

      formData.append('courseduration', '');
      formData.append('adharno', adharcardno);
      formData.append('pancardnno', pano);
      formData.append('PEN', pano);
      formData.append('markSheetname', marksheetName);
      formData.append('othersdocName', othersname);
      formData.append('Status', studentstatus);
      formData.append('Transport', istransport);
      formData.append('FromRoute', '');
      formData.append('ToRoute', '');
      formData.append('BusNumber', '');
      formData.append('Library', islibrary);
      formData.append('hostal', ishostel);

      formData.append('Section', sectionname);
      formData.append('Session', sessionname);
      formData.append('SrNumber', SrNumber);
      formData.append('hostelname', hostelname);
      formData.append('Category', hostelcategoryname);
      formData.append('Facility', hostlefacility);
      formData.append('DateOfBirth', newDateOfBirth);
      formData.append('StudentCategory', categoryname);
      formData.append('stream', stream);

      formData.append(
        'HostelPerMonthFee',
        hosteldefaultfeepermonth === true
          ? Number(hostelfeeperMonth)
          : Number(onlyHostelFee),
      );

      formData.append(
        'TotalHostelFee',
        hosteldefaultfeepermonth === true
          ? Number(hostelfeeperMonth) * 12
          : Number(onlyHostelFee) * 12,
      );

      formData.append(
        'TransportPerMonthFee',
        transportdefaultfee === true
          ? Number(TransportFeePermonth)
          : Number(onlyTransport),
      );
      formData.append(
        'TransportTotalHostelFee',
        transportdefaultfee === true
          ? Number(TransportFeePermonth) * 12
          : Number(onlyTransport) * 12,
      );

      formData.append(
        'permonthfee',
        selectedValue === 'option1' ? Number(feepermonth) : Number(monthlyfee),
      );

      formData.append(
        'AnnualFee',
        selectedValue === 'option1'
          ? Number(AnnualFee)
          : Number(annualmanualfee),
      );
      formData.append(
        'admissionfee',
        selectedValue === 'option1'
          ? Number(adminssionfee)
          : Number(AdmissionFeeManual),
      );

      formData.append(
        'regisgrationfee',
        selectedValue === 'option1' ? Number(Registractionfee) : Number(amount),
      );

      formData.append(
        'studentTotalFee',
        selectedValue === 'option1'
          ? Number(feepermonth) * 12
          : Number(monthlyfee) * 12,
      );

      setloader(true);

      setsms('Adding...');

      dispatch(Addstudent(formData,setopenModel));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fee) {
      setisData(fee);
    }
    if (batch) {
      setbatchs(batch);
    }
    if (studentaddstatus === true) {
      dispatch(getstudent());
      navigation.goBack();
    }
    if (category) {
      setcategorylist(category);
    }
    if (hostel) {
      sethostellist(hostel);
    }
    if (roomcategory) {
      sethostelcategorylist(roomcategory);
    }
    if (roomfacility) {
      sethostelfacilitylist(roomfacility);
    }
    if (route) {
      setroutelist(route);
    }
    if (sections) {
      const newArray = [...sections, {section: 'NONE', section: 'NONE'}];
      setsectionlist(newArray);
    }
    dispatch({
      type: ADD_STUDENT_RESET,
    });
    if (CURRENTSESSION) {
      setsessionname(CURRENTSESSION);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
  }, [
    roomcategory,
    roomfacility,
    hostel,
    route,
    fee,
    batch,
    studentaddstatus,
    category,
    sections,
    CURRENTSESSION,
    Sessions,
  ]);

  useEffect(() => {
    dispatch(getbatch());
    dispatch(getfeelist());
    formData = new FormData();
  }, []);

  const handleChoosePhotoSignature = () => {
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
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;

        if (file != null) {
          formData.append('profileurl', file);
        }
      }
    });
  };

  const handleTakePhotoSignature = () => {
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
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;

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
        setadharno(Response.assets[0].uri);
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
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;

        if (file != null) {
          formData.append('adharcard', file);
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
        setadharno(Response.assets[0].uri);

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
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;

        if (file != null) {
          formData.append('adharcard', file);
        }
      }
    });
  };

  const handleChoosePhotoMarksheet = () => {
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
        setpremarksheet(Response.assets[0].uri);
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
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;

        if (file != null) {
          formData.append('markSheet', file);
        }
      }
    });
  };

  const handleTakePhotoMarksheet = () => {
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
        setpremarksheet(Response.assets[0].uri);

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
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;

        if (file != null) {
          formData.append('markSheet', file);
        }
      }
    });
  };

  const handleChoosePhotoBirthCert = () => {
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
        setdatecertificatePreview(Response.assets[0].uri);
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
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;

        if (file != null) {
          formData.append('BirthDocument', file);
        }
      }
    });
  };

  const handleTakePhotoBirthCert = () => {
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
        setdatecertificatePreview(Response.assets[0].uri);

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
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;

        if (file != null) {
          formData.append('BirthDocument', file);
        }
      }
    });
  };

  const handleChoosePhotoOthersDoc = () => {
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
        setotherspreview(Response.assets[0].uri);
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
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;

        if (file != null) {
          formData.append('othersdoc', file);
        }
      }
    });
  };

  const handleTakePhotoOthersDoc = () => {
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
        setotherspreview(Response.assets[0].uri);

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
        const imageBase64 = `data:${Response.assets[0].type};base64,${Response?.assets[0]?.base64}`;

        if (file != null) {
          formData.append('othersdoc', file);
        }
      }
    });
  };

  const gethostelFee = () => {
    try {
      serverInstance('hostel/gethostelfee', 'post', {
        hostelname: hostelname,
        Category: hostelcategoryname,
        Facility: hostlefacility,
      }).then(res => {
        if (res?.status === true) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
          setloading1(false);
          sethostelfeeperMonth(res?.data?.PermonthFee);
          setonlyHostelFee(res?.data?.PermonthFee?.toString());
        }
      });
    } catch (error) {
      setloading1(false);
    }
  };

  const gettransportFee = () => {
    try {
      setloading2(true);
      serverInstance('transport/gettransportfee', 'post', {
        FromRoute: toroute,
        ToRoute: fromroute,
      }).then(res => {
        if (res?.status === true) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
          setloading2(false);

          setTransportFeePermonth(res?.data?.BusRentPermonth);
          setonlyTransport(res?.data?.BusRentPermonth?.toString());

          console.log('transport fee is', res?.data?.BusRentPermonth);
        }
        if (res?.status === false) {
          setloading2(false);
          console.log('clicked', res);
        }
      });
    } catch (error) {
      setloading2(false);
    }
  };

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
      <BackHeader title={'Take Admission'} icon={'person'} />
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
                <RNDatePicker
                  title="Admission Date"
                  value={adminssiondate}
                  onDateChange={date => setadminssiondate(handleDate(date))}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Student Name"
                  placeholder="Enter Name"
                  value={studentname}
                  onChangeText={data => setstudentname(data)}
                />
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Roll No"
                  placeholder="Enter Roll No"
                  value={studentrollno}
                  onChangeText={data => setstudentrollno(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Sr Number"
                  placeholder="Enter Sr Number"
                  value={SrNumber}
                  onChangeText={data => setSrNumber(data)}
                />
              </View>
            </FlexRowWrapper>
            <View
              style={{
                marginHorizontal: deviceWidth * 0.04,
                position: 'relative',
              }}>
              <RNBDropDown
                label="Session"
                value={sessionname}
                OptionsList={
                  sessionList &&
                  sessionList?.map(item => ({
                    label: `${item?.Session}`,
                    value: `${item?.Session}`,
                  }))
                }
                onChange={data => setsessionname(data.value)}
              />
            </View>

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
              <View style={{width: '45%', marginBottom: deviceHeight * 0.02}}>
                <RNDatePicker
                  title="Date Of Birth"
                  value={DateOfBirth}
                  onDateChange={date => setDateOfBirth(handleDate(date))}
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
                <RNInputField
                  label="Student Mobile No"
                  placeholder="Enter Mobile No"
                  value={studentphone}
                  onChangeText={data => setstudentphone(data)}
                  keyboardType="number-pad"
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Student Email"
                  placeholder="Enter Email"
                  value={studentemail}
                  onChangeText={data => setstudentemail(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Father's Mobile No"
                  placeholder="Enter Mobile No"
                  value={fathersphone}
                  onChangeText={data => setfathersphone(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Father's Name"
                  placeholder="Enter Father's Name"
                  value={fathersname}
                  onChangeText={data => setfathersname(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Mother's Mobile No"
                  placeholder="Enter Mobile No"
                  value={mothersPhoneNo}
                  onChangeText={data => setmothersPhoneNo(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Mother's Name"
                  placeholder="Enter Mother's Name"
                  value={mothersname}
                  onChangeText={data => setmothersname(data)}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Pin Code"
                  placeholder="Enter Pin Code"
                  value={Pincode}
                  onChangeText={data => setPincode(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Permanent Education No"
                  placeholder="Enter PEN"
                  value={pano}
                  onChangeText={data => setpano(data)}
                />
              </View>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNBDropDown
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
                />
              </View>
              <View style={{width: '45%'}}>
                <RNBDropDown
                  label="District"
                  value={city}
                  OptionsList={filterData()}
                  onChange={data => {
                    setcity(data.value);
                    setcityname(data.label);
                  }}
                />
              </View>
            </FlexRowWrapper>
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
                }}>
                {address.length} / 500
              </Text>
              <RNInputField
                style={{paddingTop: 10}}
                label="address"
                value={address}
                onChangeText={data => setaddress(data)}
                placeholder="Enter Address"
                multiline
                numberOfLines={5}
                maxLength={500}
              />
            </View>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNInputField
                  label="Adhar Card No"
                  placeholder="Enter Adhar Card No"
                  value={adharcardno}
                  onChangeText={data => setadharcardno(data)}
                />
              </View>
            </FlexRowWrapper>
            <View
              style={{
                marginHorizontal: deviceWidth * 0.04,
                position: 'relative',
              }}>
              <View style={{width: '100%'}}>
                <View>
                  <RNBDropDown
                    label="Stream"
                    value={stream}
                    OptionsList={
                      streamlist &&
                      streamlist?.map(item => ({
                        label: `${item?.label}`,
                        value: `${item?.value}`,
                      }))
                    }
                    onChange={data => setstream(data.value)}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                marginHorizontal: deviceWidth * 0.04,
                marginTop: 10,
              }}>
              <Text>Previous School Details</Text>
            </View>

            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="TC No"
                  placeholder="Enter State"
                  value={PreviousTcNo}
                  onChangeText={data => setPreviousTcNo(data)}
                />
              </View>
              <View style={{width: '45%'}}>
                <RNInputField
                  label="Previous School Name"
                  placeholder="Enter City"
                  value={PreviousSchool}
                  onChangeText={data => setPreviousSchool(data)}
                />
              </View>
            </FlexRowWrapper>

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
                }}>
                {address.length} / 500
              </Text>
              <RNInputField
                style={{ paddingTop: 10}}
                label="Previous School Address"
                value={PreviousSchoolAddress}
                onChangeText={data => setPreviousSchoolAddress(data)}
                placeholder="Enter Previous School Address"
                multiline
                numberOfLines={5}
                maxLength={500}
              />
            </View>
            <FlexRowWrapper>
              <View style={{width: '45%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Class"
                    value={stream}
                    OptionsList={
                      isdata &&
                      isdata?.map(item => ({
                        label: `${item?.coursename}`,
                        value: `${item?.coursename} ${item?.courseduration} ${item?.feepermonth} ${item?.Registractionfee} ${item?.adminssionfee} ${item?.AnnualFee}`,
                      }))
                    }
                    onChange={item => {
                      {
                        setcourses(item.value);

                        let valuesArray = item.value?.split(' ');
                        let [
                          coursename,
                          courseduration,
                          feepermonth,
                          Registractionfee,
                          adminssionfee,
                          AnnualFee,
                        ] = valuesArray;

                        console.log(
                          'data from select selct options',
                          coursename,
                          courseduration,
                          feepermonth,
                          Registractionfee,
                          adminssionfee,
                          AnnualFee,
                        );
                        setmonthlyfee(feepermonth);
                        setamount(Registractionfee);
                        setannualmanualfee(AnnualFee);
                        setAdmissionFeeManual(adminssionfee);
                      }
                    }}
                  />
                </View>
              </View>
              <View style={{width: '45%', marginBottom: deviceHeight * 0.02}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNBDropDown
                    label="Status"
                    value={studentstatus}
                    OptionsList={
                      studentStatus &&
                      studentStatus?.map(item => ({
                        label: `${item?.value}`,
                        value: `${item?.value}`,
                      }))
                    }
                    onChange={data => setstudentstatus(data.value)}
                  />
                </View>
              </View>
            </FlexRowWrapper>

            <View
              style={{
                marginHorizontal: deviceWidth * 0.04,
                position: 'relative',
              }}>
              <RNBDropDown
                label="Section"
                value={sectionname}
                OptionsList={
                  sessionList &&
                  sectionlist &&
                  sectionlist?.map(item => ({
                    label: `${item?.section}`,
                    value: `${item?.section}`,
                  }))
                }
                onChange={data => setsectionname(data.value)}
              />
            </View>
            <FlexRowWrapper>
              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="option1"
                  status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedValue('option1')}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Default Fee</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="option2"
                  status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedValue('option2')}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Manual Fee</Text>
              </View>
            </FlexRowWrapper>

            {selectedValue === 'option1' && (
              <>
                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <RNInputField
                    disabled
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Registration Fee"
                    value={Registractionfee}
                    onChangeText={data => setamount(data)}
                    placeholder="0"
                  />
                </View>

                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <RNInputField
                    disabled
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Annual Fee"
                    value={AnnualFee}
                    onChangeText={data => setannualfee(data)}
                    placeholder="0"
                  />
                </View>

                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <RNInputField
                    disabled
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Admission Fee"
                    value={adminssionfee}
                    onChangeText={data => setAdmissionFee(data)}
                    placeholder="0"
                  />
                </View>
                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <RNInputField
                    disabled
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Monthly Fee"
                    value={feepermonth}
                    onChangeText={data => setamount(data)}
                    placeholder="0"
                  />
                </View>
                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <Text style={styles.inputLabel}>Total Fee</Text>
                  <View
                    style={styles.totalamountstyle}
                    onStartShouldSetResponder={() => setIndex(5)}>
                    <Text
                      style={{
                        width: Width(280),
                        fontFamily: 'Gilroy-SemiBold',
                        paddingHorizontal: Width(15),
                        fontSize: Height(16),
                      }}>
                      {Number(feepermonth) * Number(12)}
                    </Text>
                  </View>
                </View>
              </>
            )}

            {selectedValue === 'option2' && (
              <>
                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <RNInputField
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Registration Fee"
                    value={amount}
                    onChangeText={data => setamount(data)}
                    placeholder="0"
                  />
                </View>

                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <RNInputField
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Annual Fee"
                    value={annualmanualfee}
                    onChangeText={data => setannualmanualfee(data)}
                    placeholder="0"
                  />
                </View>

                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <RNInputField
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Admission Fee"
                    value={AdmissionFeeManual}
                    onChangeText={data => setAdmissionFeeManual(data)}
                    placeholder="0"
                  />
                </View>
                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <RNInputField
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Monthly Fee"
                    value={monthlyfee}
                    onChangeText={data => setmonthlyfee(data)}
                    placeholder="0"
                  />
                </View>
                <View
                  style={{
                    marginHorizontal: deviceWidth * 0.04,
                    position: 'relative',
                  }}>
                  <Text style={styles.inputLabel}>Total Fee</Text>
                  <View
                    style={styles.totalamountstyle}
                    onStartShouldSetResponder={() => setIndex(5)}>
                    <Text
                      style={{
                        width: Width(280),
                        fontFamily: 'Gilroy-SemiBold',
                        paddingHorizontal: Width(20),
                        fontSize: Height(16),
                      }}>
                      {Number(monthlyfee) * Number(12)}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>

          <FlexRowWrapper>
            <View style={styles.radioButton}>
              <RadioButton.Android
                value={false}
                status={islibrary === true ? 'checked' : 'unchecked'}
                onPress={() => setislibrary(!islibrary)}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Library</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton.Android
                value={false}
                status={ishostel === true ? 'checked' : 'unchecked'}
                onPress={() => setishostel(!ishostel)}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Hostel</Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton.Android
                value={false}
                status={istransport === true ? 'checked' : 'unchecked'}
                onPress={() => setistransport(!istransport)}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Transport</Text>
            </View>
          </FlexRowWrapper>

          {ishostel && (
            <>
              <FlexRowWrapper>
                <View style={{width: '45%'}}>
                  <View style={{marginHorizontal: deviceWidth * 0.01}}>
                    <RNBDropDown
                      label="Hostel Name"
                      value={hostelname}
                      OptionsList={
                        hostellist &&
                        hostellist?.map(item => ({
                          label: `${item?.HostelName}`,
                          value: `${item?.HostelName}`,
                        }))
                      }
                      onChange={data => sethostelname(data.value)}
                    />
                  </View>
                </View>
                <View style={{width: '45%', marginBottom: deviceHeight * 0.02}}>
                  <View style={{marginHorizontal: deviceWidth * 0.01}}>
                    <RNBDropDown
                      label="Category"
                      value={hostelcategoryname}
                      OptionsList={
                        hostelcategorylist &&
                        hostelcategorylist?.map(item => ({
                          label: `${item?.roomCategory}`,
                          value: `${item?.roomCategory}`,
                        }))
                      }
                      onChange={data => sethostelcategoryname(data.value)}
                    />
                  </View>
                </View>
              </FlexRowWrapper>
              <View style={styles.getfeeview}>
                <View style={{width: '45%'}}>
                  <RNBDropDown
                    label="Facility"
                    value={hostlefacility}
                    OptionsList={
                      hostelfacilitylist &&
                      hostelfacilitylist?.map(item => ({
                        label: `${item?.roomFacility}`,
                        value: `${item?.roomFacility}`,
                      }))
                    }
                    onChange={data => sethostlefacility(data.value)}
                  />
                </View>

                <View style={{width: '50%'}}>
                  <RNButton loading={loading1} onPress={gethostelFee}>
                    Get Fee
                  </RNButton>
                </View>
              </View>
              <FlexRowWrapper>
                <View style={styles.radioButton}>
                  <RadioButton.Android
                    value={true}
                    status={
                      transportdefaultfee === true ? 'checked' : 'unchecked'
                    }
                    onPress={() => settransportdefaultfee(true)}
                    color="#007BFF"
                  />
                  <Text style={styles.radioLabel}>Default Fee</Text>
                </View>

                <View style={styles.radioButton}>
                  <RadioButton.Android
                    value={false}
                    status={
                      transportdefaultfee === false ? 'checked' : 'unchecked'
                    }
                    onPress={() => settransportdefaultfee(false)}
                    color="#007BFF"
                  />
                  <Text style={styles.radioLabel}>Manual Fee</Text>
                </View>
              </FlexRowWrapper>

              {transportdefaultfee === true ? (
                <>
                  <View
                    style={{
                      marginHorizontal: deviceWidth * 0.04,
                      position: 'relative',
                    }}>
                    <Text style={styles.inputLabel}>Per Month Fee</Text>
                    <View
                      style={styles.totalamountstyle}
                      onStartShouldSetResponder={() => setIndex(5)}>
                      <Text
                        style={{
                          width: Width(280),
                          fontFamily: 'Gilroy-SemiBold',
                          paddingHorizontal: Width(15),
                          fontSize: Height(16),
                        }}>
                        {hostelfeeperMonth}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginHorizontal: deviceWidth * 0.04,
                      position: 'relative',
                    }}>
                    <Text style={styles.inputLabel}>Total Fee</Text>
                    <View
                      style={styles.totalamountstyle}
                      onStartShouldSetResponder={() => setIndex(5)}>
                      <Text
                        style={{
                          width: Width(280),
                          fontFamily: 'Gilroy-SemiBold',
                          paddingHorizontal: Width(15),
                          fontSize: Height(16),
                        }}>
                        {Number(hostelfeeperMonth) * Number(12)}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      marginHorizontal: deviceWidth * 0.04,
                      position: 'relative',
                    }}>
                    <RNInputField
                      style={{backgroundColor: Colors.fadeGray}}
                      label="Per Month Fee"
                      value={onlyHostelFee}
                      onChangeText={data => setonlyHostelFee(data)}
                      placeholder="0"
                    />
                  </View>

                  <View
                    style={{
                      marginHorizontal: deviceWidth * 0.04,
                      position: 'relative',
                    }}>
                    <Text style={styles.inputLabel}>Total Fee</Text>
                    <View
                      style={styles.totalamountstyle}
                      onStartShouldSetResponder={() => setIndex(5)}>
                      <Text
                        style={{
                          width: Width(280),
                          fontFamily: 'Gilroy-SemiBold',
                          paddingHorizontal: Width(20),
                          fontSize: Height(16),
                        }}>
                        {Number(onlyHostelFee) * Number(12)}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </>
          )}

          {istransport && (
            <>
              <FlexRowWrapper>
                <View style={{width: '45%'}}>
                  <View style={{marginHorizontal: deviceWidth * 0.01}}>
                    <RNBDropDown
                      label="From Route"
                      value={fromroute}
                      OptionsList={
                        routelist &&
                        routelist?.map(item => ({
                          label: `${item?.routeName?.FromRoute}`,
                          value: `${item?.routeName?.FromRoute}`,
                        }))
                      }
                      onChange={data => setfromroute(data.value)}
                    />
                  </View>
                </View>
                <View style={{width: '45%', marginBottom: deviceHeight * 0.02}}>
                  <View style={{marginHorizontal: deviceWidth * 0.01}}>
                    <RNBDropDown
                      label="To Route"
                      value={toroute}
                      OptionsList={
                        routelist &&
                        routelist?.map(item => ({
                          label: `${item?.routeName?.ToRoute}`,
                          value: `${item?.routeName?.ToRoute}`,
                        }))
                      }
                      onChange={data => settoroute(data.value)}
                    />
                  </View>
                </View>
              </FlexRowWrapper>
              <View style={styles.getfeeview}>
                <View style={{width: '100%'}}>
                  <RNButton loading={loading2} onPress={gettransportFee}>
                    Get Fee
                  </RNButton>
                </View>
              </View>
              <FlexRowWrapper>
                <View style={styles.radioButton}>
                  <RadioButton.Android
                    value={true}
                    status={
                      hosteldefaultfeepermonth === true
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => sethosteldefaultfeepermonth(true)}
                    color="#007BFF"
                  />
                  <Text style={styles.radioLabel}>Default Fee</Text>
                </View>

                <View style={styles.radioButton}>
                  <RadioButton.Android
                    value={false}
                    status={
                      hosteldefaultfeepermonth === false
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => sethosteldefaultfeepermonth(false)}
                    color="#007BFF"
                  />
                  <Text style={styles.radioLabel}>Manual Fee</Text>
                </View>
              </FlexRowWrapper>

              {hosteldefaultfeepermonth === true ? (
                <>
                  <View
                    style={{
                      marginHorizontal: deviceWidth * 0.04,
                      position: 'relative',
                    }}>
                    <Text style={styles.inputLabel}>Total Fee</Text>
                    <View
                      style={styles.totalamountstyle}
                      onStartShouldSetResponder={() => setIndex(5)}>
                      <Text
                        style={{
                          width: Width(280),
                          fontFamily: 'Gilroy-SemiBold',
                          paddingHorizontal: Width(15),
                          fontSize: Height(16),
                        }}>
                        {Number(TransportFeePermonth)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginHorizontal: deviceWidth * 0.04,
                      position: 'relative',
                    }}>
                    <Text style={styles.inputLabel}>Total Fee</Text>
                    <View
                      style={styles.totalamountstyle}
                      onStartShouldSetResponder={() => setIndex(5)}>
                      <Text
                        style={{
                          width: Width(280),
                          fontFamily: 'Gilroy-SemiBold',
                          paddingHorizontal: Width(15),
                          fontSize: Height(16),
                        }}>
                        {Number(TransportFeePermonth) * Number(12)}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      marginHorizontal: deviceWidth * 0.04,
                      position: 'relative',
                    }}>
                    <RNInputField
                      style={{backgroundColor: Colors.fadeGray}}
                      label="Per Month Fee"
                      value={onlyTransport}
                      onChangeText={data => setonlyTransport(data)}
                      placeholder="0"
                    />
                  </View>

                  <View
                    style={{
                      marginHorizontal: deviceWidth * 0.04,
                      position: 'relative',
                    }}>
                    <Text style={styles.inputLabel}>Total Fee</Text>
                    <View
                      style={styles.totalamountstyle}
                      onStartShouldSetResponder={() => setIndex(5)}>
                      <Text
                        style={{
                          width: Width(280),
                          fontFamily: 'Gilroy-SemiBold',
                          paddingHorizontal: Width(20),
                          fontSize: Height(16),
                        }}>
                        {Number(onlyTransport) * Number(12)}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </>
          )}

          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
              Passport Size Photo
            </Text>
            <View>
              {passportsize ? (
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
                        onPress={() => handleTakePhotoSignature()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoSignature()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{uri: passportsize}}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity
                      onPress={() => handleTakePhotoSignature()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChoosePhotoSignature()}>
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
              {adharno ? (
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
                    <Image source={{uri: adharno}} style={styles.imgprestyle} />
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
              Previous MarkSheet
            </Text>
            <View
              style={{
                marginHorizontal: deviceWidth * 0.01,
                position: 'relative',
              }}>
              <View style={{width: '100%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNInputField
                    style={{backgroundColor: Colors.fadeGray}}
                    label="MarkSheet Class"
                    value={marksheetName}
                    onChangeText={data => setmarksheetName(data)}
                    placeholder="Enter MarkSheet Class"
                  />
                </View>
              </View>
            </View>
            <View>
              {premarksheet ? (
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
                    <Image source={{uri: adharno}} style={styles.imgprestyle} />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity
                      onPress={() => handleTakePhotoMarksheet()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChoosePhotoMarksheet()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
              Birth Certificate
            </Text>

            <View>
              {datecertificatePreview ? (
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
                        onPress={() => handleTakePhotoBirthCert()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoBirthCert()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{uri: datecertificatePreview}}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity
                      onPress={() => handleTakePhotoBirthCert()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChoosePhotoBirthCert()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
              Others
            </Text>
            <View
              style={{
                marginHorizontal: deviceWidth * 0.01,
                position: 'relative',
              }}>
              <View style={{width: '100%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <RNInputField
                    style={{backgroundColor: Colors.fadeGray}}
                    label="Other Doc Name"
                    value={othersname}
                    onChangeText={data => setothersname(data)}
                    placeholder="Enter Other Doc Name"
                  />
                </View>
              </View>
            </View>
            <View>
              {otherspreview ? (
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
                        onPress={() => handleTakePhotoOthersDoc()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoOthersDoc()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{uri: otherspreview}}
                      style={styles.imgprestyle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imgpreview}>
                    <TouchableOpacity
                      onPress={() => handleTakePhotoOthersDoc()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChoosePhotoOthersDoc()}>
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
            style={{marginHorizontal: 20, marginTop: 20, marginBottom: 50}}>
            Save & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default TakeAdmission;

const styles = StyleSheet.create({
  getfeeview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
