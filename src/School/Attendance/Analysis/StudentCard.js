import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {primary, savebtn, resetbtn} from '../../../utils/Colors';
  import moment from 'moment';
  import {Height, Width} from '../../../utils/responsive';
  import {useNavigation} from '@react-navigation/native';
  
  // import RNHTMLtoPDF from 'react-native-html-to-pdf';
  
  const StudentCard = ({item}) => {
    const navigation = useNavigation();
    return (
      <View>
        <View style={styles.connainer}>
          <View style={styles.card10}>
            <View style={styles.viewdel}>
              <Text>Roll No</Text>
              <Text>name</Text>
              <Text>Course</Text>
            </View>
            <View style={styles.viewdel}>
              <Text>0002</Text>
              <Text>Akash</Text>
              <Text>DCA</Text>
            </View>
            <View style={styles.viewdel}>
              <Text>Attendance Status</Text>
              <TouchableOpacity>
                <View style={styles.unabsentbtn}>
                  <Text style={styles.textcolor}>A</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.presentbtn}>
                  <Text style={styles.textcolor}>B</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  export default StudentCard;
  
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
    absentbtn: {
      backgroundColor: resetbtn,
      width: Width(80),
      height: Height(35),
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:10
    },
    unabsentbtn: {
      borderColor: resetbtn,
      borderWidth:1,
      width: Width(80),
      height: Height(35),
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:10
    },
    presentbtn: {
      backgroundColor: savebtn,
      width: Width(80),
      height: Height(35),
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:10
    },
  
    unpresentbtn: {
      backgroundColor: savebtn,
      width: Width(80),
      height: Height(35),
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:10
    },
    textcolor:{
      color:primary
    }
  });
  