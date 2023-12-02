import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "./Homepage";
import React from "react";
import HomeIcon from "../assets/svg/HomeIcon";

export default function BottomTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="Homepage">
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <HomeIcon focused={focused} />;
          },
          tabBarLabelStyle: {},
        }}
      />
    </Tab.Navigator>
  );
}
