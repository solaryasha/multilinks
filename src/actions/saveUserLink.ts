"use server";

import { withAuth } from "@workos-inc/authkit-nextjs";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../convex/_generated/api";

export default async function saveUserLink(link: string) {
  const { user } = await withAuth();

  if (user) {
    await fetchMutation(api.userLinks.saveLink, {
      link,
      userId: user.id,
    });
  }
}
