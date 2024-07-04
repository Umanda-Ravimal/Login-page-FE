import { create } from "zustand";

const useAuthStore = create((set) => ({
  isUserValid: false,
  setIsUserValid: (isValid) => set({ isUserValid: isValid }),
}));

export default useAuthStore;
