import React, { useState } from "react";
import { View, Text, TextInput, Image, ScrollView, StyleSheet } from "react-native";
import { instruments } from "../data/instruments";

/*
  HomeScreen
  Fungsi: menampilkan halaman utama katalog alat musik
*/

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");

  const filteredData = instruments.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>KANA 🎶</Text>
        <Text style={styles.subtitle}>Katalog Alat Musik Nusantara</Text>

        <TextInput
          style={styles.search}
          placeholder="Cari alat musik..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <Text style={styles.sectionTitle}>Daftar Alat Musik</Text>

      {filteredData.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={item.image} style={styles.image} />

          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.origin}>{item.origin}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16
  },

  header: {
    backgroundColor: "#350a50",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700"
  },

  subtitle: {
    color: "#eee",
    marginTop: 5,
    marginBottom: 15
  },

  search: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 15,
    elevation: 4
  },

  image: {
    width: "100%",
    height: 145,
    resizeMode: "cover",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },

  info: {
    padding: 12
  },

  name: {
    fontSize: 18,
    fontWeight: "bold"
  },

  origin: {
    color: "gray",
    marginTop: 4
  }
});