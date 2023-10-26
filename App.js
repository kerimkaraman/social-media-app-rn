import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AppNavigation from "./AppNavigation";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
  return (
    <View className="" style={styles.container}>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
