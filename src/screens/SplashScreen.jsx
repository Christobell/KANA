import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

/*
  SplashScreen
  Fungsi: Menampilkan layar pemuat pembuka saat memeriksa sesi pengguna
*/

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>KANA 🎶</Text>
        <Text style={styles.subtitle}>Katalog Alat Musik Nusantara</Text>
      </View>
      <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#350a50",
    justifyContent: "center",
    alignItems: "center"
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40
  },
  logoText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFD700",
    letterSpacing: 2
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 8,
    opacity: 0.8
  },
  loader: {
    marginTop: 20
  }
});
