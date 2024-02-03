import {StyleSheet, View, ScrollView, TouchableOpacity,Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {useDispatch} from 'react-redux';
import RNInputField from '../../../Component/RNInputField';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import {Colors, primary} from '../../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../../Component/Header/BackHeader';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {backendApiUrl} from '../../../Config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetSlider} from '../../../redux/action/commanAction';
let formData = new FormData();
const Addsliderimg = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [PreviewSliderimg, setPreviewSliderimg] = useState('');
  const [ImgCaption, setImgCaption] = useState('');
  const [loading, setloading] = useState(false);

  const submit = async () => {
    setloading(true);
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    };
    formData.append('Dec', ImgCaption);

    const {data} = await axios.post(
      `${backendApiUrl}comman/slider`,
      formData,
      config,
    );

    if (data?.status === true) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data?.msg,
      });

      setloading(false);
      dispatch(GetSlider());
      navigation.goBack();
    }
  };

  const handleChoosePhotoSlider = () => {
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
        setPreviewSliderimg(Response.assets[0].uri);
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
          formData.append('ImgUrl', file);
        }
      }
    });
  };

  const handleTakePhotoSlider = () => {
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
        setPreviewSliderimg(Response.assets[0].uri);

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
          formData.append('ImgUrl', file);
        }
      }
    });
  };

  useEffect(() => {
    formData = new FormData();
  }, []);
  return (
    <View>
      <BackHeader title={'Add Slider'} />
      <ScrollView>
        <View style={styles.enquirymainview}>
          <View
            style={{
              marginHorizontal: deviceWidth * 0.04,
              position: 'relative',
              marginTop: 0,
            }}>
            <RNInputField
              style={{backgroundColor: Colors.fadeGray}}
              label="Img Caption"
              value={ImgCaption}
              onChangeText={data => setImgCaption(data)}
              placeholder="Enter Img Caption"
            />
          </View>
          <View style={styles.mainImg}>
            {PreviewSliderimg ? (
              <>
                <View style={{position: 'relative'}}>
                  <View
                    style={{
                      position: 'absolute',
                      zIndex: 10,
                      left: Width(150),
                      top: Height(40),
                    }}>
                    <TouchableOpacity onPress={() => handleTakePhotoSlider()}>
                      <View>
                        <Ionicons name="camera" size={50} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleChoosePhotoSlider()}>
                      <View>
                        <Ionicons name="image" size={50} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={{uri: PreviewSliderimg}}
                    style={styles.imgprestyle}
                  />
                </View>
              </>
            ) : (
              <>
                <View style={styles.imgpreview}>
                  <TouchableOpacity onPress={() => handleTakePhotoSlider()}>
                    <View>
                      <Ionicons name="camera" size={50} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleChoosePhotoSlider()}>
                    <View>
                      <Ionicons name="image" size={50} />
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          <RNButton
            loading={loading}
            onPress={submit}
            style={{marginHorizontal: 20, marginTop: 20}}>
            Save & Next
          </RNButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default Addsliderimg;

const styles = StyleSheet.create({
  mainImg: {
    paddingHorizontal: 20,
  },
  imgpreview: {
    height: 200,
    borderWidth: 1.5,
    borderColor: primary,
    backgroundColor: Colors.fadeGray,
    borderStyle: 'dotted',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgprestyle: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  enquirymainview: {
    paddingTop: deviceHeight * 0.01,
  },
  dropstyle: {
    alignSelf: 'center',
    width: '100%',
    height: Height(52),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: Width(15),
    paddingHorizontal: Width(20),
    fontSize: Height(16),
    marginTop: Height(10),
    backgroundColor: Colors.fadeGray,
    color: 'white',
  },
});
