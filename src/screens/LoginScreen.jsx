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
  LoginScreen
  Fungsi: Mengelola login pengguna ke akun Supabase Auth
*/

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Semua kolom wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });

      if (error) throw error;
    } catch (error) {
      Alert.alert("Gagal Masuk", error.message || "Email atau password salah.");
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
            <Ionicons name="musical-notes" size={54} color="#FFD700" />
          </View>
          <Text style={styles.title}>KANA</Text>
          <Text style={styles.subtitle}>Selamat Datang di Galeri Musik Nusantara</Text>
        </View>

        {/* FORM AREA */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color="#350a50" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Masukkan email Anda"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.inputLabel}>Kata Sandi</Text>
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#350a50" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Masukkan kata sandi Anda"
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

          {/* LOGIN BUTTON */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.9}
          >
            {loading ? (
              <ActivityIndicator color="#FFD700" />
            ) : (
              <Text style={styles.loginButtonText}>Masuk</Text>
            )}
          </TouchableOpacity>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Belum memiliki akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.footerLink}>Daftar Sekarang</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    marginBottom: 40
  },
  logoBadge: {
    backgroundColor: "rgba(255, 215, 0, 0.15)",
    padding: 20,
    borderRadius: 30,
    marginBottom: 16
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
    letterSpacing: 2
  },
  subtitle: {
    fontSize: 13,
    color: "#fff",
    marginTop: 8,
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
  loginButton: {
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
  loginButtonText: {
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
