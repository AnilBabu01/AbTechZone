import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {primary, Colors} from '../../../utils/Colors';
import Header from '../../../Component/Header/Header';
import {deviceWidth} from '../../../utils/constant';
import {useSelector} from 'react-redux'
const SchoolEmploye = () => {
  const {user} = useSelector(state => state.auth);

  return (
    <>
    
      <ScrollView>
        <View style={styles.connainer}>
          <View style={styles.card10}>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                Institute Details
              </Text>
              <Text></Text>
            </View>

            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                Owner Name
              </Text>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                Client Code
              </Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                {user?.data?.CredentailsData?.name}
              </Text>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                {user?.data?.CredentailsData?.ClientCode}
              </Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                Official Email
              </Text>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                Institute Name
              </Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                {user?.data?.CredentailsData?.email}
              </Text>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                {user?.data?.CredentailsData?.name}
              </Text>
            </View>

            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                Phone No1
              </Text>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                Phone No2
              </Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                {user?.data?.CredentailsData?.phoneno1}
              </Text>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                {user?.data?.CredentailsData?.phoneno2}
              </Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700, color: Colors.black}}>State</Text>
              <Text style={{fontWeight: 700, color: Colors.black}}>City</Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                {user?.data?.CredentailsData?.state}
              </Text>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                {user?.data?.CredentailsData?.city}
              </Text>
            </View>
            <View style={styles.viewdel}>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                Address
              </Text>
              <Text style={{fontWeight: 700, color: Colors.black}}>
                Pincode
              </Text>
            </View>
            <View style={styles.viewdel}>
              <View style={{width: '50%'}}>
                <Text style={{fontWeight: 700, color: Colors.black}}>
                  {user?.data?.CredentailsData?.address}
                </Text>
              </View>

              <Text style={{fontWeight: 700, color: Colors.black}}>
                {user?.data?.CredentailsData?.pincode}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SchoolEmploye;

const styles = StyleSheet.create({
  mainshowoption: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'space-between',
  },
  dividerview: {
    borderWidth: 2,
    borderColor: Colors.primary,
    marginVertical: 10,
    backgroundColor: Colors.primary,
  },
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
    width: '100%',
    height: deviceWidth * 0.5,
    resizeMode: 'contain',
  },

  imagesviewprofileurl: {
    width: deviceWidth * 0.5,
    height: deviceWidth * 0.5,
    resizeMode: 'contain',
  },
  imagesviewlogourl: {
    width: '100%',
    height: deviceWidth * 0.5,
    resizeMode: 'contain',
  },
});
