import { create } from "zustand";
import axios from "../../src/utils/axios";
import { toast } from "react-toastify";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signUp: async ({ name, password, email }, navigate) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/signup", {
        name,
        password,
        email,
      });
      set({ user: res.data.user, loading: false });
      toast.success("User registered successfully");
      navigate("/admin/login");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occurred,Try again");
    }
  },

  login: async ({ password, email }, navigate) => {
    set({ loading: true });

    try {
      const res = await axios.post(
        "/auth/login",
        { password, email },
        { withCredentials: true }
      );

      set({ user: res.data, loading: false });
      document.cookie = `accessToken=${res.data.accessToken}; path=/;`;
      navigate("/admin/dashboard");
      toast.success("User logged in successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "An error occurred, try again"
      );
    }
  },

  logout: async (navigate) => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      if (navigate) navigate("/admin/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );
      set({ user: null });
      if (navigate) navigate("/admin/login");
    }
  },

  uploadProfileImage: async (file) => {
    set({ loading: true });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/auth/upload-image", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the user state immediately with the new image URL
      set((state) => ({
        user: { ...state.user, image: res.data.image },
        loading: false,
      }));

      toast.success("Image uploaded successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Upload failed, try again");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      console.log(error.message);
      set({ checkingAuth: false, user: null });
    }
  },

  refreshToken: async () => {
    // Prevent multiple simultaneous refresh attempts
    if (get().checkingAuth) return;

    set({ checkingAuth: true });
    try {
      const response = await axios.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        // Start a new refresh process
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle as needed
        useUserStore.getState().logout();
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
