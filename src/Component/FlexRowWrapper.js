import {View,StyleSheet} from 'react-native';
import {deviceHeight,deviceWidth} from '../utils/constant'
export const FlexRowWrapper = ({children}) => {
  return <View style={styles.rowwrapper}>{children}</View>;
};


const styles = StyleSheet.create({
  
  rowwrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginHorizontal: deviceWidth * 0.01,
    marginTop: deviceWidth * 0.04,
  },
});