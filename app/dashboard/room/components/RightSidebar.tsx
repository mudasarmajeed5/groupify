"use client"
import { Settings, UserX, Crown, User } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface RoomMembers {
    role: string;
    user: {
        name: string;
        profile_url: string;
    } | {
        name: string;
        profile_url: string;
    }[]; // Handle both single object and array
    user_id: string;
}

const RightSidebar = ({ roomId }: { roomId: string }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [roomMembers, setRoomMembers] = useState<RoomMembers[]>([]);

    async function getJoinedMembers(roomId: string) {
        try {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("user_rooms")
                .select(`
                 user_id,
                 role,
                 user:users(name,profile_url)
                 `)
                .eq("room_id", roomId);
            
            if (error) {
                console.log(error.message);
                return;
            }
            
            setRoomMembers(data || []);
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    useEffect(() => {
        getJoinedMembers(roomId);
    }, [roomId]);

    const getRoleIcon = (role: string) => {
        return role === 'admin' ? <Crown className="w-4 h-4 text-yellow-500" /> : <User className="w-4 h-4 text-gray-500" />;
    };

    const getRoleBadgeVariant = (role: string) => {
        return role === 'admin' ? 'default' : 'secondary';
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} size="icon" variant="outline">
                    <Settings className="w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px]">
                <SheetTitle className="text-xl p-4 font-semibold">Room Settings</SheetTitle>
                
                <div className="space-y-4 p-2">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
                            Members ({roomMembers.length})
                        </h3>
                        <Separator className="mb-4" />
                    </div>

                    <div className="space-y-3">
                        {roomMembers.map((member) => {
                            // Handle both array and single object cases
                            const userData = Array.isArray(member.user) ? member.user[0] : member.user;
                            
                            if (!userData) return null;
                            
                            return (
                                <div 
                                    key={member.user_id} 
                                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage 
                                                src={userData.profile_url} 
                                                alt={userData.name}
                                            />
                                            <AvatarFallback className="text-sm font-medium">
                                                {getInitials(userData.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-medium text-sm truncate">
                                                    {userData.name}
                                                </p>
                                                {getRoleIcon(member.role)}
                                            </div>
                                            <Badge 
                                                variant={getRoleBadgeVariant(member.role)} 
                                                className="text-xs h-5"
                                            >
                                                {member.role}
                                            </Badge>
                                        </div>
                                    </div>

                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                                        onClick={() => {
                                            // Add your remove member logic here
                                            console.log('Remove member:', member.user_id);
                                        }}
                                    >
                                        <UserX className="w-4 h-4" />
                                    </Button>
                                </div>
                            );
                        })}
                        
                        {roomMembers.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No members found</p>
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default RightSidebar;