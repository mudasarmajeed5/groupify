"use server";
import { createClient } from "@/lib/supabase/server";
import { Room } from "@/types/dashboard-types";
export async function getRooms(userId: string | null) {
    if (!userId) return;
    const supabase = await createClient();
    try {
        const { data, error: fetchError } = await supabase.from("room").select("*").eq("created_by", userId);
        if (fetchError) {
            throw fetchError;
        }
        return { success: true, rooms: (data as Room[]) || [] };
    } catch (error) {
        return { success: false, message: (error as Error).message, rooms: [] };
    }
}

export const getJoinedRooms = async (userId: string | null) => {
    const supabase = await createClient();
    try {

        const { data, error: fetchError } = await supabase
            .from("room")
            .select(`
            *,
             user_rooms!inner(role, joined_at)
            `)
            .eq("user_rooms.user_id", userId)
            .eq("user_rooms.role", "member");

        if (fetchError) {
            throw fetchError;
        }
        return { success: true, rooms: (data as Room[]) || [] }
    } catch (error) {
        return { success: false, message: (error as Error).message, rooms: [] }
    }
}