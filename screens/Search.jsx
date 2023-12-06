import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchPeople from "./SearchPeople";
import SearchPosts from "./SearchPosts";

export default function Search() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView>
      <View className="flex-row mt-2 items-center px-2 justify-center gap-x-4">
        <TextInput
          placeholder="Aramak için yazınız."
          className="w-[60%] bg-custom-lightgrey p-2 rounded-md"
        />
        <Pressable className="bg-custom-green py-2 px-4 rounded-md">
          <Text className="font-medium text-white">Ara</Text>
        </Pressable>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Kisiler" component={SearchPeople} />
        <Tab.Screen name="Posts" component={SearchPosts} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
