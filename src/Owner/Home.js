import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import {primary} from '../utils/Colors';
import Header from './Header';
const Home = () => {
  return (
    <View>
      <Header />
      <ScrollView>
        <StatusBar backgroundColor={primary} />
        <View>
          <Text>Home</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
