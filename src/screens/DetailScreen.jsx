import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet
} from "react-native";

/*
  DetailScreen
  Fungsi:
  - Menampilkan detail alat musik
*/

const DetailScreen = ({ route }) => {

  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>

      <Image
        source={item.image}
        style={styles.image}
      />

      <View style={styles.infoBox}>

        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.origin}>
          {item.origin}
        </Text>

        <Text style={styles.category}>
          Kategori: {item.category}
        </Text>

        <Text style={styles.description}>
          {item.name} merupakan alat musik tradisional
          Indonesia yang berasal dari {item.origin}.
          Alat musik ini memiliki ciri khas unik dan
          menjadi bagian penting dari budaya nusantara.
        </Text>

      </View>

    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },

  image: {
    width: "100%",
    height: 240,
    resizeMode: "cover"
  },

  infoBox: {
    padding: 18
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#350a50"
  },

  origin: {
    color: "gray",
    marginTop: 5,
    fontSize: 15
  },

  category: {
    marginTop: 10,
    color: "#350a50",
    fontWeight: "bold"
  },

  description: {
    marginTop: 15,
    lineHeight: 24,
    color: "#555"
  }
});