import {ScrollView, StyleSheet, View,Text,TouchableOpacity} from 'react-native';
import React from 'react';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import RNSelectInput from '../RNSelectInput';
import RNDatePicker from '../RNDatePicker';
import {Divider} from 'react-native-paper';
import RNButton from '../RNButton';
import {Colors} from '../../utils/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
const StudentFilter = ({showModal, setShowModal, onSubmit}) => {
  const hide =()=>setShowModal(false)
  return (
    <View>
       <View style={[styles.innerContainer]}>
          <Text
            style={{
              color: Colors.white,
              fontSize: 17,
              fontWeight: '600',
              lineHeight: 20,
            }}>
            Student
          </Text>
          {/* <TouchableOpacity onPress={hide()}>
            <Ionicons name="close" size={22} color={Colors.white} />
          </TouchableOpacity> */}
        </View>
      <View
        style={{
          height: deviceHeight * 0.75,
          position: 'relative',
        }}>
        <ScrollView
          style={{height: deviceHeight * 0.7}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: deviceWidth * 0.04,
              marginTop: deviceHeight * 0.02,
            }}></View>

          <Divider style={{marginVertical: deviceWidth * 0.05}} />
        </ScrollView>
        <View style={styles.bottomBtn}>
          <RNButton onPress={onSubmit}>Submit</RNButton>
        </View>
      </View>
    </View>
  );
};

export default StudentFilter;

const styles = StyleSheet.create({
  bottomBtn: {
    marginBottom: deviceHeight * 0.01,
    width: '100%',
    position: 'absolute',
    bottom: 0,
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
});
