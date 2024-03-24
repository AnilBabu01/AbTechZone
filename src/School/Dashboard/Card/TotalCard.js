import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import {Width, Height} from '../../../utils/responsive';
import {Colors} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';

const TotalCard = ({img, value, name, bgcolor}) => {
  return (
    <ScrollView>
      <View>
        <View style={[styles.card10, {backgroundColor: bgcolor}]}>
          <Image style={styles.img} source={img} alt="abc" />
          <Text style={{color: Colors.white, fontWeight: 'bold', fontSize: 16}}>
            {name}
          </Text>
          <Text style={{color: Colors.white, fontWeight: 'bold', fontSize: 16}}>
            {value}
          </Text>
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
    height: deviceHeight * 0.3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: deviceHeight * 0.04,
  },

  img: {
    borderRadius: 50,
    width: Width(70),
    height: Width(70),
    resizeMode: 'cover',
  },
});
