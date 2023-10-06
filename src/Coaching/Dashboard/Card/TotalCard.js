import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import {Width, Height} from '../../../utils/responsive';

const TotalCard = ({img, value, name}) => {
  return (
    <ScrollView>
      <View style={styles.connainer}>
        <View style={styles.card10}>
          <Image style={styles.img} source={img} alt="abc" />
          <Text>{name}</Text>
          <Text>{value}</Text>
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
