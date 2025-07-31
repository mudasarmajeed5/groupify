"use server";
import { createClient } from "@/lib/supabase/server";
interface DataType {
    room_name: string,
    room_description: string,
}
export async function createRoom(userId: string | null, resData: DataType) {
    if (!userId) return { success: false, message: "UserID not Provided" };
    const supabase = await createClient();
    try {
        const { data: insertedRoom, error: insertRoomError } = await supabase.from("room").insert({
            room_name: resData.room_name,
            room_description: resData.room_description,
            created_by: userId
        }).select();
        const room = insertedRoom?.[0];
        const room_id = room?.room_id;
        if (!room || !room.room_id) {
            throw new Error("Failed to retrieve inserted room.");
        }
        const { error: insertError } = await supabase.from("user_rooms").insert({
            room_id,
            user_id: userId,
            status: "active",
            role: "admin",

        })
        if (insertRoomError || insertError) {
            throw insertRoomError;
        }
        return { success: true, message: "Room Created",room_id }
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
}