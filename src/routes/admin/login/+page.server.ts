// // src/routes/admin/login/+page.server.ts
// import { redirect } from '@sveltejs/kit';
// import getNhost from '$lib/nhost';

// export async function load() {
//     console.log("page server load",);
//     const nhost = await getNhost();
//     const session = nhost?.getUserSession();

//     if (!session) return {}; // Not logged in → stay on login page

//     const userResponse = await nhost?.auth.getUser();
//     const user = userResponse?.body;

//     if (user?.roles?.includes('admin')) {
//         // Redirect before rendering page → no client-side reload
//         throw redirect(303, '/admin');
//     }

//     return {};
// }
