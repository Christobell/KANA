import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

/*
  ProfileScreen
  Fungsi:
  - Menampilkan informasi tentang aplikasi KANA
  - Menjelaskan tujuan dan fitur katalog
*/

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={styles.title}>Tentang KANA 🎶</Text>

        <Text style={styles.subtitle}>
          Katalog Alat Musik Nusantara
        </Text>
      </View>

      {/* Deskripsi aplikasi */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Deskripsi Aplikasi</Text>

        <Text style={styles.text}>
          KANA adalah aplikasi katalog digital yang bertujuan
          memperkenalkan berbagai alat musik tradisional Indonesia
          berdasarkan asal daerah dan cara memainkannya.
        </Text>
      </View>

      {/* Fitur aplikasi */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fitur Aplikasi</Text>

        <Text style={styles.list}>• Katalog alat musik nusantara</Text>
        <Text style={styles.list}>• Pencarian alat musik</Text>
        <Text style={styles.list}>• Eksplorasi kategori alat musik</Text>
        <Text style={styles.list}>• Informasi asal daerah alat musik</Text>
      </View>

      {/* Quote */}
      <View style={styles.quoteBox}>
        <Text style={styles.quote}>
          “Melestarikan budaya Indonesia melalui teknologi digital.”
        </Text>
      </View>

    </ScrollView>
  );
};

export default ProfileScreen;


// ================= STYLE =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16
  },

  headerBox: {
    backgroundColor: "#350a50",
    padding: 25,
    borderRadius: 22,
    marginBottom: 20
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700"
  },

  subtitle: {
    color: "#eee",
    marginTop: 5
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#350a50"
  },

  text: {
    color: "#555",
    lineHeight: 22
  },

  list: {
    color: "#555",
    marginBottom: 8
  },

  quoteBox: {
    backgroundColor: "#350a50",
    padding: 20,
    borderRadius: 18,
    marginTop: 5,
    marginBottom: 20
  },

  quote: {
    color: "#FFD700",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 24
  }
});