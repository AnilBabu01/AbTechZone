import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {primary} from '../../../utils/Colors';
import AddEnquiry from './AddBatch';
import BatchCard from './BatchCard';
import {getbatch} from '../../../redux/action/commanAction';
import {useDispatch, useSelector} from 'react-redux';
const Batch = ({navigation}) => {
  const dispatch = useDispatch();
  const [openModel, setopenModel] = useState(false);
  const [batchlist, setbatchlist] = useState('');
  const {batch} = useSelector(state => state.getbatch);

  useEffect(() => {
    dispatch(getbatch());
  }, []);

  useEffect(() => {
    if (batch) {
      setbatchlist(batch);
    }
  }, [batch]);

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
      {/* <Header /> */}
      {/* <TouchableOpacity
          onPress={() => navigation.navigate('SearchEnquiryCoaching')}>
          <View style={styles.inputview}>
            <View style={styles.inputsaerch}>
              <Text style={styles.searchtext}>Search here</Text>
            </View>
            <Ionicons
              name="search-outline"
              size={Height(22)}
              style={{marginRight: Width(20)}}
              color="rgba(0, 0, 0, 0.5)"
            />
          </View>
        </TouchableOpacity> */}

      <View style={styles.loginbtndiv}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddBatchCoaching')}>
          <View style={styles.loginbtn}>
            <Text style={styles.logintextstyle}>Add Batch Time</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.enquirymainview}>
          {batchlist &&
            batchlist?.map((item, index) => {
              return <BatchCard key={index} data={item} index={index} />;
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Batch;

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
    marginBottom: 50,
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
