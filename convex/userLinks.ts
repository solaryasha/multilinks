import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getByWorkOsId as getUserByWorkOsId } from "./users";

export const saveLink = mutation({
  args: {
    link: v.string(),
    userId: v.string(),
  },
  handler: async (queryContext, args) => {
    const { db } = queryContext;
    const user = await getUserByWorkOsId(queryContext, {
      workos_id: args.userId,
    });

    if (!user) {
      throw new Error("Error saving link: User identity not found");
    }

    await db.insert("user_links", {
      workos_id: args.userId,
      link: args.link,
    });
  },
});
