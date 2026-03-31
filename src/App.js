import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import Header from "./components/Header";
import Category from "./components/Category";
import InstrumentCard from "./components/InstrumentCard";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <Category />
        <InstrumentCard />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  }
});