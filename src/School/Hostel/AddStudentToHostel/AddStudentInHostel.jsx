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
import {RadioButton} from 'react-native-paper';
import check from '../../../assets/check1.png';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {
  getstudent,
  getbatch,
  getfeelist,
  Updatestudent,
} from '../../../redux/action/commanAction';
import {useNavigation, useRoute} from '@react-navigation/native';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import RNDatePicker from '../../../Component/RNDatePicker';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {handleDate, getTodaysDate} from '../../../utils/functions';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {Colors} from '../../../utils/Colors';
import {UPDATE_STUDENT_RESET} from '../../../redux/constants/commanConstants';
import moment from 'moment';
import BackHeader from '../../../Component/Header/BackHeader';
import RNBDropDown from '../../../Component/RNBDropDown';
let formData = new FormData();
const AddStudentInHostel = () => {
  const newroute = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const [index, setIndex] = useState(0);
  const [updatedata, setupdatedata] = useState('');
  const [openModel, setopenModel] = useState(false);
  const [whatsaapnumber, setwhatsaapnumber] = useState('');
  const [stream, setstream] = useState('NONE');
  const [noofMonth, setnoofMonth] = useState('');

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

  const [DateOfBirth, setDateOfBirth] = useState(getTodaysDate());
  const [datecertificatePreview, setdatecertificatePreview] = useState('');
  const [islibrary, setislibrary] = useState(false);
  const [ishostel, setishostel] = useState(false);
  const [istransport, setistransport] = useState(false);
  const [SrNumber, setSrNumber] = useState('');
  const [sessionname, setsessionname] = useState('');
  const [sectionname, setsectionname] = useState('');
  const [sectionlist, setsectionlist] = useState([]);
  const [selectedValue, setSelectedValue] = useState('option1');
  const [passportsize, setpassportsize] = useState('');
  const [adharno, setadharno] = useState('');
  const [amount, setamount] = useState('');
  const [monthlyfee, setmonthlyfee] = useState('');
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const [courses, setcourses] = useState('');
  const [batchname, setbatchname] = useState('');
  const [studentname, setstudentname] = useState('');
  const [studentemail, setstudentemail] = useState('');
  const [studentphone, setstudentphone] = useState('');
  const [adminssiondate, setadminssiondate] = useState(getTodaysDate());
  const [premarksheet, setpremarksheet] = useState('');
  const [passmarksheet, setpassmarksheet] = useState('');
  const [marksheetName, setmarksheetName] = useState('');
  const [marksheetPreview, setmarksheetPreview] = useState('');
  const [birth, setbirth] = useState('');
  const [adharcard, setadharcard] = useState('');
  const [others, setothers] = useState('');
  const [marksheet, setmarksheet] = useState('');
  const [otherspreview, setotherspreview] = useState('');
  const [othersname, setothersname] = useState('');
  const [photo, setphoto] = useState('');
  const [onlyshowmonthfee, setonlyshowmonthfee] = useState('');
  const [onlyshowrefee, setonlyshowrefee] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [Pincode, setPincode] = useState('');
  const [pano, setpano] = useState('');
  const [studentstatus, setstudentstatus] = useState('Active');
  const [status, setstatus] = useState('Active');
  const [adharcardno, setadharcardno] = useState('');
  const [fathersname, setfathersname] = useState('');
  const [fathersphone, setfathersphone] = useState('');
  const [studentrollno, setstudentrollno] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [categorylist, setcategorylist] = useState([]);
  const [hostelcategory, sethostelcategory] = useState('');
  const [hostenname, sethostenname] = useState('');
  const [hostelfacility, sethostelfacility] = useState('');
  const [hostellist, sethostellist] = useState([]);
  const [routelist, setroutelist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [hostelname, sethostelname] = useState('');
  const [hostelcategoryname, sethostelcategoryname] = useState('');
  const [hostlefacility, sethostlefacility] = useState('');
  const [hostelcategorylist, sethostelcategorylist] = useState([]);
  const [hostelfacilitylist, sethostelfacilitylist] = useState([]);
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
  const [profile64, setprofile64] = useState('');
  const [adhar64, setadhar64] = useState('');
  const [markSheet64, setmarkSheet64] = useState('');
  const [birth64, setbirth64] = useState('');
  const [other64, setother64] = useState('');
  const {fee} = useSelector(state => state.getfee);
  const {batch} = useSelector(state => state.getbatch);
  const {user} = useSelector(state => state.auth);
  const {category} = useSelector(state => state.getcategory);
  const {hostel} = useSelector(state => state.GetHostel);
  const {roomcategory} = useSelector(state => state.GetCategory);
  const {roomfacility} = useSelector(state => state.GetFacility);
  const {route} = useSelector(state => state.GetRoute);
  const {sections} = useSelector(state => state.GetSection);

  const {updateStatus, student, loading, error} = useSelector(
    state => state.editstudent,
  );
  const {CURRENTSESSION} = useSelector(state => state.GetCurrentSession);
  const {Sessions} = useSelector(state => state.GetSession);
  const [classfee, setclassfee] = useState('');

  let regfee = classfee?.split(' ').pop();
  var lastIndex = classfee?.lastIndexOf(' ');
  let first = classfee?.substring(0, lastIndex);

  let perFee = first?.split(' ').pop();
  var lastIndex = first?.lastIndexOf(' ');
  let coursein = first?.substring(0, lastIndex);
  var lastIndex = perFee?.lastIndexOf(' ');

  var lastIndex = coursein?.lastIndexOf(' ');
  let regcoursein = coursein?.substring(0, lastIndex);

  let valuesArray = classfee?.split(' ');
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
      formData.append('id', updatedata?.id);
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
      formData.append('Status', studentstatus);
      formData.append('batch', batchname);

      formData.append('admissionDate', newadminssiondate);

      formData.append('courseduration', '');
      formData.append('adharno', adharcardno);
      formData.append('pancardnno', pano);
      formData.append('PEN', pano);
      formData.append('markSheetname', marksheetName);
      formData.append('othersdocName', othersname);

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
        ishostel === true
          ? hosteldefaultfeepermonth === true
            ? Number(hostelfeeperMonth)
            : Number(onlyHostelFee)
          : 0,
      );

      formData.append(
        'TotalHostelFee',
        ishostel === true
          ? hosteldefaultfeepermonth === true
            ? Number(hostelfeeperMonth) * 12
            : Number(onlyHostelFee) * 12
          : 0,
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

      dispatch(Updatestudent(formData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (newroute?.params?.data) {
      let feeob = fee?.find(
        ({coursename}) => coursename === updatedata?.courseorclass,
      );
      setclassfee(
        `${feeob?.coursename} ${feeob?.courseduration} ${feeob?.feepermonth} ${feeob?.Registractionfee} ${feeob?.adminssionfee} ${feeob?.AnnualFee}`,
      );
      setcourses(
        `${feeob?.coursename} ${feeob?.courseduration} ${feeob?.feepermonth} ${feeob?.Registractionfee} ${feeob?.adminssionfee} ${feeob?.AnnualFee}`,
      );
      setupdatedata(newroute.params.data);
      setSrNumber(updatedata?.SrNumber?.toString());
      setstudentrollno(updatedata?.rollnumber?.toString());
      setstudentemail(updatedata?.email);
      setstudentname(updatedata?.name);
      setstudentphone(updatedata?.phoneno1);
      setfathersname(updatedata?.fathersName);
      setfathersphone(updatedata?.fathersPhoneNo);
      setpano(updatedata?.pancardnno);
      setadharcardno(updatedata?.adharno?.toString());
      setstate(updatedata?.state);
      setcity(updatedata?.city);

      setadminssiondate(moment(updatedata?.admissionDate).format('DD/MM/YYYY'));
      setPincode(updatedata?.pincode);
      setwhatsaapnumber(updatedata?.whatsappNo);
      setothersname(updatedata?.othersdocName);
      setmarksheetName(updatedata?.markSheetname);
      setbirth(updatedata?.BirthDocument);
      setmarksheet(updatedata?.markSheet);
      setadharcard(updatedata?.adharno);
      setothers(updatedata?.othersdoc);
      setphoto(updatedata?.profileurl);
      setstatus(updatedata?.Status);
      setnoofMonth(updatedata?.courseduration);

      setamount(updatedata?.regisgrationfee?.toString());
      setmonthlyfee(updatedata?.permonthfee?.toString());
      setonlyshowmonthfee(updatedata?.permonthfee?.toString());
      setonlyshowrefee(updatedata?.regisgrationfee)?.toString();
      setAdmissionFeeManual(updatedata?.admissionfee?.toString());
      setannualmanualfee(updatedata?.AnnualFee?.toString());

      setistransport(updatedata?.Transport);
      setislibrary(updatedata?.Library);
      setishostel(updatedata?.hostal);
      setTransportFeePermonth(updatedata?.TransportPerMonthFee?.toString());
      sethostelfeeperMonth(updatedata?.HostelPerMonthFee?.toString());
      setannualfee(updatedata?.AnnualFee?.toString());
      setsessionname(updatedata?.Session);
      setsectionname(updatedata?.Section);
      sethostelfacility(updatedata?.Facility);
      sethostenname(updatedata?.hostelname);
      sethostelcategory(updatedata?.Category);
      setfromroute(updatedata?.FromRoute);
      settoroute(updatedata?.ToRoute);
      setpano(updatedata?.PEN?.toString());
      setDateOfBirth(moment(updatedata?.DateOfBirth).format('DD/MM/YYYY'));
      setcategoryname(updatedata?.StudentCategory);
      setstream(updatedata?.Stream);
      setgender(updatedata?.Gender);
      setReligion(updatedata?.Religion);
      setBloodGroup(updatedata?.BloodGroup);
      setaddress(updatedata?.address);
      setPreviousTcNo(updatedata?.PreviousTcNo);
      setPreviousSchool(updatedata?.PreviousSchool);
      setPreviousSchoolAddress(updatedata?.PreviousSchoolAddress);
      setmothersname(updatedata?.MathersName);
      setmothersPhoneNo(updatedata?.MathersPhoneNo);
    }
  }, [updatedata, fee]);

  useEffect(() => {
    if (fee) {
      setisData(fee);
    }
    if (batch) {
      setbatchs(batch);
    }
    if (updateStatus === true) {
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
      type: UPDATE_STUDENT_RESET,
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
    updateStatus,
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
          setonlyHostelFee(res?.data?.PermonthFee);
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
          setonlyTransport(res?.data?.BusRentPermonth);
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

  return (
    <View>
      <BackHeader title={'Add Student In Hostel'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={{paddingLeft: deviceWidth * 0.02}}>
            <View style={styles.radioButton}>
              <RadioButton.Android
                value={false}
                status={ishostel === true ? 'checked' : 'unchecked'}
                onPress={() => setishostel(!ishostel)}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Hostel</Text>
            </View>
          </View>

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
                      onChange={item => {
                        sethostelname(item.value);
                      }}
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
                      onChange={item => {
                        sethostelname(item.value);
                      }}
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
                    onChange={item => {
                      sethostlefacility(item.value);
                    }}
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

              <RNButton
                loading={loading}
                onPress={submit}
                style={{marginHorizontal: 20, marginTop: 20, marginBottom: 50}}>
                Update & Next
              </RNButton>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddStudentInHostel;

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
    borderRadius: 5,
    fontSize: Height(16),
    marginTop: 9,
    backgroundColor: Colors.white,
    color: 'white',
    paddingTop: deviceHeight * 0.01,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  inputLabel: {
    fontSize: 16,
    color: Colors.textGrey,
  },
});
