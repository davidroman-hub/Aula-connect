import { Handlers, STATUS_CODE } from "$fresh/server.ts";

import { requireAdmin } from "../../../middleware/auth.ts";

import { db } from "../../../lib/mongo.ts";

import { ObjectId } from "https://deno.land/x/web_bson@v0.3.0/mod.js";
import { Course } from "../../../types/course.ts";

const usersCollection = db.collection("users");

export type Student = {
  id: string;
  _id: string;
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

    await usersCollection.insertOne({
      adminOrg: admin.adminOrg,
      username,
      password,
      courses: [],
      type: role || "user",
      createdAt: new Date(),
      updatedAt: null,
      currentLesson: [],
    });

    return new Response("User created", { status: 201 });
  },

  async GET(req) {
    const admin = await requireAdmin(req);
    if (admin instanceof Response) return admin; // si no es admin, corta aquí
    const url = new URL(req.url);
    const adminOrg = url.searchParams.get("adminOrg");

    const users = await usersCollection.find({
      adminOrg: parseInt(adminOrg as string),
    })
      .toArray();
    return new Response(JSON.stringify(users), {
      status: STATUS_CODE.OK,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  async PATCH(req) {
    const { id, username, password, role, courses, currentLesson } = await req
      .json();

    if (!username) {
      return new Response("Missing fields", { status: 400 });
    }

    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const updateData: any = { username, updatedAt: new Date() };

    if (username) {
      updateData.username = username;
    }

    if (password) {
      updateData.password = password;
    }
    if (role) {
      updateData.type = role;
    }

    if (courses) {
      updateData.courses = courses;
    }

    if (currentLesson) {
      updateData.currentLesson = currentLesson;
    }

    const result = await usersCollection.updateOne({ _id: new ObjectId(id) }, {
      $set: updateData,
    });

    if (result.matchedCount === 0) {
      return new Response("user not found", { status: 404 });
    }

    return new Response(`User ${username} updated`, { status: 200 });
  },
};
