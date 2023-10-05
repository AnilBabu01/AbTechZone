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
const data = [
  {label: 'DCA', value: 'DCA'},
  {label: 'ADCA', value: 'ADCA'},
  {label: 'CCC', value: 'CCC'},
  {label: 'O-LEVEL', value: 'O-LEVEL'},
];
const formData = new FormData();
const Add = () => {
  const [index, setIndex] = useState(0);
  const [fromdate, setfromdate] = useState('');
  const [course, setcourse] = useState('');
  const [selectedValue, setSelectedValue] = useState('option1');
  const [passportsize, setpassportsize] = useState('');
  const [showimaginput, setshowimaginput] = useState(false);
  const [showfeeandfinal, setshowfeeandfinal] = useState(false);
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
  return (
    <ScrollView>
      <View style={styles.enquirymainview}>
        <View style={styles.dateview}>
          {showimaginput ? (
            <>
              {showfeeandfinal ? (
                <>
                  <Dropdown
                    style={{
                      alignSelf: 'center',
                      width: Width(310),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
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
                      width: Width(310),
                      height: Height(40),
                      fontFamily: 'Gilroy-SemiBold',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
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
                      width: Width(310),
                      height: Height(40),
                      alignSelf: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1.5,
                      borderRadius: Width(10),
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
                        status={
                          selectedValue === 'option1' ? 'checked' : 'unchecked'
                        }
                        onPress={() => setSelectedValue('option1')}
                        color="#007BFF"
                      />
                      <Text style={styles.radioLabel}>
                        Default fee Structure
                      </Text>
                    </View>
                  </View>

                  {selectedValue === 'option1' && (
                    <>
                      <Text style={styles.inputLabel}>Registration Fee</Text>
                      <View
                        style={{
                          width: Width(310),
                          height: Height(40),
                          alignSelf: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderWidth: 1.5,
                          borderRadius: Width(10),
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
                          width: Width(310),
                          height: Height(40),
                          alignSelf: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderWidth: 1.5,
                          borderRadius: Width(10),
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
                          width: Width(310),
                          height: Height(40),
                          alignSelf: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderWidth: 1.5,
                          borderRadius: Width(10),
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
                        status={
                          selectedValue === 'option2' ? 'checked' : 'unchecked'
                        }
                        onPress={() => setSelectedValue('option2')}
                        color="#007BFF"
                      />
                      <Text style={styles.radioLabel}>
                        Manual fee Structure
                      </Text>
                    </View>
                  </View>

                  {selectedValue === 'option2' && (
                    <>
                      <Text style={styles.inputLabel}>Registration Fee</Text>
                      <View
                        style={{
                          width: Width(310),
                          height: Height(40),
                          alignSelf: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderWidth: 1.5,
                          borderRadius: Width(10),
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
                          width: Width(310),
                          height: Height(40),
                          alignSelf: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderWidth: 1.5,
                          borderRadius: Width(10),
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
                          width: Width(310),
                          height: Height(40),
                          alignSelf: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderWidth: 1.5,
                          borderRadius: Width(10),
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
                </>
              ) : (
                <>
                  <View style={{paddingHorizontal: 10}}>
                    <Text style={{fontSize: 20, marginBottom: 10}}>
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
                    <Text
                      style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
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
                    <Text
                      style={{fontSize: 20, marginBottom: 10, marginTop: 8}}>
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
                </>
              )}
            </>
          ) : (
            <>
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
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
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
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
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
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
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
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
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
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  borderColor: index === 6 ? primary : '#a9a9a9',
                  marginTop: Height(10),
                }}
                onStartShouldSetResponder={() => setIndex(6)}>
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
                  onFocus={() => setIndex(6)}
                />
              </View>

              <View
                style={{
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  borderColor: index === 6 ? primary : '#a9a9a9',
                  marginTop: Height(10),
                }}
                onStartShouldSetResponder={() => setIndex(6)}>
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
                  onFocus={() => setIndex(6)}
                />
              </View>

              <View
                style={{
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  borderColor: index === 6 ? primary : '#a9a9a9',
                  marginTop: Height(10),
                }}
                onStartShouldSetResponder={() => setIndex(6)}>
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
                  onFocus={() => setIndex(6)}
                />
              </View>
              <View
                style={{
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  borderColor: index === 6 ? primary : '#a9a9a9',
                  marginTop: Height(10),
                }}
                onStartShouldSetResponder={() => setIndex(6)}>
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
                  onFocus={() => setIndex(6)}
                />
              </View>

              <View
                style={{
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  borderColor: index === 6 ? primary : '#a9a9a9',
                  marginTop: Height(10),
                }}
                onStartShouldSetResponder={() => setIndex(6)}>
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
                  onFocus={() => setIndex(6)}
                />
              </View>

              <View
                style={{
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  borderColor: index === 6 ? primary : '#a9a9a9',
                  marginTop: Height(10),
                }}
                onStartShouldSetResponder={() => setIndex(6)}>
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
                  onFocus={() => setIndex(6)}
                />
              </View>

              <View
                style={{
                  width: Width(310),
                  height: Height(40),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderRadius: Width(10),
                  borderColor: index === 6 ? primary : '#a9a9a9',
                  marginTop: Height(10),
                }}
                onStartShouldSetResponder={() => setIndex(6)}>
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
                  onFocus={() => setIndex(6)}
                />
              </View>
            </>
          )}
        </View>
        {showimaginput ? (
          <>
            {showfeeandfinal ? (
              <>
                <View style={styles.loginbtndiv10}>
                  <TouchableOpacity
                    onPress={() => {
                      setshowimaginput(true);
                      setshowfeeandfinal(false);
                    }}>
                    <View style={styles.loginbtn10}>
                      <Text style={styles.logintextstyle}>Back</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setshowfeeandfinal(true)}>
                    <View style={styles.loginbtn10}>
                      <Text style={styles.logintextstyle}>Save</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={styles.loginbtndiv10}>
                  <TouchableOpacity
                    onPress={() => {
                      setshowimaginput(false);
                      setshowfeeandfinal(false);
                    }}>
                    <View style={styles.loginbtn10}>
                      <Text style={styles.logintextstyle}>Back</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setshowfeeandfinal(true)}>
                    <View style={styles.loginbtn10}>
                      <Text style={styles.logintextstyle}>Next</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        ) : (
          <>
            <View style={styles.loginbtndiv}>
              <TouchableOpacity onPress={() => setshowimaginput(true)}>
                <View style={styles.loginbtn}>
                  <Text style={styles.logintextstyle}>Next</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Add;

const styles = StyleSheet.create({
  inputview: {
    width: Width(360),
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
  },
  baseinput: {
    width: Width(310),
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
    width: Width(310),
    borderWidth: 1,
    // borderColor: index === 7 ? primary : '#a9a9a9',
    alignSelf: 'center',
    borderRadius: Width(10),
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
    width: Width(310),
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
    paddingHorizontal: 10,
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
});
