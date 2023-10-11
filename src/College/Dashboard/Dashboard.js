import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TotalCard from './Card/TotalCard';
import dash1 from '../../assets/dash1.jpg';
import dash2 from '../../assets/dash2.jpg';
import dash3 from '../../assets/dash3.jpg';
import dash4 from '../../assets/dash4.jpg';
import Linechart from './Chart/Linechart';
import Header from '../../Component/Header/Header';
import {primary} from '../../utils/Colors';
import Loader from '../../Component/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Dashboard = () => {
  const [loader, setloader] = useState(false);
  const gettoken = async () => {};
  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 10);

    gettoken();
  }, []);

  return (
    <>
      <Header />
      <StatusBar backgroundColor={primary} />
      <ScrollView>
        <Loader loader={loader} sms={'Loading...'} />
        <View>
          <View style={styles.minacardinfo}>
            <TotalCard img={dash2} value={'20'} name={'Student'} />
            <TotalCard img={dash3} value={'10'} name={'Absent'} />
            <TotalCard img={dash4} value={'40'} name={'Present'} />
            <TotalCard img={dash1} value={'60'} name={'Staff'} />
          </View>
        </View>

        <View style={styles.maintotalview}>
          <View style={styles.card}>
            <Text>Monthly Enquiry Data</Text>
            <Linechart color={''} />
          </View>
          <View style={styles.card}>
            <Text>Monthly Active Students Data</Text>
            <Linechart color={'#00FFFF'} />
          </View>
          <View style={styles.card}>
            <Text>Monthly Deactive Students Data</Text>
            <Linechart color={'#008080'} />
          </View>
          <View style={styles.card}>
            <Text>Monthly Fee Collection Data</Text>
            <Linechart color={'#0000FF'} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  maintotalview: {
    paddingHorizontal: 10,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  minacardinfo: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 12,
    paddingTop: 10,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
