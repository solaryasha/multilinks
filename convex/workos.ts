"use node";
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { WorkOS } from "@workos-inc/node";

export const verifyWebhook = internalAction({
  args: v.object({
    payload: v.string(),
    signature: v.string(),
  }),
  handler: async (ctx, args) => {
    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    return await workos.webhooks.constructEvent({
      payload: JSON.parse(args.payload),
      sigHeader: args.signature,
      secret: String(process.env.WORKOS_WEBHOOK_SECRET),
    });
  },
});
