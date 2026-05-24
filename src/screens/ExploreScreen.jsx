import React, { useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Animated
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import CategoryBadge from "../components/CategoryBadge";
import { instruments } from "../data/instruments";

/*
  ExploreScreen
  Fungsi:
  - Menampilkan halaman eksplorasi alat musik nusantara
  - Menerapkan animasi fade dan slide up saat screen dibuka
*/

const ExploreScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;

  const categories = ["Dipukul", "Dipetik", "Ditiup", "Digesek", "Ditekan"];

  useFocusEffect(
    useCallback(() => {
      fadeAnim.setValue(0);
      slideAnim.setValue(25);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 650,
          useNativeDriver: true
        })
      ]).start();
    }, [])
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        <View style={styles.heroBox}>
          <Text style={styles.heroLabel}>EXPLORE KANA</Text>

          <Text style={styles.title}>
            Jelajahi Warna Musik Nusantara 🔍
          </Text>

          <Text style={styles.subtitle}>
            Kenali alat musik tradisional Indonesia dari berbagai daerah
            dan cara memainkannya.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Alat Musik</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Kategori</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Daerah</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Kategori Permainan</Text>

        <View style={styles.badgeContainer}>
          {categories.map((item, index) => (
            <CategoryBadge key={index} title={item} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Pilihan Nusantara</Text>

        <View style={styles.featureCard}>
          <Image source={instruments[0].image} style={styles.featureImage} />

          <View style={styles.featureInfo}>
            <Text style={styles.featureName}>{instruments[0].name}</Text>

            <Text style={styles.featureText}>
              Alat musik khas {instruments[0].origin} yang menjadi salah satu
              ikon budaya Indonesia.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Rekomendasi Hari Ini</Text>

        <View style={styles.grid}>
          {instruments.map((item) => (
            <View key={item.id} style={styles.gridCard}>
              <Image source={item.image} style={styles.gridImage} />

              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.origin}>{item.origin}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
          ))}
        </View>

        <View style={styles.cultureBox}>
          <Text style={styles.cultureTitle}>Catatan Budaya 🇮🇩</Text>

          <Text style={styles.cultureText}>
            Setiap alat musik tradisional memiliki cerita, fungsi, dan nilai
            budaya yang berbeda. Melalui KANA, pengguna dapat mengenal kekayaan
            seni musik nusantara secara lebih mudah dan menarik.
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default ExploreScreen;

// ================= STYLE =================
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

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18
  },

  statBox: {
    width: "31%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    elevation: 2
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#350a50"
  },

  statLabel: {
    fontSize: 11,
    color: "gray",
    marginTop: 4
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

  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 18,
    elevation: 3,
    overflow: "hidden"
  },

  featureImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover"
  },

  featureInfo: {
    padding: 12
  },

  featureName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#350a50",
    marginBottom: 5
  },

  featureText: {
    color: "gray",
    fontSize: 13,
    lineHeight: 20
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

  cultureBox: {
    backgroundColor: "#350a50",
    padding: 16,
    borderRadius: 16,
    marginTop: 6,
    marginBottom: 24
  },

  cultureTitle: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6
  },

  cultureText: {
    color: "#fff",
    lineHeight: 20,
    fontSize: 13
  }
});