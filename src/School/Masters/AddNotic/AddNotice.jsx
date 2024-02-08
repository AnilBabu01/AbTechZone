import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import CardEnquiry from './Card';
import {primary} from '../../../utils/Colors';
import {GetNotic} from '../../../redux/action/commanAction';
import {AnimatedFAB} from 'react-native-paper';
import {Colors} from '../../../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholderLoader from '../../../Component/DashboardPlaceholderLoader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RNTable from '../../../Component/RNTable';
import DownEnquiry from '../../../Component/school/DownEnquiry';
import EnquiryFilter from '../../../Component/school/EnquiryFilter';
import BackHeader from '../../../Component/Header/BackHeader';
const AddNotice = ({navigation}) => {
  const dispatch = useDispatch();

  const [enquirylist, setenquirylist] = useState('');
  const [Tabledata, setTabledata] = useState([]);
  const [viewdata, setviewdata] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const {notic, loading} = useSelector(state => state.GetNotic);
  const enquiryTableList = [
    {
      title: 'Sr.No',
      items: [],
      width: 0.33,
      align: 'center',
    },
    {
      title: 'Notic',
      items: [],
      width: 0.33,
      align: 'center',
    },

    {
      title: 'Action',
      items: [],
      width: 0.40,
      align: 'center',
    },
  ];

  const convertdata = async () => {
    await Promise.all(
      notic?.map((item, index) => {
        enquiryTableList[0].items.push({id: index, value: index + 1});

        enquiryTableList[1].items.push({
          id: index,
          value: item?.Notestext?.slice(0, 80),
        });
        enquiryTableList[2].items.push({
          id: index,
          value: (
            <Ionicons
              name="create-outline"
              color={Colors.primary}
              size={18.3}
            />
          ),
          Deleteicon: (
            <Ionicons name="trash-outline" color={Colors.red} size={18.3} />
          ),
          deleteUrl: 'comman/notes',
          allDetails: item,
          redirect: 'UpdateNotice',
        });
      }),
    );
    setTabledata(enquiryTableList);
  };

  useEffect(() => {
    if (notic) {
      setenquirylist(notic);
      convertdata(notic);

      console.log("bchxgtudcdcbxdvxcv",notic);
      
    }
  }, [notic]);

  useEffect(() => {
    dispatch(GetNotic());
  }, []);
  const {fabStyle} = styles;

  return (
    <View style={{flex: 1}}>
      <BackHeader title={'Add Notice'} />
      <View style={styles.headerTitleContainer}>
        <View>
          <Text style={styles.secondaryTitle}>Notice Master</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          {/* <Pressable
            onPress={() => setShowDocOptions(true)}
            style={styles.filterBtnContainer}>
            <FontAwesome6 name="download" color={Colors.primary} size={25} />
          </Pressable>
          <Pressable
            onPress={() => setShowModal(true)}
            style={styles.filterBtnContainer}>
            <Ionicons name="filter" color={Colors.primary} size={25} />
          </Pressable>
          <Pressable
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
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <RNTable theme="primary" data={Tabledata} />
                </ScrollView>
              </>
            )}
          </>
        )}
      </ScrollView>
      {showModal && (
        <>
          <EnquiryFilter setShowModal={setShowModal} showModal={showModal} />
        </>
      )}
      <DownEnquiry visible={showDocOptions} hideModal={setShowDocOptions} />

      <AnimatedFAB
        icon={'plus'}
        onPress={() => navigation.navigate('Addnote')}
        label="Add"
        extended={false}
        color={Colors.white}
        style={[fabStyle]}
      />
    </View>
  );
};

export default AddNotice;

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