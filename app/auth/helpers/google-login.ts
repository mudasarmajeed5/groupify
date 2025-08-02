import { createClient } from "@/lib/supabase/client";
type GoogleLoginProps = {
    inviteId?: string | null;
}
export const handleGoogleLogin = async ({ inviteId }: GoogleLoginProps) => {
    const supabase = createClient();
    let constructedUri = ''
    const redirectUri = `${window.location.origin}/auth/callback?next=`;
    if (!inviteId) {
        constructedUri = redirectUri + "/dashboard"
    }
    else {
        constructedUri = redirectUri + `/invite?invite-id=${inviteId}`
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: constructedUri
        }
    });
    if (error) {
        console.error("Google login error", error.message)
    }
    else {
        console.log("Redirecting to Google Login....", data)
    }

}
