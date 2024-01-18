import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Height, Width} from '../../utils/responsive';
import {primary} from '../../utils/Colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import check from '../../assets/check1.png';

const formData = new FormData();
const UpdateImgaes = () => {
  const [openModel, setopenModel] = useState(false);
  const [passportsize, setpassportsize] = useState('');
  const [logo, setlogo] = useState('');
  const [Certificatelogo, setCertificatelogo] = useState('');

  const handleChoosePhotoSignature = () => {
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
        setpassportsize(Response.assets[0].uri);
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
          formData.append('sign', file);
        }
      }
    });
  };

  const handleTakePhotoSignature = () => {
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
        setpassportsize(Response.assets[0].uri);

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
          formData.append('sign', file);
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
        setlogo(Response.assets[0].uri);
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
          formData.append('sign', file);
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
        setlogo(Response.assets[0].uri);

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
          formData.append('sign', file);
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
        setCertificatelogo(Response.assets[0].uri);
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
          formData.append('sign', file);
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
        setCertificatelogo(Response.assets[0].uri);

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
          formData.append('sign', file);
        }
      }
    });
  };
  return (
    <View>
      <Modal animationType={'fade'} transparent={true} visible={openModel}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={[styles.modal, styles.elevation]}>
            <View style={styles.cancalView}>
              <TouchableOpacity>
                <Image source={check} style={styles.checkstyleimg} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonmodal}>
              <TouchableOpacity style={styles.processpatbtn}>
                <View>
                  <Text style={{color: 'white', fontSize: 16}}>
                    Process To Fee
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setopenModel(false)}
                style={styles.okbtn}>
                <View>
                  <Text style={{color: 'white', fontSize: 16}}>Ok!</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView>
        <View style={styles.enquirymainview}>
          <View style={styles.dateview}>
            <View style={{paddingHorizontal: 10}}>
              <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
                Profile Photo
              </Text>
              <View>
                {passportsize ? (
                  <>
                    <Image
                      source={{uri: passportsize}}
                      style={styles.imgprestyle}
                    />
                  </>
                ) : (
                  <>
                    <View style={styles.imgpreview}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoSignature()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                          {/* <Text>Camera</Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoSignature()}>
                        <View>
                          <Ionicons name="image" size={50} />
                          {/* <Text>Gallery</Text> */}
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
                {logo ? (
                  <>
                    <Image source={{uri: logo}} style={styles.imgprestyle} />
                  </>
                ) : (
                  <>
                    <View style={styles.imgpreview}>
                      <TouchableOpacity onPress={() => handleTakePhotoLogo()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                          {/* <Text>Camera</Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleChoosePhotoLogo()}>
                        <View>
                          <Ionicons name="image" size={50} />
                          {/* <Text>Gallery</Text> */}
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
                {Certificatelogo ? (
                  <>
                    <Image
                      source={{uri: Certificatelogo}}
                      style={styles.imgprestyle}
                    />
                  </>
                ) : (
                  <>
                    <View style={styles.imgpreview}>
                      <TouchableOpacity
                        onPress={() => handleTakePhotoCertificatelogo()}>
                        <View>
                          <Ionicons name="camera" size={50} />
                          {/* <Text>Camera</Text> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChoosePhotoCertificatelogo()}>
                        <View>
                          <Ionicons name="image" size={50} />
                          {/* <Text>Gallery</Text> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
          <View style={styles.loginbtndiv}>
            <TouchableOpacity onPress={() => setopenModel(true)}>
              <View style={styles.loginbtn}>
                <Text style={styles.logintextstyle}>Update</Text>
              </View>
            </TouchableOpacity>
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
