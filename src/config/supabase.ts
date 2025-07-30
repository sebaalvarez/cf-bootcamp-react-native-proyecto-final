import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://acdgksekodricppatoqe.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZGdrc2Vrb2RyaWNwcGF0b3FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNTk4NTcsImV4cCI6MjA2ODkzNTg1N30.u0PbAsXqJQ9d7BZY1ZKe_W9bdm5xvuQIuSnGPU1f8m4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
