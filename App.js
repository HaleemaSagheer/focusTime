import { React, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import { FocusHistory } from "./src/features/FocusHistory";
import Constants from "expo-constants";

// You can import from local files
import AssetExample from "./src/components/AssetExample";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import { Focus } from "./src/features/Focus";
import { colors } from "./src/utils/colors";
import { Timer } from "./src/features/Timer";

export default function App() {
  useKeepAwake();
  const [currentSubject, setCurrentSubject] = useState(null);
  const [history, setHistory] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={(subject) => {
            setHistory([...history, subject]);
          }}
          clearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
