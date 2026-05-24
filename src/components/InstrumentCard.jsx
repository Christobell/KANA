import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";

/*
  InstrumentCard
  Fungsi:
  - Menampilkan card alat musik
  - Menerapkan animasi scale saat card ditekan
  - Mengirim data alat musik ke DetailScreen
*/

const InstrumentCard = ({ item, navigation }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("Detail", { item })}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Image source={item.image} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.origin}>{item.origin}</Text>
        </View>
      </Animated.View>
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