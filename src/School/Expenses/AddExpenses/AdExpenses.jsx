import {StyleSheet, View, ScrollView, TextInput, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import {GetRoom} from '../../../redux/action/hostelActions';
import {useDispatch, useSelector} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import RNInputField from '../../../Component/RNInputField';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {FlexRowWrapper} from '../../../Component/FlexRowWrapper';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {GetExpenses} from '../../../redux/action/expensesActions';
import {handleDate, getTodaysDate} from '../../../utils/functions';
import RNDatePicker from '../../../Component/RNDatePicker';
import {RadioButton} from 'react-native-paper';
const expensesTypeList = [
  {label: 'Cleaning Expenses', value: 'Cleaning Expenses'},
  {label: 'Office Expenses', value: 'Office Expenses'},
  {label: 'Advertisement Expenses', value: 'Advertisement Expenses'},
  {label: 'Sundry Expenses', value: 'Sundry Expenses'},
  {label: 'Study Materal', value: 'Study Materal'},
  {label: 'Games Expenses', value: 'Games Expenses'},
  {label: 'Building Rent', value: 'Building Rent'},
  {label: 'Prantiya Nidhi', value: 'Prantiya Nidhi'},
  {label: 'Library Expenses', value: 'Library Expenses'},
  {label: 'Examination Expenses', value: 'Examination Expenses'},
  {label: 'Computer Expenses', value: 'Computer Expenses'},
  {
    label: 'Electricity And Water Expenses',
    value: 'Electricity And Water Expenses',
  },
  {label: "Employee's Salary", value: "Employee's Salary"},
  {label: 'Telephone Expenses', value: 'Telephone Expenses'},
  {label: 'Vehicle Expenses', value: 'Vehicle Expenses'},
  {label: 'Science Expenses', value: 'Science Expenses'},
  {label: 'Festival Expenses', value: 'Festival Expenses'},
  {label: "Teacher's Prize Expenses", value: "Teacher's Prize Expenses"},
  {label: "Student's Prize Expenses", value: "Student's Prize Expenses"},
  {label: 'Canteen Expenses', value: 'Canteen Expenses'},
  {label: 'Building Maintenanace', value: 'Building Maintenanace'},
  {label: 'Donate Expenses', value: 'Donate Expenses'},
  {label: 'Competition Expenses', value: 'Competition Expenses'},
  {label: 'Diesel Expenses', value: 'Diesel Expenses'},
  {label: 'Medical Expenses', value: 'Medical Expenses'},
  {label: 'Assets', value: 'Assets'},
  {label: 'Liability', value: 'Liability'},
  {label: 'OthersExpenses', value: 'OthersExpenses'},
];
const AdExpenses = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loader, setloader] = useState(false);
  const [PayOption, setPayOption] = useState('Cash');
  const [addDate, setaddDate] = useState(getTodaysDate());
  const [Expensestype, setExpensestype] = useState('');
  const [expenseslist, setexpenseslist] = useState([]);
  const [ExpensesAmount, setExpensesAmount] = useState('');
  const [Comment, setComment] = useState('');

  const {expensestype} = useSelector(state => state.GetExpensesType);

  const submit = () => {
    setloader(true);

    const data = {
      addDate: addDate,
      Expensestype: Expensestype,
      ExpensesAmount: ExpensesAmount,
      Comment: Comment,
      PayOption: Expensestype === 'Liability' ? 'Dues' : PayOption,
    };
    serverInstance('expenses/addexpenses', 'post', data).then(res => {
      if (res?.status) {
        setloader(false);

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        dispatch(GetExpenses());
        navigation.goBack();
      }

      if (res?.status === false) {
        setloader(false);

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });
        dispatch(GetExpenses());
      }
    });
  };

  return (
    <View>
      <BackHeader title={'Add Expenses'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <View style={styles.editFeeView}>
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
            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <View style={{marginHorizontal: deviceWidth * 0.01}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '600', lineHeight: 19}}>
                    Payment_Out_Type
                  </Text>
                  <Dropdown
                    style={styles.dropstyle}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={expensesTypeList}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Please Select"
                    searchPlaceholder="Search..."
                    value={Expensestype}
                    onChange={item => {
                      setExpensestype(item.value);
                    }}
                  />
                </View>
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNDatePicker
                  title="Add Date"
                  value={addDate}
                  onDateChange={date => setaddDate(handleDate(date))}
                />
              </View>
            </FlexRowWrapper>

            <FlexRowWrapper>
              <View style={{width: '95%'}}>
                <RNInputField
                  label="Amount"
                  placeholder="Enter Amount"
                  value={ExpensesAmount}
                  onChangeText={data => setExpensesAmount(data)}
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
                {Comment.length} / 500
              </Text>
              <RNInputField
                label="Comment"
                placeholder="Enter Comment"
                value={Comment}
                onChangeText={data => setComment(data)}
                style={{backgroundColor: Colors.fadeGray, paddingTop: 10}}
                multiline
                numberOfLines={5}
                maxLength={500}
              />
            </View>
          </View>

          <RNButton
            loading={loader}
            onPress={submit}
            style={{marginHorizontal: 20, marginTop: 20}}>
            Save & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdExpenses;

const styles = StyleSheet.create({
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
  editFeeView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: deviceWidth * 0.02,
    marginBottom: deviceHeight * 0.01,
  },
  enquirymainview: {
    paddingTop: deviceHeight * 0.01,
  },
  dropstyle: {
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
});
