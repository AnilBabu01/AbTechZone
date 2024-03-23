import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Height, Width} from '../../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Card from './Card';
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
import DashboardPlaceholderLoader from '../../../Component/DashboardPlaceholderLoader';
import {deviceWidth} from '../../../utils/constant';
import RNTable from '../../../Component/RNTable';
import DownloadStudentData from '../../../Component/school/DownloadExcel';
import SearchAllFee from '../../../Component/school/SearchAllFee';
const SearchFee = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState('');
  const [Tabledata, setTabledata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const {student} = useSelector(state => state.getstudent);

  useEffect(() => {
    if (student) {
      setShowModal(false);
      setdata(student);
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
            <Text style={styles.secondaryTitle}>Search Fee</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Pressable
              onPress={() => setShowDocOptions(true)}
              style={styles.filterBtnContainer}>
              <FontAwesome6 name="download" color={Colors.primary} size={25} />
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
              {true ? (
                <>
                  <View style={styles.enquirymainview}>
                    {data?.length > 0 &&
                      data?.map((item, index) => {
                        return <Card key={index} data={item} />;
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
            <SearchAllFee
              setShowModal={setShowModal}
              showModal={showModal}
              loading={loading}
              setloading={setloading}
              setdata={setdata}
              data={data}
            />
          </>
        )}

        <DownloadStudentData
          enquiry={student}
          filename={'StudentFeeStatusList'}
          visible={showDocOptions}
          hideModal={setShowDocOptions}
        />
      </View>
    </>
  );
};

export default SearchFee;

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
});
