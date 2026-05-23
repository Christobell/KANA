import React from "react";
import { View, Text, StyleSheet } from "react-native";

/*
  CategoryBadge
  Fungsi: menampilkan badge kategori
*/

const CategoryBadge = ({ title }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default CategoryBadge;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#350a50",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10
  },

  text: {
    color: "#FFD700",
    fontWeight: "bold"
  }
});