import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import TotalCard from './Card/TotalCard';
import dash1 from '../../assets/dash1.jpg';
import dash2 from '../../assets/dash2.jpg';
import dash3 from '../../assets/dash3.jpg';
import dash4 from '../../assets/dash4.jpg';
import Piechart from './Chart/Piechart';
import Linechart from './Chart/Linechart';
import Header from '../../Owner/Header';
const Dashboard = () => {
  return (
    <View>
      <Header />

      <ScrollView>
        <View>
          <View style={styles.maintotalview}>
            <TotalCard img={dash1} value={'10'} name={'Batch'} />
            <TotalCard img={dash2} value={'20'} name={'Student'} />
            <TotalCard img={dash3} value={'10'} name={'Absent'} />
            <TotalCard img={dash4} value={'40'} name={'Present'} />
            <TotalCard img={dash1} value={'60'} name={'Staff'} />
          </View>
        </View>
        <View style={styles.maintotalview}>
          <View style={styles.card}>
            <Piechart />
          </View>
          {/* <View style={styles.card}>
          <Linechart />
        </View> */}
        </View>
      </ScrollView>
    </View>
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
    width: '100%',
    paddingRight: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
