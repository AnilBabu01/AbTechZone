import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../utils/responsive';
import {primary} from '../../utils/Colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackHeader from '../../Component/Header/BackHeader';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {backendApiUrl} from '../../Config/config';
import {useNavigation} from '@react-navigation/native';
import {loadUser} from '../../redux/action/authActions';
import RNButton from '../../Component/RNButton';

let formData = new FormData();
const UpdateImgaes = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [owername, setowername] = useState('');
  const [email, setemail] = useState('');
  const [phoneno1, setphoneno1] = useState('');
  const [phoneno2, setphoneno2] = useState('');
  const [organizationName, setorganizationName] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setpincode] = useState('');

  const [passportsize, setpassportsize] = useState('');
  const [logo, setlogo] = useState('');
  const [Certificatelogo, setCertificatelogo] = useState('');

  const [passportsizeurl, setpassportsizeurl] = useState('');
  const [logourl, setlogourl] = useState('');
  const [Certificatelogourl, setCertificatelogourl] = useState('');

  const {user} = useSelector(state => state.auth);
  const submit = async () => {
    try {
      setloading(true);
      formData.append('name', owername);
      formData.append('email', email);
      formData.append('institutename', organizationName);
      formData.append('phoneno1', phoneno1);
      formData.append('phoneno2', phoneno2);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('pincode', pincode);
      formData.append(
        'profileurl',
        passportsize ? passportsize : user?.data?.CredentailsData?.profileurl,
      );
      formData.append(
        'certificatelogo',
        Certificatelogo
          ? Certificatelogo
          : user?.data?.CredentailsData?.certificatelogo,
      );
      formData.append(
        'logourl',
        logo ? logo : user?.data?.CredentailsData?.logourl,
      );
      let token = await AsyncStorage.getItem('erptoken');

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      };

      const {data} = await axios.put(
        `${backendApiUrl}comman/credentials`,
        formData,
        config,
      );

      if (data?.status) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: data?.msg,
        });
        navigation.goBack();
        dispatch(loadUser());
        formData = new FormData();
      }

      if (data?.status === false) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: data?.msg,
        });

        formData = new FormData();
      }
    } catch (error) {
      formData = new FormData();
    }
  };

  useEffect(() => {
    if (user) {
      setowername(user?.data?.CredentailsData?.name);
      setemail(user?.data?.CredentailsData?.email);
      setaddress(user?.data?.CredentailsData?.address);
      setcity(user?.data?.CredentailsData?.city);
      setorganizationName(user?.data?.CredentailsData?.institutename);
      setpincode(user?.data?.CredentailsData?.pincode);
      setstate(user?.data?.CredentailsData?.state);
      setphoneno1(user?.data?.CredentailsData?.phoneno1);
      setphoneno2(user?.data?.CredentailsData?.phoneno1);

      console.log(
        'user?.data?.CredentailsData?',
        user?.data?.CredentailsData?.email,
      );
    }
  }, []);

  useEffect(() => {
    formData = new FormData();
  }, []);

  const handleChoosePhotoPasswordSize = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setpassportsizeurl(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };
        if (file != null) {
          passportsize(file);
        }
      }
    });
  };

  const handleTakePhotoPasswordSize = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setpassportsizeurl(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          passportsize(file);
        }
      }
    });
  };

  const handleChoosePhotoLogo = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setlogourl(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };
        if (file != null) {
          setlogo(file);
        }
      }
    });
  };

  const handleTakePhotoLogo = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setlogourl(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          setlogo(file);
        }
      }
    });
  };

  const handleChoosePhotoCertificatelogo = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setCertificatelogourl(Response.assets[0].uri);
        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };
        if (file != null) {
          setCertificatelogo(file);
        }
      }
    });
  };

  const handleTakePhotoCertificatelogo = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };

    launchCamera(options, Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
      } else {
        setCertificatelogourl(Response.assets[0].uri);

        const source =
          Platform.OS === 'android'
            ? Response.assets[0].uri
            : Response.assets[0].uri.replace('file://', '');
        const name = Response.assets[0].fileName;
        const type = Response.assets[0].type;
        const file = {
          uri: source,
          name: name,
          type: type,
        };

        if (file != null) {
          setCertificatelogo(file);
        }
      }
    });
  };
  return (
    <View>
      <BackHeader title={'Edit Profile'} />

      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <View style={{paddingHorizontal: 10}}>
              <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
                Profile Photo
              </Text>
              <View>
                {user?.data?.CredentailsData?.profileurl || passportsizeurl ? (
                  <>
                    <View style={{position: 'relative'}}>
                      <View
                        style={{
                          position: 'absolute',
                          zIndex: 10,
                          left: Width(150),
                          top: Height(40),
                        }}>
                        <TouchableOpacity
                          onPress={() => handleTakePhotoPasswordSize()}>
                          <View>
                            <Ionicons name="camera" size={50} />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleChoosePhotoPasswordSize()}>
                          <View>
                            <Ionicons name="image" size={50} />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <Image
                        source={{
                          uri: passportsizeurl
                            ? passportsizeurl
                            : user?.data?.CredentailsData?.profileurl,
                        }}
                        style={styles.imgprestyle}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.imgpreview}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoPasswordSize()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoPasswordSize()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
              <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
                Logo
              </Text>
              <View>
                {user?.data?.CredentailsData?.logourl || logourl ? (
                  <>
                    <View style={{position: 'relative'}}>
                      <View
                        style={{
                          position: 'absolute',
                          zIndex: 10,
                          left: Width(150),
                          top: Height(40),
                        }}>
                        <TouchableOpacity onPress={() => handleTakePhotoLogo()}>
                          <View>
                            <Ionicons name="camera" size={50} />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleChoosePhotoLogo()}>
                          <View>
                            <Ionicons name="image" size={50} />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <Image
                        source={{
                          uri: logourl
                            ? logourl
                            : user?.data?.CredentailsData?.logourl,
                        }}
                        style={styles.imgprestyle}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.imgpreview}>
                      <TouchableOpacity onPress={() => handleTakePhotoLogo()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleChoosePhotoLogo()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
              <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
                Certificate
              </Text>
              <View>
                {Certificatelogourl ||
                user?.data?.CredentailsData?.certificatelogo ? (
                  <>
                    <View style={{position: 'relative'}}>
                      <View
                        style={{
                          position: 'absolute',
                          zIndex: 10,
                          left: Width(150),
                          top: Height(40),
                        }}>
                        <TouchableOpacity
                          onPress={() => handleTakePhotoCertificatelogo()}>
                          <View>
                            <Ionicons name="camera" size={50} />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleChoosePhotoCertificatelogo()}>
                          <View>
                            <Ionicons name="image" size={50} />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <Image
                        source={{
                          uri: Certificatelogourl
                            ? Certificatelogourl
                            : user?.data?.CredentailsData?.certificatelogo,
                        }}
                        style={styles.imgprestyle}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.imgpreview}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoCertificatelogo()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoCertificatelogo()}>
                        <View>
                          <Ionicons name="image" size={50} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
          <View style={{paddingVertical: 50}}>
            <RNButton
              loading={loading}
              style={{paddingHorizontal: 25}}
              onPress={() => {
                submit();
              }}>
              Update $ Next
            </RNButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateImgaes;

const styles = StyleSheet.create({
  inputview: {
    width: Width(355),
    height: Height(50),
    backgroundColor: '#E9EAEC',
    alignSelf: 'center',
    borderRadius: Width(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Height(10),
  },
  inputsaerch: {
    paddingLeft: Width(30),
    fontFamily: 'Gilroy-SemiBold',
    color: 'black',
    fontSize: Height(16),
    width: Width(260),
  },
  enquirymainview: {
    paddingHorizontal: 2,
    paddingBottom: 10,
  },
  baseinput: {
    width: Width(355),
    height: Height(40),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Width(10),
    // borderColor: index === 3 ? primary: '#a9a9a9',
    marginTop: Height(10),
  },

  addinput: {
    height: Height(40),
    width: Width(355),
    borderWidth: 1,
    // borderColor: index === 7 ? primary : '#a9a9a9',
    alignSelf: 'center',
    borderRadius: Width(5),
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Height(10),
  },
  loginbtndiv: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  loginbtn: {
    width: Width(355),
    height: Height(40),
    backgroundColor: primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginbtndiv10: {
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  loginbtn10: {
    width: Width(80),
    height: Height(40),
    backgroundColor: primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logintextstyle: {
    color: 'white',
    // fontWeight: 700,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  chooseview: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imgpreview: {
    height: 200,
    borderWidth: 1.5,
    borderColor: primary,
    borderStyle: 'dotted',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgprestyle: {
    width: '100%',
    height: 200,
  },
  radioGroup: {
    paddingHorizontal: 5,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  inputLabel: {
    marginLeft: 13,
    fontSize: 16,
    color: '#333',
  },
  modal: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    position: 'relative',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // marginTop: '15%',
    paddingBottom: 10,
    height: '25%',
    // position: 'relative',
  },
  elevation: {
    shadowColor: '#52006A',
    elevation: 20,
  },
  cancalView: {
    position: 'absolute',
    bottom: Height(170),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 5,
  },
  buttonmodal: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  checkstyleimg: {
    height: 50,
    width: 50,
  },
  processpatbtn: {
    width: Width(120),
    height: Height(40),
    backgroundColor: primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  okbtn: {
    width: Width(50),
    height: Height(50),
    backgroundColor: primary,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    marginTop: 25,
  },
});
