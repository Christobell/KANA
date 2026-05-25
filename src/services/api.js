import { supabase } from "./supabase";

/*
  api.js
  Fungsi: Mengelola operasi CRUD pada tabel 'Instrument' di database Supabase
*/

export const api = {
  // GET: Mengambil semua data alat musik
  getInstruments: async () => {
    try {
      const { data, error } = await supabase
        .from("Instrument")
        .select("*")
        .order("id", { ascending: false }); // Urutkan berdasarkan ID terbaru

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching instruments from Supabase:", error);
      throw error;
    }
  },

  // POST: Menambahkan alat musik baru
  createInstrument: async (instrumentData) => {
    try {
      const { data, error } = await supabase
        .from("Instrument")
        .insert([
          {
            name: instrumentData.name,
            origin: instrumentData.origin,
            category: instrumentData.category,
            image: instrumentData.image || "https://images.unsplash.com/photo-1573059224875-f1404306b3e2?w=500&auto=format&fit=crop", // fallback image
            description: instrumentData.description || ""
          }
        ])
        .select();

      if (error) throw error;
      return data ? data[0] : null;
    } catch (error) {
      console.error("Error creating instrument in Supabase:", error);
      throw error;
    }
  },

  // PUT: Memperbarui data alat musik berdasarkan ID
  updateInstrument: async (id, instrumentData) => {
    try {
      const { data, error } = await supabase
        .from("Instrument")
        .update({
          name: instrumentData.name,
          origin: instrumentData.origin,
          category: instrumentData.category,
          image: instrumentData.image,
          description: instrumentData.description
        })
        .eq("id", id)
        .select();

      if (error) throw error;
      return data ? data[0] : null;
    } catch (error) {
      console.error("Error updating instrument in Supabase:", error);
      throw error;
    }
  },

  // DELETE: Menghapus data alat musik berdasarkan ID
  deleteInstrument: async (id) => {
    try {
      const { data, error } = await supabase
        .from("Instrument")
        .delete()
        .eq("id", id)
        .select();

      if (error) throw error;
      return data ? data[0] : null;
    } catch (error) {
      console.error("Error deleting instrument from Supabase:", error);
      throw error;
    }
  }
};
