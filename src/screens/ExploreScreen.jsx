import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { instruments } from "../data/instruments";

/*
  ExploreScreen
  Fungsi: menampilkan eksplorasi kategori alat musik
*/

const ExploreScreen = () => {
  const categories = ["Dipukul", "Dipetik", "Ditiup", "Ditekan", "Digesek"];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Eksplor Nusantara 🔍</Text>
      <Text style={styles.subtitle}>Temukan alat musik berdasarkan jenis permainannya</Text>

      <View style={styles.categoryWrapper}>
        {categories.map((item, index) => (
          <View key={index} style={styles.categoryCard}>
            <Text style={styles.categoryText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Rekomendasi</Text>

      <View style={styles.grid}>
        {instruments.map((item) => (
          <View key={item.id} style={styles.gridCard}>
            <Image source={item.image} style={styles.gridImage} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.origin}>{item.category}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#350a50"
  },

  subtitle: {
    color: "gray",
    marginTop: 5,
    marginBottom: 20
  },

  categoryWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20
  },

  categoryCard: {
    backgroundColor: "#350a50",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10
  },

  categoryText: {
    color: "#FFD700",
    fontWeight: "bold"
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  gridCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginBottom: 15,
    elevation: 3
  },

  gridImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 8
  },

  name: {
    fontWeight: "bold",
    fontSize: 16
  },

  origin: {
    color: "gray",
    marginTop: 3
  }
});