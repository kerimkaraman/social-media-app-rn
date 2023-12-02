import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import CreatePost from "../components/CreatePost";
import PageHeader from "../components/PageHeader";

export default function Homepage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <PageHeader />
      <CreatePost />
    </SafeAreaView>
  );
}
