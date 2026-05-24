import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

import CategoryBadge from "../components/CategoryBadge";
import { instruments } from "../data/instruments";

/*
  ExploreScreen
  Fungsi:
  - Menampilkan eksplorasi alat musik nusantara
  - Menerapkan TextInput untuk pencarian
  - Menerapkan form usulan alat musik
*/

const ExploreScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [instrumentName, setInstrumentName] = useState("");
  const [origin, setOrigin] = useState("");

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
    setSelectedCategory(
      selectedCategory === category ? "" : category
    );
  };

  const handleSubmit = () => {
    if (instrumentName === "" || origin === "") {
      Alert.alert("Peringatan", "Nama alat musik dan asal daerah wajib diisi!");
    } else {
      Alert.alert(
        "Berhasil",
        `Usulan ${instrumentName} dari ${origin} berhasil dikirim.`
      );

      setInstrumentName("");
      setOrigin("");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.heroBox}>
        <Text style={styles.heroLabel}>EXPLORE KANA</Text>
        <Text style={styles.title}>Jelajahi Musik Nusantara 🔍</Text>
        <Text style={styles.subtitle}>
          Cari alat musik tradisional berdasarkan nama dan kategori.
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Cari alat musik..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />

      <Text style={styles.sectionTitle}>Kategori Permainan</Text>

      <View style={styles.badgeContainer}>
        {categories.map((item, index) => (
          <CategoryBadge
            key={index}
            title={item}
            selected={selectedCategory === item}
            onPress={() => handleCategoryPress(item)}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Hasil Eksplorasi</Text>

      <View style={styles.grid}>
        {filteredData.map((item) => (
          <View key={item.id} style={styles.gridCard}>
            <Image source={item.image} style={styles.gridImage} />

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.origin}>{item.origin}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        ))}
      </View>

      {filteredData.length === 0 && (
        <Text style={styles.emptyText}>Data alat musik tidak ditemukan</Text>
      )}

      <View style={styles.formBox}>
        <Text style={styles.formTitle}>Usulkan Alat Musik Baru</Text>

        <Text style={styles.label}>Nama Alat Musik</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Kolintang"
          placeholderTextColor="#888"
          value={instrumentName}
          onChangeText={setInstrumentName}
        />

        <Text style={styles.label}>Asal Daerah</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Sulawesi Utara"
          placeholderTextColor="#888"
          value={origin}
          onChangeText={setOrigin}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Kirim Usulan</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 28
  },

  heroBox: {
    backgroundColor: "#350a50",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14
  },

  heroLabel: {
    color: "#FFD700",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 6
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD700"
  },

  subtitle: {
    color: "#eee",
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20
  },

  searchInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 13,
    marginBottom: 16,
    elevation: 2
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#350a50"
  },

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16
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
    fontSize: 14,
    color: "#222"
  },

  origin: {
    color: "gray",
    marginTop: 3,
    fontSize: 12
  },

  category: {
    alignSelf: "flex-start",
    backgroundColor: "#350a50",
    color: "#FFD700",
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 8
  },

  emptyText: {
    textAlign: "center",
    color: "gray",
    marginBottom: 16
  },

  formBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 28,
    elevation: 2
  },

  formTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#350a50",
    marginBottom: 10
  },

  label: {
    fontWeight: "bold",
    color: "#350a50",
    marginTop: 10,
    marginBottom: 6
  },

  input: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 13
  },

  button: {
    backgroundColor: "#350a50",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 18
  },

  buttonText: {
    color: "#FFD700",
    fontWeight: "bold"
  }
});