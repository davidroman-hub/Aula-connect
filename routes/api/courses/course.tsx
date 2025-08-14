import { Handlers, STATUS_CODE } from "$fresh/server.ts";

import { requireAdmin } from "../../../middleware/auth.ts";

import { db } from "../../../lib/mongo.ts";
import { Student } from "../users/user.tsx";
const coursesCollection = db.collection("courses");

export type Course = {
  id: number;
  name: string;
  slug: string;
  modules: Module[];
  students: Student[];
  progress?: number;
};

export type Module = {
  id: number;
  name: string;
  course: string;
  progress?: number;
};

export const handler: Handlers = {
  async POST(req) {
    const admin = await requireAdmin(req);

    if (admin instanceof Response) return admin;

    const { name, slug, modules, students } = await req.json();
    if (!name || !slug) {
      return new Response("Missing fields", { status: 400 });
    }

    const exists = await coursesCollection.findOne({ slug });
    if (exists) {
      return new Response(`Course already exists: ${name}`, { status: 409 });
    }

    await coursesCollection.insertOne({
      name,
      slug,
      modules: modules || [],
      students: students || [],
    });

    return new Response("Course created", { status: 201 });
  },

  async GET(req) {
    const admin = await requireAdmin(req);
    if (admin instanceof Response) return admin;

    const courses = await coursesCollection.find({}).toArray();
    return new Response(JSON.stringify(courses), {
      status: STATUS_CODE.OK,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
