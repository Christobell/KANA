import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

/*
  Komponen Header
  Fungsi: menampilkan identitas aplikasi KANA dan fitur pencarian
*/

const Header = () => {
  return (
    <View style={styles.container}>

      {/* Judul aplikasi */}
      <Text style={styles.title}>KANA 🎶</Text>

      {/* Sub Judul */}
      <Text style={styles.subtitle}>
        Katalog Alat Musik Nusantara
      </Text>

      {/* Search */}
      <TextInput
        style={styles.search}
        placeholder="Cari alat musik..."
        placeholderTextColor="#888"
      />

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 45,
    backgroundColor: "#350a50f0", // ⬅️ lebih elegan dari sebelumnya
    marginBottom: 10
  },

  title: {
    fontSize: 28,
    color: "#FFD700", // ⬅️ emas (biar standout 🔥)
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 5
  },

  subtitle: {
    color: "#e0e0e0",
    marginBottom: 15,
    fontSize: 14
  },

  search: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 14
  }
});