import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import hamburger from '../assets/hamburger.png';
import logoblue1 from '../assets/logoblue1.png';
import {primary, secondary} from '../utils/Colors';
import {Height, Width} from '../utils/responsive';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Header = ({navigation}) => {
  return (
    <View>
      <View style={styles.mainheader}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
          <Image source={hamburger} style={styles.menuimg} />
        </TouchableOpacity>

        {/* <Image source={logoblue1} style={styles.logoimg}/> */}
        <Text>AbTechZone</Text>
        <TouchableOpacity>
          <View style={styles.loginbtn}>
            <Text style={styles.logintextstyle}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainheader: {
    width: windowWidth,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  loginbtn: {
    width: Width(80),
    height: Height(35),
    backgroundColor: primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logintextstyle: {
    color: 'white',
    // fontWeight: 700,
    fontSize: 22,
  },
});
