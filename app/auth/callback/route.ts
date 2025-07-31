import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function GET(req: NextRequest) {
    const { searchParams, origin } = new URL(req.url);
    const code = searchParams.get('code');
    let next = searchParams.get('next') ?? '/'
    if (!next.startsWith('/')) {
        next = '/'
    }
    if (code) {
        const supabase = await createClient();
        const { error: exhangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (!exhangeError) {
            const {
                data: { user },
                error: userFetchError,
            } = await supabase.auth.getUser();
            if (userFetchError || !user) {
                return NextResponse.redirect(`${origin}/auth/error`);
            }
            const { id, email, user_metadata } = user;
            const name = user_metadata.full_name ? user_metadata.full_name : email?.split("@")[0];
            const profile_url = user_metadata.avatar_url ?? "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
            const { error: insertError } = await supabase.from("users").upsert({
                id,
                name,
                profile_url
            },
                { onConflict: "id" }
            )
            if (insertError) {
                console.error("Insert error: ", insertError.message)
                return NextResponse.redirect("/auth/error");
            }

            const forwardedHost = req.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        }
    }
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}