import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

/*
  Komponen Category
  Fungsi: menampilkan kategori alat musik berdasarkan jenisnya
*/

const Category = () => {

  const categories = [
    "🥁 Dipukul",
    "🎸 Dipetik",
    "🎺 Ditiup",
    "🎹 Ditekan",
    "🎻 Digesek"
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >

      {categories.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}

    </ScrollView>
  );
};

export default Category;

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10 // ⬅️ jarak ke card bawah
  },

  card: {
    backgroundColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    minWidth: 100,
    alignItems: "center"
  },

  text: {
    fontWeight: "bold",
    textAlign: "center",
    flexWrap: "wrap"
  }

});