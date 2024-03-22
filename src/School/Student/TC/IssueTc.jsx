import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import {handleDate, getTodaysDate} from '../../../utils/functions';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import RNDatePicker from '../../../Component/RNDatePicker';
import RNBDropDown from '../../../Component/RNBDropDown';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {getstudent,getTC}  from '../../../redux/action/commanAction';
const IssueTc = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = React.useState({});
  const [loading, setloading] = useState(false);
  const [Dateofapplication, setDateofapplication] = useState(getTodaysDate());
  const [DateofIssue, setDateofIssue] = useState(getTodaysDate());
  const [DateofFirst, setDateofFirst] = useState(getTodaysDate());
  const [DateofBirth, setDateofBirth] = useState();
  const [NameofStudent, setNameofStudent] = useState('');
  const [FathersName, setFathersName] = useState('');
  const [MothersName, setMothersName] = useState('');
  const [Address, setAddress] = useState('');
  const [AadharNumber, setAadharNumber] = useState('');
  const [Nationality, setNationality] = useState('');
  const [ClassinWhich, setClassinWhich] = useState('');
  const [WhetherfailedinClass, setWhetherfailedinClass] = useState('No');
  const [Subjectsstudied, setSubjectsstudied] = useState('');
  const [Whetherqualified, setWhetherqualified] = useState('Yes');
  const [paidallthedues, setpaidallthedues] = useState('Yes');
  const [workingdays, setworkingdays] = useState('');
  const [workingdayspresent, setworkingdayspresent] = useState('');
  const [GeneralConduct, setGeneralConduct] = useState('');
  const [Reasonforleaving, setReasonforleaving] = useState('');
  const [Anyothers, setAnyothers] = useState('');
  const [TcNo, setTcNo] = useState('');
  const [fileNo, setfileNo] = useState('');
  const [SrNo, setSrNo] = useState('');
  const [Religion, setReligion] = useState('');
  const [qualifiedforpromotion, setqualifiedforpromotion] = useState('Yes');
  const [organizationdata, setorganizationdata] = useState('');
  const {user} = useSelector(state => state.auth);

  const submit = () => {
    setloading(true);

    setloading(true);
    const TCData = {
      id: data?.id,
      NameofStudent: NameofStudent,
      FathersName: FathersName,
      MothersName: MothersName,
      Address: Address,
      AadharNumber: AadharNumber,
      Nationality: Nationality,
      DateofFirst: DateofFirst,
      DateofBirth: DateofBirth,
      ClassinWhich: ClassinWhich,
      WhetherfailedinClass: WhetherfailedinClass,
      Subjectsstudied: Subjectsstudied,
      Whetherqualified: Whetherqualified,
      paidallthedues: paidallthedues,
      workingdays: workingdays,
      workingdayspresent: workingdayspresent,
      GeneralConduct: GeneralConduct,
      Dateofapplication: Dateofapplication,
      DateofIssue: DateofIssue,
      Reasonforleaving: Reasonforleaving,
      Anyothers: Anyothers,
      TcNo: TcNo,
      fileNo: fileNo,
      SrNo: SrNo,
      qualifiedforpromotion: qualifiedforpromotion,
      Session: data?.Session,
      Section: data?.Section,
      Religion: Religion,
    };

    serverInstance('student/CreateTC', 'post', TCData).then(res => {
      if (res?.status === true) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        dispatch(getstudent());
        dispatch(getTC());
        setloading(false);

        console.log("kdjfkjds",res)
        navigation.goBack();
      }
      if (res?.status === false) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });

        console.log("kdjfkjds",res)
        setloading(false);
      }
    });
  };

  useEffect(() => {
    if (user) {
      setorganizationdata(user?.data?.CredentailsData);
    }
  }, [user]);

  useEffect(() => {
    if (route?.params?.data) {
      setData(route?.params?.data)
      setSrNo(route?.params?.data?.SrNumber);
      setNameofStudent(route?.params?.data?.name);
      setMothersName(route?.params?.data?.MathersName);
      setFathersName(route?.params?.data?.fathersName);
      setAddress(route?.params?.data?.address);
      setAadharNumber(route?.params?.data?.adharno);
      setNationality(route?.params?.data?.Nationality);
      setDateofBirth(route?.params?.data?.DateOfBirth);
      setClassinWhich(route?.params?.data?.courseorclass);
      setReligion(route?.params?.data?.Religion);
    }
  }, [data]);

  return (
    <View>
      <BackHeader title={'Issue TC'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="File No"
                value={fileNo}
                onChangeText={data => setfileNo(data)}
                placeholder="Enter File No"
              />
            </View>

            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="TC No"
                value={TcNo}
                onChangeText={data => setTcNo(data)}
                placeholder="Enter TC No"
              />
            </View>
          </View>
          <View style={styles.dateview}>
            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Name of Student"
                value={NameofStudent}
                onChangeText={data => setNameofStudent(data)}
                placeholder="Enter Name"
              />
            </View>

            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Father's Name"
                value={FathersName}
                onChangeText={data => setFathersName(data)}
                placeholder="Enter Father's Name"
              />
            </View>
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Mother's Name"
                value={MothersName}
                onChangeText={data => setMothersName(data)}
                placeholder="Enter Mother's Name"
              />
            </View>

            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Residential Address"
                value={Address}
                onChangeText={data => setAddress(data)}
                placeholder="Enter  Address"
              />
            </View>
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Aadhar Number"
                value={AadharNumber}
                onChangeText={data => setAadharNumber(data)}
                placeholder="Enter Aadhar Number
                "
              />
            </View>

            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Nationality"
                value={Nationality}
                onChangeText={data => setNationality(data)}
                placeholder="Enter  Nationality"
              />
            </View>
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Religion & Community"
                value={Religion}
                onChangeText={data => setReligion(data)}
                placeholder="Enter Religion"
              />
            </View>

            <View
              style={{
                width: '48%',
              }}>
              <RNDatePicker
                title="First Day in School"
                value={DateofFirst}
                onDateChange={date => setDateofFirst(handleDate(date))}
              />
            </View>
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: '48%',
              }}>
              <RNDatePicker
                title="Date of Birth"
                value={DateofBirth}
                onDateChange={date => setDateofBirth(handleDate(date))}
              />
            </View>

            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Last Class"
                value={ClassinWhich}
                onChangeText={data => setClassinWhich(data)}
                placeholder="Enter Religion"
              />
            </View>
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Whether failed"
                value={WhetherfailedinClass}
                onChangeText={data => setWhetherfailedinClass(data)}
                placeholder="Enter Whether failed
                "
              />
            </View>

            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Subjects studied"
                value={Subjectsstudied}
                onChangeText={data => setSubjectsstudied(data)}
                placeholder="Enter  Subjects studied"
              />
            </View>
          </View>
          <View style={styles.dateview}>
            <View
              style={{
                width: '100%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Whether qualified for promotion"
                value={qualifiedforpromotion}
                onChangeText={data => setqualifiedforpromotion(data)}
                placeholder="Enter Whether qualified for promotion"
              />
            </View>
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="which class (in figures)"
                value={Whetherqualified}
                onChangeText={data => setWhetherqualified(data)}
                placeholder="Enter which class"
              />
            </View>

            <View
              style={{
                width: '48%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="paid all the dues"
                value={paidallthedues}
                onChangeText={data => setpaidallthedues(data)}
                placeholder="Enter paid all the dues"
              />
            </View>
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: '100%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="No of working days"
                value={workingdays}
                onChangeText={data => setworkingdays(data)}
                placeholder="Enter No of working days"
              />
            </View>
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: '100%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="No of working days present"
                value={workingdayspresent}
                onChangeText={data => setworkingdayspresent(data)}
                placeholder="No of working days present"
              />
            </View>
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: '100%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="General Conduct"
                value={GeneralConduct}
                onChangeText={data => setGeneralConduct(data)}
                placeholder="Enter General Conduct"
              />
            </View>
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: '100%',
              }}>
              <RNDatePicker
                title="Issue Tc Date"
                value={Dateofapplication}
                onDateChange={date => setDateofapplication(handleDate(date))}
              />
            </View>
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: '100%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Reason for leaving the school"
                value={Reasonforleaving}
                onChangeText={data => setReasonforleaving(data)}
                placeholder="Enter Reason for leaving the school"
              />
            </View>
          </View>
          <View style={styles.dateview}>
            <View
              style={{
                width: '100%',
              }}>
              <RNInputField
                style={{backgroundColor: Colors.fadeGray}}
                label="Any others"
                value={Anyothers}
                onChangeText={data => setAnyothers(data)}
                placeholder="Enter Any others"
              />
            </View>
          </View>

          <View style={styles.dateview}>
            <View
              style={{
                width: '100%',
              }}>
              <RNDatePicker
                title="Date of Issue"
                value={DateofIssue}
                onDateChange={date => setDateofIssue(handleDate(date))}
              />
            </View>
          </View>
          <View style={{marginBottom: deviceHeight * 0.09}}>
            <RNButton
              loading={loading}
              onPress={submit}
              style={{marginHorizontal: 20, marginTop: 10}}>
              Issue Tc & Next
            </RNButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default IssueTc;

const styles = StyleSheet.create({
  dateview: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: deviceWidth * 0.03,
  },
  enquirymainview: {
    paddingTop: deviceHeight * 0.01,
  },
});
