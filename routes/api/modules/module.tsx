import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { requireAdmin } from "../../../middleware/auth.ts";
import { db } from "../../../lib/mongo.ts";

const modulesCollection = db.collection("modules");

export type Module = {
  id: number;
  name: string;
  course: string;
  isFinished: boolean;
};

export const handler: Handlers = {
  async POST(req) {
    const admin = await requireAdmin(req);

    if (admin instanceof Response) return admin;

    const { name, course, isFinished } = await req.json();
    if (!name || !course) {
      return new Response("Missing fields", { status: 400 });
    }

    const exists = await modulesCollection.findOne({ name, course });
    if (exists) {
      return new Response(`Module already exists: ${name}`, { status: 409 });
    }

    const customId = Date.now().toString();

    const result = await modulesCollection.insertOne({
      _id: customId,
      id: customId,
      name,
      course,
      isFinished: isFinished || false,
      createdAt: new Date(),
    });

    console.log("Module created: from functions", result);

    return new Response(
      JSON.stringify({
        message: "Module created yei",
        result: result,
        id: result,
        _id: result,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },

  async GET(req) {
    const admin = await requireAdmin(req);
    if (admin instanceof Response) return admin;

    const modules = await modulesCollection.find({}).toArray();
    return new Response(JSON.stringify(modules), {
      status: STATUS_CODE.OK,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
