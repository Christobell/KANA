import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

/*
  CategoryBadge
  Fungsi:
  - Menampilkan kategori alat musik
  - Bisa ditekan untuk filter data
*/

const CategoryBadge = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.badge,
        selected && styles.activeBadge
      ]}
    >
      <Text
        style={[
          styles.text,
          selected && styles.activeText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryBadge;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#350a50",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 18,
    marginRight: 8,
    marginBottom: 8
  },

  activeBadge: {
    backgroundColor: "#FFD700"
  },

  text: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 13
  },

  activeText: {
    color: "#350a50"
  }
});