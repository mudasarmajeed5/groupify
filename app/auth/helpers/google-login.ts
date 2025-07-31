import { createClient } from "@/lib/supabase/client";
export const handleGoogleLogin = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: "http://localhost:3000/auth/callback?next=/dashboard"
        }
    });
    if (error) {
        console.error("Google login error", error.message)
    }
    else {
        console.log("Redirecting to Google Login....", data)
    }

}
