import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import ExploreScreen from "../screens/ExploreScreen";
import ProfileStack from "./ProfileStack";

/*
  BottomNavbar
  Fungsi: navigasi bawah aplikasi
*/

const Tab = createBottomTabNavigator();

const BottomNavbar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#ccc",

        tabBarStyle: {
          backgroundColor: "#350a50",
          height: 55
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home")
            iconName = "home";

          else if (route.name === "Explore")
            iconName = "compass";

          else
            iconName = "person";

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        }
      })}
    >

      <Tab.Screen
        name="Home"
        component={HomeStack}
      />

      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
      />

    </Tab.Navigator>
  );
};

export default BottomNavbar;