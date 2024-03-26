import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import {primary, Colors} from '../../../utils/Colors';
  import Img from '../../../assets/Img.png';
  import {useNavigation} from '@react-navigation/native';
  import Header from '../../../Component/Header/Header';
  import {useSelector, useDispatch} from 'react-redux';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {deviceWidth} from '../../../utils/constant';
  import {Checkbox} from 'react-native-paper';
  import RNButton from '../../../Component/RNButton';
  import axios from 'axios';
  import Toast from 'react-native-toast-message';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {backendApiUrl} from '../../../Config/config';
  import {loadUser} from '../../../redux/action/authActions';
  import {serverInstance} from '../../../API/ServerInstance';
  import RNFS from 'react-native-fs';
  import XLSX from 'xlsx';
  let formData = new FormData();
  
  const CoachingProfie = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [backuping, setbackuping] = useState(false);
    const [studentattendance, setstudentattendance] = useState(false);
    const [employee, setemployee] = useState(false);
    const [employeeattendance, setemployeeattendance] = useState(false);
    const [hostel, sethostel] = useState(false);
    const [transport, settransport] = useState(false);
    const [accounts, setaccounts] = useState(false);
    const [expenses, setexpenses] = useState(false);
    const [frontoffice, setfrontoffice] = useState(false);
    const [Library, setLibrary] = useState(false);
    const [student, setstudent] = useState(false);
  
    const [updating, setupdating] = useState(false);
    const [frontofficeStatus, setfrontofficeStatus] = useState('');
    const [Librarystatus, setLibrarystatus] = useState('');
    const [HostelStatus, setHostelStatus] = useState('');
    const [TransportStatus, setTransportStatus] = useState('');
    const [owername, setowername] = useState('');
    const [email, setemail] = useState('');
    const [phoneno1, setphoneno1] = useState('');
    const [phoneno2, setphoneno2] = useState('');
    const [organizationName, setorganizationName] = useState('');
    const [address, setaddress] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [pincode, setpincode] = useState('');
    const [studentpassword, setstudentpassword] = useState('');
    const [parentpassword, setparentpassword] = useState('');
    const [Employeepassword, setEmployeepassword] = useState('');
    const {isUpdated, loading} = useSelector(state => state.updateCredentials);
    const {user} = useSelector(state => state.auth);
  
    const submit = async () => {
      try {
        setupdating(true);
        formData.append('id', user?.data?.CredentailsData?.id);
        formData.append('name', owername);
        formData.append('email', email);
        formData.append('institutename', organizationName);
        formData.append('phoneno1', phoneno1);
        formData.append('phoneno2', phoneno2);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('pincode', pincode);
        formData.append('Studentpassword', studentpassword);
        formData.append('Parentpassword', parentpassword);
        formData.append('Employeepassword', Employeepassword);
        formData.append('Library', Librarystatus);
        formData.append('Transport', TransportStatus);
        formData.append('FrontOffice', frontofficeStatus);
        formData.append('hostel', HostelStatus);
        formData.append('profileurl', user?.data?.CredentailsData?.profileurl);
        formData.append(
          'certificatelogo',
          user?.data?.CredentailsData?.certificatelogo,
        );
        formData.append('logourl', user?.data?.CredentailsData?.logourl);
  
        let token = await AsyncStorage.getItem('erptoken');
  
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },
        };
  
        const {data} = await axios.put(
          `${backendApiUrl}comman/credentials`,
          formData,
          config,
        );
  
        if (data?.status) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: data?.msg,
          });
          setupdating(false);
          dispatch(loadUser());
          formData = new FormData();
        }
  
        if (data?.status === false) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: data?.msg,
          });
  
          setupdating(false);
          formData = new FormData();
        }
      } catch (error) {
        formData = new FormData();
        setupdating(false);
      }
    };
  
    useEffect(() => {
      if (user) {
        setowername(user?.data?.CredentailsData?.name);
        setemail(user?.data?.CredentailsData?.email);
        setaddress(user?.data?.CredentailsData?.address);
        setcity(user?.data?.CredentailsData?.city);
        setorganizationName(user?.data?.CredentailsData?.institutename);
        setpincode(user?.data?.CredentailsData?.pincode);
        setstate(user?.data?.CredentailsData?.state);
        setphoneno1(user?.data?.CredentailsData?.phoneno1);
        setphoneno2(user?.data?.CredentailsData?.phoneno1);
        setstudentpassword(user?.data?.CredentailsData?.Studentpassword);
        setparentpassword(user?.data?.CredentailsData?.Parentpassword);
        setEmployeepassword(user?.data?.CredentailsData?.Employeepassword);
        setHostelStatus(user?.data?.CredentailsData?.hostel);
        setTransportStatus(user?.data?.CredentailsData?.Transport);
        setLibrarystatus(user?.data?.CredentailsData?.Library);
        setfrontofficeStatus(user?.data?.CredentailsData?.FrontOffice);
      }
    }, []);
  
    const handlebackup = () => {
      let newdate = new Date();
      let fullyear = newdate.getFullYear();
      let date = newdate.getDate();
      let month = newdate.getMonth();
      let fulldate = `${date}/${month}/${fullyear}`;
  
      setbackuping(true);
      serverInstance('backup/GetAllbackdataData', 'post', {
        frontoffice: frontoffice,
        Library: Library,
        student: student,
        studentattendance: studentattendance,
        employee: employee,
        employeeattendance: employeeattendance,
        hostel: hostel,
        transport: transport,
        expenses: expenses,
        accounts: accounts,
      }).then(res => {
        if (res?.status === true) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
  
          const workbook = XLSX.utils.book_new();
  
          if (res?.data?.enquirys?.length > 0) {
            const ws = XLSX.utils.json_to_sheet(res?.data?.enquirys);
            XLSX.utils.book_append_sheet(workbook, ws, `Enquiry`);
          }
  
          if (res?.data?.studentlist?.length > 0) {
            const ws = XLSX.utils.json_to_sheet(res?.data?.studentlist);
            XLSX.utils.book_append_sheet(workbook, ws, `StudentList`);
          }
  
          if (res?.data?.studentAttendance?.length > 0) {
            const ws = XLSX.utils.json_to_sheet(res?.data?.studentAttendance);
            XLSX.utils.book_append_sheet(workbook, ws, `StudentAttendanceList`);
          }
  
          if (res?.data?.employeelist?.length > 0) {
            const ws = XLSX.utils.json_to_sheet(res?.data?.employeelist);
            XLSX.utils.book_append_sheet(workbook, ws, `employeelist`);
          }
  
          if (res?.data?.employeeAttendance?.length > 0) {
            const ws = XLSX.utils.json_to_sheet(res?.data?.employeeAttendance);
            XLSX.utils.book_append_sheet(workbook, ws, `employeeAttendance`);
          }
  
          if (res?.data?.bookslist?.length > 0) {
            const ws = XLSX.utils.json_to_sheet(res?.data?.bookslist);
            XLSX.utils.book_append_sheet(workbook, ws, `BookLIst`);
          }
  
          if (res?.data?.issuedbooklist?.length > 0) {
            const ws = XLSX.utils.json_to_sheet(res?.data?.issuedbooklist);
            XLSX.utils.book_append_sheet(workbook, ws, `Book Issued List`);
          }
  
          if (res?.data?.allreceiptdata?.length > 0) {
            const sheet2 = XLSX.utils.json_to_sheet(res?.data?.allreceiptdata);
            XLSX.utils.book_append_sheet(workbook, sheet2, 'All Receipt Data');
          }
  
          if (res?.data?.paidfee?.length > 0) {
            const sheet2 = XLSX.utils.json_to_sheet(res?.data?.paidfee);
            XLSX.utils.book_append_sheet(workbook, sheet2, 'Paid Fee List');
          }
  
          if (res?.data?.pedningfee?.length > 0) {
            const sheet2 = XLSX.utils.json_to_sheet(res?.data?.pedningfee);
            XLSX.utils.book_append_sheet(workbook, sheet2, 'Pending Fee List');
          }
  
          if (res?.data?.buslist?.length > 0) {
            const sheet2 = XLSX.utils.json_to_sheet(res?.data?.buslist);
            XLSX.utils.book_append_sheet(workbook, sheet2, 'Bus List');
          }
          if (res?.data?.expenseslist?.length > 0) {
            const sheet2 = XLSX.utils.json_to_sheet(res?.data?.expenseslist);
            XLSX.utils.book_append_sheet(workbook, sheet2, 'Expenses');
          }
  
          if (res?.data?.hostelist?.length > 0) {
            const sheet2 = XLSX.utils.json_to_sheet(res?.data?.hostelist);
            XLSX.utils.book_append_sheet(workbook, sheet2, 'Hostels');
          }
  
          if (res?.data?.roomlist?.length > 0) {
            const sheet2 = XLSX.utils.json_to_sheet(res?.data?.roomlist);
            XLSX.utils.book_append_sheet(workbook, sheet2, 'Rooms In Hostel');
          }
          if (res?.data?.checkinlist?.length > 0) {
            const sheet2 = XLSX.utils.json_to_sheet(res?.data?.checkinlist);
            XLSX.utils.book_append_sheet(workbook, sheet2, 'Checkin List');
          }
  
          const excelData = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'base64',
          });
  
          const downloadPath = RNFS.DownloadDirectoryPath + `/BackupData.xlsx`;
  
          RNFS.writeFile(downloadPath, excelData, 'base64')
            .then(response => {
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Download File Successlly!!',
              });
              setbackuping(false);
            })
            .catch(err => {
              console.log('Download error:', err);
              setbackuping(false);
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: res?.msg,
              });
            });
        }
  
        if (res?.status === false) {
          // Toast.show({
          //   type: 'error',
          //   text1: 'Error',
          //   text2: data?.msg,
          // });
          setbackuping(false);
        }
      });
    };
  
    return (
      <>
       
        <ScrollView>
          <View style={styles.connainer}>
            <View style={styles.card10}>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Institute Details
                </Text>
                <Text></Text>
              </View>
  
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Owner Name
                </Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Client Code
                </Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.name}
                </Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.ClientCode}
                </Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Official Email
                </Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Institute Name
                </Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.email}
                </Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.name}
                </Text>
              </View>
  
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Phone No1
                </Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Phone No2
                </Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.phoneno1}
                </Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.phoneno2}
                </Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>State</Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>City</Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.state}
                </Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.city}
                </Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Address
                </Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Pincode
                </Text>
              </View>
              <View style={styles.viewdel}>
                <View style={{width: '50%'}}>
                  <Text style={{fontWeight: 700, color: Colors.black}}>
                    {user?.data?.CredentailsData?.address}
                  </Text>
                </View>
  
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.pincode}
                </Text>
              </View>
              <View style={styles.viewdel}>
                <Text></Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UpdateInstituteCoaching')}>
                  <Ionicons name="create" color={Colors.primary} size={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.dividerview}></View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Profile
                </Text>
                <Text></Text>
              </View>
  
              <View style={styles.viewdel}>
                {user?.data?.CredentailsData?.profileurl ? (
                  <>
                    <Image
                      source={{
                        uri: user?.data?.CredentailsData?.profileurl,
                      }}
                      style={styles.imagesviewprofileurl}
                    />
                  </>
                ) : (
                  <>
                    <Image source={Img} style={styles.imagesviewprofileurl} />
                  </>
                )}
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>Logo</Text>
                <Text></Text>
              </View>
  
              <View style={styles.viewdel}>
                {user?.data?.CredentailsData?.logourl ? (
                  <>
                    <Image
                      source={{
                        uri: user?.data?.CredentailsData?.logourl,
                      }}
                      style={styles.imagesviewlogourl}
                    />
                  </>
                ) : (
                  <>
                    <Image source={Img} style={styles.imagesviewlogourl} />
                  </>
                )}
                <Text></Text>
              </View>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                Certificate
              </Text>
              <View style={styles.viewdel}>
                {user?.data?.CredentailsData?.certificatelogo ? (
                  <>
                    <Image
                      source={{
                        uri: user?.data?.CredentailsData?.certificatelogo,
                      }}
                      style={styles.imagesview}
                    />
                  </>
                ) : (
                  <>
                    <Image source={Img} style={styles.imagesview} />
                  </>
                )}
              </View>
              <View style={styles.viewdel}>
                <Text></Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UpdateImgaesCoaching')}>
                  <Ionicons name="create" color={Colors.primary} size={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.dividerview}></View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Credentails Details
                </Text>
                <Text></Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Student Default Password
                </Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Parent Default Password
                </Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.Studentpassword}
                </Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.Parentpassword}
                </Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Employee Default Password
                </Text>
                <Text style={{fontWeight: 700, color: Colors.black}}></Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.Employeepassword}
                </Text>
                <Text></Text>
              </View>
  
              <View style={styles.viewdel}>
                <Text></Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UpdateCredentialCoaching')}>
                  <Ionicons name="create" color={Colors.primary} size={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.dividerview}></View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Communication Details
                </Text>
                <Text></Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>Email</Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Password
                </Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.Sendemail}
                </Text>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.SendemailPassword}
                </Text>
              </View>
  
              <View style={styles.viewdel}>
                <Text></Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UpdateCommunicationCoaching')
                  }>
                  <Ionicons name="create" color={Colors.primary} size={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.dividerview}></View>
              <View>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  Show Or Hide These Options
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.mainshowoption}>
                    <Text style={{fontWeight: 700, color: Colors.black}}>
                      Front Office
                    </Text>
                    <Checkbox.Android
                      status={frontofficeStatus ? 'checked' : 'unchecked'}
                      onPress={() => setfrontofficeStatus(!frontofficeStatus)}
                    />
                  </View>
                  <View style={styles.mainshowoption}>
                    <Text style={{fontWeight: 700, color: Colors.black}}>
                      Library
                    </Text>
                    <Checkbox.Android
                      status={Librarystatus ? 'checked' : 'unchecked'}
                      onPress={() => setLibrarystatus(!Librarystatus)}
                    />
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.mainshowoption}>
                    <Text style={{fontWeight: 700, color: Colors.black}}>
                      Hostel
                    </Text>
                    <Checkbox.Android
                      status={HostelStatus ? 'checked' : 'unchecked'}
                      onPress={() => setHostelStatus(!HostelStatus)}
                    />
                  </View>
                  <View style={styles.mainshowoption}>
                    <Text style={{fontWeight: 700, color: Colors.black}}>
                      Transport
                    </Text>
                    <Checkbox.Android
                      status={TransportStatus ? 'checked' : 'unchecked'}
                      onPress={() => setTransportStatus(!TransportStatus)}
                    />
                  </View>
                </View>
  
                <View style={{marginVertical: 20}}>
                  <RNButton
                    loading={updating}
                    style={{paddingHorizontal: 25}}
                    onPress={() => {
                      submit();
                    }}>
                    Update
                  </RNButton>
                </View>
              </View>
  
              <View style={styles.dividerview}></View>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                Backup For
              </Text>
  
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.mainshowoption}>
                  <Text style={{fontWeight: 700, color: Colors.black}}>
                    Front Office
                  </Text>
                  <Checkbox.Android
                    status={frontoffice ? 'checked' : 'unchecked'}
                    onPress={() => setfrontoffice(!frontoffice)}
                  />
                </View>
                <View style={styles.mainshowoption}>
                  <Text style={{fontWeight: 700, color: Colors.black}}>
                    Library
                  </Text>
                  <Checkbox.Android
                    status={Library ? 'checked' : 'unchecked'}
                    onPress={() => setLibrary(!Library)}
                  />
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.mainshowoption}>
                  <Text style={{fontWeight: 700, color: Colors.black}}>
                    Student
                  </Text>
                  <Checkbox.Android
                    status={student ? 'checked' : 'unchecked'}
                    onPress={() => setstudent(!student)}
                  />
                </View>
                <View style={styles.mainshowoption}>
                  <Text style={{fontWeight: 700, color: Colors.black}}>
                    Accounts
                  </Text>
                  <Checkbox.Android
                    status={accounts ? 'checked' : 'unchecked'}
                    onPress={() => setaccounts(!accounts)}
                  />
                </View>
              </View>
  
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.mainshowoption}>
                  <Text style={{fontWeight: 700, color: Colors.black}}>
                    Employee
                  </Text>
                  <Checkbox.Android
                    status={employee ? 'checked' : 'unchecked'}
                    onPress={() => setemployee(!employee)}
                  />
                </View>
  
                <View style={styles.mainshowoption}>
                  <Text style={{fontWeight: 700, color: Colors.black}}>
                    Hostel
                  </Text>
                  <Checkbox.Android
                    status={hostel ? 'checked' : 'unchecked'}
                    onPress={() => sethostel(!hostel)}
                  />
                </View>
              </View>
  
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.mainshowoption}>
                  <Text style={{fontWeight: 700, color: Colors.black}}>
                    Transport
                  </Text>
                  <Checkbox.Android
                    status={transport ? 'checked' : 'unchecked'}
                    onPress={() => settransport(!transport)}
                  />
                </View>
  
                <View style={styles.mainshowoption}>
                  <Text style={{fontWeight: 700, color: Colors.black}}>
                    Expenses
                  </Text>
                  <Checkbox.Android
                    status={expenses ? 'checked' : 'unchecked'}
                    onPress={() => setexpenses(!expenses)}
                  />
                </View>
              </View>
  
              <View style={{marginVertical: 20}}>
                <RNButton
                  loading={backuping}
                  style={{paddingHorizontal: 25}}
                  onPress={() => {
                    handlebackup();
                  }}>
                  Take Backup
                </RNButton>
              </View>
              <View></View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  };
  
  export default CoachingProfie;
  
  const styles = StyleSheet.create({
    mainshowoption: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '50%',
      justifyContent: 'space-between',
    },
    dividerview: {
      borderWidth: 2,
      borderColor: Colors.primary,
      marginVertical: 10,
      backgroundColor: Colors.primary,
    },
    connainer: {
      paddingHorizontal: 10,
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
    actionimg: {
      width: 39,
      height: 40,
    },
    actionimg10: {
      width: 40,
      height: 40,
    },
    mainActionView: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      width: '30%',
      justifyContent: 'space-between',
    },
    imagesview: {
      width: '100%',
      height: deviceWidth * 0.5,
      resizeMode: 'contain',
    },
  
    imagesviewprofileurl: {
      width: deviceWidth * 0.5,
      height: deviceWidth * 0.5,
      resizeMode: 'contain',
    },
    imagesviewlogourl: {
      width: '100%',
      height: deviceWidth * 0.5,
      resizeMode: 'contain',
    },
  });
  