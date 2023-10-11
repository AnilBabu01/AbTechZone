import {StyleSheet, Text, View, ActivityIndicator, Modal} from 'react-native';
import React from 'react';
import {primary} from '../../utils/Colors';
const Loader = ({loader, sms}) => {
  return (
    <>
      <Modal animationType={'fade'} transparent={true} visible={loader}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={[styles.modal, styles.elevation]}>
            <View style={styles.mainloader}>
              <ActivityIndicator
                animating={loader}
                color={primary}
                size="large"
                style={styles.activityIndicator}
              />
              <Text style={{fontSize: 17, fontWeight: 700, color: primary}}>
                {sms}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Loader;

const styles = StyleSheet.create({
  mainloader: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  activityIndicator: {
    // justifyContent: 'center',
    // alignItems: 'center',
    marginRight: 15,
  },
  modal: {
    backgroundColor: 'white',
    width: 'auto',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: '50%',
    marginLeft: 20,
    padding: 10,
    alignSelf: 'center',
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
});
