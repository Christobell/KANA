import React from "react";
import { View, Text, StyleSheet } from "react-native";

/*
  StatsCard
  Fungsi: menampilkan statistik profile
*/

const StatsCard = ({ number, label }) => {
  return (
    <View style={styles.card}>

      <Text style={styles.number}>{number}</Text>

      <Text style={styles.label}>{label}</Text>

    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: "31%",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    elevation: 2
  },

  number: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#350a50"
  },

  label: {
    color: "gray",
    marginTop: 4,
    fontSize: 12
  }
});