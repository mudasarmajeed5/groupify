"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
interface CreateRoomProps {
    getUserRooms: () => void;
    userId: string;
}
const JoinRoomDialog = ({ userId,getUserRooms }: CreateRoomProps) => {
    const supabase = createClient();
    const [error, setError] = useState<string | null>(null)
    const [open, setOpen] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [loading, setLoading] = useState(false);
    const joinRoom = async (roomId: string, userId: string) => {
        setError(null);
        setLoading(true);
        try {
            const { data: room, error: roomError } = await supabase.from("room").select("room_id,room_name")
                .eq("room_id", roomId)
                .single();
            if (roomError || !room) {
                setError("Room not found or Invalid Code");
                return;
            };
            const { data: existingMember } = await supabase.from("user_rooms").select("*")
                .eq("room_id", roomId)
                .eq("user_id", userId).single();
            if (existingMember) {
                setError("Room already Joined");
                return;
            }
            const { error: insertError } = await supabase.from("user_rooms").upsert({
                room_id: roomId,
                user_id: userId,
                status: "active",
                role: "member",
            })
            if (!insertError) {
                toast.success("Room Joined");
                getUserRooms();
                setOpen(false)
            }
            else {
                setError(insertError.message);
                return;
            }

        } catch (error) {
            setError((error as Error).message);
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild >
                <Button onClick={() => setOpen(true)}>
                    <span className="flex items-center gap-2">
                        <Plus />
                        Join with Code
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter Room ID:</DialogTitle>
                    <DialogDescription>
                        Id looks like: i.e. 37771087-4cdf-452a-89e0-c8b90bf3a9d1
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col space-y-3">
                    <Input
                        placeholder="Enter room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        required
                        name="room_name"
                    />
                    <Button onClick={() => joinRoom(roomId, userId)} disabled={loading} type="submit">
                        {
                            loading ? "Joining" : "Join"
                        }
                    </Button>
                </div>
                {
                    error && <p className="text-red-500 my-2">{error}</p>
                }
                <DialogFooter>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default JoinRoomDialog