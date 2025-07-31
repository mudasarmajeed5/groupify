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
import { createRoom } from "../actions/create-room"
import React, { ChangeEvent, useState } from "react"
import { Room, type NewRoom } from "@/types/dashboard-types"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
interface CreateRoomProps {
    userId: string | null,
    onRoomCreate: (room: Room) => void
}
const CreateRoom = ({ userId, onRoomCreate }: CreateRoomProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newRoom, setNewRoom] = useState<NewRoom>({
        room_name: '',
        room_description: '',
    })
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewRoom((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const result = await createRoom(userId, newRoom);
        const roomObj: Room = {
            room_id: result.room_id,
            room_name: newRoom.room_name,
            room_description: newRoom.room_description,
            created_at: new Date(),
            created_by: userId ? userId : '',
        }
        if (result.success) {
            toast.success(result.message)
            setOpen(false);
            onRoomCreate(roomObj)
        }
        else {
            toast.error(result.message)
        }
        setLoading(false);
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild >
                <Button onClick={() => setOpen(true)}>
                    <span className="flex items-center gap-2">
                        <Plus />
                        Create Room
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Provide Details:</DialogTitle>
                    <DialogDescription>
                        Create room and start collaborating now.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-3">
                        <Input
                            placeholder="Enter room name"
                            value={newRoom.room_name}
                            onChange={handleChange}
                            required
                            name="room_name"
                        />
                        <Input
                            placeholder="Enter room Description"
                            value={newRoom.room_description}
                            onChange={handleChange}
                            required
                            name="room_description"
                        />
                        <Button disabled={loading} type="submit">
                            {
                                loading ? "Creating" : "Create"
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

export default CreateRoom