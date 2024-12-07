import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/workos-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const bodyText = await request.text();
    const signatureHeader = String(request.headers.get("workos-signature"));

    try {
      await ctx.runAction(internal.workos.verifyWebhook, {
        payload: bodyText,
        signature: signatureHeader,
      });

      const { data, event } = JSON.parse(bodyText);

      switch (event) {
        case "user.created": {
          await ctx.runMutation(internal.users.create, {
            email: data.email,
            workos_id: data.id,
          });
          break;
        }
        case "user.updated": {
          const user = await ctx.runQuery(internal.users.getByWorkOsId, {
            workos_id: data.id,
          });

          if (!user?._id) {
            throw new Error(
              `Unhandled event type: User not found with id: ${data.id}`,
            );
          }

          await ctx.runMutation(internal.users.update, {
            id: user._id,
            patch: { email: data.email },
          });

          break;
        }

        case "user.deleted": {
          const user = await ctx.runQuery(internal.users.getByWorkOsId, {
            workos_id: data.id,
          });

          if (!user?._id) {
            throw new Error(
              `Unhandled event type: User not found: ${data.id}.`,
            );
          }

          await ctx.runMutation(internal.users.destroy, {
            id: user._id,
          });

          break;
        }
        default:
          throw new Error(`Unhandled event type: ${event}`);
      }

      return new Response(JSON.stringify({ status: "success" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Unhandled event type")) {
          return new Response(
            JSON.stringify({
              status: "error",
              message: error.message,
            }),
            {
              status: 422,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      }

      return new Response(
        JSON.stringify({
          status: "error",
          message: "Internal server error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  }),
});

export default http;
