import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { supabase } from "./services/supabase";

import BottomNavbar from "./navigation/BottomNavbar";
import AuthStack from "./navigation/AuthStack";
import SplashScreen from "./screens/SplashScreen";

/*
  App.js
  Fungsi:
  - Root entry point aplikasi KANA
  - Mengelola SplashScreen dan Sesi Pengguna (Auth Session) Supabase
*/

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 1. Cek sesi login aktif saat pertama kali aplikasi dibuka
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // 2. Dengar perubahan sesi autentikasi (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Jika sedang mengecek sesi, tampilkan SplashScreen
  if (isLoading) {
    return <SplashScreen />;
  }

  // Jika sudah login tampilkan aplikasi utama, jika belum tampilkan form auth
  return (
    <NavigationContainer>
      {session ? <BottomNavbar /> : <AuthStack />}
    </NavigationContainer>
  );
}