import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import HeaderCard from "../components/HeaderCard";
import InstrumentCard from "../components/InstrumentCard";
import CategoryBadge from "../components/CategoryBadge";

import { instruments } from "../data/instruments";

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Dipukul", "Dipetik", "Ditiup", "Digesek", "Ditekan"];

  const filteredData = instruments.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchCategory = selectedCategory
      ? item.category === selectedCategory
      : true;

    return matchSearch && matchCategory;
  });

  const handleCategoryPress = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeaderCard searchText={searchText} setSearchText={setSearchText} />

      <Text style={styles.sectionTitle}>Kategori Populer</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
        {categories.map((item, index) => (
          <CategoryBadge
            key={index}
            title={item}
            selected={selectedCategory === item}
            onPress={() => handleCategoryPress(item)}
          />
        ))}
      </ScrollView>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Jelajahi Budaya Nusantara 🌏</Text>
        <Text style={styles.infoText}>
          Temukan berbagai alat musik tradisional Indonesia berdasarkan daerah dan cara memainkannya.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Alat Musik Populer</Text>

      {filteredData.map((item) => (
        <InstrumentCard key={item.id} item={item} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

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