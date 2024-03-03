import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackHeader from './BackHeader';

const ReadMore = () => {
  return (
    <View>
      <BackHeader title={'Read More'} />
      <View style={styles.mainReadMore}>
        <Text>ReadMore</Text>
      </View>
    </View>
  );
};

export default ReadMore;

const styles = StyleSheet.create({
  mainReadMore: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});
