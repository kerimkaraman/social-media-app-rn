import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import CreatePost from "../components/CreatePost";
import PageHeader from "../components/PageHeader";
import Post from "../components/Post";

export default function Homepage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView className="bg-custom-lightgrey">
        <PageHeader />
        <CreatePost />
        <Post />
      </ScrollView>
    </SafeAreaView>
  );
}
