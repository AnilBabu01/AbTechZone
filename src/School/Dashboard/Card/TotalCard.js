import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import {Width, Height} from '../../../utils/responsive';
import {Colors} from '../../../utils/Colors';

const TotalCard = ({img, value, name, bgcolor}) => {
  return (
    <ScrollView>
      <View>
        <View style={[styles.card10, {backgroundColor: bgcolor}]}>
          <Image style={styles.img} source={img} alt="abc" />
          <Text style={{color: Colors.black, fontWeight: 'bold'}}>{name}</Text>
          <Text style={{color: Colors.black, fontWeight: 'bold'}}>{value}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TotalCard;

const styles = StyleSheet.create({
  card10: {
    borderRadius: 8,
    width: Width(170),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
  },

  img: {
    borderRadius: 50,
    width: 40,
    height: 40,
  },
});
