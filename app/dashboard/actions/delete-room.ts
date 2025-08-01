"use server"
import { createClient } from "@/lib/supabase/server"
interface DeleteRoomProps {

    userId: string,
    roomId: string
}
export async function deleteRoom({ userId, roomId }: DeleteRoomProps) {
    try {
        const supabase = await createClient();
        const { data: deletedRooms, error } = await supabase.from("room").delete()
            .eq("room_id", roomId)
            .eq("created_by", userId)
            .select();
        if (error) {
            console.error("Error getting rooms: ", error.message);
            return { deleteId: null, success: false };
        }
        if (deletedRooms && deletedRooms.length > 0) {
            return { deleteId: deletedRooms[0].room_id, success: true };
        }
        return { deleteId: null, success: false };
    } catch (error) {
        console.error("Unexpected error:", (error as Error).message);
        return { deleteId: null, success: false };
    }
}