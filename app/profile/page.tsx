"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "sonner"
import { useUserStore, UserType } from "@/stores/userStore"
// import { useRouter } from "next/navigation"

const EditProfile = () => {
    const { user, userId, getUser, setUser } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [localUser, setLocalUser] = useState<UserType>({
        id: '',
        name: '',
        profile_url: '',
        created_at: '',
        isOnline: true,
    });

    const handleChangeSettings = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalUser((prev) => ({ ...prev, [name]: value }));
    };

    const updateProfile = async () => {
        setIsLoading(true);
        try {
            const supabase = createClient();
            const { data: updatedData, error } = await supabase
                .from("users")
                .update(localUser)
                .eq("id", userId)
                .select()
                .single();

            if (error) {
                toast.error(`Error: ${error.message}`);
                return;
            }

            const updatedUser = updatedData as UserType;
            setUser(updatedUser); // Update store with fresh data
            setLocalUser(updatedUser); // Update local state
            toast.success("Profile Updated");
        } catch (error) {
            toast.error(`Error: ${(error as Error).message}`);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        getUser();
    }, [getUser]);

    useEffect(() => {
        if (user) {
            setLocalUser(user);
        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-[75vh] flex items-center justify-center">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-[75vh] flex flex-col items-center justify-center px-4">
            {/* Avatar Selection */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-center">Choose an Avatar</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <img
                            key={i}
                            src={`/avatars/default-avatar${i + 1}.jpg`}
                            alt={`Avatar ${i + 1}`}
                            onClick={() =>
                                handleChangeSettings({
                                    target: { name: "profile_url", value: `/avatars/default-avatar${i + 1}.jpg` },
                                } as React.ChangeEvent<HTMLInputElement>)
                            }
                            className={`h-20 w-20 rounded-full object-cover border-4 cursor-pointer transition 
                                ${localUser.profile_url === `/avatars/default-avatar${i + 1}.jpg`
                                    ? "border-yellow-500"
                                    : "border-transparent hover:border-gray-300"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Card for Form */}
            <Card className="w-full max-w-md mb-10">
                <CardHeader>
                    <CardTitle>Update Profile</CardTitle>
                    <CardDescription>Change your name and profile picture</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Name Input */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="profileName">Name</Label>
                        <Input
                            name="name"
                            onChange={handleChangeSettings}
                            placeholder="Enter your Name"
                            value={localUser.name}
                            type="text"
                        />
                    </div>

                    {/* URL Input */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="profileUrl">Profile Picture (URL)</Label>
                        <Input
                            name="profile_url"
                            onChange={handleChangeSettings}
                            placeholder="Profile Pic (add URL or pick above)"
                            value={localUser.profile_url}
                            type="text"
                        />
                    </div>

                    {/* Avatar Preview */}
                    <div className="flex flex-col items-center pt-2">
                        <Label>Preview</Label>
                        <Avatar className="h-36 w-36 mt-2">
                            <AvatarImage src={localUser.profile_url} alt={localUser.name} />
                            <AvatarFallback>
                                {userId?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 pt-2 justify-end">
                        <Button
                            onClick={() => console.log("Hello world")}
                            variant="outline"
                        >
                            Delete
                        </Button>
                        <Button onClick={updateProfile} disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditProfile;