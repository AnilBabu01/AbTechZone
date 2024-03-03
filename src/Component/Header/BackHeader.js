import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {primary, hightlight} from '../../utils/Colors';
import {Height, Width} from '../../utils/responsive';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../../utils/Colors';
const windowWidth = Dimensions.get('window').width;
const BackHeader = ({title, icon}) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.mainheader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesome6 name="arrow-left" color={Colors.white} size={30} />
        </TouchableOpacity>
        <Text style={styles.titlestyle}>{title}</Text>

        <FontAwesome6
          name={icon ? icon : 'circle-info'}
          color={Colors.white}
          size={30}
        />
      </View>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  mainheader: {
    width: windowWidth,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: primary,
    paddingBottom: 5,
    height: Height(50),
  },

  loginbtn: {
    width: Width(80),
    height: Height(35),
    backgroundColor: hightlight,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlestyle: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
