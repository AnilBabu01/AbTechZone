import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image
  } from 'react-native';
  import React, {useState} from 'react';
  import {primary} from '../../../utils/Colors';
  import moment from 'moment';
  import {useNavigation} from '@react-navigation/native';
  // import RNHTMLtoPDF from 'react-native-html-to-pdf';
  import Delete from '../../../assets/Delete.png';
import Edit from '../../../assets/Edit.png';
  const DesignationCard = ({item}) => {
    const navigation = useNavigation();
  
    return (
      <ScrollView>
        <View style={styles.connainer}>
          <View style={styles.card10}>
            <View style={styles.viewdel}>
              <Text>Batch No : 1</Text>
              <Text></Text>
            </View>
            <View style={styles.viewdel}>
              <Text>Start Time : 07:00 AM</Text>
              <Text>Endi Time : 07:00 AM</Text>
            </View>
            <View style={styles.viewdel}>
            <Text></Text>
            <View style={styles.mainActionView}>
              <Image source={Delete} style={styles.actionimg10} />
              <Image source={Edit} style={styles.actionimg} />
            </View>
          </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  
  export default DesignationCard;
  
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
  