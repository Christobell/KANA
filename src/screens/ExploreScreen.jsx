import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";

import CategoryBadge from "../components/CategoryBadge";
import { instruments } from "../data/instruments";

/*
  ExploreScreen
  Fungsi:
  - Menampilkan eksplorasi alat musik nusantara
*/

const ExploreScreen = () => {

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
      <View style={styles.header}>
        <Text style={styles.title}>
          Eksplor Nusantara 🔍
        </Text>

        <Text style={styles.subtitle}>
          Temukan alat musik berdasarkan kategorinya
        </Text>
      </View>

      {/* Badge kategori */}
      <View style={styles.badgeContainer}>
        {categories.map((item, index) => (
          <CategoryBadge key={index} title={item} />
        ))}
      </View>

      {/* Grid alat musik */}
      <Text style={styles.sectionTitle}>
        Rekomendasi Hari Ini
      </Text>

      <View style={styles.grid}>
        {instruments.map((item) => (
          <View key={item.id} style={styles.gridCard}>

            <Image
              source={item.image}
              style={styles.gridImage}
            />

            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.origin}>
              {item.origin}
            </Text>

          </View>
        ))}
      </View>

      {/* Box budaya */}
      <View style={styles.cultureBox}>
        <Text style={styles.cultureTitle}>
          Budaya Indonesia 🇮🇩
        </Text>

        <Text style={styles.cultureText}>
          Alat musik tradisional merupakan bagian penting
          dari identitas budaya Indonesia yang harus terus
          dilestarikan.
        </Text>
      </View>

    </ScrollView>
  );
};

export default ExploreScreen;


// ================= STYLE =================
const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#f5f5f5",
  paddingHorizontal: 12,
  paddingBottom: 12,
  paddingTop: 28
},

  header: {
    marginBottom: 16
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#350a50"
  },

  subtitle: {
    color: "gray",
    marginTop: 4,
    fontSize: 13
  },

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#350a50"
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  gridCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 8,
    marginBottom: 12,
    elevation: 2
  },

  gridImage: {
    width: "100%",
    height: 85,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: "cover"
  },

  name: {
    fontWeight: "bold",
    fontSize: 14
  },

  origin: {
    color: "gray",
    marginTop: 3,
    fontSize: 12
  },

  cultureBox: {
    backgroundColor: "#350a50",
    padding: 16,
    borderRadius: 16,
    marginTop: 6,
    marginBottom: 24
  },

  cultureTitle: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6
  },

  cultureText: {
    color: "#fff",
    lineHeight: 20,
    fontSize: 13
  }
});