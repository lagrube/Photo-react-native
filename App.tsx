import { StyleSheet, View } from "react-native";
import TabOneScreen from "./screen/TabOneScreen";

export default function App() {
  return (
    <View>
      <TabOneScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
