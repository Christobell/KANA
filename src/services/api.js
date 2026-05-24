import axios from "axios";

const BASE_URL = "https://6a1349e978d0434e0d5df23c.mockapi.io";

export const api = {
  // GET: Mengambil semua data alat musik
  getInstruments: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Instrument`);
      return response.data;
    } catch (error) {
      console.error("Error fetching instruments:", error);
      throw error;
    }
  },

  // POST: Menambahkan alat musik baru
  createInstrument: async (instrumentData) => {
    try {
      const response = await axios.post(`${BASE_URL}/Instrument`, {
        name: instrumentData.name,
        origin: instrumentData.origin,
        category: instrumentData.category,
        image: instrumentData.image || "https://images.unsplash.com/photo-1573059224875-f1404306b3e2?w=500&auto=format&fit=crop", // placeholder image jika kosong
        description: instrumentData.description || "",
        createdAt: new Date()
      });
      return response.data;
    } catch (error) {
      console.error("Error creating instrument:", error);
      throw error;
    }
  },

  // PUT: Memperbarui data alat musik
  updateInstrument: async (id, instrumentData) => {
    try {
      const response = await axios.put(`${BASE_URL}/Instrument/${id}`, {
        name: instrumentData.name,
        origin: instrumentData.origin,
        category: instrumentData.category,
        image: instrumentData.image,
        description: instrumentData.description
      });
      return response.data;
    } catch (error) {
      console.error("Error updating instrument:", error);
      throw error;
    }
  },

  // DELETE: Menghapus alat musik berdasarkan ID
  deleteInstrument: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/Instrument/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting instrument:", error);
      throw error;
    }
  }
};
