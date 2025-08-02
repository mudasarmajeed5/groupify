"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useUserStore } from "@/stores/userStore";

const Header = () => {
  const { user: profileUser, getUser, clearUser } = useUserStore();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const [authUser, setAuthUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        setAuthUser(data.user);
        getUser(); // Remove await
      } else {
        setAuthUser(null);
        clearUser(); // Clear store when no auth user
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
      if (session?.user) {
        getUser(); // Remove await
      } else {
        clearUser(); // Clear store on logout
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []); // Remove getUser from dependencies - this was causing infinite loop

  // Use profile data if available, fallback to auth metadata
  const displayName = profileUser?.name || authUser?.user_metadata?.name || authUser?.email?.split("@")[0] || "User";
  const avatarUrl = profileUser?.profile_url || "/avatars/default-avatar2.jpg";
  const userEmail = authUser?.email ?? "Unknown";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="p-4 border-b-2 flex justify-between">
      <Link href="/" className="text-2xl font-bold">
        Groupify {isDashboard ? "Dashboard" : ""}
      </Link>

      <div className="flex items-center space-x-4">
        {isDashboard && <Button>Invite to App</Button>}
        
        {authUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-fit" align="end">
              <div className="px-3 py-1 text-sm font-medium">{displayName}</div>
              <div className="px-3 text-xs text-muted-foreground truncate">{userEmail}</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => router.push("/auth/login")}>Login</Button>
        )}
      </div>
    </nav>
  );
};

export default Header;