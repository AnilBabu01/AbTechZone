import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Height, Width} from '../../../utils/responsive';
import CardEnquiry from './Card';
import {primary} from '../../../utils/Colors';
import {getcourse} from '../../../redux/action/commanAction';
import {Colors} from '../../../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholderLoader from '../../../Component/DashboardPlaceholderLoader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RNTable from '../../../Component/RNTable';
import DownEnquiry from '../../../Component/school/DownloadExcel';
import EnquiryFilter from '../../../Component/school/EnquiryFilter';
import FilterAnalysie from '../../../Component/school/FilterAnalysie';
import BackHeader from '../../../Component/Header/BackHeader';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import RNPrint from 'react-native-print';
import Share from 'react-native-share';

const Analysie = ({navigation}) => {
  const dispatch = useDispatch();
  const [openModel, setopenModel] = useState(false);
  const [Downloading, setDownloading] = useState(false);
  const [printing, setprinting] = useState(false);
  let currmonth = new Date().getMonth();
  const [month, setmonth] = useState(currmonth + 1);
  const [enquirylist, setenquirylist] = useState('');
  const [alltransferamount, setalltransferamount] = useState([]);
  const [viewdata, setviewdata] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const {course, loading} = useSelector(state => state.getcourse);
  const [assetlist, setassetlist] = useState([]);
  const [allExpensesList, setallExpensesList] = useState([]);
  const [allRecoveryList, setallRecoveryList] = useState([]);

  const [expensesTable, setexpensesTable] = useState([]);
  const [receveryTable, setreceveryTable] = useState([]);

  const ExpensesTableList = [
    {
      title: 'Sr.No',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: 'Type',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Amount',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Mode',
      items: [],
      width: 0.33,
      align: 'center',
    },
  ];

  const ReconveryTableList = [
    {
      title: 'Sr.No',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: 'Class',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Amount',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: 'Mode',
      items: [],
      width: 0.33,
      align: 'center',
    },
  ];

  const convertdata = async data => {
    await Promise.all(
      data?.map((item, index) => {
        ExpensesTableList[0].items.push({id: index, value: index + 1});
        ExpensesTableList[1].items.push({
          id: index,
          value: item.Expensestype,
        });
        ExpensesTableList[2].items.push({
          id: index,
          value: item.total_paidamount,
        });
        ExpensesTableList[3].items.push({
          id: index,
          value: item.PayOption,
        });
      }),
    );
    setexpensesTable(ExpensesTableList);
  };

  const convertdataRecovery = async data => {
    await Promise.all(
      data?.map((item, index) => {
        ReconveryTableList[0].items.push({id: index, value: index + 1});
        ReconveryTableList[1].items.push({
          id: index,
          value: item.Course,
        });
        ReconveryTableList[2].items.push({
          id: index,
          value: item.total_paidamount,
        });
        ReconveryTableList[3].items.push({
          id: index,
          value: item.PayOption,
        });
      }),
    );
    setreceveryTable(ReconveryTableList);
  };

  const filterdata = () => {
    try {
      let date = new Date();
      let fullyear = date.getFullYear();
      let lastyear = date.getFullYear() - 1;
      let combine = `${lastyear}-${fullyear}`;

      serverInstance('expenses/getexpensesanalysis', 'post', {
        sessionname: combine,
        month: month,
      }).then(res => {
        if (res?.status === true) {
          // Toast.show({
          //   type: 'success',
          //   text1: 'Success',
          //   text2: res?.msg,
          // });

          setallExpensesList(res?.data[0]?.allexpenses);
          setallRecoveryList(res?.data[0]?.allreceiptdata);
          setassetlist(res?.data[0]?.allexpensesAsset);

          convertdata(res?.data[0]?.allexpenses);
          convertdataRecovery(res?.data[0]?.allreceiptdata);
        }

        if (res?.status === false) {
          // Toast.show({
          //   type: 'error',
          //   text1: 'Error',
          //   text2: res?.msg,
          // });
        }
      });
    } catch (error) {}
  };

  const totalcashexpenses = data => {
    let total = 0;
    data?.map(item => {
      if (item?.PayOption === 'Cash') {
        total = total + Number(item?.total_paidamount);
      }
    });
    return total;
  };

  const totalonlineexpenses = data => {
    let total = 0;
    data?.map(item => {
      if (item?.PayOption === 'Online') {
        total = total + Number(item?.total_paidamount);
      }
    });
    return total;
  };

  const totalcashrecovery = data => {
    let total = 0;
    data?.map(item => {
      if (item?.PayOption === 'Cash') {
        total = total + Number(item?.total_paidamount);
      }
    });
    return total;
  };

  const totalonlineexrecovery = data => {
    let total = 0;
    data?.map(item => {
      if (item?.PayOption === 'Online') {
        total = total + Number(item?.total_paidamount);
      }
    });
    return total;
  };

  const GetTransferAmmountConslated = () => {
    serverInstance('expenses/GetTransferAmmountConslated', 'get').then(res => {
      if (res.status) {
        setalltransferamount(res?.data);
      }
    });
  };

  const totalcashTransferAmount = data => {
    let total = 0;
    alltransferamount?.map(item => {
      if (item?.Transfer_Mode === 'Cash') {
        total = total + Number(item?.total_amount);
      }
    });
    return total;
  };

  const totalonlineTransferAmount = data => {
    let total = 0;
    alltransferamount?.map(item => {
      if (item?.Transfer_Mode === 'Online') {
        total = total + Number(item?.total_amount);
      }
    });
    return total;
  };

  useEffect(() => {
    dispatch(getcourse());
    filterdata();
    GetTransferAmmountConslated();
  }, []);

  const removeasset = data => {
    // let filterData = data.filter(
    //   (item) => item.Expensestype === "Expenses" || item.Expensestype === "Liability"
    // );

    return data;
  };

  const htmlTemplate = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .add_divmarginn {
          padding: 0.5rem;
        }
  
        .tablecontainer {
          overflow-x: auto;
          /* padding: 10px;
          margin: 10px; */
        }
        .expensesDiv {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
  
        .innearexpensesdiv {
          width: 50%;
          border: 1px solid #093959;
          padding: 0.5rem;
          height: 34rem;
        }
        .innearexpensesdiv10 {
          width: 50%;
          border: 1px solid #093959;
          padding: 0.5rem;
          height: 34rem;
        }
  
        .mainrecoveryp {
          background-color: #093959;
          color: white;
          padding: 1%;
        }
  
        .onlytablescroll {
          width: 100%;
          border: 1px solid #093959;
          padding: 0.5rem;
          height: 22rem;
          overflow-x: auto;
        }
  
        .tabletable {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
  
        .tabletr:nth-child(even) {
          background-color: #dddddd;
        }
        .tabletd,
        .tableth {
          border: 1px solid #dddddd;
          text-align: center;
          padding: 8px;
        }
        .mainfivrupee {
          display: flex;
          justify-content: space-between;
        }
        .mainfivrupeep {
          font-weight: 700;
        }
        .mainfivrupee10p {
          font-weight: 700;
        }
      </style>
    </head>
    <body>
      <div class="add_divmarginn">
        <div class="tablecontainer">
          <div class="expensesDiv">
            <div class="innearexpensesdiv">
              <div class="mainrecoveryp">
                <p>Expenses</p>
              </div>
  
              <div class="onlytablescroll">
                <table class="tabletable">
                  <tbody>
                    <tr class="tabletr">
                      <th class="tableth">Sr.No</th>
  
                      <th class="tableth">Type</th>
                      <th class="tableth">Amount</th>
  
                      <th class="tableth">Mode</th>
                    </tr>
  
                    ${
                      allExpensesList?.length > 0 &&
                      removeasset(allExpensesList)
                        ?.map(
                          (item, index) => `  <tr key=${index} class="tabletr">
                      <td class="tabletd">${index + 1}</td>

                      <td class="tabletd">${item?.Expensestype}</td>
                      <td class="tabletd">${item?.total_paidamount}</td>

                      <td class="tabletd">${item?.PayOption}</td>
                    </tr> `,
                        )
                        .join('')
                    }
                  </tbody>
                </table>
              </div>
              <div class="mainfivrupee">
                <p>
                  Total Cash Out = &nbsp;
                  <span class="mainfivrupee10p">
                    ${totalcashexpenses(allExpensesList)}
                  </span>
                </p>
                <p>
                  Total Online Out = &nbsp;
                  <span class="mainfivrupee10p">
                    ${totalonlineexpenses(allExpensesList)}
                  </span>
                </p>
              </div>
            </div>
            <div class="innearexpensesdiv10">
              <div class="mainrecoveryp">
                <p>Recovery</p>
              </div>
  
              <div class="onlytablescroll">
                <table class="tabletable">
                  <tbody>
                    <tr class="tabletr">
                      <th class="tableth">Sr.No</th>
                      <th class="tableth">Class</th>
                      <th class="tableth">Amount</th>
  
                      <th class="tableth">Mode</th>
                    </tr>
                    ${
                      allRecoveryList?.length > 0 &&
                      allRecoveryList
                        ?.map(
                          (item, index) => `  <tr key=${index} class="tabletr">
                    <td class="tabletd">${index + 1}</td>
                    <td class="tabletd">${item?.Course}</td>
                    <td class="tabletd">${item?.total_paidamount}</td>

                    <td class="tabletd">${item?.PayOption}</td>
                  </tr>`,
                        )
                        .join('')
                    }
                  </tbody>
                </table>
              </div>
  
              <div>
                <p>
                  Total Cash = &nbsp;
                  <span class="mainfivrupee10p">
                    ${
                      totalcashrecovery(allRecoveryList) -
                      totalcashexpenses(assetlist) +
                      totalcashTransferAmount()
                    }
                  </span>
                </p>
                <p>
                  Total Bank = &nbsp;
                  <span class="mainfivrupee10p">
                    ${
                      totalonlineexrecovery(allRecoveryList) -
                      totalonlineexpenses(assetlist) +
                      totalonlineTransferAmount()
                    }
                  </span>
                </p>
                <p>
                  Total Profit = &nbsp;
                  <span class="mainfivrupee10p">
                    ${
                      totalcashrecovery(allRecoveryList) +
                      totalonlineexrecovery(allRecoveryList) -
                      (totalcashexpenses(allExpensesList) +
                        totalonlineexpenses(allExpensesList))
                    }
                  </span>
                </p>
              </div>
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
      fileName: 'Analysie',
      directory: 'Documents',
    };

    const pdf = await RNHTMLtoPDF.convert(options);
    return pdf.filePath;
  };

  const copyToDownloadFolder = async pdfPath => {
    const downloadFolderPath = RNFS.DownloadDirectoryPath;
    const destinationPath = `${downloadFolderPath}/Analysie.pdf`;

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

  const handlePrint = async () => {
    setprinting(true);
    const results = await RNHTMLtoPDF.convert({
      html: htmlTemplate,
      fileName: 'Analysie',
      base64: true,
    });
    if (results) {
      setprinting(false);
      await RNPrint.print({filePath: results.filePath});
    }
  };

  const handleGeneratePdf = useCallback(async () => {
    setDownloading(true);
    try {
      const pdfPath = await convertHtmlToPdf(htmlTemplate);
      const destinationPath = await copyToDownloadFolder(pdfPath);
      await showPdfPopup(destinationPath);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }, []);

  const sharePDF = async () => {
    try {
      const results = await RNHTMLtoPDF.convert({
        html: htmlTemplate,
        fileName: 'Analysie',
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
    <View style={{flex: 1}}>
      <BackHeader title={'Analysie'} />
      <View style={styles.headerTitleContainer}>
        <View>
          <Text style={styles.secondaryTitle}>Analysie Management</Text>
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
          {/* <Pressable
            onPress={() => setviewdata(!viewdata)}
            style={styles.filterBtnContainer}>
            {viewdata ? (
              <>
                <Ionicons name="card" color={Colors.primary} size={25} />
              </>
            ) : (
              <>
                <FontAwesome6 name="table" color={Colors.primary} size={25} />
              </>
            )}
          </Pressable> */}
        </View>
      </View>

      <ScrollView>
        {loading ? (
          <>
            <DashboardPlaceholderLoader type="table" />
          </>
        ) : (
          <>
            {viewdata ? (
              <>
                <View style={styles.enquirymainview}>
                  {enquirylist?.length > 0 &&
                    enquirylist?.map((item, index) => {
                      return <CardEnquiry key={index} data={item} />;
                    })}
                </View>
              </>
            ) : (
              <>
                <View style={{padding: 15}}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Expenses
                  </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <RNTable theme="primary" data={expensesTable} />
                </ScrollView>
                <View style={{padding: 15}}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Total Cash Out : {totalcashexpenses(allExpensesList)}
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Total Online Out : {totalonlineexpenses(allExpensesList)}{' '}
                  </Text>
                </View>

                <View
                  style={{
                    padding: 15,
                    borderTopWidth: 2,
                    borderTopColor: Colors.primary,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Recovery
                  </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <RNTable theme="primary" data={receveryTable} />
                </ScrollView>

                <View style={{padding: 15}}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Total Cash :
                    {totalcashrecovery(allRecoveryList) -
                      totalcashexpenses(assetlist) +
                      totalcashTransferAmount()}
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Total Bank :
                    {totalonlineexrecovery(allRecoveryList) -
                      totalonlineexpenses(assetlist) +
                      totalonlineTransferAmount()}
                  </Text>

                  <Text
                    style={{
                      color: Colors.black,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Total Profit :
                    {totalcashrecovery(allRecoveryList) +
                      totalonlineexrecovery(allRecoveryList) -
                      (totalcashexpenses(allExpensesList) +
                        totalonlineexpenses(allExpensesList))}
                  </Text>
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>

      {showModal && (
        <>
          <FilterAnalysie
            setallExpensesList={setallExpensesList}
            setallRecoveryList={setallRecoveryList}
            setassetlist={setassetlist}
            setShowModal={setShowModal}
            convertdata={convertdata}
            convertdataRecovery={convertdataRecovery}
            showModal={showModal}
          />
        </>
      )}
      <DownEnquiry visible={showDocOptions} hideModal={setShowDocOptions} />
    </View>
  );
};

export default Analysie;

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

  loginbtndiv: {
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  loginbtn: {
    width: Width(100),
    height: Height(40),
    backgroundColor: primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logintextstyle: {
    color: 'white',
    // fontWeight: 700,
    fontSize: 16,
  },
  searchtext: {
    fontSize: 20,
  },
  modal: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: '50%',
    marginLeft: 20,
    padding: 10,
  },
  elevation: {
    shadowColor: '#52006A',
    elevation: 20,
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
    padding: 9,
    borderRadius: 10,
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    backgroundColor: primary,
  },
});
