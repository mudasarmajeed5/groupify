// app/room/[room]/layout.tsx
import { createClient } from "@/lib/supabase/server";
import { Room } from "@/types/dashboard-types";
import RightSidebar from "../components/RightSidebar";
import { AssignTodo } from "../components/AssignTodo";

interface RoomLayoutProps {
    children: React.ReactNode;
    params: {
        room: string;
    };
}

export default async function RoomLayout({ children, params }: RoomLayoutProps) {
    const { room } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("room")
        .select("*")
        .eq("room_id", room)
        .single();
    if (error) {
        return (
            <div className="min-h-[65vh] flex flex-col items-center justify-center">
                <h1>Error loading room</h1>
                <p>Invalid Room ID</p>
            </div>
        );
    }

    const roomData: Room = data;

    return (
        <>
            <header className="flex p-4 justify-between border-b">
                <h1 className="text-2xl font-semibold">{roomData.room_name}s Room</h1>
                <div className="flex gap-2 items-center">
                    <AssignTodo roomId={room} />
                    <RightSidebar roomId={room} />
                </div>
            </header>
            <main className="min-h-[60vh]">{children}</main>
        </>
    );
}
