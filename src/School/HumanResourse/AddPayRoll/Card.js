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

const Card = ({allDetails}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [Downloading, setDownloading] = useState(false);
  const [printing, setprinting] = useState(false);
  const [isData, setisData] = useState('');
  const {user} = useSelector(state => state.auth);

  const totalopen = () => {
    let count = 0;
    let monthno = Number(new Date().getMonth()) + 1;
    console.log(
      'Print data is total',
      allDetails?.attendance[0]?.monthNumber,
      monthno,
    );

    if (
      Number(allDetails?.attendance[0]?.monthNumber) ===
      Number(new Date().getMonth())
    ) {
      allDetails?.attendance
        ?.slice(0, Number(new Date()?.toISOString().substring(8, 10)))
        ?.filter(item => {
          if (
            item?.attendaceStatusIntext === 'Present' ||
            item?.attendaceStatusIntext === 'Absent' ||
            item?.attendaceStatusIntext === 'Present Half'
          ) {
            count = count + 1;
          }
        });
    } else {
      allDetails?.attendance?.filter(item => {
        if (
          item?.attendaceStatusIntext === 'Present' ||
          item?.attendaceStatusIntext === 'Absent' ||
          item?.attendaceStatusIntext === 'Present Half'
        ) {
          count = count + 1;
        }
      });
    }

    return count;
  };

  const totalpresent = () => {
    let count = 0;
    (allDetails &&
    allDetails?.attendance[0]?.monthNumber === Number(new Date().getMonth())
      ? allDetails?.attendance?.slice(
          0,
          Number(new Date()?.toISOString().substring(8, 10)),
        )
      : allDetails?.attendance
    )?.filter(item => {
      if (
        item?.attendaceStatusIntext === 'Present' ||
        item?.attendaceStatusIntext === 'Present Half'
      ) {
        count = count + 1;
      }
    });

    return count;
  };

  const totalabsent = () => {
    let count = 0;
    (allDetails &&
    allDetails?.attendance[0]?.monthNumber === Number(new Date().getMonth())
      ? allDetails?.attendance?.slice(
          0,
          Number(new Date()?.toISOString().substring(8, 10)),
        )
      : allDetails?.attendance
    )?.filter(item => {
      if (item?.attendaceStatusIntext === 'Absent') {
        count = count + 1;
      }
    });

    return count;
  };

  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .mainslipdivtop {
          /* padding: 5%; */
          /* padding-left: 15%;
          padding-right: 15%; */
        }
        .salarySlipMain {
          border: 1px solid #093959;
          position: relative;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          padding-bottom: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
  
        .salarySlipHeader {
          border-bottom: 1px solid #093959;
          margin-bottom: 1rem;
          text-align: center;
          padding-bottom: 1%;
        }
        .salarySlippersonal {
          border-bottom: 1px solid #093959;
          margin-bottom: 1rem;
          padding-left: 1%;
          padding-bottom: 1%;
        }
  
        .tabletablemain {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 1rem;
          color: black;
        }
  
        .tableth {
          border: 1px solid #093959;
          text-align: center;
          padding: 8px;
        }
        .tabletd {
          border: 1px solid #093959;
          text-align: center;
          padding: 8px;
          border: 1px solid #dddddd;
          text-align: center;
          padding: 8px;
          background-color: #06b590;
          color: white;
        }
        .overlaydiv {
          width: 100%;
          padding: 1rem;
        }
      </style>
    </head>
    <body>
      <div class="mainslipdivtop">
        <div class="salarySlipMain">
          <div class="overlaydiv">
            <div class="salarySlipHeader">
              <h2>${user?.data?.CredentailsData?.institutename}</h2>
              <p>${user?.data?.CredentailsData?.address}</p>
              <p>
                ${user?.data?.CredentailsData?.city}
                ${user?.data?.CredentailsData?.state}
              </p>
              <p>{user?.data?.CredentailsData?.pincode}</p>
            </div>
            <div class="salarySlippersonal">
              <p>Employee Id : ${allDetails?.monthdetials?.OrEmpId}</p>
              <p>Employee Name : ${allDetails?.monthdetials?.name}</p>
              <p>Designation : ${allDetails?.monthdetials?.employeeof}</p>
            </div>
            <div>
              <p>Salary Details</p>
              <table class="tabletablemain">
                <tbody>
                  <tr class="tabletr">
                    <th class="tableth">Earnings</th>
                    <th class="tableth">Amount</th>
                    <th class="tableth">Deduction</th>
                    <th class="tableth">Amount</th>
                  </tr>
                  <tr class="tabletr">
                    <td class="tableth">Basic</td>
                    <td class="tableth">
                      ${allDetails?.monthdetials?.basicsalary}
                    </td>
                    <td class="tableth">
                      ${allDetails?.monthdetials?.Deduction1}
                    </td>
                    <td class="tableth">
                      ${allDetails?.monthdetials?.DeductionAmount1}
                    </td>
                  </tr>
                 
                        <tr class="tabletr">
                          <td class="tableth">
                            ${allDetails?.monthdetials?.Allowance1}
                          </td>
                          <td class="tableth">
                            ${allDetails?.monthdetials?.AllowanceAmount1}
                          </td>
                          <td class="tableth">
                            ${allDetails?.monthdetials?.Deduction2}
                          </td>
                          <td class="tableth">
                            ${allDetails?.monthdetials?.DeductionAmount2}
                          </td>
                        </tr>
                  
                              <tr class="tabletr">
                                <td class="tableth">
                                  ${allDetails?.monthdetials?.Allowance2}
                                </td>
                                <td class="tableth">
                                  ${allDetails?.monthdetials?.AllowanceAmount2}
                                </td>

                                <td class="tableth">&nbsp;</td>
                                <td class="tableth">&nbsp;</td>
                              </tr>
                   
                      
                              <tr class="tabletr">
                                <td class="tableth">
                                  ${allDetails?.monthdetials?.Allowance3}
                                </td>
                                <td class="tableth">
                                  ${allDetails?.monthdetials?.AllowanceAmount3}
                                </td>

                                <td class="tableth">&nbsp;</td>
                                <td class="tableth">&nbsp;</td>
                              </tr>
                            </>
                     
                  <tr class="tabletr">
                    <th class="tableth">Total</th>
                    <th class="tableth">
                      ${
                        Number(allDetails?.monthdetials?.basicsalary) +
                        Number(allDetails?.monthdetials?.AllowanceAmount1) +
                        Number(allDetails?.monthdetials?.AllowanceAmount3) +
                        Number(allDetails?.monthdetials?.AllowanceAmount3)
                      }
  
                      1
                    </th>
                    <th class="tableth"></th>
                    <th class="tableth">
                      ${
                        Number(allDetails?.monthdetials?.DeductionAmount1) +
                        Number(allDetails?.monthdetials?.DeductionAmount2)
                      }
  
                      1
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
           
            <div class="mainattendhow">
            <table class="tabletablemain">
              <tbody>
                <tr class="tabletr">

              
                  ${allDetails?.days
                    ?.map(
                      (item, index) => `<th key=${index} className="ableth">
                    ${item}
                  </th>`,
                    )
                    .join('')}

                    
                </tr>
                <tr className={styles.tabletr}>
                  ${
                    allDetails?.attendance != null &&
                    (allDetails?.attendance[0]?.monthNumber ===
                    Number(new Date().getMonth()) + 1
                      ? allDetails?.attendance?.slice(
                          0,
                          Number(new Date()?.toISOString().substring(8, 10)),
                        )
                      : allDetails?.attendance
                    )
                      ?.map(
                        (item, index) => `<td class="tableth" key=${index}>
                      ${item?.attendaceStatusIntext === 'Present' && <>P</>}
                      ${
                        item?.attendaceStatusIntext === 'Present Half' && (
                          <>HD</>
                        )
                      }
                      ${item?.attendaceStatusIntext === 'Absent' && <>A</>}
                      ${
                        item?.attendaceStatusIntext === 'Holiday' && (
                          <>{item?.DayName === 'Sunday' ? 'S' : 'H'}</>
                        )
                      }
                      ${item?.attendaceStatusIntext === 'On Leave' && <>L</>}
                    </td>`,
                      )
                      .join('')
                  }
                </tr>
              </tbody>
            </table>
          </div>

            <div class="maindivflesxs">
              <div>
                <p>
                  Working days&nbsp; ${
                    allDetails && totalopen(allDetails?.attendance)
                  }
                </p>
                <p>
                  Total Present &nbsp; ${
                    allDetails && totalpresent(allDetails?.attendance)
                  }
                </p>
                <p>
                  Total Absent &nbsp; ${
                    allDetails && totalabsent(allDetails?.attendance)
                  }
                </p>
              </div>
              <div>
                <p>Payable Amount ${allDetails?.monthdetials?.PaidAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>`;

  useEffect(() => {
    if (route.params?.data) {
      setisData(route.params?.data);
    }
  }, []);

  const convertHtmlToPdf = async html => {
    const options = {
      html,
      fileName: `SalarySlip${allDetails?.monthdetials?.id}`,
      directory: 'Documents',
    };

    const pdf = await RNHTMLtoPDF.convert(options);
    return pdf.filePath;
  };

  const copyToDownloadFolder = async pdfPath => {
    const downloadFolderPath = RNFS.DownloadDirectoryPath;
    const destinationPath = `${downloadFolderPath}/SalarySlip${allDetails?.monthdetials?.id}.pdf`;

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
      fileName: `SalarySlip${allDetails?.monthdetials?.id}`,
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
          <Text style={styles.name}>
            Employee Id : {allDetails?.monthdetials?.OrEmpId}
          </Text>
          <Text style={styles.name}>
            Employee Name: {allDetails?.monthdetials?.name}
          </Text>
          <Text style={styles.name}>
            Designation:
            <Text style={styles.name}>
              {allDetails?.monthdetials?.employeeof}
            </Text>
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
    backgroundColor: '#fff',
    padding: 16,
    margin: 10,
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
    color: Colors.black,
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
