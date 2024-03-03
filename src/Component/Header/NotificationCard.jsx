import * as React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../utils/Colors';
const NotificationCard = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.maincard}>
        <View style={styles.maincardInnear}>
          <View style={{width: '10%'}}>
            <Icon name="message" size={24} color="#000" />
          </View>
          <View style={{width: '90%'}}>
            <Text style={{paddingLeft: 10, fontWeight: 'bold'}}>
              Welcome to our portal Welcome to our portal Welcome to our portal
              Welcome to our portal Welcome to our portal
            </Text>
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate('ReadMore')}>
          <Text style={{textAlign: 'right', color: Colors.purple}}>
            Read More
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  maincard: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom:10
  },
  maincardInnear: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
