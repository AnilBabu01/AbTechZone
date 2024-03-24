import {StyleSheet} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Width} from '../../../utils/responsive';

const allMonths = Array.from({length: 12}, (_, index) => index + 1);
const compareExpensesFeeMonths = (a, b) => {
  const monthsOrder = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];

  return monthsOrder?.indexOf(a) - monthsOrder?.indexOf(b);
};

const ExpensexLineChart = ({color, pdata}) => {
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
          // Find the data for the current month
          const dataForMonth = pdata?.find(
            data => data?.MonthNO === monthNumber,
          );

          // Display the data if it exists, otherwise display 0
          const displayValue = dataForMonth ? dataForMonth?.total : 0;
          return displayValue;
        }),
        strokeWidth: 2, // optional
      },
    ],
  };
  return (
    <>
      <LineChart
        data={line}
        width={Width(357)} // from react-native
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

export default ExpensexLineChart;

const styles = StyleSheet.create({});
