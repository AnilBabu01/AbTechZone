import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Share,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../../utils/Colors';
import moment from 'moment';
import {useSelector} from 'react-redux';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import RNPrint from 'react-native-print';

const Card = ({data}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [Downloading, setDownloading] = useState(false);
  const [printing, setprinting] = useState(false);
  const [isData, setisData] = useState('');
  const {user} = useSelector(state => state.auth);

  var today = new Date(data?.PaidDate);
  var options = {year: 'numeric', month: 'short', day: '2-digit'};

  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .mainborderdivinnear10 {
          width: 100%;
          /* background-color: aquamarine; */
          border-bottom: 3px dotted black;
        }
        .mainimgdivre {
          display: flex;
        }
  
        .imgdivre {
          width: 33.3%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
  
        .imgdivre h2 {
          margin-bottom: 0px;
          margin-top: 0px;
          font-size: 20px;
          font-family: Helvetica;
          color: red;
        }
        .imgdivre p {
          margin-bottom: 0px;
          margin-top: 0px;
          font-family: Helvetica;
        }
      .imgdivre img {
       width: 7.1rem;
      height: 7.1rem;
      border-radius: 48%;
      }
        .receiptNodiv {
          border-top: 2px solid black;
          border-bottom: 2px solid black;
          display: flex;
          justify-content: space-around;
        }
  
        .mainfeedetails {
          display: flex;
  
          padding: 0.9rem;
        }
        .mainfeedetailsinnear {
          width: 50%;
        }
  
        .textdivonly {
          display: flex;
          padding-right: 0.5rem;
          padding-left: 0.5rem;
          justify-content: space-between;
        }
        .textdivonly10 {
          padding-right: 0.5rem;
          padding-left: 0.5rem;
        }
  
        .textdivonly p {
          margin-top: 0px;
          margin-bottom: 0px;
        }
      </style>
    </head>
    <body>
      <div class="mainborderdivinnear10">
        <div class="mainimgdivre">
          <div class="imgdivre">
            <img alt="img" src=${user?.data?.CredentailsData?.logourl} />
          </div>
          <div class="imgdivre">
            <h2>${user?.data?.CredentailsData?.institutename}</h2>
            <p>${user?.data?.CredentailsData?.address}</p>
            <p>${user?.data?.CredentailsData?.city}${user?.data?.CredentailsData?.state}</p>
            <p>${user?.data?.CredentailsData?.pincode}</p>
          </div>
          <div class="imgdivre">&nbsp;</div>
        </div>
        <div class="receiptNodiv">
          <p>Fee Receipt</p>
          <p>Office Copy</p>
        </div>
        <div class="mainfeedetails">
          <div class="mainfeedetailsinnear">
            <div class="textdivonly">
              <p>Receipt No</p>
              <p>${data?.ReceiptNo}/p>
            </div>
            <div class="textdivonly">
              <p>Admission No</p>
              <p>${data?.RollNo}</p>
            </div>
            <div class="textdivonly">
              <p>Student Name</p>
              <p>${data?.studentName}</p>
            </div>
            <div class="textdivonly">
              <p>Course</p>
              <p>${data?.Course}</p>
            </div>
  
            <div class="textdivonly10">
              <p>Fee Detail</p>
            </div>
          </div>
          <div class="mainfeedetailsinnear">
            <div class="textdivonly">
              <p>Receipt Date</p>
              <p>${currDate} / ${currTime}</p>
            </div>
            <div class="textdivonly">
              <p>Roll No</p>
              <p>${data?.RollNo}</p>
            </div>
          </div>
        </div>
  
        <div class="receiptNodiv">
          <p>Particulars</p>
          <p>Received Rs ${data?.PaidAmount}</p>
        </div>
        <div class="mainfeedetails">
          <div class="mainfeedetailsinnear">
            <div class="textdivonly">
              <p>Receipt Type</p>
            </div>
            <div class="textdivonly">
              <p>Admission No</p>
            </div>
          </div>
          <div class="mainfeedetailsinnear">
            <div class="textdivonly">
              <p>${data?.Feetype}</p>
            </div>
            <div class="textdivonly">
              <p>${data?.RollNo}</p>
            </div>
            <div class="textdivonly">
              <p>Total Amount- ${data?.PaidAmount}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mainborderdivinnear">
      <div class="mainimgdivre">
      <div class="imgdivre">
        <img alt="img" src=${user?.data?.CredentailsData?.logourl} />
      </div>
      <div class="imgdivre">
        <h2>${user?.data?.CredentailsData?.institutename}</h2>
        <p>${user?.data?.CredentailsData?.address}</p>
        <p>${user?.data?.CredentailsData?.city}${user?.data?.CredentailsData?.state}</p>
        <p>${user?.data?.CredentailsData?.pincode}</p>
      </div>
      <div class="imgdivre">&nbsp;</div>
       </div>
        <div class="receiptNodiv">
          <p>Fee Receipt</p>
          <p>Student Copy</p>
        </div>
        <div class="mainfeedetails">
          <div class="mainfeedetailsinnear">
            <div class="textdivonly">
              <p>Receipt No</p>
              <p>${data?.ReceiptNo}</p>
            </div>
            <div class="textdivonly">
              <p>Admission No</p>
              <p>${data?.RollNo}</p>
            </div>
            <div class="textdivonly">
              <p>Student Name</p>
              <p>${data?.studentName}</p>
            </div>
            <div class="textdivonly">
              <p>Course</p>
              <p>${data?.Course}</p>
            </div>
  
            <div class="textdivonly10">
              <p>Fee Detail</p>
            </div>
          </div>
          <div class="mainfeedetailsinnear">
            <div class="textdivonly">
              <p>Receipt Date</p>
              <p>${currDate}/${currTime}</p>
            </div>
            <div class="textdivonly">
              <p>Roll No</p>
              <p>${data?.rollnumber}</p>
            </div>
          </div>
        </div>
  
        <div class="receiptNodiv">
          <p>Particulars</p>
          <p>Received Rs ${data?.PaidAmount}</p>
        </div>
        <div class="mainfeedetails">
          <div class="mainfeedetailsinnear">
            <div class="textdivonly">
              <p>Receipt Type</p>
            </div>
            <div class="textdivonly">
              <p>Admission No</p>
            </div>
          </div>
          <div class="mainfeedetailsinnear">
            <div class="textdivonly">
              <p>${data?.Feetype}</p>
            </div>
            <div class="textdivonly">
              <p>${data?.RollNo}</p>
            </div>
            <div class="textdivonly">
              <p>Total Amount- ${data?.PaidAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;

  useEffect(() => {
    if (route.params?.data) {
      setisData(route.params?.data);
    }
  }, []);

  const convertHtmlToPdf = async html => {
    const options = {
      html,
      fileName: `FeeReceiptNo${data?.ReceiptNo}`,
      directory: 'Documents',
    };

    const pdf = await RNHTMLtoPDF.convert(options);
    return pdf.filePath;
  };

  const copyToDownloadFolder = async pdfPath => {
    const downloadFolderPath = RNFS.DownloadDirectoryPath;
    const destinationPath = `${downloadFolderPath}/FeeReceiptNo${data?.ReceiptNo}.pdf`;

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
      html: htmlContent,
      fileName: `FeeReceiptNo${data?.ReceiptNo}`,
      base64: true,
    });
    if (results) {
      setprinting(false);
      await RNPrint.print({filePath: results.filePath});
    }
  };

  const sharePDF = async () => {
    try {
      const pdfPath = await convertHtmlToPdf(htmlContent);

      console.log('receipt is ', pdfPath);

      const result = await Share.share({
        url: `file://${pdfPath}`,
        message: 'Your Fee Receipt!',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing PDF:', error.message);
    }
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.name}>Name : {data?.studentName}</Text>
          <Text style={styles.name}>Roll Number: {data?.RollNo}</Text>
          <Text style={styles.name}>
            SR No: <Text style={styles.rollNumber}> {data?.SNO}</Text>
          </Text>
          <Text style={styles.name}>Amount: {data?.PaidAmount}</Text>
          <Text style={styles.name}>
            Receipt No:
            <Text style={styles.rollNumber}> {data?.ReceiptNo}</Text>
          </Text>
          <Text style={styles.name}>
            Paid Date: {moment(data?.PaidDate).format('DD/MM/YYYY')}
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

export default Card;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
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
