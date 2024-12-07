import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: v.object({ email: v.string(), workos_id: v.string() }),
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      email: args.email,
      workos_id: args.workos_id,
    });
  },
});
