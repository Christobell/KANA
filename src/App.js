import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavbar from "./components/BottomNavbar";

export default function App() {
  return (
    <NavigationContainer>
      <BottomNavbar />
    </NavigationContainer>
  );
}