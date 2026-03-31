import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

/*
  Komponen InstrumentCard
  Fungsi: menampilkan daftar alat musik nusantara dalam bentuk card
*/

const InstrumentCard = () => {

  const instruments = [
    {
      id: 1,
      name: "Angklung",
      origin: "Jawa Barat",
      image: require("../../assets/images/angklung.jpg")
    },
    {
      id: 2,
      name: "Gamelan",
      origin: "Jawa Tengah",
      image: require("../../assets/images/gamelan.jpg")
    },
    {
      id: 3,
      name: "Sasando",
      origin: "Nusa Tenggara Timur",
      image: require("../../assets/images/sasando.jpg")
    }
  ];

  return (
    <View>
      {instruments.map((item) => (
        <View key={item.id} style={styles.card}>

          <Image source={item.image} style={styles.image} />

          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.origin}>{item.origin}</Text>
          </View>

        </View>
      ))}
    </View>
  );
};

export default InstrumentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 4
    // ❌ hapus overflow hidden kalau bikin kepotong
  },

  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
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