import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import {donationavtivebtn} from '../../../utils/Colors';

const TotalCard = ({img, value, name}) => {
  return (
    <ScrollView>
      <View style={styles.connainer}>
        <View style={styles.card10}>
          <View style={styles.viewdel}>
            <Image style={styles.img} source={img} alt="abc" />
            <Text>{name}</Text>
            <Text>{value}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TotalCard;

const styles = StyleSheet.create({
  card10: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 100,
    
  },
  viewdel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:"center",
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
  img:{
    borderRadius:50,
    width:80,
    height:80
  }
});
