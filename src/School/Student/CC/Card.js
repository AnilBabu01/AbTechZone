import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import {primary, Colors} from '../../../utils/Colors';
import {useDispatch} from 'react-redux';
import {serverInstance} from '../../../API/ServerInstance';
import Toast from 'react-native-toast-message';
import RNButton from '../../../Component/RNButton';
import {getstudent} from '../../../redux/action/commanAction';

const Card = ({data}) => {
  const dispatch = useDispatch();
  const [loader, setloader] = useState(false);

  const submit = () => {
    setloader(true);

    serverInstance('student/IssueCC', 'post', {
      student: data,
      CCStatus: data?.CCStatus === false ? 1 : 0,
    }).then(res => {
      if (res?.status === true) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });

        setloader(false);
        dispatch(getstudent());
      }
      if (res?.status === false) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });

        setloader(false);
      }
    });
  };

  const confirmation = () => {
    Alert.alert(
      'Delete',
      'Do you really want to Issue CC?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => submit(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.connainer}>
          <View style={styles.card10}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              Session : {data?.Session}
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              Roll No : {data?.rollnumber}
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              Class : {data?.courseorclass}
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              Section : {data?.Section}
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              Sr Number : {data?.SrNumber}
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              Student Name : {data?.name}
            </Text>

            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.black}}>
              Character Certificate Status :
              {data?.CCStatus ? 'Issued' : 'Not Issued'}
            </Text>
            <View style={{marginVertical: 10}}>
              <RNButton
                loading={loader}
                style={{paddingHorizontal: 25}}
                disable={data?.CCStatus}
                onPress={() => {
                  confirmation();
                }}>
                {data?.CCStatus ? 'Issued' : 'Issue'}
              </RNButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  mainActionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '20%',
    justifyContent: 'space-between',
  },
  card10: {
    //   backgroundColor: 'white',
    //   borderRadius: 8,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
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
});
