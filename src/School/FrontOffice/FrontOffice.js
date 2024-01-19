import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardEnquiry from './CardEnquiry';
import Header from '../../Component/Header/Header';
import {primary} from '../../utils/Colors';
import AddEnquiry from './AddEnquiry';
import {getenquiries} from '../../redux/action/coachingAction';
import {AnimatedFAB} from 'react-native-paper';
import {Colors} from '../../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import DashboardPlaceholderLoader from '../../Component/DashboardPlaceholderLoader';
const FrontOffice = ({navigation}) => {
  const dispatch = useDispatch();
  const [openModel, setopenModel] = useState(false);
  const [enquirylist, setenquirylist] = useState('');
  const {enquiry, loading} = useSelector(state => state.enquiry);
  const [loadering, setloadering] = useState(true);
  useEffect(() => {
    dispatch(getenquiries());
  }, []);

  useEffect(() => {
    if (enquiry) {
      setenquirylist(enquiry);
    }
  }, [enquiry]);
  const {fabStyle} = styles;
  return (
    <View style={{flex: 1}}>
      <Modal animationType={'fade'} transparent={true} visible={openModel}>
        <View style={[styles.modal, styles.elevation]}>
          <View style={styles.cancalView}>
            <Text style={styles.canceltext} onPress={() => setopenModel(false)}>
              <Ionicons name="close-outline" size={40} />
            </Text>
          </View>
          <AddEnquiry />
        </View>
      </Modal>
      <Header />
      <TouchableOpacity
        onPress={() => navigation.navigate('SearchEnquirySchool')}>
        <View style={styles.inputview}>
          <View style={styles.inputsaerch}>
            <Text style={styles.searchtext}>Search here</Text>
          </View>
          <Ionicons
            name="search-outline"
            size={Height(22)}
            style={{marginRight: Width(20)}}
            color="rgba(0, 0, 0, 0.5)"
          />
        </View>
      </TouchableOpacity>

      <ScrollView>
        {loading ? (
          <>
            <DashboardPlaceholderLoader type="datacard" />
          </>
        ) : (
          <>
            <View style={styles.enquirymainview}>
              {enquirylist &&
                enquirylist?.map((item, index) => {
                  return <CardEnquiry key={index} data={item} />;
                })}
            </View>
          </>
        )}
      </ScrollView>

      <AnimatedFAB
        icon={'plus'}
        onPress={() => navigation.navigate('AddEnquirySchool')}
        label="Add"
        extended={false}
        color={Colors.white}
        style={[fabStyle]}
      />
    </View>
  );
};

export default FrontOffice;

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
