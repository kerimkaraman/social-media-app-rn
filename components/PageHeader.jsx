import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { AUTH } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function PageHeader() {
  const nav = useNavigation();
  const handleLogOut = () => {
    const auth = AUTH;
    signOut(auth)
      .then(() => {
        nav.navigate("Signin");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <View
      style={styles.container}
      className="flex-row bg-white justify-between items-center px-4"
    >
      <Image
        style={{ objectFit: "contain" }}
        className="w-[100px] h-[50px]"
        source={require("../assets/images/logo.png")}
      />
      <Pressable
        onPress={handleLogOut}
        className="bg-custom-green py-1 px-2 rounded-md"
      >
        <Text className="text-xs font-semibold text-white">Çıkış Yap</Text>
      </Pressable>
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
