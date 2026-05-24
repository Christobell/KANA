import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

import StatsCard from "../components/StatsCard";
import CollectionCard from "../components/CollectionCard";

/*
  ProfileScreen
  Fungsi:
  - Menampilkan profile pengguna
  - Mengelola input form profile
*/

const ProfileScreen = () => {

  // STATE INPUT
  const [name, setName] = useState("Christobell Dillon");
  const [username, setUsername] = useState("@nusantara.music");
  const [bio, setBio] = useState(
    "Pecinta alat musik tradisional Indonesia 🎶"
  );
  const [favorite, setFavorite] = useState("Angklung");

  // HANDLE SIMPAN
  const handleSave = () => {
    Alert.alert(
      "Berhasil",
      "Profil berhasil diperbarui 🎉"
    );
  };

  return (
    <ScrollView style={styles.container}>

      {/* HEADER PROFILE */}
      <View style={styles.profileBox}>

        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=12"
          }}
          style={styles.avatar}
        />

        <Text style={styles.title}>
          Edit Profil
        </Text>

      </View>

      {/* FORM PROFILE */}
      <View style={styles.formBox}>

        {/* Nama */}
        <Text style={styles.label}>
          Nama Lengkap
        </Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Masukkan nama"
        />

        {/* Username */}
        <Text style={styles.label}>
          Username
        </Text>

        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Masukkan username"
        />

        {/* Bio */}
        <Text style={styles.label}>
          Bio
        </Text>

        <TextInput
          style={styles.bioInput}
          value={bio}
          onChangeText={setBio}
          multiline
          placeholder="Tulis bio singkat"
        />

        {/* Favorit */}
        <Text style={styles.label}>
          Alat Musik Favorit
        </Text>

        <TextInput
          style={styles.input}
          value={favorite}
          onChangeText={setFavorite}
          placeholder="Contoh: Angklung"
        />

        {/* Tombol */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>
            Simpan Profil
          </Text>
        </TouchableOpacity>

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

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700"
  },

  formBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 18,
    elevation: 2
  },

  label: {
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 10,
    color: "#350a50"
  },

  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13
  },

  bioInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    height: 90,
    textAlignVertical: "top"
  },

  button: {
    backgroundColor: "#350a50",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20
  },

  buttonText: {
    color: "#FFD700",
    fontWeight: "bold"
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
  }
});