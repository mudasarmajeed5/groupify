import { RoomMembers } from "@/types/room-types";
import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';

type RoomStore = {
  roomMembers: RoomMembers[];
  getJoinedMembers: (roomId: string) => Promise<void>;
  roomId: string | null;
};

export const useRoomStore = create<RoomStore>((set) => ({
  roomMembers: [],
  roomId: null,
  getJoinedMembers: async (roomId) => {
    set({ roomId })
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('user_rooms')
        .select(`user_id, role, user:users(name, profile_url)`)
        .eq('room_id', roomId);

      if (error) return console.error('[RoomStore Error]', error.message);
      set({ roomMembers: data || [] });
    } catch (err) {
      console.error('[RoomStore Catch]', (err as Error).message);
    }
  },
}));
