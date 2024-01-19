import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {deviceHeight, deviceWidth} from '../utils/constant';
const DashboardPlaceholderLoader = ({type}) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  return (
    <View style={{flex: 1}}>
      {type === 'table' && (
        <>
          <View style={{width: '100%', marginBottom: 6}}>
            <ShimmerPlaceHolder width={deviceWidth * 0.9} height={40} />
          </View>
          <View style={{flexDirection: 'row', gap: deviceWidth * 0.02}}>
            <View style={{height: deviceHeight * 0.41}}>
              <ShimmerPlaceHolder
                width={deviceWidth * 0.28}
                height={deviceHeight * 0.4}
              />
            </View>
            <View style={{height: deviceHeight * 0.41}}>
              <ShimmerPlaceHolder
                width={deviceWidth * 0.28}
                height={deviceHeight * 0.4}
              />
            </View>
            <View style={{height: deviceHeight * 0.41}}>
              <ShimmerPlaceHolder
                width={deviceWidth * 0.28}
                height={deviceHeight * 0.4}
              />
            </View>
          </View>
        </>
      )}

      {type === 'card' && (
        <>
          <View style={styles.card}>
            <ShimmerPlaceHolder
              width={deviceWidth * 0.9}
              height={deviceHeight * 0.3}
              shimmerStyle={{borderRadius: 12}}
            />
          </View>
        </>
      )}

      {type === 'datacard' && (
        <>
          <View style={styles.datacardmain}>
            {[1, 2, 3, 4, 5, 6, 7].map(item => (
              <View key={item} style={styles.cardview}>
                <ShimmerPlaceHolder
                  width={deviceWidth * 0.9}
                  height={deviceHeight * 0.1}
                  shimmerStyle={{borderRadius: 12}}
                />
              </View>
            ))}
          </View>
        </>
      )}

      {type === 'header' && (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: deviceHeight * 0.02,
          }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
            <View key={item} style={styles.cardholder}>
              <ShimmerPlaceHolder
                width={deviceWidth * 0.4}
                height={deviceHeight * 0.1}
                shimmerStyle={{borderRadius: 14}}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default DashboardPlaceholderLoader;

const styles = StyleSheet.create({
  cardholder: {
    borderRadius: 8,
    width: deviceWidth * 0.4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: deviceHeight * 0.01,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  datacardmain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardview: {
    marginVertical: deviceHeight * 0.01,
  },
});
