import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

/*
  HomeStack
  Fungsi:
  - Mengatur route Home → Detail
*/

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: "Detail Alat Musik",
          headerStyle: {
            backgroundColor: "#350a50"
          },
          headerTintColor: "#FFD700"
        }}
      />

    </Stack.Navigator>
  );
};

export default HomeStack;