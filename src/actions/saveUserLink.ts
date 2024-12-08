"use server";

import { withAuth } from "@workos-inc/authkit-nextjs";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { FieldNames } from "@/types/fieldNames";
import { validateUrl } from "@/utils/validateUrl";

export default async function saveUserLink(formData: FormData) {
  const { user } = await withAuth();
  if (!user) return;

  const link = formData.get(FieldNames.SavedUserLink) as string;

  if (!link || !validateUrl(link)) return;

  await fetchMutation(api.userLinks.saveLink, {
    link,
    userId: user.id,
  });
}
