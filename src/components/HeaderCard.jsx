import React, { useRef, useCallback } from "react";
import { Text, TextInput, StyleSheet, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const HeaderCard = ({ searchText, setSearchText }) => {
  const slideAnim = useRef(new Animated.Value(-30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      slideAnim.setValue(-30);
      fadeAnim.setValue(0);

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true
        })
      ]).start();
    }, [])
  );

  return (
    <Animated.View
      style={[
        styles.header,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <Text style={styles.title}>KANA 🎶</Text>

      <Text style={styles.subtitle}>
        Katalog Alat Musik Nusantara
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Cari alat musik..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />
    </Animated.View>
  );
};

export default HeaderCard;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#350a50",
    padding: 16,
    borderRadius: 18,
    marginBottom: 16
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700"
  },

  subtitle: {
    color: "#eee",
    marginTop: 4,
    marginBottom: 12,
    fontSize: 13
  },

  search: {
    backgroundColor: "#fff",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 13
  }
});