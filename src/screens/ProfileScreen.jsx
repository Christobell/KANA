import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";

import StatsCard from "../components/StatsCard";
import CollectionCard from "../components/CollectionCard";

/*
  ProfileScreen
  Fungsi:
  - Menampilkan profile pengguna
  - Menampilkan koleksi favorit
*/

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>

      {/* Profile Header */}
      <View style={styles.profileBox}>

        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=12"
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          Christobell Dillon
        </Text>

        <Text style={styles.username}>
          @nusantara.music
        </Text>

        <Text style={styles.bio}>
          Pecinta alat musik tradisional dan
          kolektor budaya nusantara 🎶
        </Text>

      </View>

      {/* Statistik */}
      <View style={styles.statsContainer}>
        <StatsCard number="3" label="Koleksi" />
        <StatsCard number="5" label="Kategori" />
        <StatsCard number="3" label="Daerah" />
      </View>

      {/* Koleksi */}
      <Text style={styles.sectionTitle}>
        ❤️ Koleksi Saya
      </Text>

      <CollectionCard
        title="Angklung"
        desc="Alat musik bambu khas Jawa Barat"
      />

      <CollectionCard
        title="Sasando"
        desc="Alat musik petik dari NTT"
      />

      {/* Quote */}
      <View style={styles.quoteBox}>
        <Text style={styles.quote}>
          “Melestarikan budaya Indonesia melalui
          teknologi digital.”
        </Text>
      </View>

    </ScrollView>
  );
};

export default ProfileScreen;


// ================= STYLE =================
const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#f5f5f5",
  paddingHorizontal: 12,
  paddingBottom: 12,
  paddingTop: 28
},
  profileBox: {
    backgroundColor: "#350a50",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 16
  },

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#FFD700"
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700"
  },

  username: {
    color: "#ddd",
    marginTop: 3,
    fontSize: 13
  },

  bio: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
    fontSize: 13
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#350a50"
  },

  quoteBox: {
    backgroundColor: "#350a50",
    padding: 16,
    borderRadius: 16,
    marginTop: 6,
    marginBottom: 24
  },

  quote: {
    color: "#FFD700",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 22,
    fontSize: 13
  }
});