import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {primary} from '../../utils/Colors';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';

const CardEnquiry = ({item}) => {
  const navigation = useNavigation();
  // const downloadre = async () => {
  //   let options = {
  //     html: '<h1>PDF TEST</h1>',
  //     fileName: 'test',
  //     directory: 'Documents',
  //   };

  //   let file = await RNHTMLtoPDF.convert(options);
  //   // console.log(file.filePath);
  //   console.log(file);
  // };
  return (
    <ScrollView>
      <View style={styles.connainer}>
        <View style={styles.card10}>
          <View style={styles.viewdel}>
            <Text>Enquiry Date</Text>
            <Text>2023-09-09</Text>
          </View>
         <View style={styles.viewdel}>
            <Text>Student Number</Text>
            <Text>7505786956</Text>
          </View>
          <View style={styles.viewdel}>
            <Text>Student Email</Text>
            <Text>A2@gmail.com</Text>
          </View>
          <View style={styles.viewdel}>
            <Text>Address</Text>
            <Text>Pilibhit</Text>
          </View>
          <View style={styles.viewdel}>
            <Text>Course</Text>
            <Text>DCA</Text>
          </View>
          <View style={styles.viewdel}>
            <Text>Comment</Text>
            <Text></Text>
          </View>
          <Text>
            Premium designed icons for use in web, iOS, Android, and desktop
            apps. Support for SVG. Completely open source,
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CardEnquiry;

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
