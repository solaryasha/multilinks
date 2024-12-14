import { customQuery } from "convex-helpers/server/customFunctions";
import { v } from "convex/values";
import { query } from "./_generated/server";
import { getByWorkOsId } from "./users";

export const queryWithUser = customQuery(query, {
  args: { userId: v.string() },
  input: async (ctx, args) => {
    const user = await getByWorkOsId(ctx, {
      workos_id: args.userId,
    });

    if (!user) {
      throw new Error("Error saving link: User identity not found");
    }

    return { ctx: {}, args: {} };
  },
});
