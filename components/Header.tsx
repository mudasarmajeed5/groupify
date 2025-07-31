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

const Header = () => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        setUser(data.user);
      }
      else setUser(null);

    };
    fetchUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    })
    return () => {
      subscription.unsubscribe();
    }

  }, []);

  const userInitial = user?.email?.charAt(0).toUpperCase() ?? "U";
  const userEmail = user?.email ?? "Unknown";
  const userName = user?.user_metadata?.name ?? userEmail.split("@")[0] ?? "User";
  const avatarUrl = user?.user_metadata?.avatar_url || "/default-avatar.png";

  return (
    <nav className="p-4 border-b-2 flex justify-between">
      <div className="text-2xl font-bold">Groupify {isDashboard ? "Dashboard" : ""}</div>

      <div className="flex items-center space-x-4">
        {
          isDashboard &&
          <Button>Invite to App</Button>
        }
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={avatarUrl} alt={userName} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-fit" align="end">
              <div className="px-3 py-1 text-sm font-medium">{userName}</div>
              <div className="px-3 text-xs text-muted-foreground truncate">{userEmail}</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
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
