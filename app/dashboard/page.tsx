"use client"
import { Button } from "@/components/ui/button";
import { getJoinedRooms, getRooms } from "./actions/get-rooms";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Room } from "@/types/dashboard-types";
import { Users, RefreshCw } from "lucide-react";
import CreateRoom from "./components/CreateRoom";
import RoomSkeleton from "./components/RoomLoader";
import { toast } from "sonner";
import UserRoom from "./components/UserRooms";
import JoinedRoom from "./components/JoinedRooms";
import JoinRoomDialog from "./components/JoinRoomDialog";
export default function DashboardPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [joinedRooms, setJoinedRooms] = useState<Room[]>([])

  const [loading, setLoading] = useState(true); // tracks fetch status
  const onRoomCreate = (room: Room) => {
    setRooms((prev) => [...prev, room]);

  }


  const getUserRooms = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    if (data?.user?.id) {
      const result = await getRooms(data.user.id);
      const joinedRooms = await getJoinedRooms(data.user.id);
      setUserId(data.user.id)
      if (result?.success) {
        setRooms(result.rooms);
      }
      if (joinedRooms.success) {
        setJoinedRooms(joinedRooms.rooms)
      }
    }
    setLoading(false);
  };
  const handleJoinRoom = (room_id: string) => {
    console.log(room_id);
  }
  const copyInviteId = (room_id: string) => {
    navigator.clipboard.writeText(room_id)
    toast.success("Room Join Code copied to clipboard")
  }

  useEffect(() => {
    getUserRooms();
  }, []);

  return (
    <>
      <div className="min-h-[75vh] container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Rooms</h1>
            <p className="text-muted-foreground">
              Manage your own collaborative workspaces
            </p>
          </div>
          <div className="flex gap-2">
            <CreateRoom onRoomCreate={onRoomCreate} userId={userId} />
            <Button onClick={getUserRooms} className="flex items-center gap-2">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <RoomSkeleton key={i} />)}
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No rooms yet</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Create your first room to start collaborating with your team
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UserRoom copyInviteId={copyInviteId} handleJoinRoom={handleJoinRoom} rooms={rooms} />
          </div>
        )}

        <div className="flex mt-10 justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Joined Rooms</h1>
            <p className="text-muted-foreground text-sm mb-5">
              Work on your daily tasks
            </p>
          </div>
          <div>
            <JoinRoomDialog userId={userId} handleJoinRoom={handleJoinRoom} />
          </div>

        </div>
        {loading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <RoomSkeleton key={i} />)}
        </div>)
          : joinedRooms.length == 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Joined rooms yet</h3>
              <p className="text-muted-foreground mb-4 max-w-sm">
                Join a room to get started.
              </p>
            </div>
          ) :
            (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <JoinedRoom joinedRooms={joinedRooms} handleJoinRoom={handleJoinRoom} />
              </div>
            )}
      </div>
    </>
  );
}