import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {primary} from '../../utils/Colors';
import Edit from '../../assets/Edit.png';
import Img from '../../assets/Img.png';
import {Width, Height} from '../../utils/responsive';
import {useNavigation} from '@react-navigation/native';
import Header from '../../Component/Header/Header';
import {useSelector}  from 'react-redux';
const Profile = () => {
  const navigation = useNavigation();


  return (
    <>
      <Header />
      <ScrollView>
        <View style={styles.connainer}>
          <View style={styles.card10}>
            <View style={styles.viewdel}>
              <Text>Institute Details</Text>
              <Text></Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>Owner Name</Text>
              <Text style={{fontWeight: 700}}>Client Code</Text>
            </View>
            <View style={styles.viewdel}>
              <Text>Computer Coaching</Text>
              <Text>CNO-900</Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>Official Email</Text>
              <Text style={{fontWeight: 700}}>Institute Name</Text>
            </View>
            <View style={styles.viewdel}>
              <Text>Computer Coaching</Text>
              <Text>CNO-900</Text>
            </View>

            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>Phone No1</Text>
              <Text style={{fontWeight: 700}}>Phone No2</Text>
            </View>
            <View style={styles.viewdel}>
              <Text>Computer Coaching</Text>
              <Text>CNO-900</Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>State</Text>
              <Text style={{fontWeight: 700}}>City</Text>
            </View>
            <View style={styles.viewdel}>
              <Text>Computer Coaching</Text>
              <Text>CNO-900</Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>Address</Text>
              <Text style={{fontWeight: 700}}>Pincode</Text>
            </View>
            <View style={styles.viewdel}>
              <Text>Computer Coaching</Text>
              <Text>CNO-900</Text>
            </View>

            <View style={styles.viewdel}>
              <Text></Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('UpdateInstituteCoaching')}>
                <Image source={Edit} style={styles.actionimg} />
              </TouchableOpacity>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>Profile</Text>
              <Text></Text>
            </View>
            <View style={styles.viewdel}>
              <Image source={Img} style={styles.imagesview} />
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>Logo</Text>
              <Text></Text>
            </View>
            <View style={styles.viewdel}>
              <Image source={Img} style={styles.imagesview} />
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>Certificate</Text>
              <Text></Text>
            </View>
            <View style={styles.viewdel}>
              <Image source={Img} style={styles.imagesview} />
            </View>
            <View style={styles.viewdel}>
              <Text></Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('UpdateImgaesCoaching')}>
                <Image source={Edit} style={styles.actionimg} />
              </TouchableOpacity>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>Credentails Details</Text>
              <Text></Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>Student Default Password </Text>
              <Text style={{fontWeight: 700}}>Parent Default Password</Text>
            </View>
            <View style={styles.viewdel}>
              <Text>Student</Text>
              <Text>Parent</Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>Employee Default Password </Text>
              <Text style={{fontWeight: 700}}></Text>
            </View>
            <View style={styles.viewdel}>
              <Text>Employee</Text>
              <Text></Text>
            </View>
            <View style={styles.viewdel}>
              <Text></Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('UpdateCredentialCoaching')}>
                <Image source={Edit} style={styles.actionimg} />
              </TouchableOpacity>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>Communication Details</Text>
              <Text></Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700}}>Email</Text>
              <Text style={{fontWeight: 700}}>Password</Text>
            </View>
            <View style={styles.viewdel}>
              <Text>Ab@gmail.com</Text>
              <Text>ab@123</Text>
            </View>

            <View style={styles.viewdel}>
              <Text></Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UpdateCommunicationCoaching')
                }>
                <Image source={Edit} style={styles.actionimg} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  connainer: {
    paddingHorizontal: 10,
  },
  card10: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  viewdel: {
    display: 'flex',
    flexDirection: 'row',
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
  donationButton: {
    backgroundColor: primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    borderRadius: 10,
    width: '45%',
    height: 40,
  },
  avtiveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  actionimg: {
    width: 39,
    height: 40,
  },
  actionimg10: {
    width: 40,
    height: 40,
  },
  mainActionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '30%',
    justifyContent: 'space-between',
  },
  imagesview: {
    width: Width(320),
    height: Height(200),
  },
});
