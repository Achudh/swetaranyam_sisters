// import { browser } from "$app/environment";

// let nhostClient: any = null;

// export async function getNhost() {
//     if (!browser) return null; // prevent SSR import

//     if (!nhostClient) {
//         const mod = await import("@nhost/nhost-js"); // dynamic import only in browser
//         const { createClient } = mod as { createClient: (opts: any) => any };

//         nhostClient = createClient({
//             subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN!,
//             region: import.meta.env.VITE_NHOST_REGION!,
//         });
//     }

//     return nhostClient;
// }
import { createClient, type NhostClient } from "@nhost/nhost-js";

export const nhost: NhostClient = createClient({
    subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN!,
    region: import.meta.env.VITE_NHOST_REGION!,
});