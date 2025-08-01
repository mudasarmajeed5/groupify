"use client"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Room } from '@/types/dashboard-types'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useState } from 'react'
type JoinedRoomProps = {
    handleLeaveRoomUI: (room_Id: string) => void;
    userId: string
    joinedRooms: Room[],
    handleJoinRoom: (room_id: string) => void;
}
const JoinedRoom = ({ userId, joinedRooms, handleJoinRoom, handleLeaveRoomUI }: JoinedRoomProps) => {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const handleLeaveRoom = async (room_id: string) => {
        setIsLoading(true);
        const { error: deleteError } = await supabase.from("user_rooms").delete().eq("room_id", room_id)
            .eq("user_id", userId);
        if (deleteError) {
            console.log("Failed to leave room", deleteError.message);
            setIsLoading(false);
        }
        else {
            toast.success("Room Left");
            handleLeaveRoomUI(room_id);
            setIsLoading(false);
        }
    }

    return (
        <>
            {joinedRooms.length > 0 && joinedRooms.map((room) => (
                <Card key={room.room_id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                        <CardTitle className="flex mb-2 items-center justify-between">
                            <span className="truncate">{room.room_name}</span>
                            <Badge>Member</Badge>
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                            {room.room_description || 'No description available'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Created {formatDate(room.created_at)}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                className="flex-1"
                                onClick={() => handleJoinRoom(room.room_id)}
                            >
                                Enter Room
                            </Button>
                            <Button onClick={() => handleLeaveRoom(room.room_id)} size="sm" disabled={isLoading} variant="destructive">
                                {isLoading ? "Leaving": "Leave"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}

export default JoinedRoom