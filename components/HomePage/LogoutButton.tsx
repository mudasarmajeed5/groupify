"use client";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation";
const LogoutButton = () => {
    const router = useRouter();
    const supabase = createClient();
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout failed:", error);
        } else {
            router.push("/login");
        }
    }
    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}

export default LogoutButton