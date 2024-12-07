import { crud } from "convex-helpers/server/crud";
import schema from "./schema";
import { internalQuery } from "./_generated/server";

const userFields = schema.tables.users.validator.fields;
export const { create, update, destroy } = crud(schema, "users");

export const getByWorkOsId = internalQuery({
  args: { workos_id: userFields.workos_id },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((query) => query.eq(query.field("workos_id"), args.workos_id))
      .first();
  },
});
