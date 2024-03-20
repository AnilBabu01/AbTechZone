import {StyleSheet, Pressable, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {serverInstance} from '../API/ServerInstance';
import {deviceHeight, deviceWidth} from '../utils/constant';
import {Colors} from '../utils/Colors';
import PlanCard from './PlanCard';
import RNButton from '../Component/RNButton';
import Toast from 'react-native-toast-message';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
const PlansList = ({planId, setplanId, setselctplanSkip}) => {
  const [isdata, setisdata] = useState([]);
  const [loading, setloading] = useState(false);
  const getplanlist = () => {
    try {
      setloading(true);
      serverInstance('admin/getplanlist', 'get').then(res => {
        if (res?.status === true) {
          setisdata(res?.data);
          setloading(false);
        }
      });
    } catch (error) {
      setloading(false);
    }
  };

  useEffect(() => {
    getplanlist();
  }, []);

  const continuefun = () => {
    if (planId) {
      setselctplanSkip(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please Select Plan',
      });
    }
  };

  return (
    <>
      <View style={styles.topmian}>
        {loading ? (
          <>
            <View style={styles.loaderCenter}>
              <ActivityIndicator
                size="large"
                animating={true}
                color={MD2Colors.red800}
              />
            </View>
          </>
        ) : (
          <>
            {isdata &&
              isdata?.map((item, index) => {
                return (
                  <>
                    <Pressable onPress={() => setplanId(item?.id)}>
                      <PlanCard key={index} planId={planId} data={item} />
                    </Pressable>
                  </>
                );
              })}
            <View style={{marginBottom: 20}}>
              <RNButton onPress={() => continuefun()}>Continue</RNButton>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default PlansList;

const styles = StyleSheet.create({
  topmian: {
    paddingHorizontal: deviceWidth * 0.02,
    paddingVertical: deviceHeight * 0.02,
  },
  mainCard: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: deviceWidth * 0.02,
  },
  divider: {
    borderWidth: 4,
    borderColor: Colors.primary,
    marginVertical: deviceHeight * 0.02,
  },
  planname: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 25,
  },

  facility: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
