import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import check from '../../../assets/check1.png';
import {primary} from '../../../utils/Colors';
import {Width, Height} from '../../../utils/responsive';
import {useNavigation} from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

const PaymentStatus = ({receiptdata}) => {
  const navigation = useNavigation();

  console.log('receiptdata', receiptdata);

  const DownloadReciept = async () => {
    try {
      const options = {
        html: '<html><body><h1>Hello, world!</h1></body></html>',
        fileName: 'example',
        directory: 'Documents',
      };
      const directoryPath = RNFS.DocumentDirectoryPath + '/Documents';
      if (!RNFS.exists(directoryPath)) {
        RNFS.mkdir(directoryPath);
      }
      const pdf = await RNHTMLtoPDF.convert(options);
      console.log('filede path', pdf.filePath);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={[styles.modal, styles.elevation]}>
        <View style={styles.cancalView}>
          <TouchableOpacity>
            <Image source={check} style={styles.checkstyleimg} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonmodal}>
          <TouchableOpacity
            style={styles.processpatbtn}
            onPress={() => DownloadReciept()}>
            <View>
              <Text style={{color: 'white', fontSize: 16}}>Download</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('FeeCollectSchool')}
            style={styles.okbtn}>
            <View>
              <Text style={{color: 'white', fontSize: 16}}>Ok!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaymentStatus;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '15%',
    paddingBottom: 10,
    height: '25%',
  },
  elevation: {
    shadowColor: '#52006A',
    elevation: 20,
  },
  checkstyleimg: {
    height: 50,
    width: 50,
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
  buttonmodal: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
