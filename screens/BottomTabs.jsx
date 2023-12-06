import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "./Homepage";
import React from "react";
import HomeIcon from "../assets/svg/HomeIcon";
import Profile from "./Profile";
import ProfileIcon from "../assets/svg/ProfileIcon";
import Search from "./Search";
import SearchIcon from "../assets/svg/SearchIcon";

export default function BottomTabs({ route }) {
  const { email } = route.params;
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="Homepage">
      <Tab.Screen
        initialParams={{ email: email }}
        name="Homepage"
        component={Homepage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <HomeIcon focused={focused} />;
          },
          tabBarLabelStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="Search"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <SearchIcon focused={focused} />;
          },
          tabBarLabelStyle: {
            display: "none",
          },
        }}
        component={Search}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{ email: email }}
        options={{
          tabBarLabelStyle: {
            display: "none",
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <ProfileIcon focused={focused} />;
          },
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
