import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchPeople from "./SearchPeople";
import SearchPosts from "./SearchPosts";
import { useDispatch } from "react-redux";
import { updateSearchText } from "../store/slices/searchSlice";

export default function Search() {
  const Tab = createMaterialTopTabNavigator();
  const dispatch = useDispatch();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row mt-2 items-center px-2 mb-16 justify-center gap-x-4">
        <TextInput
          onChangeText={(text) => dispatch(updateSearchText(text))}
          placeholder="Aramak için yazınız."
          className="w-[60%] bg-custom-lightgrey p-2 rounded-md"
        />
        <Pressable
          onPress={() => dispatch(updateSearchText(true))}
          className="bg-custom-green py-2 px-4 rounded-md"
        >
          <Text className="font-medium text-white">Ara</Text>
        </Pressable>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#1ED860",
          },
        }}
      >
        <Tab.Screen
          name="Kisiler"
          options={{
            title: "KİŞİLER",
          }}
          component={SearchPeople}
        />
        <Tab.Screen
          name="Posts"
          options={{
            title: "GÖNDERİLER",
          }}
          component={SearchPosts}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
