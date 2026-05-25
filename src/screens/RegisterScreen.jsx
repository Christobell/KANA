import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../services/supabase";

/*
  RegisterScreen
  Fungsi: Mengelola registrasi akun baru beserta pembuatan profil di database Supabase
*/

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Error", "Semua kolom wajib diisi!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Kata sandi minimal berisi 6 karakter!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Konfirmasi kata sandi tidak cocok!");
      return;
    }

    setLoading(true);
    try {
      // 1. Daftar Akun di Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim()
      });

      if (error) throw error;

      const user = data.user;

      // 2. Buat profil baru di tabel 'profiles'
      if (user) {
        const generatedUsername = `@${email.split("@")[0]}`;
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: user.id,
              full_name: fullName.trim(),
              username: generatedUsername,
              bio: "Pecinta alat musik tradisional Indonesia 🎶",
              favorite_instrument: ""
            }
          ]);

        if (profileError) {
          console.error("Error creating profile row:", profileError);
        }
      }

      Alert.alert(
        "Pendaftaran Berhasil",
        "Akun Anda telah berhasil dibuat! Silakan masuk menggunakan email dan kata sandi Anda.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login")
          }
        ]
      );
    } catch (error) {
      Alert.alert("Pendaftaran Gagal", error.message || "Gagal membuat akun.");
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* LOGO AREA */}
        <View style={styles.logoArea}>
          <View style={styles.logoBadge}>
            <Ionicons name="person-add" size={44} color="#FFD700" />
          </View>
          <Text style={styles.title}>Buat Akun</Text>
          <Text style={styles.subtitle}>Daftar untuk mulai mengoleksi musik nusantara</Text>
        </View>

        {/* FORM AREA */}
        <View style={styles.formContainer}>
          
          {/* NAMA LENGKAP */}
          <Text style={styles.inputLabel}>Nama Lengkap</Text>
          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={20} color="#350a50" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contoh: Christobell Dillon"
              placeholderTextColor="#aaa"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* EMAIL */}
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color="#350a50" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="nama@email.com"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* KATA SANDI */}
          <Text style={styles.inputLabel}>Kata Sandi (Min 6 Karakter)</Text>
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#350a50" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Buat kata sandi baru"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureText}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Ionicons
                name={secureText ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* KONFIRMASI KATA SANDI */}
          <Text style={styles.inputLabel}>Konfirmasi Kata Sandi</Text>
          <View style={styles.inputBox}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#350a50" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ulangi kata sandi Anda"
              placeholderTextColor="#aaa"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={secureText}
              autoCapitalize="none"
            />
          </View>

          {/* REGISTER BUTTON */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.9}
          >
            {loading ? (
              <ActivityIndicator color="#FFD700" />
            ) : (
              <Text style={styles.registerButtonText}>Daftar</Text>
            )}
          </TouchableOpacity>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Sudah memiliki akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.footerLink}>Masuk</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#350a50"
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40
  },
  logoArea: {
    alignItems: "center",
    marginBottom: 30
  },
  logoBadge: {
    backgroundColor: "rgba(255, 215, 0, 0.15)",
    padding: 16,
    borderRadius: 24,
    marginBottom: 12
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700"
  },
  subtitle: {
    fontSize: 12,
    color: "#fff",
    marginTop: 6,
    opacity: 0.8,
    textAlign: "center"
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#350a50",
    marginBottom: 8,
    marginTop: 14
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9"
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
  registerButton: {
    backgroundColor: "#350a50",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 28,
    elevation: 3,
    shadowColor: "#350a50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  registerButtonText: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  footerText: {
    color: "gray",
    fontSize: 13
  },
  footerLink: {
    color: "#350a50",
    fontWeight: "bold",
    fontSize: 13
  }
});
