import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Height, Width} from '../../../utils/responsive';
import {primary} from '../../../utils/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import check from '../../../assets/check1.png';
const data = [
  {label: 'DCA', value: 'DCA'},
  {label: 'ADCA', value: 'ADCA'},
  {label: 'CCC', value: 'CCC'},
  {label: 'O-LEVEL', value: 'O-LEVEL'},
];
const formData = new FormData();
const AddNewStudent = () => {
  const [index, setIndex] = useState(0);
  const [fromdate, setfromdate] = useState('');
  const [course, setcourse] = useState('');
  const [openModel, setopenModel] = useState(false);
  const [selectedValue, setSelectedValue] = useState('option1');
  const [passportsize, setpassportsize] = useState('');
  const [MarkSheet, setMarkSheet] = useState('');
  const [adharcard, setadharcard] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setfromdate(date);
  };
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

  const handleChooseadhar = () => {
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
        setadharcard(Response.assets[0].uri);
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

  const handleTakeadhar = () => {
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
        setadharcard(Response.assets[0].uri);

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

  const handleChooseMarksheet = () => {
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
        setMarkSheet(Response.assets[0].uri);
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

  const handleTakePhotoMarksheet = () => {
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
        setMarkSheet(Response.assets[0].uri);

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
              {/* <TouchableOpacity style={styles.processpatbtn}>
                  <View>
                    <Text style={{color: 'white', fontSize: 16}}>
                      Process To Fee
                    </Text>
                  </View>
                </TouchableOpacity> */}
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
            <TouchableOpacity
              style={styles.addinput}
              onPress={() => {
                setIndex(6), showDatePicker();
              }}>
              <FontAwesome5
                name="calendar"
                size={Height(20)}
                color="#666666"
                style={{marginLeft: Width(10)}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: Height(16),
                  marginLeft: Width(20),
                }}>
                {fromdate
                  ? moment(fromdate).format('DD/MM/YYYY')
                  : 'Admission Date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 3 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(3)}>
              <TextInput
                placeholder="Student Name"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(3)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 4 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(4)}>
              <TextInput
                placeholder="Student Phone No"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(4)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 5 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(5)}>
              <TextInput
                placeholder="Student Email"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(5)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 6 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(6)}>
              <TextInput
                placeholder="Fathers Phone No"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(6)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 7 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(7)}>
              <TextInput
                placeholder="Fathers Name"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(7)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 8 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(8)}>
              <TextInput
                placeholder="State"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(8)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 9 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(9)}>
              <TextInput
                placeholder="City"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(9)}
              />
            </View>
            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 10 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(10)}>
              <TextInput
                placeholder="Pin Code"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(10)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 11 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(11)}>
              <TextInput
                placeholder="Pan No"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(11)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 12 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(12)}>
              <TextInput
                placeholder="Adhar Card No"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(12)}
              />
            </View>

            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 13 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(13)}>
              <TextInput
                placeholder="Sr Number"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(13)}
              />
            </View>

            <View style={{paddingHorizontal: 10}}>
              <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
                Password Size Photo
              </Text>
              <View style={styles.imgpreview}>
                {passportsize ? (
                  <>
                    <Image
                      source={{uri: passportsize}}
                      style={styles.imgprestyle}
                    />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </View>
              <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
                Adhar Card
              </Text>
              <View style={styles.imgpreview}>
                {passportsize ? (
                  <>
                    <Image
                      source={{uri: passportsize}}
                      style={styles.imgprestyle}
                    />

                    {console.log('images', passportsize)}
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </View>
              <Text style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
                Previous MarkSheet
              </Text>
              <View style={styles.imgpreview}>
                {passportsize ? (
                  <>
                    <Image
                      source={{uri: passportsize}}
                      style={styles.imgprestyle}
                    />

                    {console.log('images', passportsize)}
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </View>
            </View>

            <Dropdown
              style={{
                alignSelf: 'center',
                width: Width(355),
                height: Height(45),
                fontFamily: 'Gilroy-SemiBold',
                borderWidth: 1.5,
                borderRadius: Width(5),
                paddingHorizontal: Width(20),
                fontSize: 55,
                marginTop: Height(10),
                borderColor: index === 1 ? primary : '#a9a9a9',
              }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Batch"
              searchPlaceholder="Search..."
              value={course}
              onChange={item => {
                setcourse(item.value);
              }}
              // renderLeftIcon={() => (
              //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              // )}
            />
            <Dropdown
              style={{
                alignSelf: 'center',
                width: Width(355),
                height: Height(45),
                fontFamily: 'Gilroy-SemiBold',
                borderWidth: 1.5,
                borderRadius: Width(5),
                paddingHorizontal: Width(20),
                fontSize: 55,
                marginTop: Height(10),
                borderColor: index === 1 ? primary : '#a9a9a9',
              }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Course"
              searchPlaceholder="Search..."
              value={course}
              onChange={item => {
                setcourse(item.value);
              }}
              // renderLeftIcon={() => (
              //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              // )}
            />
            <View
              style={{
                width: Width(355),
                height: Height(45),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderRadius: Width(5),
                borderColor: index === 7 ? primary : '#a9a9a9',
                marginTop: Height(10),
              }}
              onStartShouldSetResponder={() => setIndex(7)}>
              <TextInput
                placeholder="Course Duration"
                placeholderTextColor="rgba(0, 0, 0, 0.6)"
                style={{
                  width: Width(280),
                  fontFamily: 'Gilroy-SemiBold',
                  paddingHorizontal: Width(20),
                  fontSize: Height(16),
                }}
                // secureTextEntry={passwordVisible}
                // onBlur={() => Validation()}
                // value={address}
                // onChangeText={text => setaddress(text)}
                // onPressIn={() => setIndex(3)}
                onFocus={() => setIndex(7)}
              />
            </View>

            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="option1"
                  status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedValue('option1')}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Default fee Structure</Text>
              </View>
            </View>

            {selectedValue === 'option1' && (
              <>
                <Text style={styles.inputLabel}>Registration Fee</Text>
                <View
                  style={{
                    width: Width(355),
                    height: Height(45),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    borderColor: index === 5 ? primary : '#a9a9a9',
                    marginTop: Height(10),
                  }}
                  onStartShouldSetResponder={() => setIndex(5)}>
                  <TextInput
                    placeholder="Registration Fee"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      width: Width(280),
                      fontFamily: 'Gilroy-SemiBold',
                      paddingHorizontal: Width(20),
                      fontSize: Height(16),
                    }}
                    // secureTextEntry={passwordVisible}
                    // onBlur={() => Validation()}
                    value={'200'}
                    // onChangeText={text => setaddress(text)}
                    // onPressIn={() => setIndex(3)}
                    onFocus={() => setIndex(5)}
                  />
                </View>
                <Text style={styles.inputLabel}>Monthly Fee</Text>
                <View
                  style={{
                    width: Width(355),
                    height: Height(45),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    borderColor: index === 5 ? primary : '#a9a9a9',
                    marginTop: Height(10),
                  }}
                  onStartShouldSetResponder={() => setIndex(5)}>
                  <TextInput
                    placeholder="Monthly Fee"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      width: Width(280),
                      fontFamily: 'Gilroy-SemiBold',
                      paddingHorizontal: Width(20),
                      fontSize: Height(16),
                    }}
                    // secureTextEntry={passwordVisible}
                    // onBlur={() => Validation()}
                    value={'400'}
                    // onChangeText={text => setaddress(text)}
                    // onPressIn={() => setIndex(3)}
                    onFocus={() => setIndex(5)}
                  />
                </View>
                <Text style={styles.inputLabel}>Total Fee</Text>
                <View
                  style={{
                    width: Width(355),
                    height: Height(45),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    borderColor: index === 5 ? primary : '#a9a9a9',
                    marginTop: Height(10),
                  }}
                  onStartShouldSetResponder={() => setIndex(5)}>
                  <TextInput
                    placeholder="Total Fee"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      width: Width(280),
                      fontFamily: 'Gilroy-SemiBold',
                      paddingHorizontal: Width(20),
                      fontSize: Height(16),
                    }}
                    // secureTextEntry={passwordVisible}
                    // onBlur={() => Validation()}
                    value={'4000'}
                    // onChangeText={text => setaddress(text)}
                    // onPressIn={() => setIndex(3)}
                    onFocus={() => setIndex(5)}
                  />
                </View>
              </>
            )}
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="option2"
                  status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedValue('option2')}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>Manual fee Structure</Text>
              </View>
            </View>

            {selectedValue === 'option2' && (
              <>
                <Text style={styles.inputLabel}>Registration Fee</Text>
                <View
                  style={{
                    width: Width(355),
                    height: Height(40),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    borderColor: index === 5 ? primary : '#a9a9a9',
                    marginTop: Height(10),
                  }}
                  onStartShouldSetResponder={() => setIndex(5)}>
                  <TextInput
                    placeholder="Registration Fee"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      width: Width(280),
                      fontFamily: 'Gilroy-SemiBold',
                      paddingHorizontal: Width(20),
                      fontSize: Height(16),
                    }}
                    // secureTextEntry={passwordVisible}
                    // onBlur={() => Validation()}
                    value={'200'}
                    // onChangeText={text => setaddress(text)}
                    // onPressIn={() => setIndex(3)}
                    onFocus={() => setIndex(5)}
                  />
                </View>
                <Text style={styles.inputLabel}>Monthly Fee</Text>
                <View
                  style={{
                    width: Width(355),
                    height: Height(40),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    borderColor: index === 5 ? primary : '#a9a9a9',
                    marginTop: Height(10),
                  }}
                  onStartShouldSetResponder={() => setIndex(5)}>
                  <TextInput
                    placeholder="Monthly Fee"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      width: Width(280),
                      fontFamily: 'Gilroy-SemiBold',
                      paddingHorizontal: Width(20),
                      fontSize: Height(16),
                    }}
                    // secureTextEntry={passwordVisible}
                    // onBlur={() => Validation()}
                    value={'400'}
                    // onChangeText={text => setaddress(text)}
                    // onPressIn={() => setIndex(3)}
                    onFocus={() => setIndex(5)}
                  />
                </View>
                <Text style={styles.inputLabel}>Total Fee</Text>
                <View
                  style={{
                    width: Width(355),
                    height: Height(40),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: Width(5),
                    borderColor: index === 5 ? primary : '#a9a9a9',
                    marginTop: Height(10),
                  }}
                  onStartShouldSetResponder={() => setIndex(5)}>
                  <TextInput
                    placeholder="Total Fee"
                    placeholderTextColor="rgba(0, 0, 0, 0.6)"
                    style={{
                      width: Width(280),
                      fontFamily: 'Gilroy-SemiBold',
                      paddingHorizontal: Width(20),
                      fontSize: Height(16),
                    }}
                    // secureTextEntry={passwordVisible}
                    // onBlur={() => Validation()}
                    value={'4000'}
                    // onChangeText={text => setaddress(text)}
                    // onPressIn={() => setIndex(3)}
                    onFocus={() => setIndex(5)}
                  />
                </View>
              </>
            )}
          </View>
          <View style={styles.loginbtndiv}>
            <TouchableOpacity onPress={() => setopenModel(true)}>
              <View style={styles.loginbtn}>
                <Text style={styles.logintextstyle}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddNewStudent;

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
    height: Height(45),
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
    borderRadius: 5,
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
    height: '20%',
    // position: 'relative',
  },
  elevation: {
    shadowColor: '#52006A',
    elevation: 20,
  },
  cancalView: {
    position: 'absolute',
    bottom: Height(130),
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
