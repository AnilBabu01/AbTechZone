import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import RNSelectInput from '../RNSelectInput';
import RNDatePicker from '../RNDatePicker';
import {Divider} from 'react-native-paper';
import RNButton from '../RNButton';
import {Colors} from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getenquiries,
  getFILTERenquiries,
} from '../../redux/action/coachingAction';
import {handleDate,getTodaysDate} from '../../utils/functions';
const EnquiryFilter = ({showModal, setShowModal}) => {
  const [name, setname] = useState('');
  const [fromdate, setfromdate] = useState(getTodaysDate());
  const [todate, settodate] = useState(getTodaysDate());
  const {container, innerContainer, childContainer, mainContainer} = styles;
  const onSubmit = () => {};
  return (
    <>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={showModal}
        contentContainerStyle={container}>
        <View style={[innerContainer, mainContainer]}>
          <Text
            style={{
              color: Colors.white,
              fontSize: 17,
              fontWeight: '600',
              lineHeight: 20,
            }}>
            Filter
          </Text>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Ionicons name="close" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={[childContainer]}>
          <View
            style={{
              position: 'relative',
              backgroundColor: Colors.white,
            }}>
            <ScrollView
              style={{height: deviceHeight * 0.7}}
              showsVerticalScrollIndicator={false}>
              <View style={styles.rowwrapper}>
                <View style={{width: '49.3%'}}>
                  <RNDatePicker
                    title="From Date"
                    value={fromdate}
                    onDateChange={date => setfromdate(handleDate(date))}
                  />
                </View>
                <View style={{width: '49.3%'}}>
                  <RNDatePicker
                    title="To Date"
                    value={todate}
                    onDateChange={date => settodate(handleDate(date))}
                  />
                </View>
              </View>
            </ScrollView>
            <View style={styles.bottomBtn}>
              <RNButton onPress={onSubmit}>Submit</RNButton>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EnquiryFilter;

const styles = StyleSheet.create({
  bottomBtn: {
    marginBottom: deviceHeight * 0.01,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 30,
    borderRadius: 20,
    position: 'relative',
    zIndex: 9999,
  },
  innerContainer: {
    backgroundColor: Colors.primary,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  childContainer: {
    marginHorizontal: deviceWidth * 0.04,
    marginBottom: deviceWidth * 0.06,
  },

  mainContainer: {
    marginHorizontal: deviceWidth * 0.04,
    marginTop: deviceWidth * 0.04,
  },
  rowwrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: deviceWidth * 0.02,
  },
});
