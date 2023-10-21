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
import React, {useState} from 'react';
import {primary} from '../../utils/Colors';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Delete from '../../assets/Delete.png';
import Edit from '../../assets/Edit.png';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';

const Card = ({data}) => {
  const navigation = useNavigation();
  const [showinfo, setshowinfo] = useState('');

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
    <ScrollView>
      <TouchableOpacity onPress={() => setshowinfo(!showinfo)}>
        <View style={styles.connainer}>
          <View style={styles.card10}>
            <View style={styles.viewdel}>
              <Text>Joining Date</Text>
              <Text>2023-09-09</Text>
            </View>
            <View style={styles.viewdel}>
              <Text>Resign Date</Text>
              <Text>2023-09-09</Text>
            </View>
            {showinfo && (
              <>
                <View style={styles.viewdel}>
                  <Text>Employee Name</Text>
                  <Text>test</Text>
                </View>
                <View style={styles.viewdel}>
                  <Text>Employee Email</Text>
                  <Text>A2@gmail.com</Text>
                </View>
                <View style={styles.viewdel}>
                  <Text>Employee Phone</Text>
                  <Text>7505786956</Text>
                </View>
                <View style={styles.viewdel}>
                  <Text>Designation</Text>
                  <Text>Faulty</Text>
                </View>
                <View style={styles.viewdel}>
                  <Text>Department</Text>
                  <Text>Main Office</Text>
                </View>

                <View style={styles.viewdel}>
                  <Text>Status</Text>
                  <Text>Active</Text>
                </View>
                <View style={styles.viewdel}>
                  <Text>Action</Text>
                  <View style={styles.mainActionView}>
                    <TouchableOpacity onPress={() => confirmation(data?.id)}>
                      <Image source={Delete} style={styles.actionimg10} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        // navigation.navigate('UpdateEmployeeCoaching', {data})
                        navigation.navigate('UpdateEmployeeCoaching')
                      }>
                      <Image source={Edit} style={styles.actionimg} />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Card;

const styles = StyleSheet.create({
  mainActionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '30%',
    justifyContent: 'space-between',
  },
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
    marginBottom: 10,
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
});
