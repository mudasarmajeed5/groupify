"use server"

import { createClient } from "@/lib/supabase/server"
import { Todo } from "../../../../types/room-types";
type FetchResponse<T> = { success: true, data: T } | { success: false, message: string }
export async function fetchTodos(roomId: string): Promise<FetchResponse<Todo[]>> {
    try {
        const supabase = await createClient();
        const { data: todos, error: fetchError } = await supabase.from('todos').select('*').eq("room_id", roomId);
        if (fetchError) {
            return { success: false, message: fetchError.message }
        }
        const castTodos = todos as Todo[];
        return { success: true, data: castTodos };
    } catch (error) {
        return { success: false, message: (error as Error).message }
    }
}