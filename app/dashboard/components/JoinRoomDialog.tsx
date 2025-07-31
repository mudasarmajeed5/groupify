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
interface CreateRoomProps {
    userId: string | null,
    handleJoinRoom: (room_id: string) => void
}
const JoinRoomDialog = ({ userId, handleJoinRoom }: CreateRoomProps) => {
    const [open, setOpen] = useState(false);
    console.log(userId);
    const [roomId, setRoomId] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = () => {
        setLoading(true)
        console.log(loading);
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
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-3">
                        <Input
                            placeholder="Enter room ID"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            required
                            name="room_name"
                        />
                        <Button onClick={() => handleJoinRoom(roomId)} disabled={loading} type="submit">
                            {
                                loading ? "Joining" : "Join"
                            }
                        </Button>
                    </div>
                </form>
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