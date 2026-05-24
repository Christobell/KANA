import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavbar from "./navigation/BottomNavbar";

/*
  App.js
  Fungsi: root navigation aplikasi
*/

export default function App() {
  return (
    <NavigationContainer>
      <BottomNavbar />
    </NavigationContainer>
  );
}