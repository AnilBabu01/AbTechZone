import {StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../utils/Colors';
import {ActivityIndicator, Modal} from 'react-native-paper';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
const DownloadStudentData = ({visible, hideModal}) => {
  const exportDataToExcel = () => {
    var path = RNFS.DocumentDirectoryPath + '/test.txt';
    let sample_data_to_export = [
      {id: '1', name: 'First User'},
      {id: '2', name: 'Second User'},
    ];

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
    
    // write the file
    RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!',success);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  return (
    <Modal
      visible={visible}
      onDismiss={() => hideModal(false)}
      contentContainerStyle={styles.container}>
      <View style={styles.headerView}>
        <Text style={{color: '#fff'}}>Select Report</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.reportBtn} onPress={() => exportDataToExcel()}>
          <Text style={styles.textBtn}>Export Excel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default DownloadStudentData;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    marginHorizontal: deviceWidth * 0.05,
  },
  buttonContainer: {
    padding: deviceHeight * 0.01,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  reportBtn: {
    backgroundColor: Colors.light3Grey,
    width: '100%',
    paddingVertical: deviceWidth * 0.03,
    borderRadius: 7,
    marginBottom: 10,
    alignItems: 'center',
  },
  textBtn: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.black,
  },
  headerView: {
    backgroundColor: Colors.primary,
    width: '100%',
    alignItems: 'center',
    paddingVertical: deviceHeight * 0.015,
  },
});
