import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React  from 'react';
import {primary} from '../utils/Colors';
import Header from '../Component/Header/Header';

const Home = () => {
  return (
    <View>
      <Header />
      <ScrollView>
        <StatusBar backgroundColor={primary} />
        <View>
          <TouchableOpacity>
            <Text>Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
