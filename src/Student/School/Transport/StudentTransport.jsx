import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import BackHeader from '../../../Component/Header/BackHeader';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {Colors, primary} from '../../../utils/Colors';
const StudentTransport = () => {
  return (
    <>
      <BackHeader title={'Transport Details'} />
      <ScrollView>
        <View style={styles.mainview}>
          <View style={styles.connainer}>
            <View style={styles.card10}>
              <View style={styles.viewdel}>
                <Text style={styles.textdark}>Enquiry Date</Text>
                <Text style={styles.textdark}>2023-09-09</Text>
              </View>

              <View style={styles.viewdel}>
                <Text style={styles.textdark}>Student Number</Text>
                <Text style={styles.textdark}>7505786956</Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={styles.textdark}>Student Email</Text>
                <Text style={styles.textdark}>A2@gmail.com</Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={styles.textdark}>Address</Text>
                <Text style={styles.textdark}>Pilibhit</Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={styles.textdark}>Course</Text>
                <Text style={styles.textdark}>DCA</Text>
              </View>
              <View style={styles.viewdel}>
                <Text style={styles.textdark}>Comment</Text>
                <Text></Text>
              </View>
              <Text style={styles.textdark}>
                Premium designed icons for use in web, iOS, Android, and desktop
                apps. Support for SVG. Completely open source,
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default StudentTransport;

const styles = StyleSheet.create({
  mainview: {
    paddingHorizontal: deviceWidth * 0.02,
  },
  textdark: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize:16
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
