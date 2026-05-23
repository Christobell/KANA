import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

/*
  ProfileScreen
  Fungsi:
  - Menampilkan identitas pengguna
  - Menampilkan koleksi alat musik favorit
*/

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>

      {/* Header Profile */}
      <View style={styles.profileBox}>

        {/* Avatar */}
        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=12"
          }}
          style={styles.avatar}
        />

        {/* Nama */}
        <Text style={styles.name}>
          Christobell Dillon
        </Text>

        {/* Username */}
        <Text style={styles.username}>
          @nusantara.music
        </Text>

        {/* Bio */}
        <Text style={styles.bio}>
          Pecinta alat musik tradisional dan kolektor
          musik nusantara 🎶
        </Text>

      </View>

      {/* Statistik */}
      <View style={styles.statsContainer}>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statText}>Koleksi</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statText}>Kategori</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statText}>Daerah</Text>
        </View>

      </View>

      {/* Koleksi Favorit */}
      <Text style={styles.sectionTitle}>
        ❤️ Koleksi Saya
      </Text>

      <View style={styles.collectionCard}>
        <Text style={styles.instrumentName}>
          Angklung
        </Text>

        <Text style={styles.instrumentDesc}>
          Alat musik bambu khas Jawa Barat
        </Text>
      </View>

      <View style={styles.collectionCard}>
        <Text style={styles.instrumentName}>
          Sasando
        </Text>

        <Text style={styles.instrumentDesc}>
          Alat musik petik dari NTT
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
    padding: 16
  },

  profileBox: {
    backgroundColor: "#350a50",
    padding: 25,
    borderRadius: 22,
    alignItems: "center",
    marginBottom: 20
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#FFD700"
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD700"
  },

  username: {
    color: "#ddd",
    marginTop: 4
  },

  bio: {
    color: "#fff",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25
  },

  statCard: {
    backgroundColor: "#fff",
    width: "31%",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
    elevation: 3
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#350a50"
  },

  statText: {
    color: "gray",
    marginTop: 5
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12
  },

  collectionCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 3
  },

  instrumentName: {
    fontSize: 18,
    fontWeight: "bold"
  },

  instrumentDesc: {
    color: "gray",
    marginTop: 5
  }
});