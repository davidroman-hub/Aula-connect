import { Handlers, STATUS_CODE } from "$fresh/server.ts";

import { hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { requireAdmin } from "../../../middleware/auth.ts";

import { db } from "../../../lib/mongo.ts";
import { Course } from "../courses/course.tsx";
const usersCollection = db.collection("users");

export type Student = {
  id: number;
  username: string;
  courses: Course[];
  password?: string;
  type: string;
};

export const handler: Handlers = {
  async POST(req) {
    const admin = await requireAdmin(req);

    if (admin instanceof Response) return admin;

    const { username, password, role } = await req.json();
    if (!username || !password) {
      return new Response("Missing fields", { status: 400 });
    }

    const exists = await usersCollection.findOne({ username });
    if (exists) {
      return new Response("User already exists", { status: 409 });
    }

    const hashed = await hash(password);

    await usersCollection.insertOne({
      username,
      password,
      courses: [],
      type: role || "student",
    });

    return new Response("User created", { status: 201 });
  },

  async GET(req) {
    const admin = await requireAdmin(req);
    if (admin instanceof Response) return admin; // si no es admin, corta aquí

    const users = await usersCollection.find({}).toArray();
    return new Response(JSON.stringify(users), {
      status: STATUS_CODE.OK,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  async PATCH(req) {
    const admin = await requireAdmin(req);
    if (admin instanceof Response) return admin;

    const { id, username, password, role, courses } = await req.json();
    if (!id || !username) {
      return new Response("Missing fields", { status: 400 });
    }

    const user = await usersCollection.findOne({ _id: id });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const updateData: any = { username };
    if (password) {
      updateData.password = await hash(password);
    }
    if (role) {
      updateData.type = role;
    }

    if (courses) {
      updateData.courses = courses;
    }

    await usersCollection.updateOne({ _id: id }, { $set: updateData });

    return new Response("User updated", { status: 200 });
  },
};
