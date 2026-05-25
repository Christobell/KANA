import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { api } from "../services/api";
import { supabase } from "../services/supabase";

/*
  AddInstrumentForm
  Fungsi:
  - Menyediakan form input untuk menambah (POST) & edit (PUT) instrumen baru
  - Terintegrasi dengan Expo ImagePicker untuk memilih foto dari galeri
  - Mengunggah foto secara langsung ke Supabase Storage (public bucket: Kana)
*/

const AddInstrumentForm = ({ navigation, route }) => {
  const item = route.params?.item;

  const [name, setName] = useState(item ? item.name : "");
  const [origin, setOrigin] = useState(item ? item.origin : "");
  const [category, setCategory] = useState(item ? item.category : "");
  const [description, setDescription] = useState(item ? item.description : "");
  const [imageUri, setImageUri] = useState(item ? item.image : null);
  const [submitting, setSubmitting] = useState(false);

  const categories = ["Dipukul", "Dipetik", "Ditiup", "Digesek", "Ditekan"];

  React.useLayoutEffect(() => {
    if (item) {
      navigation.setOptions({
        title: "Edit Alat Musik Nusantara"
      });
    }
  }, [navigation, item]);

  // FUNGSI MEMILIH GAMBAR DARI GALERI
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Izin Ditolak", "Aplikasi memerlukan izin galeri untuk memilih foto.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // Menggunakan nilai string untuk menghindari warning deprecation
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  // FUNGSI UPLOAD GAMBAR KE SUPABASE STORAGE
  const uploadImage = async (uri) => {
    // Jika gambar sudah berupa URL remote (berasal dari http/https), tidak perlu upload ulang
    if (uri.startsWith("http")) {
      return uri;
    }

    try {
      const fileExt = uri.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `instruments/${fileName}`;

      // Di React Native, kita wajib menggunakan FormData untuk upload file ke Supabase Storage
      const formData = new FormData();
      formData.append("file", {
        uri: uri,
        name: fileName,
        type: `image/${fileExt === "jpg" ? "jpeg" : fileExt}`
      });

      const { data, error } = await supabase.storage
        .from("Kana")
        .upload(filePath, formData, {
          contentType: `image/${fileExt === "jpg" ? "jpeg" : fileExt}`
        });

      if (error) throw error;

      // Ambil Public URL gambar yang berhasil diunggah
      const { data: publicUrlData } = supabase.storage
        .from("Kana")
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image to Supabase Storage:", error);
      throw new Error("Gagal mengunggah foto instrumen ke storage.");
    }
  };

  // HANDLE SUBMIT (TAMBAH / UPDATE)
  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert("Validasi Gagal", "Nama alat musik wajib diisi!");
      return;
    }
    if (!origin.trim()) {
      Alert.alert("Validasi Gagal", "Asal daerah wajib diisi!");
      return;
    }
    if (!category) {
      Alert.alert("Validasi Gagal", "Silakan pilih salah satu kategori!");
      return;
    }
    if (!imageUri) {
      Alert.alert("Validasi Gagal", "Silakan pilih foto alat musik terlebih dahulu!");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Upload gambar jika pengguna memilih file lokal baru
      const finalImageUrl = await uploadImage(imageUri);

      const payload = {
        name: name.trim(),
        origin: origin.trim(),
        category,
        image: finalImageUrl,
        description: description.trim()
      };

      if (item) {
        // Edit mode (PUT)
        await api.updateInstrument(item.id, payload);
        setSubmitting(false);
        Alert.alert(
          "Berhasil",
          `Alat musik "${name}" berhasil diperbarui!`,
          [
            {
              text: "OK",
              onPress: () => navigation.goBack()
            }
          ]
        );
      } else {
        // Add mode (POST)
        await api.createInstrument(payload);
        setSubmitting(false);
        Alert.alert(
          "Berhasil",
          `Alat musik "${name}" berhasil ditambahkan!`,
          [
            {
              text: "OK",
              onPress: () => navigation.goBack()
            }
          ]
        );
      }
    } catch (e) {
      console.error(e);
      setSubmitting(false);
      Alert.alert("Gagal", e.message || "Gagal menyimpan data ke server.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* INFO CARD */}
        <View style={styles.infoCard}>
          <Ionicons name="musical-notes" size={32} color="#FFD700" style={styles.infoIcon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>{item ? "Perbarui Koleksi" : "Bagikan Budaya Baru"}</Text>
            <Text style={styles.infoSubtitle}>
              {item 
                ? "Sesuaikan detail informasi alat musik tradisional yang tersimpan di database."
                : "Masukkan informasi alat musik nusantara agar dapat dinikmati oleh pengguna lain."
              }
            </Text>
          </View>
        </View>

        {/* FORM CONTAINER */}
        <View style={styles.formCard}>
          
          {/* NAMA INSTRUMEN */}
          <Text style={styles.label}>Nama Alat Musik *</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="musical-note" size={20} color="#350a50" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contoh: Saluang, Kolintang"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* ASAL DAERAH */}
          <Text style={styles.label}>Asal Daerah *</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="pin" size={20} color="#350a50" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contoh: Sumatra Barat"
              placeholderTextColor="#aaa"
              value={origin}
              onChangeText={setOrigin}
            />
          </View>

          {/* KATEGORI */}
          <Text style={styles.label}>Kategori Permainan *</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat, idx) => {
              const isSelected = category === cat;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.categoryBadge,
                    isSelected && styles.categoryBadgeSelected
                  ]}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && styles.categoryTextSelected
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* PILIH GAMBAR DARI GALERI (STORAGE UPLOAD) */}
          <Text style={styles.label}>Foto Alat Musik *</Text>
          <TouchableOpacity style={styles.imagePickerBox} onPress={pickImage} activeOpacity={0.8}>
            {imageUri ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
                <View style={styles.imageOverlay}>
                  <Ionicons name="camera" size={16} color="#fff" />
                  <Text style={styles.imageOverlayText}>Ubah Foto</Text>
                </View>
              </View>
            ) : (
              <View style={styles.imagePickerPlaceholder}>
                <Ionicons name="camera-outline" size={32} color="#350a50" style={{ marginBottom: 6 }} />
                <Text style={styles.imagePickerText}>Pilih Foto dari Galeri</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* DESKRIPSI (OPSIONAL) */}
          <Text style={styles.label}>Deskripsi Singkat</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Jelaskan sejarah singkat atau keunikan alat musik ini..."
              placeholderTextColor="#aaa"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* SUBMIT BUTTON */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.9}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#FFD700" />
            ) : (
              <Text style={styles.submitButtonText}>
                {item ? "Perbarui Alat Musik" : "Tambah Alat Musik"}
              </Text>
            )}
          </TouchableOpacity>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddInstrumentForm;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  infoCard: {
    backgroundColor: "#350a50",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  infoIcon: {
    marginRight: 12
  },
  infoTextContainer: {
    flex: 1
  },
  infoTitle: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4
  },
  infoSubtitle: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.9
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#350a50",
    marginBottom: 8,
    marginTop: 14
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 12
  },
  inputIcon: {
    marginRight: 8,
    opacity: 0.8
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333"
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    marginBottom: 4
  },
  categoryBadge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0"
  },
  categoryBadgeSelected: {
    backgroundColor: "#350a50",
    borderColor: "#350a50"
  },
  categoryText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600"
  },
  categoryTextSelected: {
    color: "#FFD700",
    fontWeight: "bold"
  },
  imagePickerBox: {
    width: "100%",
    height: 160,
    backgroundColor: "#f9f9f9",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 8
  },
  imagePickerPlaceholder: {
    justifyContent: "center",
    alignItems: "center"
  },
  imagePickerText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600"
  },
  imagePreviewContainer: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(53, 10, 80, 0.6)",
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  imageOverlayText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 6
  },
  textAreaContainer: {
    alignItems: "flex-start",
    paddingVertical: 8
  },
  textArea: {
    height: 100,
    textAlignVertical: "top"
  },
  submitButton: {
    backgroundColor: "#350a50",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
    elevation: 3,
    shadowColor: "#350a50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  submitButtonText: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold"
  }
});
