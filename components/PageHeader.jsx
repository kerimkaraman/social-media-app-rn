import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function PageHeader() {
  return (
    <View style={styles.container} className="flex-row bg-white justify-center">
      <Image
        style={{ objectFit: "contain" }}
        className="w-[100px] h-[50px]"
        source={require("../assets/images/logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
