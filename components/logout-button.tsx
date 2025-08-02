"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

export function LogoutButton() {
  const router = useRouter();
  const { clearUser } = useUserStore();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    clearUser(); // Clear the store data
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}