import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

/*
  HeaderCard
  Fungsi: menampilkan header utama aplikasi
*/

const HeaderCard = ({ searchText, setSearchText }) => {
  return (
    <View style={styles.header}>

      <Text style={styles.title}>KANA 🎶</Text>

      <Text style={styles.subtitle}>
        Katalog Alat Musik Nusantara
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Cari alat musik..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />

    </View>
  );
};

export default HeaderCard;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#350a50",
    padding: 16,
    borderRadius: 18,
    marginBottom: 16
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700"
  },

  subtitle: {
    color: "#eee",
    marginTop: 4,
    marginBottom: 12,
    fontSize: 13
  },

  search: {
    backgroundColor: "#fff",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 13
  }
});