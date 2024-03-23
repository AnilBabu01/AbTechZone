import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {Height, Width} from '../../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CardEnquiry from './PrintCard';
import {primary, Colors} from '../../../utils/Colors';
import {
  getcourse,
  getbatch,
  getstudent,
  getfee,
  getcategory,
  GetSession,
  GetSection,
  getcurrentsession,
  getTC,
} from '../../../redux/action/commanAction';

import {
  GetHostel,
  GetFacility,
  GetCategory,
} from '../../../redux/action/hostelActions';
import {GetRoute} from '../../../redux/action/transportActions';
import {useDispatch, useSelector} from 'react-redux';
import {deviceWidth} from '../../../utils/constant';
import DownloadStudentData from '../../../Component/school/DownloadExcel';
import StudentFilter from '../../../Component/school/FilterTC';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import RNPrint from 'react-native-print';

const PrintTc = ({navigation}) => {
  const dispatch = useDispatch();
  const [isdata, setisdata] = useState([]);
  const [Downloading, setDownloading] = useState(false);
  const [printing, setprinting] = useState(false);
  const [isData, setisData] = useState('');
  const [Tabledata, setTabledata] = useState([]);
  const [viewdata, setviewdata] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const [organizationdata, setorganizationdata] = useState('');
  const {student} = useSelector(state => state.getstudent);
  const {TcList, loading} = useSelector(state => state.getTCList);
  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getcourse());
    dispatch(getbatch());
    dispatch(getstudent());
    dispatch(getfee());
    dispatch(getcategory());
    dispatch(GetSession());
    dispatch(GetSection());
    dispatch(getcurrentsession());
    dispatch(GetHostel());
    dispatch(GetFacility());
    dispatch(GetCategory());
    dispatch(GetRoute());
    dispatch(getTC());
  }, []);

  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .TCMainTop {
          padding: 1%;
        }
  
        .TCMain {
          padding-top: 4%;
          border: 2px solid black;
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
        .imgdivre img {
          width: 5.1rem;
          height: 5.1rem;
          border-radius: 48%;
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
  
        .mantextSchool {
          text-align: center;
        }
  
        .transtextmain {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .transtextInnear {
          background-color: #044e7c;
          padding-left: 1%;
          padding-right: 1%;
          border-radius: 5px;
        }
        .transtextInnear p {
          color: yellow;
          font-weight: 500;
          font-family: Helvetica;
        }
  
        .TCNoDiv {
          display: flex;
          justify-content: space-between;
          /* justify-items: inherit; */
          padding-left: 1%;
          margin-top: 1%;
          padding-right: 1%;
          padding-bottom: 1%;
        }
  
        .maintopTextdiv {
          width: 32%;
          display: flex;
          align-items: center;
        }
        .coachingtextaddress {
          /* text-align: center; */
          padding-left: 1%;
          padding-right: 1%;
          margin-top: 3%;
        }
        .coachingtextaddress p {
          /* line-height: 3rem; */
        }
        .innearTcOption {
          margin-bottom: 0.6%;
        }
  
        .lebel1 {
          width: 13%;
        }
        .signaturemain {
          display: flex;
          justify-content: space-between;
          padding-left: 1%;
          padding-right: 1%;
          padding-top: 10%;
        }
        .signaturemainInnear {
          border-top: 2px solid #044e7c;
        }
      </style>
    </head>
    <body>
    ${
      isdata &&
      isdata
        ?.map(
          data => `
    <div class="TCMainTop">
    <div class="TCMain">
      <div class="mainimgdivre">
        <div class="imgdivre">
          <img alt="img" src=${user?.data?.CredentailsData?.logourl} />
        </div>
        <div class="mantextSchool">
          <h2>${user?.data?.CredentailsData?.institutename}</h2>
          <p>${user?.data?.CredentailsData?.address}</p>
          <p>${user?.data?.CredentailsData?.city} ${user?.data?.CredentailsData?.state}</p>
          <p>${user?.data?.CredentailsData?.pincode}</p>
        </div>
      </div>
      <div class="transtextmain">
        <div class="transtextInnear">
          <p>TRANSFER CERTIFICATE</p>
        </div>
      </div>
      <div class="TCNoDiv">
        <div class="maintopTextdiv">
          <label>File No</label> &nbsp; : &nbsp; ${data?.fileNo}
        </div>
        <div class="maintopTextdiv">
          <label>T.C No </label> &nbsp; : &nbsp; ${data?.TcNo}
        </div>

        <p>Sr Number (Admission No) ${data?.SrNo}</p>
      </div>
      <div class="coachingtextaddress">
        <div class="innearTcOption">
          <label class="lebel1">1. Name of Student</label>
          &nbsp; : &nbsp; ${data?.NameofStudent}
        </div>

        <div class="innearTcOption">
          <label class="lebel1"> 2. Name of Father&apos;s Name </label>
          &nbsp; : &nbsp; ${data?.FathersName}
        </div>

        <div class="innearTcOption">
          <label class="lebel1"> 3.Name of Mother&apos;s Name </label>
          &nbsp; : &nbsp; ${data?.MothersName}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">4.Residential Address</label>
          &nbsp; : &nbsp; ${data?.Address}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">5.Aadhar Number</label>
          &nbsp; : &nbsp; ${data?.AadharNumber}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">
            6. Nationality &nbsp; : &nbsp; ${data?.Nationality} Religion &
            Community &nbsp; : &nbsp; ${data?.Religion}
          </label>
          &nbsp; : &nbsp; ${data?.DateofFirst}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">
            7. Date of First admission in the school with class
          </label>
          &nbsp; : &nbsp; ${data?.DateofFirst}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">
            8. Date of Birth-accoding to Admission Register (in figures). (In
            words)
          </label>
          &nbsp; : &nbsp; ${data?.DateofBirth}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">
            10. Class in Which the Student last studied (in figures). ...In
            words
          </label>
          &nbsp; : &nbsp; ${data?.ClassinWhich}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">
            10. Whether failed, if so once/twice in the same class
          </label>
          &nbsp; : &nbsp; ${data?.WhetherfailedinClass}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">11. Subjects studied</label>
          &nbsp; : &nbsp; ${data?.Subjectsstudied}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">
            12. Whether qualified for promotion to the higher class
          </label>
          &nbsp; : &nbsp; ${data?.qualifiedforpromotion}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">
            If so to which class (in figures).. ..(In words)
          </label>
          &nbsp; : &nbsp; ${data?.Whetherqualified}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">
            13.Whether the Student has paid all the dues to the school
          </label>
          &nbsp; : &nbsp; ${data?.paidallthedues}
        </div>

        <div class="innearTcOption">
          <label class="lebel1"> 14. Total Number of working days </label>
          &nbsp; : &nbsp; ${data?.workingdays}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">
            15.Total Number of working days present
          </label>
          &nbsp; : &nbsp; ${data?.workingdayspresent}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">16. General Conduct</label>
          &nbsp; : &nbsp; ${data?.GeneralConduct}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">
            17.Date of application for certificate
          </label>
          &nbsp; : &nbsp; ${data?.Dateofapplication}
        </div>

        <div class="innearTcOption">
          <label class="lebel1"> 18. Date of Issue of Certificate </label>
          &nbsp; : &nbsp; ${data?.DateofIssue}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">
            110.Reason for leaving the school
          </label>
          &nbsp; : &nbsp; ${data?.Reasonforleaving}
        </div>

        <div class="innearTcOption">
          <label class="lebel1">20. Any others</label>
          &nbsp; : &nbsp; ${data?.Anyothers}
        </div>
      </div>

      <div class="signaturemain">
        <div class="signaturemainInnear">
          <p>PREPARED BY</p>
        </div>
        <div class="signaturemainInnear">
          <p>CHECKED BY</p>
        </div>
        <div class="signaturemainInnear">
          <p>PRINCIPAL</p>
        </div>
      </div>
    </div>
  </div>
    `,
        )
        .join('')
    }

     
    </body>
  </html>
  `;

  const convertHtmlToPdf = async html => {
    const options = {
      html,
      fileName: `TC`,
      directory: 'Documents',
    };

    const pdf = await RNHTMLtoPDF.convert(options);
    return pdf.filePath;
  };

  const copyToDownloadFolder = async pdfPath => {
    const downloadFolderPath = RNFS.DownloadDirectoryPath;
    const destinationPath = `${downloadFolderPath}/TC.pdf`;

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
      fileName: `TC`,
      base64: true,
    });
    if (results) {
      setprinting(false);
      await RNPrint.print({filePath: results.filePath});
    }
  };

  useEffect(() => {
    if (TcList) {
      setisdata(TcList);
      setShowModal(false);
    }
    if (user) {
      setorganizationdata(user);
    }
  }, [TcList, user]);

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.headerTitleContainer}>
          <View>
            <Text style={styles.secondaryTitle}>Id Card Management</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Pressable
              onPress={() => handleGeneratePdf()}
              style={styles.filterBtnContainer}>
              <FontAwesome6 name="download" color={Colors.primary} size={25} />
            </Pressable>
            <Pressable
              onPress={() => handlePrint()}
              style={styles.filterBtnContainer}>
              <FontAwesome6 name="print" color={Colors.primary} size={25} />
            </Pressable>
            <Pressable
              onPress={() => setShowModal(true)}
              style={styles.filterBtnContainer}>
              <Ionicons name="filter" color={Colors.primary} size={25} />
            </Pressable>
          </View>
        </View>

        <ScrollView>
          {loading ? (
            <>
              <View style={styles.loaderCenter}>
                <ActivityIndicator
                  size="large"
                  animating={true}
                  color={MD2Colors.red800}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.enquirymainview}>
                {isdata?.length > 0 &&
                  isdata?.map((item, index) => {
                    return <CardEnquiry key={index} data={item} />;
                  })}
              </View>
            </>
          )}
        </ScrollView>
        {showModal && (
          <>
            <StudentFilter setShowModal={setShowModal} showModal={showModal} />
          </>
        )}

        <DownloadStudentData
          visible={showDocOptions}
          hideModal={setShowDocOptions}
          enquiry={isdata}
          filename={'TCList'}
        />

        {/* <AnimatedFAB
            icon={'plus'}
            onPress={() => navigation.navigate('AddStudent')}
            label="Add"
            extended={false}
            color={Colors.white}
            style={styles.fabStyle}
          /> */}
      </View>
    </>
  );
};

export default PrintTc;

const styles = StyleSheet.create({
  dateview: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  inputview: {
    width: Width(360),
    height: Height(50),
    backgroundColor: '#E9EAEC',
    alignSelf: 'center',
    borderRadius: Width(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Height(10),
  },
  inputsaerch: {
    paddingLeft: Width(30),
    fontFamily: 'Gilroy-SemiBold',
    color: 'black',
    fontSize: Height(16),
    width: Width(260),
  },
  enquirymainview: {
    paddingHorizontal: 10,
  },

  searchtext: {
    fontSize: 20,
  },

  cancalView: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  baseinput: {
    width: Width(310),
    height: Height(45),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Width(10),
    // borderColor: index === 3 ? primary: '#a9a9a9',
    marginTop: Height(10),
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    backgroundColor: primary,
  },
  headerTitleContainer: {
    backgroundColor: Colors.fadeGray,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondaryTitle: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    color: Colors.primary,
  },
  accordionTitle: {
    color: Colors.primary,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20,
  },
  filterBtnContainer: {
    padding: 2,
    borderRadius: 10,
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 1,
    marginVertical: 300,
    borderRadius: 20,
    position: 'relative',
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
    marginTop: deviceWidth * 0.045,
    marginBottom: deviceWidth * 0.06,
  },
  loaderCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '50%',
  },
});
