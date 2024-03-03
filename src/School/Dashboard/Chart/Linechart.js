import {StyleSheet} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Width} from '../../../utils/responsive';
const allMonths = Array.from({length: 12}, (_, index) => index + 1);
const compareExpensesFeeMonths = (a, b) => {
  const monthsOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return monthsOrder?.indexOf(a) - monthsOrder?.indexOf(b);
};

const Linechart = ({color, pdata, pdata1}) => {

  
  const line = {
    labels: [
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
    ],

    datasets: [
      {
        data: allMonths?.sort(compareExpensesFeeMonths)?.map(monthNumber => {
          const dataForMonth = pdata?.find(
            data => data?.monthno === monthNumber,
          );

          const displayValue = dataForMonth ? dataForMonth?.total : 0;
          return displayValue;
        }),
        color: (opacity = 1) => `rgba(250,0, 0, ${opacity})`,
        strokeWidth: 2,
      },

      {
        data: allMonths?.sort(compareExpensesFeeMonths)?.map(monthNumber => {
          const dataForMonth = pdata1?.find(
            data => data?.monthno === monthNumber,
          );

          const displayValue = dataForMonth ? dataForMonth?.total : 0;
          return displayValue;
        }),
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
  return (
    <>
      <LineChart
        data={line}
        width={Width(340)} // from react-native
        height={220}
        yAxisLabel={''}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: color ? color : '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
};

export default Linechart;

const styles = StyleSheet.create({});
