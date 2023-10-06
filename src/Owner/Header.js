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
import logoblue1 from '../assets/whitelogo.png';
import {primary, hightlight} from '../utils/Colors';
import {Height, Width} from '../utils/responsive';
import profileimg from '../assets/profileimg.jpg';
import {useNavigation} from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Header = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.mainheader}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={hamburger} style={styles.menuimg} />
        </TouchableOpacity>

        <Image source={logoblue1} style={styles.logoimg} />
        {/* <Text style={{color: 'white'}}>ABTECHZONE</Text> */}

        <View style={styles.profile}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            {/* {user?.profile_image ? (
          <>
            <Image
              source={{
                uri: `${backendUrl}uploads/images/${user?.profile_image}`,
              }}
              style={styles.avator}
            />
          </>
        ) : (
          <>
            <Image source={profileimg} style={styles.avator} />
          </>
        )} */}
            <Image source={profileimg} style={styles.avator} />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity>
          <View style={styles.loginbtn}>
            <Text style={styles.logintextstyle}>LogOut</Text>
          </View>
        </TouchableOpacity> */}
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
    backgroundColor: primary,
    paddingBottom:5
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
  logintextstyle: {
    color: 'white',
    // fontWeight: 700,
    fontSize: 22,
  },
  profile: {
    backgroundColor: primary,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
  },
  avator: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  logoimg: {
    height: Height(40),
    width: Width(200),
  },
  menuimg: {
    height: Height(40),
    width: Width(40),
    borderRadius: 10,
  },
});
