import React from "react";
import { View, Text, StyleSheet } from "react-native";

/*
  CollectionCard
  Fungsi: menampilkan koleksi favorit user
*/

const CollectionCard = ({ title, desc }) => {
  return (
    <View style={styles.card}>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.desc}>{desc}</Text>

    </View>
  );
};

export default CollectionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2
  },

  title: {
    fontSize: 16,
    fontWeight: "bold"
  },

  desc: {
    color: "gray",
    marginTop: 4,
    fontSize: 13
  }
});