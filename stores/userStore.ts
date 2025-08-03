"use client"
import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

export type UserType = {
  id: string;
  name: string;
  profile_url: string;
  created_at: string;
  isOnline: boolean;
};

interface UserStore {
  user: UserType | null;
  userId: string | null;
  isLoading: boolean;
  getUser: () => Promise<void>;
  setUser: (user: UserType) => void;
  clearUser: () => void; // Add this
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  userId: null,
  isLoading: false,

  setUser: (user) => set({ user, userId: user.id }),
  
  clearUser: () => set({ user: null, userId: null }), // Add this

  getUser: async () => {
    try {
      set({ isLoading: true });
      const supabase = createClient();
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;

      if (!userId) {
        set({ user: null, userId: null, isLoading: false });
        return;
      }

      // Don't fetch again if we already have this user
      const currentState = get();
      if (currentState.userId === userId && currentState.user) {
        set({ isLoading: false });
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error.message);
        // Don't show toast for missing profile - it's normal for new users
        set({ user: null, userId, isLoading: false });
        return;
      }

      const userData = data as UserType;
      set({ user: userData, userId: userData.id, isLoading: false });
    } catch (err) {
      console.error("Error in getUser:", err);
      set({ user: null, userId: null, isLoading: false });
    }
  },
}));