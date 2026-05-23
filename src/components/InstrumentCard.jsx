import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

/*
  InstrumentCard
  Fungsi: menampilkan card alat musik
*/

const InstrumentCard = ({ item }) => {
  return (
    <View style={styles.card}>

      <Image source={item.image} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.origin}>{item.origin}</Text>
      </View>

    </View>
  );
};

export default InstrumentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3
  },

  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14
  },

  info: {
    padding: 10
  },

  name: {
    fontSize: 16,
    fontWeight: "bold"
  },

  origin: {
    color: "gray",
    marginTop: 3,
    fontSize: 13
  }
});