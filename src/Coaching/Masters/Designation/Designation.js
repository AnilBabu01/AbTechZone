import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Height, Width} from '../../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../Component/Header/Header';
import {primary} from '../../../utils/Colors';
import AddEnquiry from './AddDesignation';
import BatchCard from './DesignationCard';
const Designation = ({navigation}) => {
  const [openModel, setopenModel] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <View>
      <Modal animationType={'fade'} transparent={true} visible={openModel}>
        <View style={[styles.modal, styles.elevation]}>
          <View style={styles.cancalView}>
            <Text style={styles.canceltext} onPress={() => setopenModel(false)}>
              <Ionicons name="close-outline" size={40} />
            </Text>
          </View>
          <AddEnquiry />
        </View>
      </Modal>

      <View style={styles.loginbtndiv}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddDesignationCoaching')}>
          <View style={styles.loginbtn}>
            <Text style={styles.logintextstyle}>Add Designation</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.enquirymainview}>
          <BatchCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default Designation;

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
    paddingHorizontal: 10,
  },

  loginbtndiv: {
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  loginbtn: {
    width: Width(150),
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
});
