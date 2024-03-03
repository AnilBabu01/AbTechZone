import {StyleSheet, View, ScrollView, Text, Pressable} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import BackHeader from '../../../Component/Header/BackHeader';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../../utils/Colors';
import moment from 'moment';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import RNPrint from 'react-native-print';
import Share from 'react-native-share';
const FeeReceipt = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [Downloading, setDownloading] = useState(false);
  const [printing, setprinting] = useState(false);
  const [isData, setisData] = useState('');

  console.log('isData', isData);

  useEffect(() => {
    if (route.params?.data) {
      setisData(route.params?.data);
    }
  }, []);

  const convertHtmlToPdf = async html => {
    const options = {
      html,
      fileName: 'FeeReceipt',
      directory: 'Documents',
    };

    const pdf = await RNHTMLtoPDF.convert(options);
    return pdf.filePath;
  };

  const copyToDownloadFolder = async pdfPath => {
    const downloadFolderPath = RNFS.DownloadDirectoryPath;
    const destinationPath = `${downloadFolderPath}/FeeReceipt.pdf`;

    await RNFS.copyFile(pdfPath, destinationPath);
    return destinationPath;
  };

  const showPdfPopup = filePath => {
    FileViewer.open(filePath)
      .then(res => {
        console.log(res);
        setDownloading(false);
      })
      .catch(e => console.log('Error', e))
      .finally(() => {
        return true;
      });
  };

  const handleGeneratePdf = useCallback(async () => {
    const htmlContent = '<h1>Hello, this is your HTML content</h1>';

    setDownloading(true);
    try {
      const pdfPath = await convertHtmlToPdf(htmlContent);
      const destinationPath = await copyToDownloadFolder(pdfPath);
      await showPdfPopup(destinationPath);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }, []);

  const handlePrint = async () => {
    setprinting(true);
    const results = await RNHTMLtoPDF.convert({
      html: '<h1>Custom converted PDF Document</h1>',
      fileName: 'FeeReceipt',
      base64: true,
    });
    if (results) {
      setprinting(false);
      await RNPrint.print({filePath: results.filePath});
    }
  };

  const sharePDF = async () => {
    try {
      const results = await RNHTMLtoPDF.convert({
        html: '<h1>Custom converted PDF Document</h1>',
        fileName: 'FeeReceipt',
        base64: true,
      });

      console.log('share filepath is', results);
      
      if (results) {
        const shareOptions = {
          title: 'Share PDF via',
          url: `${results.filePath}`,
          social: Share.Social.WHATSAPP,
        };

        try {
          await Share.shareSingle(shareOptions);
        } catch (error) {
          console.error(error.message);
        }
      }
    } catch (error) {
      console.error('Error sharing PDF:', error.message);
    }
  };

  return (
    <View>
      <BackHeader title={'Print Fee Receipt'} />
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.name}>Name : {isData?.studentName}</Text>
          <Text style={styles.name}>Roll Number: {isData?.RollNo}</Text>
          <Text style={styles.name}>
            SR No: <Text style={styles.rollNumber}> {isData?.SNO}</Text>
          </Text>
          <Text style={styles.name}>Amount: {isData?.PaidAmount}</Text>
          <Text style={styles.name}>
            Receipt No:
            <Text style={styles.rollNumber}> {isData?.ReceiptNo}</Text>
          </Text>
          <Text style={styles.name}>
            Paid Date: {moment(isData?.PaidDate).format('DD/MM/YYYY')}
          </Text>
          <View style={styles.mainbtn}>
            <Pressable onPress={() => handleGeneratePdf()}>
              <FontAwesome6 name="download" color={Colors.primary} size={25} />
            </Pressable>
            <Pressable onPress={() => handlePrint()}>
              <FontAwesome6 name="print" color={Colors.primary} size={25} />
            </Pressable>
            {/* <Pressable onPress={() => sharePDF()}>
              <FontAwesome6
                name="share-nodes"
                color={Colors.primary}
                size={25}
              />
            </Pressable> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FeeReceipt;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rollNumber: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  grade: {
    marginTop: 8,
    fontSize: 16,
  },
  mainbtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    width: '30%',
  },
});
