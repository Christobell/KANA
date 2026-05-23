import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from "react-native";

import HeaderCard from "../components/HeaderCard";
import InstrumentCard from "../components/InstrumentCard";
import CategoryBadge from "../components/CategoryBadge";

import { instruments } from "../data/instruments";

/*
  HomeScreen
  Fungsi:
  - Menampilkan halaman utama katalog
  - Menampilkan kategori dan alat musik populer
*/

const HomeScreen = () => {

  const [searchText, setSearchText] = useState("");

  // Filter pencarian
  const filteredData = instruments.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const categories = [
    "Dipukul",
    "Dipetik",
    "Ditiup",
    "Digesek",
    "Ditekan"
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* Header */}
      <HeaderCard
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {/* Kategori */}
      <Text style={styles.sectionTitle}>
        Kategori Populer
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryRow}
      >
        {categories.map((item, index) => (
          <CategoryBadge key={index} title={item} />
        ))}
      </ScrollView>

      {/* Info katalog */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>
          Jelajahi Budaya Nusantara 🌏
        </Text>

        <Text style={styles.infoText}>
          Temukan berbagai alat musik tradisional Indonesia
          berdasarkan daerah dan cara memainkannya.
        </Text>
      </View>

      {/* Daftar alat musik */}
      <Text style={styles.sectionTitle}>
        Alat Musik Populer
      </Text>

      {filteredData.map((item) => (
        <InstrumentCard key={item.id} item={item} />
      ))}

    </ScrollView>
  );
};

export default HomeScreen;


// ================= STYLE =================
const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#f5f5f5",
  paddingHorizontal: 12,
  paddingBottom: 12,
  paddingTop: 28
},

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#350a50"
  },

  categoryRow: {
    marginBottom: 16
  },

  infoBox: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 15,
    marginBottom: 18,
    elevation: 2
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#350a50",
    marginBottom: 6
  },

  infoText: {
    color: "gray",
    lineHeight: 20,
    fontSize: 13
  }
});