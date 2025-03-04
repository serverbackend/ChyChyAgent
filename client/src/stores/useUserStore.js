import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signUp: async ({ name, password, email }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/signup", { name, password, email });
      set({ user: res.data.user, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occurred,Try again");
    }
  },
}));
