import {StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import React, {useCallback} from 'react';
import {Colors} from '../../utils/Colors';
import {Modal} from 'react-native-paper';
import {deviceHeight, deviceWidth} from '../../utils/constant';
import RNFS from 'react-native-fs';
import ExcelJS from 'exceljs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

const DownEnquiry = ({visible, hideModal}) => {
  const dataArray = [
    {name: 'John', age: 25, city: 'New York'},
    {name: 'Jane', age: 30, city: 'Los Angeles'},
    // Add more data as needed
  ];

  const createExcelFile = async (dataArray, fileName) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add headers
    const headers = Object.keys(dataArray[0]);
    worksheet.addRow(headers);

    // Add data
    dataArray.forEach(data => {
      const row = [];
      headers.forEach(header => {
        row.push(data[header]);
      });
      worksheet.addRow(row);
    });

    // Save workbook to a file
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}.xlsx`;
    
    await workbook.xlsx.writeFile(filePath);

    return filePath;
  };

  const handleExport = async () => {
    try {
      const fileName = 'exportedData';
      const filePath = await createExcelFile(dataArray, fileName);
      console.log('Excel file created at:', filePath);
      // Add logic to open or share the file if needed
    } catch (error) {
      console.error('Error creating Excel file:', error);
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
        <Pressable style={styles.reportBtn} onPress={() => handleExport()}>
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
