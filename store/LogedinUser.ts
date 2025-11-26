import { Iuser } from "@/types/apiFetch";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LogedinUserState {
  user: Iuser | null;
  setUser: (user: Iuser) => void;
  clearUser: () => void;
}

const useLogedinUser = create<LogedinUserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: "logedin-user-storage" }
  )
);
export default useLogedinUser;
