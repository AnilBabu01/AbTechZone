import {StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {Modal} from 'react-native-paper';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Toast from 'react-native-toast-message';
const DownEnquiry = ({visible, hideModal, filename, enquiry}) => {
  const createAndSaveExcelFile = async () => {
    try {
      // Create a worksheet object
      const ws = XLSX.utils.json_to_sheet(enquiry);

      // Create a workbook object
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

      // Generate Excel file data
      const excelData = XLSX.write(wb, {bookType: 'xlsx', type: 'base64'});

      // Create a file path in the download folder
      const downloadPath = RNFS.DownloadDirectoryPath + `/${filename}.xlsx`;

      // Write the file to the download folder
      RNFS.writeFile(downloadPath, excelData, 'base64')
        .then(response => {
          hideModal(false);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Download File Successlly!!',
          });
        })
        .catch(err => {
          console.log('Download error:', err);
        });

      console.log('Excel file created and saved:', downloadPath);
    } catch (error) {
      console.error('Error creating or saving Excel file:', error);
    }
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
        <Pressable
          style={styles.reportBtn}
          onPress={() => createAndSaveExcelFile()}>
          <Text style={styles.textBtn}>Export Excel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default DownEnquiry;

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
