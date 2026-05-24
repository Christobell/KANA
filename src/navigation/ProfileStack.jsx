import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import AddInstrumentForm from "../screens/AddInstrumentForm";

/*
  ProfileStack
  Fungsi:
  - Mengatur navigasi tumpukan (Stack) di dalam tab Profile
  - Mengizinkan navigasi dari Profile ke AddInstrumentForm
*/

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddInstrument"
        component={AddInstrumentForm}
        options={{
          title: "Tambah Alat Musik",
          headerStyle: {
            backgroundColor: "#350a50"
          },
          headerTintColor: "#FFD700",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
