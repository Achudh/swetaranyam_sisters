import { nhost } from "$lib/stores/auth";
import { redirect } from "@sveltejs/kit";

export async function load({ url, cookies }) {
  const refreshToken = cookies.get("nhost_refresh");

  if (refreshToken) {
    try {
      // refreshSession automatically uses stored refresh token
      await nhost.refreshSession();
    } catch {
      // invalid/expired refresh token
    }
  }

  // Get user info
  let user;
  try {
    const uRes = await nhost.auth.getUser();
    user = uRes.body;
  } catch {
    user = null;
  }

  if (url.pathname === "/admin/login") return {};
  if (!user?.roles?.includes("admin")) throw redirect(303, "/admin/login");

  return { user };
}
