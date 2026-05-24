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
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../services/api";

/*
  AddInstrumentForm
  Fungsi:
  - Menyediakan form input untuk menambahkan instrumen baru
  - Validasi form (Nama, Asal Daerah, Kategori wajib diisi)
  - Pengiriman data ke MockAPI (CRUD: Create)
*/

const AddInstrumentForm = ({ navigation, route }) => {
  const item = route.params?.item;

  const [name, setName] = useState(item ? item.name : "");
  const [origin, setOrigin] = useState(item ? item.origin : "");
  const [category, setCategory] = useState(item ? item.category : "");
  const [description, setDescription] = useState(item ? item.description : "");
  const [imageUrl, setImageUrl] = useState(item ? item.image : "");
  const [submitting, setSubmitting] = useState(false);

  const categories = ["Dipukul", "Dipetik", "Ditiup", "Digesek", "Ditekan"];

  React.useLayoutEffect(() => {
    if (item) {
      navigation.setOptions({
        title: "Edit Alat Musik Nusantara"
      });
    }
  }, [navigation, item]);

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

    setSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        origin: origin.trim(),
        category,
        image: imageUrl.trim() || undefined,
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
      console.log(e);
      setSubmitting(false);
      Alert.alert("Gagal", "Gagal menyimpan data ke server.");
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
            <Text style={styles.infoTitle}>Bagikan Budaya Baru</Text>
            <Text style={styles.infoSubtitle}>
              Masukkan informasi alat musik nusantara agar dapat dinikmati oleh pengguna lain.
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

          {/* URL GAMBAR (OPSIONAL) */}
          <Text style={styles.label}>URL Gambar (Opsional)</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="image" size={20} color="#350a50" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="https://example.com/image.jpg"
              placeholderTextColor="#aaa"
              value={imageUrl}
              onChangeText={setImageUrl}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

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
