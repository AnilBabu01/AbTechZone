import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {primary} from '../../../utils/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getstudent, getbatch} from '../../../redux/action/commanAction';
import {useDispatch, useSelector} from 'react-redux';
import BackHeader from '../../../Component/Header/BackHeader';
import RNButton from '../../../Component/RNButton';
import {serverInstance} from '../../../API/ServerInstance';
import {Checkbox} from 'react-native-paper';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {Switch} from 'react-native-paper';
import {RadioButton} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {Colors} from '../../../utils/Colors';
import DashboardPlaceholderLoader from '../../../Component/DashboardPlaceholderLoader';
import PaymentStatus from './PaymentStatus';
import RNDatePicker from '../../../Component/RNDatePicker';
import {handleDate, getTodaysDate} from '../../../utils/functions';
import moment from 'moment';

const AddCollectFee = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const [editdiscount, seteditdiscount] = useState(false);
  const [discountallow, setdiscountallow] = useState(false);
  const [payDate, setpayDate] = useState(getTodaysDate());
  const [openModel, setopenModel] = useState(false);
  const [loading, setloading] = useState(false);
  const [studentdatais, setstudentdatais] = useState('');
  const [index, setIndex] = useState(0);
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const [receiptdata, setreceiptdata] = useState('');
  const [PayOption, setPayOption] = useState('Cash');
  const [paymentdate, setpaymentdate] = useState('');

  const [feetype, setfeetype] = useState('');
  const [annualfee, setannualfee] = useState('');
  const [admissionfee, setadmissionfee] = useState('');

  const [feetypeBoolean, setfeetypeBoolean] = useState(false);
  const [annualfeeBoolean, setannualfeeBoolean] = useState(false);
  const [admissionfeeBoolean, setadmissionfeeBoolean] = useState(false);

  const [skip, setskip] = useState(false);
  const [loadingfee, setloadingfee] = useState(false);
  const [showreceiptotions, setshowreceiptotions] = useState(false);

  const [sendotherfeearray, setsendotherfeearray] = useState([]);
  const [sendacadminArray, setsendacadminArray] = useState([]);
  const [sendhostelArray, setsendhostelArray] = useState([]);
  const [sendtransportArray, setsendtransportArray] = useState([]);

  const [otherfeearray, setotherfeearray] = useState([]);
  const [acadminArray, setacadminArray] = useState([]);
  const [hostelArray, sethostelArray] = useState([]);
  const [transportArray, settransportArray] = useState([]);

  const [editotherfeearray, seteditotherfeearray] = useState([]);
  const [editacadminArray, seteditacadminArray] = useState([]);
  const [edithostelArray, setedithostelArray] = useState([]);
  const [edittransportArray, setedittransportArray] = useState([]);

  const [schoolfee, setschoolfee] = useState('');
  const [academinfee, setacademinfee] = useState(true);
  const [transportfee, settransportfee] = useState(false);
  const [hostelfee, sethostelfee] = useState(false);
  const [otherfee, setotherfee] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const {batch, error} = useSelector(state => state.addbatch);

  console.log('ncd', payDate, discountallow);

  const toggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    seteditacadminArray([]);
    setedithostelArray([]);
    seteditotherfeearray([]);
    setedittransportArray([]);
  };

  const togglePaySwitch = () => {
    setdiscountallow(!discountallow);
  };

  const toggleEditPaySwitch = () => {
    seteditdiscount(!editdiscount);
  };

  const getallfee = () => {
    if (route?.params?.data) {
      setloadingfee(true);
      setstudentdatais(route?.params?.data);
      serverInstance('Student/schoolfee', 'post', {
        id: route?.params?.data?.id,
        SrNumber: route?.params?.data?.SrNumber,
      }).then(res => {
        if (res?.status) {
          setschoolfee(res?.data);
          setloadingfee(false);
          setacadminArray(res?.data?.schollfee);
          sethostelArray(res?.data?.hostelfee);
          setotherfeearray(res?.data?.otherfee);
          settransportArray(res?.data?.transportfee);
        }
      });
    }
  };

  useEffect(() => {
    getallfee();
  }, []);

  useEffect(() => {
    if (batch?.status) {
      dispatch(getbatch());
      setsms('');
      setloader(false);
    }
  }, [batch]);
  useEffect(() => {
    if (error) {
      if (error?.status === false) {
        setloader(false);
        setsms('');
      }
    }
  }, [error]);

  const compareMonths = (a, b) => {
    const monthsOrder = [
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
      'January',
      'February',
      'March',
    ];

    return monthsOrder.indexOf(a.MonthName) - monthsOrder.indexOf(b.MonthName);
  };

  const handleCheckboxAcadminArrayToggle = index => {
    const updatedMonths = [...acadminArray];
    updatedMonths[index].checked = !updatedMonths[index].checked;
    updatedMonths[index].paidStatus = !updatedMonths[index].checked;
    if (editdiscount === true) {
      updatedMonths[index].Discount = !updatedMonths[index].checked;
    }

    setacadminArray(updatedMonths);

    if (updatedMonths[index].checked) {
      // If checked, add to selectedMonths
      setsendacadminArray(prevSelectedMonths => [
        ...prevSelectedMonths,
        updatedMonths[index],
      ]);
      seteditacadminArray(prevSelectedMonths => [
        ...prevSelectedMonths,
        updatedMonths[index],
      ]);
    } else {
      // If unchecked, remove from selectedMonths

      setsendacadminArray(prevSelectedMonths =>
        prevSelectedMonths.filter(
          month => month?.MonthName !== updatedMonths[index].MonthName,
        ),
      );

      seteditacadminArray(prevSelectedMonths =>
        prevSelectedMonths.filter(
          month => month?.MonthName !== updatedMonths[index].MonthName,
        ),
      );
    }
  };

  console.log('edit ', editacadminArray);

  const handleCheckboxhostelArrayToggle = index => {
    const updatedMonths = [...hostelArray];
    updatedMonths[index].checked = !updatedMonths[index].checked;
    updatedMonths[index].paidStatus = !updatedMonths[index].checked;
    if (editdiscount === true) {
      updatedMonths[index].Discount = !updatedMonths[index].checked;
    }
    sethostelArray(updatedMonths);

    if (updatedMonths[index].checked) {
      // If checked, add to selectedMonths
      setsendhostelArray(prevSelectedMonths => [
        ...prevSelectedMonths,
        updatedMonths[index],
      ]);

      setedithostelArray(prevSelectedMonths => [
        ...prevSelectedMonths,
        updatedMonths[index],
      ]);
    } else {
      // If unchecked, remove from selectedMonths
      setsendhostelArray(prevSelectedMonths =>
        prevSelectedMonths.filter(
          month => month?.MonthName !== updatedMonths[index].MonthName,
        ),
      );

      setedithostelArray(prevSelectedMonths =>
        prevSelectedMonths.filter(
          month => month?.MonthName !== updatedMonths[index].MonthName,
        ),
      );
    }
  };

  const handleCheckboxtransportArrayToggle = index => {
    const updatedMonths = [...transportArray];
    updatedMonths[index].checked = !updatedMonths[index].checked;
    updatedMonths[index].paidStatus = !updatedMonths[index].checked;
    if (editdiscount === true) {
      updatedMonths[index].Discount = !updatedMonths[index].checked;
    }
    settransportArray(updatedMonths);

    if (updatedMonths[index].checked) {
      // If checked, add to selectedMonths
      setsendtransportArray(prevSelectedMonths => [
        ...prevSelectedMonths,
        updatedMonths[index],
      ]);
      setedittransportArray(prevSelectedMonths => [
        ...prevSelectedMonths,
        updatedMonths[index],
      ]);
    } else {
      // If unchecked, remove from selectedMonths
      setsendtransportArray(prevSelectedMonths =>
        prevSelectedMonths.filter(
          month => month?.MonthName !== updatedMonths[index].MonthName,
        ),
      );

      setedittransportArray(prevSelectedMonths =>
        prevSelectedMonths.filter(
          month => month?.MonthName !== updatedMonths[index].MonthName,
        ),
      );
    }
  };

  const handleCheckboxotherfeearrayToggle = index => {
    const updatedMonths = [...otherfeearray];
    updatedMonths[index].checked = !updatedMonths[index].checked;
    updatedMonths[index].paidStatus = !updatedMonths[index].checked;

    setotherfeearray(updatedMonths);

    if (updatedMonths[index].checked) {
      // If checked, add to selectedMonths
      setsendotherfeearray(prevSelectedMonths => [
        ...prevSelectedMonths,
        updatedMonths[index],
      ]);
      seteditotherfeearray(prevSelectedMonths => [
        ...prevSelectedMonths,
        updatedMonths[index],
      ]);
    } else {
      // If unchecked, remove from selectedMonths
      setsendotherfeearray(prevSelectedMonths =>
        prevSelectedMonths.filter(
          month => month?.MonthName !== updatedMonths[index].MonthName,
        ),
      );

      seteditotherfeearray(prevSelectedMonths =>
        prevSelectedMonths.filter(
          month => month?.MonthName !== updatedMonths[index].MonthName,
        ),
      );
    }
  };

  const submit = () => {
    try {
      setloading(true);
      const datas = {
        id: studentdatais?.id,
        feetype: feetype,
        annualfee: annualfee,
        admissionfee: admissionfee,
        PayOption: PayOption,
        paymentdate: paymentdate,
      };

      serverInstance('Student/payschoolanualregister', 'post', datas).then(
        res => {
          console.log('paid receipt data is', res);
          if (res?.status) {
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: res?.msg,
            });
            dispatch(getstudent());
            setloading(false);
            setopenModel(true);
            setreceiptdata(res?.data[0]?.receiptdata);
          }

          if (res?.status === false) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: res?.msg,
            });
            dispatch(getstudent());

            setloading(false);
          }
        },
      );
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const addSchoolFee = () => {
    try {
      setloading(true);

      const datas = {
        id: studentdatais?.id,
        acadminArray: sendacadminArray,
        studentData: studentdatais,
        feetype: 'Academy Fee',
        PayOption: PayOption,
        paymentdate: moment(payDate, 'YYYY-MM-DD'),
        unlockfeeOptions: isSwitchOn,
        editacadminArray: editacadminArray,
        discountallow: discountallow,
        editdiscount: editdiscount,
      };

      serverInstance('Student/addacadmyfee', 'post', datas).then(res => {
        if (res?.status) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
          dispatch(getstudent());
          getallfee();
          setloading(false);

          setshowreceiptotions(true);
          setreceiptdata(res?.data);

          console.log('Receipt data is  from add screen ', res);

          // navigation.navigate('StatusSreenFeeSchool', {
          //   receiptdata: res?.data[0]?.receiptdata,
          // });

          if (
            isSwitchOn === true ||
            discountallow === true ||
            editdiscount === true
          ) {
            navigation.navigate('FeeCollectSchool');
          } else {
            setopenModel(true);
          }
        }

        if (res?.status === false) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res?.msg,
          });
          dispatch(getstudent());
          setloading(false);
          getallfee();
        }
      });
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const addHostelFee = () => {
    try {
      setloading(true);
      const datas = {
        id: studentdatais?.id,
        acadminArray: sendhostelArray,
        studentData: studentdatais,
        feetype: 'Hostel Fee',
        PayOption: PayOption,
        paymentdate: moment(payDate, 'YYYY-MM-DD'),
        unlockfeeOptions: isSwitchOn,
        editacadminArray: editacadminArray,
        discountallow: discountallow,
        editdiscount: editdiscount,
      };

      serverInstance('Student/addhostelfee', 'post', datas).then(res => {
        console.log('Receipt data is ', res);
        if (res?.status) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
          dispatch(getstudent());
          getallfee();
          setloading(false);
          setshowreceiptotions(true);
          setreceiptdata(res?.data[0]?.receiptdata);
          if (
            isSwitchOn === true ||
            discountallow === true ||
            editdiscount === true
          ) {
            navigation.navigate('FeeCollectSchool');
          } else {
            setopenModel(true);
          }
        }

        if (res?.status === false) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res?.msg,
          });
          dispatch(getstudent());
          setloading(false);
          getallfee();
        }
      });
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const addTransportFee = () => {
    try {
      setloading(true);
      const datas = {
        id: studentdatais?.id,
        acadminArray: sendtransportArray,
        studentData: studentdatais,
        feetype: 'Transport Fee',
        PayOption: PayOption,
        paymentdate: moment(payDate, 'YYYY-MM-DD'),
        unlockfeeOptions: isSwitchOn,
        editacadminArray: editacadminArray,
        discountallow: discountallow,
        editdiscount: editdiscount,
      };

      serverInstance('Student/addtransportfee', 'post', datas).then(res => {
        console.log('Receipt data is ', res);
        if (res?.status) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
          dispatch(getstudent());
          setloading(false);
          getallfee();
          setshowreceiptotions(true);
          setreceiptdata(res?.data[0]?.receiptdata);
          if (
            isSwitchOn === true ||
            discountallow === true ||
            editdiscount === true
          ) {
            navigation.navigate('FeeCollectSchool');
          } else {
            setopenModel(true);
          }
        }

        if (res?.status === false) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res?.msg,
          });
          dispatch(getstudent());
          setloading(false);
          getallfee();
        }
      });
    } catch (error) {
      setloading(false);
    }
  };

  const addOtherFee = () => {
    try {
      setloading(true);
      const datas = {
        id: studentdatais?.id,
        acadminArray: sendotherfeearray,
        studentData: studentdatais,
        feetype: 'Other Fee',
        PayOption: PayOption,
        paymentdate: moment(payDate, 'YYYY-MM-DD'),
        unlockfeeOptions: isSwitchOn,
        editacadminArray: editacadminArray,
        discountallow: discountallow,
        editdiscount: editdiscount,
      };

      serverInstance('Student/addotherfee', 'post', datas).then(res => {
        console.log('other fee  data is ', res);
        if (res?.status) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.msg,
          });
          dispatch(getstudent());
          setloading(false);
          getallfee();
          setshowreceiptotions(true);
          setreceiptdata(res?.data[0]?.receiptdata);
          if (isSwitchOn === true || discountallow === true) {
            navigation.navigate('FeeCollectSchool');
          } else {
            setopenModel(true);
          }
        }

        if (res?.status === false) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res?.msg,
          });
          dispatch(getstudent());
          setloading(false);
          getallfee();
        }
      });
    } catch (error) {
      setloading(false);
    }
  };

  useEffect(() => {
    setpaymentdate(new Date().toISOString().substring(0, 10));
  }, []);

  const TotalOtherFee = data => {
    let total = 0;
    data?.map(item => {
      if (item?.PaidStatus === false) {
        total = total + Number(item?.FeeAmount);
      }
    });
    return total;
  };

  return (
    <View>
      <BackHeader title={'Pay Fee'} />
      <Modal animationType={'fade'} transparent={true} visible={openModel}>
        <PaymentStatus receiptdata={receiptdata} setopenModel={setopenModel} />
      </Modal>
      <ScrollView>
        {((studentdatais?.regisgrationfee === 0
          ? true
          : studentdatais?.Registrationfeestatus) &&
          (studentdatais?.AnnualFee === 0
            ? true
            : studentdatais?.AnnualFeeStatus) &&
          (studentdatais?.admissionfee === 0
            ? true
            : studentdatais?.admissionfeeStatus)) ||
        skip ? (
          <>
            <View style={styles.payforview}>
              <Checkbox.Android
                status={academinfee ? 'checked' : 'unchecked'}
                onPress={() => {
                  setacademinfee(!academinfee);
                  sethostelfee(false);
                  settransportfee(false);
                  setotherfee(false);
                }}
              />
              <Text style={{color: Colors.black, fontWeight: 'bold'}}>
                Academin
              </Text>

              <Checkbox.Android
                status={hostelfee ? 'checked' : 'unchecked'}
                onPress={() => {
                  sethostelfee(!hostelfee);
                  setacademinfee(false);
                  settransportfee(false);
                  setotherfee(false);
                }}
              />
              {studentdatais?.hostal && (
                <>
                  <Text style={{color: Colors.black, fontWeight: 'bold'}}>
                    Hostel
                  </Text>
                  <Checkbox.Android
                    status={transportfee ? 'checked' : 'unchecked'}
                    onPress={() => {
                      settransportfee(!transportfee);
                      setacademinfee(false);
                      sethostelfee(false);
                      setotherfee(false);
                    }}
                  />
                </>
              )}

              {studentdatais?.Transport && (
                <>
                  <Text style={{color: Colors.black, fontWeight: 'bold'}}>
                    Transport
                  </Text>
                  <Checkbox.Android
                    status={otherfee ? 'checked' : 'unchecked'}
                    onPress={() => {
                      settransportfee(false);
                      setacademinfee(false);
                      sethostelfee(false);
                      setotherfee(!otherfee);
                    }}
                  />
                </>
              )}

              <Text style={{color: Colors.black, fontWeight: 'bold'}}>
                Other
              </Text>
            </View>

            <View style={styles.editFeeView}>
              <Text style={{color: Colors.black, fontWeight: 'bold'}}>
                Edit On/Off
              </Text>
              <Switch value={isSwitchOn} onValueChange={toggleSwitch} />

              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Cash"
                  status={PayOption === 'Cash' ? 'checked' : 'unchecked'}
                  onPress={() => setPayOption('Cash')}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Cash</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Online"
                  status={PayOption === 'Online' ? 'checked' : 'unchecked'}
                  onPress={() => setPayOption('Online')}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Online</Text>
              </View>
            </View>

            {academinfee === true && (
              <>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: Colors.primary,
                    borderTopColor: Colors.primary,
                    borderTopWidth: 2,
                    paddingVertical: 10,
                  }}>
                  <View style={styles.dateview}>
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>Student Name</Text>
                      <Text style={styles.datatext}>
                        {studentdatais?.name ? studentdatais?.name : '-'}
                      </Text>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>Class</Text>
                      <Text style={styles.datatext}>
                        {studentdatais?.courseorclass
                          ? studentdatais?.courseorclass
                          : '-'}
                      </Text>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>Roll No</Text>
                      <Text style={styles.datatext}>
                        {studentdatais?.rollnumber
                          ? studentdatais?.rollnumber
                          : '-'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dateview}>
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>Father's Name</Text>
                      <Text style={styles.datatext}>
                        {studentdatais?.fathersName
                          ? studentdatais?.fathersName
                          : '-'}
                      </Text>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>Fathers Mobile</Text>
                      <Text style={styles.datatext}>
                        {studentdatais?.fathersPhoneNo
                          ? studentdatais?.fathersPhoneNo
                          : '-'}
                      </Text>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>Student Mobile</Text>
                      <Text style={styles.datatext}>
                        {studentdatais?.phoneno1
                          ? studentdatais?.phoneno1
                          : '-'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dateview}>
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>Per Month Fee</Text>
                      <Text style={styles.datatext}>
                        {studentdatais?.permonthfee
                          ? studentdatais?.permonthfee
                          : '-'}
                      </Text>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>Total Fee</Text>
                      <Text style={styles.datatext}>
                        {studentdatais?.studentTotalFee
                          ? studentdatais?.studentTotalFee
                          : '-'}
                      </Text>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>Paid Fee</Text>
                      <Text style={styles.datatext}>
                        {studentdatais?.paidfee ? studentdatais?.paidfee : '-'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dateview}>
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>Pending Amount</Text>
                      <Text style={styles.datatext}>
                        {isSwitchOn ? (
                          <>
                            {Math.abs(
                              Number(studentdatais?.pendingfee) +
                                Number(
                                  editacadminArray &&
                                    editacadminArray?.reduce(
                                      (n, {PerMonthFee}) =>
                                        parseFloat(n) + parseFloat(PerMonthFee),
                                      0,
                                    ),
                                ),
                            )}
                          </>
                        ) : (
                          <>
                            {Math.abs(
                              Number(studentdatais?.pendingfee) -
                                Number(
                                  sendacadminArray &&
                                    sendacadminArray?.reduce(
                                      (n, {PerMonthFee}) =>
                                        parseFloat(n) + parseFloat(PerMonthFee),
                                      0,
                                    ),
                                ),
                            )}
                          </>
                        )}
                      </Text>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>
                        {isSwitchOn ? 'Editable' : 'Payable'} Amount
                      </Text>
                      <Text style={styles.datatext}>
                        {sendacadminArray &&
                          sendacadminArray?.reduce(
                            (n, {PerMonthFee}) =>
                              parseFloat(n) + parseFloat(PerMonthFee),
                            0,
                          )}
                      </Text>
                    </View>
                    <View style={styles.cardContent}></View>
                  </View>
                </View>

                <View style={{paddingHorizontal: 20}}>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontWeight: 'bold',
                        marginRight: 10,
                      }}>
                      Discount On/Off
                    </Text>
                    <Switch
                      value={discountallow}
                      onValueChange={togglePaySwitch}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontWeight: 'bold',
                        marginRight: 10,
                      }}>
                      Edit Discount On/Off
                    </Text>
                    <Switch
                      value={editdiscount}
                      onValueChange={toggleEditPaySwitch}
                    />
                  </View>

                  <View style={{width: '100%', marginBottom: 6}}>
                    <RNDatePicker
                      title="Pay Date"
                      value={payDate}
                      onDateChange={date => setpayDate(handleDate(date))}
                    />
                  </View>
                </View>

                {loadingfee ? (
                  <>
                    <DashboardPlaceholderLoader type="table" />
                  </>
                ) : (
                  <>
                    <View style={styles.titleview}>
                      <Text style={{color: 'white'}}>Mark</Text>
                      <View style={{width: deviceWidth * 0.3}}>
                        <Text style={{color: 'white'}}>Month/Year</Text>
                      </View>

                      <Text style={{color: 'white'}}>Amount</Text>

                      <Text style={{color: 'white'}}>Status</Text>
                    </View>

                    {schoolfee?.schollfee
                      ?.sort(compareMonths)
                      ?.map((item, index) => {
                        return (
                          <View key={index} style={styles.Sdataview}>
                            {item?.Discount ? (
                              <>
                                <Checkbox.Android
                                  disabled={
                                    editdiscount === false && item?.Discount
                                  }
                                  status={
                                    item.checked === false && item?.Discount
                                      ? 'checked'
                                      : 'unchecked'
                                  }
                                  onPress={() =>
                                    handleCheckboxAcadminArrayToggle(index)
                                  }
                                />
                              </>
                            ) : (
                              <>
                                {item?.paidStatus ? (
                                  <>
                                    <Checkbox.Android
                                      disabled={
                                        isSwitchOn === false && item?.paidStatus
                                      }
                                      status={
                                        item.paidStatus
                                          ? 'checked'
                                          : 'unchecked'
                                      }
                                      onPress={() =>
                                        handleCheckboxAcadminArrayToggle(index)
                                      }
                                    />
                                  </>
                                ) : (
                                  <>
                                    {editdiscount === true ? (
                                      <>
                                        <Checkbox.Android
                                          status={
                                            item.checked === false &&
                                            item?.Discount
                                              ? 'checked'
                                              : 'unchecked'
                                          }
                                          onPress={() =>
                                            handleCheckboxAcadminArrayToggle(
                                              index,
                                            )
                                          }
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <Checkbox.Android
                                          status={
                                            isSwitchOn === true
                                              ? item?.paidStatus
                                                ? 'checked'
                                                : 'unchecked'
                                              : item.checked
                                              ? 'checked'
                                              : 'unchecked'
                                          }
                                          onPress={() =>
                                            handleCheckboxAcadminArrayToggle(
                                              index,
                                            )
                                          }
                                        />
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}

                            <View style={{width: deviceWidth * 0.3}}>
                              <Text>
                                {item?.MonthName} {item?.Year}
                              </Text>
                            </View>

                            <Text> {item?.PerMonthFee}</Text>

                            <Text>
                              {item?.Discount === true ? (
                                <Text>Discounted</Text>
                              ) : item?.paidStatus === true ? (
                                <Text style={styles.paidtextColor}>Paid</Text>
                              ) : (
                                <Text style={styles.DuestextColor}>Dues</Text>
                              )}
                            </Text>
                          </View>
                        );
                      })}
                  </>
                )}

                <View
                  style={{
                    paddingHorizontal: deviceWidth * 0.05,
                    marginBottom: deviceHeight * 0.07,
                  }}>
                  <RNButton onPress={() => addSchoolFee()} loading={loading}>
                    {isSwitchOn ? 'Edit' : 'pay Now'}
                  </RNButton>
                </View>
              </>
            )}

            {hostelfee === true && studentdatais?.hostal === true && (
              <>
                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Student Name</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.name ? studentdatais?.name : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Class</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.courseorclass
                        ? studentdatais?.courseorclass
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Roll No</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.rollnumber
                        ? studentdatais?.rollnumber
                        : '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Father's Name</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.fathersName
                        ? studentdatais?.fathersName
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Fathers Mobile</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.fathersPhoneNo
                        ? studentdatais?.fathersPhoneNo
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Student Mobile</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.phoneno1 ? studentdatais?.phoneno1 : '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Per Month Fee</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.HostelPerMonthFee
                        ? studentdatais?.HostelPerMonthFee
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Total Fee</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.TotalHostelFee
                        ? studentdatais?.TotalHostelFee
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Paid Fee</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.HostelPaidFee
                        ? studentdatais?.HostelPaidFee
                        : '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Pending Amount</Text>
                    <Text style={styles.datatext}>
                      {isSwitchOn ? (
                        <>
                          {Math.abs(
                            Number(studentdatais?.HostelPendingFee) +
                              Number(
                                edithostelArray &&
                                  edithostelArray?.reduce(
                                    (n, {PerMonthFee}) =>
                                      parseFloat(n) + parseFloat(PerMonthFee),
                                    0,
                                  ),
                              ),
                          )}
                        </>
                      ) : (
                        <>
                          {Math.abs(
                            Number(studentdatais?.HostelPendingFee) -
                              Number(
                                sendhostelArray &&
                                  sendhostelArray?.reduce(
                                    (n, {PerMonthFee}) =>
                                      parseFloat(n) + parseFloat(PerMonthFee),
                                    0,
                                  ),
                              ),
                          )}
                        </>
                      )}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>
                      {isSwitchOn ? 'Editable' : 'Payable'} Amount
                    </Text>
                    <Text style={styles.datatext}>
                      {sendhostelArray &&
                        sendhostelArray?.reduce(
                          (n, {PerMonthFee}) =>
                            parseFloat(n) + parseFloat(PerMonthFee),
                          0,
                        )}
                    </Text>
                  </View>

                  <View style={styles.cardContent}></View>
                </View>

                <View
                  style={{
                    paddingHorizontal: 20,
                    borderTopWidth: 2,
                    borderTopColor: Colors.primary,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontWeight: 'bold',
                        marginRight: 10,
                      }}>
                      Discount On/Off
                    </Text>
                    <Switch
                      value={discountallow}
                      onValueChange={togglePaySwitch}
                    />
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontWeight: 'bold',
                        marginRight: 10,
                      }}>
                      Edit Discount On/Off
                    </Text>
                    <Switch
                      value={editdiscount}
                      onValueChange={toggleEditPaySwitch}
                    />
                  </View>

                  <View style={{width: '100%', marginBottom: 6}}>
                    <RNDatePicker
                      title="Pay Date"
                      value={payDate}
                      onDateChange={date => setpayDate(handleDate(date))}
                    />
                  </View>
                </View>

                <View style={styles.titleview}>
                  <Text style={{color: 'white'}}>Mark</Text>
                  <View style={{width: deviceWidth * 0.3}}>
                    <Text style={{color: 'white'}}>Month/Year</Text>
                  </View>

                  <Text style={{color: 'white'}}>Amount</Text>

                  <Text style={{color: 'white'}}>Status</Text>
                </View>

                {schoolfee?.hostelfee
                  ?.sort(compareMonths)
                  ?.map((item, index) => {
                    return (
                      <View key={index} style={styles.Sdataview}>
                        {item?.paidStatus ? (
                          <>
                            <Checkbox.Android
                              disabled={
                                isSwitchOn === false && item?.paidStatus
                              }
                              status={item.paidStatus ? 'checked' : 'unchecked'}
                              onPress={() =>
                                handleCheckboxhostelArrayToggle(index)
                              }
                            />
                          </>
                        ) : (
                          <>
                            <Checkbox.Android
                              status={
                                isSwitchOn === true
                                  ? item?.paidStatus
                                    ? 'checked'
                                    : 'unchecked'
                                  : item.checked
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() =>
                                handleCheckboxhostelArrayToggle(index)
                              }
                            />
                          </>
                        )}

                        <View style={{width: deviceWidth * 0.3}}>
                          <Text>
                            {item?.MonthName} {item?.Year}
                          </Text>
                        </View>

                        <Text> {item?.PerMonthFee}</Text>

                        <Text>
                          {item?.Discount === true ? (
                            <Text>Discounted</Text>
                          ) : item?.paidStatus === true ? (
                            <Text style={styles.paidtextColor}> Paid</Text>
                          ) : (
                            <Text style={styles.DuestextColor}>Dues</Text>
                          )}
                        </Text>
                      </View>
                    );
                  })}
                <View
                  style={{
                    paddingHorizontal: deviceWidth * 0.05,
                    marginBottom: deviceHeight * 0.07,
                  }}>
                  <RNButton onPress={() => addHostelFee()} loading={loading}>
                    {isSwitchOn ? 'Edit' : 'pay Now'}
                  </RNButton>
                </View>
              </>
            )}

            {transportfee === true && studentdatais?.Transport === true && (
              <>
                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Student Name</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.name ? studentdatais?.name : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Class</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.courseorclass
                        ? studentdatais?.courseorclass
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Roll No</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.rollnumber
                        ? studentdatais?.rollnumber
                        : '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Father's Name</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.fathersName
                        ? studentdatais?.fathersName
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Fathers Mobile</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.fathersPhoneNo
                        ? studentdatais?.fathersPhoneNo
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Student Mobile</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.phoneno1 ? studentdatais?.phoneno1 : '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Per Month Fee</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.TransportPerMonthFee
                        ? studentdatais?.TransportPerMonthFee
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Total Fee</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.TransportTotalHostelFee
                        ? studentdatais?.TransportTotalHostelFee
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Paid Fee</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.TransportPaidFee
                        ? studentdatais?.TransportPaidFee
                        : '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Pending Amount</Text>
                    <Text style={styles.datatext}>
                      {isSwitchOn ? (
                        <>
                          {Math.abs(
                            Number(studentdatais?.TransportPendingFee) +
                              Number(
                                edittransportArray &&
                                  edittransportArray?.reduce(
                                    (n, {PerMonthFee}) =>
                                      parseFloat(n) + parseFloat(PerMonthFee),
                                    0,
                                  ),
                              ),
                          )}
                        </>
                      ) : (
                        <>
                          {Math.abs(
                            Number(studentdatais?.TransportPendingFee) -
                              Number(
                                sendtransportArray &&
                                  sendtransportArray?.reduce(
                                    (n, {PerMonthFee}) =>
                                      parseFloat(n) + parseFloat(PerMonthFee),
                                    0,
                                  ),
                              ),
                          )}
                        </>
                      )}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>
                      {isSwitchOn ? 'Editable' : 'Payable'} Amount
                    </Text>
                    <Text style={styles.datatext}>
                      {sendtransportArray &&
                        sendtransportArray?.reduce(
                          (n, {PerMonthFee}) =>
                            parseFloat(n) + parseFloat(PerMonthFee),
                          0,
                        )}
                    </Text>
                  </View>
                  <View style={styles.cardContent}></View>
                </View>

                <View
                  style={{
                    paddingHorizontal: 20,
                    borderTopWidth: 2,
                    borderTopColor: Colors.primary,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontWeight: 'bold',
                        marginRight: 10,
                      }}>
                      Discount On/Off
                    </Text>
                    <Switch
                      value={discountallow}
                      onValueChange={togglePaySwitch}
                    />
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontWeight: 'bold',
                        marginRight: 10,
                      }}>
                      Edit Discount On/Off
                    </Text>
                    <Switch
                      value={editdiscount}
                      onValueChange={toggleEditPaySwitch}
                    />
                  </View>

                  <View style={{width: '100%', marginBottom: 6}}>
                    <RNDatePicker
                      title="Pay Date"
                      value={payDate}
                      onDateChange={date => setpayDate(handleDate(date))}
                    />
                  </View>
                </View>
                <View style={styles.titleview}>
                  <Text style={{color: 'white'}}>Mark</Text>
                  <View style={{width: deviceWidth * 0.2}}>
                    <Text style={{color: 'white'}}>Month/Year</Text>
                  </View>

                  <Text style={{color: 'white'}}>Amount</Text>

                  <Text style={{color: 'white'}}>Status</Text>
                </View>

                {schoolfee?.transportfee
                  ?.sort(compareMonths)
                  ?.map((item, index) => {
                    return (
                      <View key={index} style={styles.Sdataview}>

                        
                        {item?.paidStatus ? (
                          <>
                            <Checkbox.Android
                              disabled={
                                isSwitchOn === false && item?.paidStatus
                              }
                              status={item.paidStatus ? 'checked' : 'unchecked'}
                              onPress={() =>
                                handleCheckboxtransportArrayToggle(index)
                              }
                            />
                          </>
                        ) : (
                          <>
                            <Checkbox.Android
                              status={
                                isSwitchOn === true
                                  ? item?.paidStatus
                                    ? 'checked'
                                    : 'unchecked'
                                  : item.checked
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() =>
                                handleCheckboxtransportArrayToggle(index)
                              }
                            />
                          </>
                        )}

                        <View style={{width: deviceWidth * 0.2}}>
                          <Text>
                            {item?.MonthName} {item?.Year}
                          </Text>
                        </View>

                        <Text> {item?.PerMonthFee}</Text>

                        <Text>
                          {item?.Discount === true ? (
                            <Text>Discounted</Text>
                          ) : item?.paidStatus === true ? (
                            <Text style={styles.paidtextColor}> Paid</Text>
                          ) : (
                            <Text style={styles.DuestextColor}>Dues</Text>
                          )}
                        </Text>
                      </View>
                    );
                  })}
                <View
                  style={{
                    paddingHorizontal: deviceWidth * 0.05,
                    marginBottom: deviceHeight * 0.07,
                  }}>
                  <RNButton onPress={() => addTransportFee()} loading={loading}>
                    {isSwitchOn ? 'Edit' : 'pay Now'}
                  </RNButton>
                </View>
              </>
            )}

            {otherfee === true && (
              <>
                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Student Name</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.name ? studentdatais?.name : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Class</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.courseorclass
                        ? studentdatais?.courseorclass
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Roll No</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.rollnumber
                        ? studentdatais?.rollnumber
                        : '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Father's Name</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.fathersName
                        ? studentdatais?.fathersName
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Fathers Mobile</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.fathersPhoneNo
                        ? studentdatais?.fathersPhoneNo
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Student Mobile</Text>
                    <Text style={styles.datatext}>
                      {studentdatais?.phoneno1 ? studentdatais?.phoneno1 : '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.dateview}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>Pending Amount</Text>
                    <Text style={styles.datatext}>
                      {isSwitchOn ? (
                        <>
                          {Math.abs(
                            TotalOtherFee(schoolfee?.otherfee) +
                              Number(
                                edithostelArray &&
                                  edithostelArray?.reduce(
                                    (n, {FeeAmount}) =>
                                      parseFloat(n) + parseFloat(FeeAmount),
                                    0,
                                  ),
                              ),
                          )}
                        </>
                      ) : (
                        <>
                          {Math.abs(
                            TotalOtherFee(schoolfee?.otherfee) -
                              Number(
                                sendotherfeearray &&
                                  sendotherfeearray?.reduce(
                                    (n, {FeeAmount}) =>
                                      parseFloat(n) + parseFloat(FeeAmount),
                                    0,
                                  ),
                              ),
                          )}
                        </>
                      )}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>
                      {isSwitchOn ? 'Editable' : 'Payable'} Amount
                    </Text>
                    <Text style={styles.datatext}>
                      {sendotherfeearray &&
                        sendotherfeearray?.reduce(
                          (n, {FeeAmount}) =>
                            parseFloat(n) + parseFloat(FeeAmount),
                          0,
                        )}
                    </Text>
                  </View>
                  <View style={styles.cardContent}></View>
                </View>

                <View
                  style={{
                    paddingHorizontal: 20,
                    borderTopWidth: 2,
                    borderTopColor: Colors.primary,
                  }}>
                  <View style={{width: '100%', marginBottom: 6}}>
                    <RNDatePicker
                      title="Pay Date"
                      value={payDate}
                      onDateChange={date => setpayDate(handleDate(date))}
                    />
                  </View>
                </View>
                <View style={styles.titleview}>
                  <Text style={{color: 'white'}}>Mark</Text>
                  <View style={{width: deviceWidth * 0.2}}>
                    <Text style={{color: 'white'}}>Fee_Type</Text>
                  </View>
                  <Text style={{color: 'white'}}>Amount</Text>

                  <Text style={{color: 'white'}}>Status</Text>
                </View>

                {schoolfee?.otherfee
                  ?.sort(compareMonths)
                  ?.map((item, index) => {
                    return (
                      <View key={index} style={styles.Sdataview}>
                        {item?.PaidStatus ? (
                          <>
                            <Checkbox.Android
                              disabled={
                                isSwitchOn === false && item?.PaidStatus
                              }
                              status={item.PaidStatus ? 'checked' : 'unchecked'}
                              onPress={() =>
                                handleCheckboxotherfeearrayToggle(index)
                              }
                            />
                          </>
                        ) : (
                          <>
                            <Checkbox.Android
                              status={
                                isSwitchOn === true
                                  ? item?.PaidStatus
                                    ? 'checked'
                                    : 'unchecked'
                                  : item.checked
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() =>
                                handleCheckboxotherfeearrayToggle(index)
                              }
                            />
                          </>
                        )}

                        <View style={{width: deviceWidth * 0.2}}>
                          <Text>{item?.OtherFeeName}</Text>
                        </View>

                        <Text> {item?.FeeAmount}</Text>

                        <Text>
                          {item?.Discount === true ? (
                            <Text>Discounted</Text>
                          ) : item?.paidStatus === true ? (
                            <Text style={styles.paidtextColor}> Paid</Text>
                          ) : (
                            <Text style={styles.DuestextColor}>Dues</Text>
                          )}
                        </Text>
                      </View>
                    );
                  })}

                <View
                  style={{
                    paddingHorizontal: deviceWidth * 0.05,
                    marginBottom: deviceHeight * 0.07,
                  }}>
                  <RNButton onPress={() => addOtherFee()} loading={loading}>
                    {isSwitchOn ? 'Edit' : 'pay Now'}
                  </RNButton>
                </View>
              </>
            )}
          </>
        ) : (
          <>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'centers',
              }}>
              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Registration"
                  status={feetypeBoolean ? 'checked' : 'unchecked'}
                  onPress={e => {
                    setfeetype(feetypeBoolean ? '' : 'Registration');
                    setfeetypeBoolean(!feetypeBoolean);
                  }}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>
                  Registration Fee ({studentdatais?.regisgrationfee})
                </Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Admissionfee"
                  status={admissionfeeBoolean ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setadmissionfee(admissionfeeBoolean ? '' : 'Admissionfee');
                    setadmissionfeeBoolean(!admissionfeeBoolean);
                  }}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>
                  Admission Fee ({studentdatais?.admissionfee})
                </Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Annual"
                  status={annualfeeBoolean ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setannualfee(annualfeeBoolean ? '' : 'Annual');
                    setannualfeeBoolean(!annualfeeBoolean);
                  }}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>
                  Annual Fee ({studentdatais?.AnnualFee})
                </Text>
              </View>
              <View style={{paddingLeft: 10, paddingBottom: 10}}>
                <Text style={{color: Colors.black, fontWeight: 'bold'}}>
                  Payable Amount (
                  {feetype === 'Registration' &&
                  annualfee === 'Annual' &&
                  admissionfee === 'Admissionfee'
                    ? Number(studentdatais?.regisgrationfee) +
                      Number(studentdatais?.AnnualFee) +
                      Number(studentdatais?.admissionfee)
                    : feetype === 'Registration'
                    ? Number(studentdatais?.regisgrationfee)
                    : annualfee === 'Annual'
                    ? Number(studentdatais?.AnnualFee)
                    : admissionfee === 'Admissionfee'
                    ? Number(studentdatais?.admissionfee)
                    : ''}
                  )
                </Text>
              </View>

              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={styles.MainViewSkip}>
                  <TouchableOpacity onPress={() => submit()}>
                    <View style={styles.skipbtn}>
                      <Text style={{color: 'white'}}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.MainViewSkip}>
                  <TouchableOpacity onPress={() => setskip(true)}>
                    <View style={styles.skipbtn}>
                      <Text style={{color: 'white'}}>Skip</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AddCollectFee;

