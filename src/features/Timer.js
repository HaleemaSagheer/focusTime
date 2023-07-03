import React, { useState } from 'react';
import { Text, View, StyleSheet ,Platform,Vibration} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { colors } from '../utils/colors';
import { spacing } from '../utils/sizes';
import {Timing} from '../features/Timing';

 const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];
export const Timer = ({ focusSubject,clearSubject ,onTimerEnd}) => {
   useKeepAwake();
  const onEnd =(reset) =>{
    Vibration.vibrate(PATTERN);
    setIsStarted(false)
    setProgress(1)
    reset()
    onTimerEnd(focusSubject)

  }
  const [isStarted, setIsStarted] = useState(false);
  const[progress,setProgress] = useState(1);
  const[minutes,setMinutes]=useState(0.1)
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
        minutes={minutes}
          isPaused={!isStarted}
          onProgress={(progress) => {setProgress(progress)}}
          onEnd={onEnd}
        />
        <View style={{paddingTop: spacing.xxl}} >
          <Text style={styles.title}> Focusing on </Text>
          <Text style={styles.task}>{focusSubject} </Text>
        </View>
      </View>
      <View style={{paddingTop:spacing.sm}}>
      <ProgressBar 
      progress={progress}
      color={colors.progressbar}
      style={{height:spacing.sm}}
      />
      </View>
      <View style={styles.timingwrapper}>
      <Timing onChangeTime={setMinutes}/>
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton
            title="Start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        )}
        {isStarted && (
          <RoundedButton
            title="Pause"
            onPress={() => { 
              setIsStarted(false);
            }}
          />
        )}
      </View>
     
     <View style={styles.clearSubjectWrapper}>
    <RoundedButton title="-" size={50} onPress={clearSubject}/>
    </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding:spacing.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingwrapper:{
flex:0.1,
paddingTop:spacing.xxxl,
flexDirection:'row'
  },
  clearSubjectWrapper:{
    flexDirection:'row',
    justifyContent:'center',
  },
  title: {
    color: colors.White,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.White,
    textAlign: 'center',
  },
});
