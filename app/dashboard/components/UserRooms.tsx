import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Room } from '@/types/dashboard-types'
import { formatDate } from '@/utils/formatDate'
import { Calendar, Copy, Users } from 'lucide-react'
import React from 'react'
type UserRoomProps = {
    rooms: Room[],
    copyInviteId: (room_id: string) => void;
    handleJoinRoom: (room_id: string) => void;
}
const UserRoom = ({ rooms, copyInviteId, handleJoinRoom }: UserRoomProps) => {

    return (
        <>
            {
                rooms.map((room: Room) => (
                    <Card key={room.room_id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="truncate">{room.room_name}</span>
                                <span className="flex gap-1 text-xs">
                                    <Button variant={"secondary"} className="flex items-center gap-1 text-xs border" onClick={() => copyInviteId(room.room_id)}>Invite <Users className="h-3 w-3 text-muted-foreground flex-shrink-0" /></Button>
                                    <Button variant={"outline"} className="flex items-center gap-1 text-xs border" onClick={() => copyInviteId(room.room_id)}>Copy ID<Copy className='h-3 w-3 text-muted-foreground flex-shrink-0'/></Button>
                                </span>
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
                                <Button size="sm" variant="outline">
                                    Settings
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </>


    )
}

export default UserRoom