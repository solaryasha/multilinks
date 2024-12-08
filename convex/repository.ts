import { Auth } from "convex/server";
import { DatabaseReader } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const findUser = async (
  db: DatabaseReader,
  auth: Auth,
): Promise<Doc<"users"> | null> => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  console.log({ identity });

  return await db.query("users").first();
};
