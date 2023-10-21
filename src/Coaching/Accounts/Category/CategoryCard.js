import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {primary} from '../../../utils/Colors';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Delete from '../../../assets/Delete.png';
import Edit from '../../../assets/Edit.png';
import {deletecategory, getcategory} from '../../../Redux/action/commanAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Component/Loader/Loader';

const CategoryCard = ({data}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [sms, setsms] = useState('');
  const [loader, setloader] = useState(false);
  const {category, error} = useSelector(state => state.deletecategory);
  const submit = id => {
    setsms('Deleting...');
    setloader(true);
    dispatch(deletecategory(id));
  };

  useEffect(() => {
    if (category?.status) {
      dispatch(getcategory());
      setsms('');
      setloader(false);
    }
  }, [category]);
  useEffect(() => {
    if (error) {
      if (error?.status === false) {
        setloader(false);
        setsms('');
      }
    }
  }, [error]);

  const confirmation = id => {
    Alert.alert(
      'Delete',
      'Do you really want to Delete ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => submit(id),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  return (
    <View>
      <Loader loader={loader} sms={sms} />
      <ScrollView>
        <View style={styles.connainer}>
          <View style={styles.card10}>
            <View style={styles.viewdel}>
              <Text>Category</Text>
              <Text>{data?.category}</Text>
            </View>
            <View style={styles.viewdel}>
              <Text></Text>
              <View style={styles.mainActionView}>
                <TouchableOpacity onPress={() => confirmation(data?.id)}>
                  <Image source={Delete} style={styles.actionimg10} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UpdatecategoryCoaching', {data})
                  }>
                  <Image source={Edit} style={styles.actionimg} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card10: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  viewdel: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  viewdelbtn: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  donationButton: {
    backgroundColor: primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    borderRadius: 10,
    width: '45%',
    height: 40,
  },
  avtiveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  actionimg: {
    width: 39,
    height: 40,
  },
  actionimg10: {
    width: 40,
    height: 40,
  },
  mainActionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '30%',
    justifyContent: 'space-between',
  },
});
