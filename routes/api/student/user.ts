import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.3.0/mod.js";
import { usersCollection } from "../../../lib/mongo.ts";

export const handler: Handlers = {
  async GET(req) {
    try {
      const url = new URL(req.url);

      const id = url.searchParams.get("id");
      const _token = url.searchParams.get("token");

      if (!id) {
        return new Response("Missing user ID", { status: 400 });
      }

      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      if (!user) {
        return new Response("User not found", { status: 404 });
      }

      return new Response(JSON.stringify(user), {
        status: STATUS_CODE.OK,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${_token}`,
        },
      });
    } catch (error) {
      console.error("Error in GET /api/student/user:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
