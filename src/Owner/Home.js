import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import {primary} from '../utils/Colors';
const Home = () => {
  return (
    <ScrollView>
      <StatusBar backgroundColor={primary} />
      <View>
        <Text>Home</Text>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
