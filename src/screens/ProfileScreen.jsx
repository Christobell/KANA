import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import StatsCard from "../components/StatsCard";
import { api } from "../services/api";

/*
  ProfileScreen
  Fungsi:
  - Menampilkan profile pengguna
  - Mengelola input form profile
  - Menampilkan daftar koleksi instrumen dari MockAPI (CRUD: Read)
  - Fitur Edit & Delete instrumen langsung dari kartu koleksi
  - Statistik dinamis (Koleksi, Kategori, Daerah)
*/

const ProfileScreen = ({ navigation }) => {
  // STATE INPUT PROFIL
  const [profileName, setProfileName] = useState("Christobell Dillon");
  const [username, setUsername] = useState("@nusantara.music");
  const [bio, setBio] = useState(
    "Pecinta alat musik tradisional Indonesia 🎶"
  );
  const [favorite, setFavorite] = useState("Angklung");

  // STATE DATA API
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // FETCH DATA
  const fetchInstruments = async () => {
    try {
      const result = await api.getInstruments();
      setData(result);
    } catch (error) {
      console.error("Failed to load instruments on ProfileScreen:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchInstruments();
    }, [])
  );

  // HANDLE SIMPAN PROFIL
  const handleSaveProfile = () => {
    Alert.alert(
      "Berhasil",
      "Profil berhasil diperbarui 🎉"
    );
  };

  // HANDLE HAPUS INSTRUMEN
  const confirmDelete = (item) => {
    Alert.alert(
      "Hapus Koleksi",
      `Apakah Anda yakin ingin menghapus "${item.name}" dari Koleksi Saya?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => handleDelete(item.id)
        }
      ]
    );
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.deleteInstrument(id);
      Alert.alert("Berhasil", "Alat musik berhasil dihapus.");
      fetchInstruments();
    } catch (error) {
      console.error(error);
      Alert.alert("Gagal", "Gagal menghapus alat musik.");
      setLoading(false);
    }
  };

  // KANDUNGAN DATA STATISTIK DINAMIS
  const totalCollections = data.length.toString();
  const totalCategories = new Set(data.map((item) => item.category)).size.toString();
  const totalOrigins = new Set(data.map((item) => item.origin)).size.toString();

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchInstruments();
            }}
            colors={["#350a50"]}
          />
        }
      >
        {/* HEADER PROFILE */}
        <View style={styles.profileBox}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=12"
            }}
            style={styles.avatar}
          />
          <Text style={styles.title}>Edit Profil</Text>
        </View>

        {/* FORM PROFILE */}
        <View style={styles.formBox}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput
            style={styles.input}
            value={profileName}
            onChangeText={setProfileName}
            placeholder="Masukkan nama"
          />

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Masukkan username"
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.bioInput}
            value={bio}
            onChangeText={setBio}
            multiline
            placeholder="Tulis bio singkat"
          />

          <Text style={styles.label}>Alat Musik Favorit</Text>
          <TextInput
            style={styles.input}
            value={favorite}
            onChangeText={setFavorite}
            placeholder="Contoh: Angklung"
          />

          <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>Simpan Profil</Text>
          </TouchableOpacity>
        </View>

        {/* Statistik Dinamis */}
        <View style={styles.statsContainer}>
          <StatsCard number={totalCollections} label="Koleksi" />
          <StatsCard number={totalCategories} label="Kategori" />
          <StatsCard number={totalOrigins} label="Daerah" />
        </View>

        {/* Koleksi Saya */}
        <Text style={styles.sectionTitle}>❤️ Koleksi Saya</Text>

        {loading && !refreshing ? (
          <View style={styles.listLoader}>
            <ActivityIndicator size="small" color="#350a50" />
          </View>
        ) : (
          <View style={styles.collectionsList}>
            {data.map((item) => (
              <View key={item.id} style={styles.collectionCard}>
                <View style={styles.collectionCardTop}>
                  <Image
                    source={typeof item.image === "string" ? { uri: item.image } : item.image}
                    style={styles.collectionImage}
                  />
                  <View style={styles.collectionInfo}>
                    <Text style={styles.collectionName}>{item.name}</Text>
                    <Text style={styles.collectionOrigin}>{item.origin}</Text>
                    <Text style={styles.collectionCategory}>{item.category}</Text>
                  </View>
                </View>
                
                <View style={styles.collectionActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => navigation.navigate("AddInstrument", { item })}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="create-outline" size={14} color="#350a50" />
                    <Text style={[styles.actionText, styles.editText]}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => confirmDelete(item)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={14} color="#d9534f" />
                    <Text style={[styles.actionText, styles.deleteText]}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {data.length === 0 && (
              <Text style={styles.emptyText}>Belum ada koleksi instrumen.</Text>
            )}
          </View>
        )}

        {/* Spacing bottom */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FLOATING ACTION BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddInstrument")}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#FFD700" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

// ================= STYLE =================
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },

  container: {
    flex: 1,
    paddingHorizontal: 12,
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3
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
    height: 70,
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
  },

  listLoader: {
    paddingVertical: 30,
    alignItems: "center"
  },

  collectionsList: {
    marginBottom: 20
  },

  emptyText: {
    textAlign: "center",
    color: "gray",
    marginVertical: 20,
    fontSize: 13
  },

  collectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3
  },

  collectionCardTop: {
    flexDirection: "row",
    alignItems: "center"
  },

  collectionImage: {
    width: 65,
    height: 65,
    borderRadius: 10,
    resizeMode: "cover"
  },

  collectionInfo: {
    flex: 1,
    marginLeft: 12
  },

  collectionName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#350a50"
  },

  collectionOrigin: {
    fontSize: 12,
    color: "gray",
    marginTop: 2
  },

  collectionCategory: {
    fontSize: 10,
    color: "#FFD700",
    backgroundColor: "#350a50",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 4,
    fontWeight: "bold"
  },

  collectionActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 8
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1
  },

  editButton: {
    backgroundColor: "#fff",
    borderColor: "#350a50"
  },

  deleteButton: {
    backgroundColor: "#fff",
    borderColor: "#d9534f"
  },

  actionText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4
  },

  editText: {
    color: "#350a50"
  },

  deleteText: {
    color: "#d9534f"
  },

  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#350a50",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  }
});