const styles = StyleSheet.create({
  mainDiscountView: {
    display: 'flex',
    alignItems: 'center',
  },
  MainViewSkip: {
    paddingLeft: deviceWidth * 0.02,
  },
  skipbtn: {
    backgroundColor: primary,
    width: deviceWidth * 0.3,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
  cardContent: {
    width: '30%',
    marginBottom: deviceHeight * 0.01,
  },
  dateview: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  title: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
  },
  datatext: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.black,
  },
  maindelView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: deviceWidth * 0.02,
    marginBottom: 10,
  },
  innearDelView: {
    display: 'flex',
    alignItems: 'center',
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
    color: Colors.black,
    fontWeight: 'bold',
  },
  editFeeView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: deviceWidth * 0.02,
    marginBottom: deviceHeight * 0.01,
  },
  paidtextColor: {
    color: '#06b590',
  },
  DuestextColor: {
    color: '#ff6900',
  },
  mainfeeview: {},
  titleview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: deviceWidth * 0.06,
    paddingVertical: deviceWidth * 0.02,
    backgroundColor: primary,
  },
  Sdataview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: deviceWidth * 0.06,
    paddingVertical: deviceWidth * 0.02,
  },
  payforview: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingVertical: 10,
  },
  inputview: {
    width: Width(360),
    height: Height(50),
    backgroundColor: '#E9EAEC',
    alignSelf: 'center',
    borderRadius: Width(5),
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
  },
  baseinput: {
    width: Width(310),
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
    width: Width(360),
    borderWidth: 1.5,
    // borderColor: index === 7 ? primary : '#a9a9a9',
    alignSelf: 'center',
    borderRadius: Width(5),
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
    width: Width(360),
    height: Height(45),
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
});
