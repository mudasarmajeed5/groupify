import { Button } from "./ui/button"
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server"
import { LogoutButton } from "./logout-button";
const Header = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
   
    return (
        <nav className="p-4 border-b-2 flex justify-between">
            <div className="text-2xl font-bold">
                Groupify Dashboard
            </div>
            <div className="flex items-center space-x-4">
                {
                    data.user?.email ?  <>
                    {data.user?.email}  &nbsp;&nbsp;
                    <LogoutButton/>
                    </> : <Button onClick={() => redirect("/login")}>Login</Button>
                }
                {
                    data.user && <Button>Invite</Button>
                }
            </div>
        </nav>
    )
}

export default Header