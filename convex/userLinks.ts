import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getByWorkOsId as getUserByWorkOsId } from "./users";
import { paginationOptsValidator } from "convex/server";
import { queryWithUser } from "./auth";

export const paginate = queryWithUser({
  args: {
    paginationOpts: paginationOptsValidator,
    userId: v.string(),
  },
  handler: async (queryContext, args) => {
    const { db } = queryContext;

    return await db
      .query("user_links")
      .filter((q) => q.eq(q.field("workos_id"), args.userId))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

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
