 import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RoundedButton } from '../components/RoundedButton';
export const Timing = ({ onChangeTime }) => {
  return (
   <>
    <View style={styles.timingbutton}>
    <RoundedButton title="10" size={75} onPress={()=>{onChangeTime(10)}}/>
    </View>
    <View style={styles.timingbutton}>
    <RoundedButton title="15" size={75} onPress={()=>{onChangeTime(15)}}/>
    </View>
    <View style={styles.timingbutton}>
    <RoundedButton title="20" size={75} onPress={()=>{onChangeTime(20)}}/>
    </View>
   </>
  )
};
const styles = StyleSheet.create({
  timingbutton: {
    flex: 1,
    alignItems:'center'
  },
});
