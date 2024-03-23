import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {Height, Width} from '../../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CardEnquiry from './PrintCardCS';
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
} from '../../../redux/action/commanAction';

import {
  GetHostel,
  GetFacility,
  GetCategory,
} from '../../../redux/action/hostelActions';
import {GetRoute} from '../../../redux/action/transportActions';
import {useDispatch, useSelector} from 'react-redux';
import {deviceWidth} from '../../../utils/constant';
import DownloadStudentData from '../../../Component/school/DownloadStudentData';
import StudentFilter from '../../../Component/school/StudentFilter';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import RNPrint from 'react-native-print';
import moment from 'moment';
const PrintCC = ({navigation}) => {
  const dispatch = useDispatch();
  const [Downloading, setDownloading] = useState(false);
  const [printing, setprinting] = useState(false);
  const [isdata, setisdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const {loading, student} = useSelector(state => state.getstudent);
  const {user} = useSelector(state => state.auth);

  const filterIssueCC = () => {
    let filterdata = isdata?.filter(item => item?.CCStatus != 0);
    return filterdata;
  };

  const htmlContent = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            .mainland {
              border: 1px solid #093959;
              width: auto;
              margin-bottom: 2.5%;
              margin: 1%;
              margin-bottom:13%
            }
            .logoicon {
              width: 4rem;
              height: 4rem;
            }
            .logoicon10 {
              width: 3rem;
              height: 3rem;
            }
            .headermain {
              display: flex;
              border-bottom: 3px solid #093959;
            }
      
            .headertext {
              text-align: center;
            }
      
            .headertext p {
              line-height: 1.2rem;
            }
      
            .maininfodiv {
              padding: 0.2rem;
              display: flex;
            }
            .profileicon {
              width: 6rem;
              height: 6rem;
              border-radius: 4px;
            }
            .infodivtext {
              padding-left: 2%;
            }
            .infodivtext p {
              line-height: 1.2rem;
            }
      
            .maininfodiv10 {
              padding: 0.2rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
      
            .headermain10 {
              display: flex;
              border-top: 3px solid #093959;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 0.3rem;
            }
            .maindivvvv {
              display: flex;
            }
          </style>
        </head>
        <body>
          
    
          ${
            isdata &&
            filterIssueCC()
              ?.map(
                data => `
                         <div class="mainland">
                            <div class="headermain">
                              <img
                                class="logoicon"
                                src=${user?.data?.CredentailsData?.logourl}
                                alt="Logo"
                              />
                              <div class="headertext">
                                <p>${
                                  user?.data?.CredentailsData?.institutename
                                }</p>
                                <p>
                                  ${user?.data?.CredentailsData?.address}
                                  ${user?.data?.CredentailsData?.city}
                                  ${user?.data?.CredentailsData?.state} (
                                  ${user?.data?.CredentailsData?.pincode})
                                </p>
                                <p>
                                  PH: ${
                                    user?.data?.CredentailsData?.phoneno1
                                  }&lsquo;
                                  ${
                                    user?.data?.CredentailsData?.phoneno2
                                  }&lsquo;
                                  ${user?.data?.CredentailsData?.email}&lsquo;
                                </p>
                              </div>
                            </div>

                            <div class="coachingtextaddress">
                            <p>
                              This is to certify that Mr/Ms
                              <span class="dynamictext">${data?.name}</span>
                              Son/Daughter of Shree
                              <span class="dynamictext">${
                                data?.fathersName
                              }</span>a student of
                              this Campus has successfully completed the Proficiency
                              Certificate/Bachelor Level of ................ With
                              .............Division in the year.....................and has
                              secured................percent of marks. I know nothing against
                              his/her moral character. His.Her date of birth according to the
                              campus record is
                              <span class="dynamictext">
                                ${moment(data?.DateOfBirth).format(
                                  'DD/MM/YYYY',
                                )}
                              </span>
                              (B.S)...............(A.D)
                            </p>
                          </div>
                          <div class="coachingtextaddress">
                            <p>I wish his/her success in every walk of life</p>
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
      fileName: `CharacterCertificateList`,
      directory: 'Documents',
    };

    const pdf = await RNHTMLtoPDF.convert(options);
    return pdf.filePath;
  };

  const copyToDownloadFolder = async pdfPath => {
    const downloadFolderPath = RNFS.DownloadDirectoryPath;
    const destinationPath = `${downloadFolderPath}/CharacterCertificateList.pdf`;

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
      fileName: `CharacterCertificateList`,
      base64: true,
    });
    if (results) {
      setprinting(false);
      await RNPrint.print({filePath: results.filePath});
    }
  };
  useEffect(() => {
    if (student) {
      setisdata(student);
      setShowModal(false);
    }
  }, [student]);

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
  }, []);

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
                  filterIssueCC()?.map((item, index) => {
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

export default PrintCC;

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
