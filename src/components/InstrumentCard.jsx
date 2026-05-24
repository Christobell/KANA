import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";

/*
  InstrumentCard
  Fungsi:
  - Menampilkan card alat musik
  - Mengirim data alat musik ke halaman Detail saat card ditekan
*/

const InstrumentCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Detail", { item })}
    >
      <View style={styles.card}>

        <Image source={item.image} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.origin}>{item.origin}</Text>
        </View>

      </View>
    </TouchableOpacity>
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