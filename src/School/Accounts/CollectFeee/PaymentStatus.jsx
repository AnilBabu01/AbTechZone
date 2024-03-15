import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import check from '../../../assets/check1.png';
import {primary} from '../../../utils/Colors';
import {Width, Height} from '../../../utils/responsive';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import RNButton from '../../../Component/RNButton';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import RNPrint from 'react-native-print';

const PaymentStatus = ({receiptdata}) => {
  const navigation = useNavigation();
  const [Downloading, setDownloading] = useState(false);
  const [printing, setprinting] = useState(false);
  const [isData, setisData] = useState('');
  const {user} = useSelector(state => state.auth);

  console.log('receiptdata', receiptdata);

  var today = new Date(receiptdata?.PaidDate);
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
              <p>${receiptdata?.ReceiptNo}/p>
            </div>
            <div class="textdivonly">
              <p>Admission No</p>
              <p>${receiptdata?.RollNo}</p>
            </div>
            <div class="textdivonly">
              <p>Student Name</p>
              <p>${receiptdata?.studentName}</p>
            </div>
            <div class="textdivonly">
              <p>Course</p>
              <p>${receiptdata?.Course}</p>
            </div>
  
            <div class="textdivonly10">
              <p>Fee Detail</p>
            </div>
          </div>
          <div class="mainfeedetailsinnear">
            <div class="textdivonly">
              <p>Receipt Date</p>
              <p>${receiptdata} / ${currTime}</p>
            </div>
            <div class="textdivonly">
              <p>Roll No</p>
              <p>${receiptdata?.RollNo}</p>
            </div>
          </div>
        </div>
  
        <div class="receiptNodiv">
          <p>Particulars</p>
          <p>Received Rs ${receiptdata?.PaidAmount}</p>
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
              <p>${receiptdata?.Feetype}</p>
            </div>
            <div class="textdivonly">
              <p>${receiptdata?.RollNo}</p>
            </div>
            <div class="textdivonly">
              <p>Total Amount- ${receiptdata?.PaidAmount}</p>
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
              <p>${receiptdata?.ReceiptNo}</p>
            </div>
            <div class="textdivonly">
              <p>Admission No</p>
              <p>${receiptdata?.RollNo}</p>
            </div>
            <div class="textdivonly">
              <p>Student Name</p>
              <p>${receiptdata?.studentName}</p>
            </div>
            <div class="textdivonly">
              <p>Course</p>
              <p>${receiptdata?.Course}</p>
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
              <p>${receiptdata?.rollnumber}</p>
            </div>
          </div>
        </div>
  
        <div class="receiptNodiv">
          <p>Particulars</p>
          <p>Received Rs ${receiptdata?.PaidAmount}</p>
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
              <p>${receiptdata?.Feetype}</p>
            </div>
            <div class="textdivonly">
              <p>${receiptdata?.RollNo}/p>
            </div>
            <div class="textdivonly">
              <p>Total Amount- ${receiptdata?.PaidAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;

  const convertHtmlToPdf = async html => {
    const options = {
      html,
      fileName: `FeeReceiptNo${receiptdata?.ReceiptNo}`,
      directory: 'Documents',
    };

    const pdf = await RNHTMLtoPDF.convert(options);
    return pdf.filePath;
  };

  const copyToDownloadFolder = async pdfPath => {
    const downloadFolderPath = RNFS.DownloadDirectoryPath;
    const destinationPath = `${downloadFolderPath}/FeeReceiptNo${receiptdata?.ReceiptNo}.pdf`;

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
      fileName: `FeeReceiptNo${receiptdata?.ReceiptNo}`,
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

      const result = await Share.share({
        url: `file://${results.filePath}`,
        message: 'Check out this PDF file!',
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <RNButton onPress={() => handleGeneratePdf()} loading={Downloading}>
              Download
            </RNButton>

            <RNButton onPress={() => handlePrint()} loading={printing}>
              Print
            </RNButton>
            {/* <RNButton onPress={() => handleGeneratePdf()} loading={printing}>
              Share
            </RNButton> */}
          </View>

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
    width: '98%',
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
