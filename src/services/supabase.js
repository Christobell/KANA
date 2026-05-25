import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// ==========================================
// KREDENSIAL SUPABASE
// ==========================================
const SUPABASE_URL = "https://vydhdhuaulezrnyvkoll.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_5CK2pG5E3CxJSp6Sru9s2g_ZrIO2Tm2";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
