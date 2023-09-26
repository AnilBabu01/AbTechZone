import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import dash from '../../assets/dash5.png'
const Option = () => {
  return (
    <View>
      <Text>Option</Text>
      <Image source={dash} style={styles.optionimg} />
    </View>
  )
}

export default Option

const styles = StyleSheet.create({
    optionimg:{
        height:40,
        width:40
    }
})