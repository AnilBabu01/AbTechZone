import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {deviceWidth} from '../utils/constant';
import {Colors} from '../utils/Colors';
import {serverInstance} from '../API/ServerInstance';
import {useNavigation} from '@react-navigation/native';
import Loader from './Loader/Loader';
import {
  getcategory,
  getcourse,
  GetSection,
  GetSession,
  GetStream,
  GetClassSubject,
  getfee,
  getDepartment,
  getDesignation,
  GetNotic,
  GeOtherFees,
  GetsSubject,
  getstudent,
} from '../redux/action/commanAction';
import {getenquiries} from '../redux/action/coachingAction';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
const RNTable = ({data, theme, isBorderCurve}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loader, setloader] = useState(false);
  const [sms, setsms] = useState('');
  const ToUpdate = data => {
    navigation.navigate(data.redirect, {
      data: data.allDetails,
    });
  };

  const ToDelete = data => {
    console.log('jhgchxcv', data?.allDetails?.id);

    serverInstance(`${data?.deleteUrl}`, 'delete', {
      id: data?.allDetails?.id,
    }).then(res => {
      if (res?.status) {
        setloader(false);
        setsms('');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });
        if (data?.deleteUrl === 'comman/studentcategory') {
          dispatch(getcategory());
        }
        if (data?.deleteUrl === 'comman/course') {
          dispatch(getcourse());
        }
        if (data?.deleteUrl === 'comman/session') {
          dispatch(GetSession());
        }
        if (data?.deleteUrl === 'comman/section') {
          dispatch(GetSection());
        }
        if (data?.deleteUrl === 'comman/stream') {
          dispatch(GetStream());
        }
        if (data?.deleteUrl === 'comman/classsubject') {
          dispatch(GetClassSubject());
        }
        if (data?.deleteUrl === 'comman/fee') {
          dispatch(getfee());
        }
        if (data?.deleteUrl === 'comman/department') {
          dispatch(getDepartment());
        }
        if (data?.deleteUrl === 'comman/designation') {
          dispatch(getDesignation());
        }
        if (data?.deleteUrl === 'comman/notes') {
          dispatch(GetNotic());
        }
        if (data?.deleteUrl === 'student/otherfee') {
          dispatch(GeOtherFees());
        }
        if (data?.deleteUrl === 'student/addstudent') {
          dispatch(getstudent());
        }
        if (data?.deleteUrl === 'comman/subject') {
          dispatch(GetsSubject());
        }
        if (data?.deleteUrl === 'coaching/enquiry') {
          dispatch(getenquiries());
        }
      }

      if (res?.status === false) {
        setloader(false);
        setsms('');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.msg,
        });

        console.log('error is', res);
      }
    });
  };

  const confirmation = data => {
    Alert.alert(
      'Delete',
      'Do you really want to Delete ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => ToDelete(data),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Loader loader={loader} sms={sms} />
      {data?.length > 0 &&
        data?.map((item, index) => (
          <View key={index} style={{width: deviceWidth * item.width}}>
            <View
              style={[
                styles.tabContainer,
                index == 0 && isBorderCurve && {borderTopLeftRadius: 15},
                index + 1 === data.length &&
                  isBorderCurve && {borderTopRightRadius: 15},
                theme === 'primary'
                  ? {backgroundColor: Colors.primary}
                  : {backgroundColor: Colors.light1Grey},
                {
                  alignItems: item.align,
                  paddingHorizontal: deviceWidth * (item.width * 0.05),
                },
              ]}>
              <Text
                style={{
                  color: theme === 'primary' ? Colors.white : Colors.black,
                }}>
                {item?.title}
              </Text>
            </View>
            {item?.items.map((data, index) => (
              <View
                key={index}
                style={[
                  {
                    justifyContent: 'center',
                    alignItems: item.align,
                    paddingVertical: 8,
                    paddingHorizontal: deviceWidth * (item.width * 0.06),
                  },
                  index % 2 !== 0 && {backgroundColor: Colors.lightGrey},
                ]}>
                <>
                  {data?.allDetails ? (
                    <>
                      <View style={styles.iconView}>
                        <TouchableOpacity onPress={() => ToUpdate(data)}>
                          <View numberOfLines={1}>{data?.value}</View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteIcon}
                          onPress={() => confirmation(data)}>
                          <View numberOfLines={1}>{data?.Deleteicon}</View>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <Text numberOfLines={1} style={{}}>
                        {data?.value}
                      </Text>
                    </>
                  )}
                </>
              </View>
            ))}
          </View>
        ))}
    </View>
  );
};

export default RNTable;

const styles = StyleSheet.create({
  tabContainer: {
    overflow: 'hidden',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconView: {
    display: 'flex',
    flexDirection: 'row',
  },
  deleteIcon: {
    marginLeft: 10,
  },
});
