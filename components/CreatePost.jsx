import { View, Text, TextInput } from "react-native";
import React from "react";

export default function CreatePost() {
  return (
    <View className="bg-custom-lightgrey p-2 mt-3">
      <TextInput placeholder="Bana nasıl hissettiğini söyle..." />
    </View>
  );
}
