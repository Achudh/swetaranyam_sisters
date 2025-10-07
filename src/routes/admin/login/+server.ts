// // src/routes/admin/login/+server.ts
// import { createServerNhost } from "$lib/nhost";
// import { json, error } from "@sveltejs/kit";

// export async function POST({ request, cookies }) {
//     const { email, password } = await request.json();
//     const nhost = createServerNhost(); // server-only client

//     const res = await nhost.auth.signInEmailPassword({ email, password });

//     if (!res.body.session) throw error(401, "Invalid credentials");

//     cookies.set("nhost_refresh", res.body.session.refreshToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         path: "/",
//         sameSite: "lax",
//         maxAge: res.body.session.accessTokenExpiresIn ?? 3600,
//     });

//     return json({ ok: true });
// }
