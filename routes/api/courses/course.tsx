import { Handlers, STATUS_CODE } from "$fresh/server.ts";

import { requireAdmin } from "../../../middleware/auth.ts";
import { db } from "../../../lib/mongo.ts";
import { Student } from "../users/user.tsx";
import { Module } from "../modules/module.tsx";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { Course } from "../../../types/course.ts";

const coursesCollection = db.collection("courses");

export const handler: Handlers = {
  async POST(req) {
    const admin = await requireAdmin(req);

    if (admin instanceof Response) return admin;

    const { name, slug, modules, students, difficulty, description } = await req
      .json();
    if (!name || !slug) {
      return new Response("Missing fields", { status: 400 });
    }

    const exists = await coursesCollection.findOne({ slug });
    if (exists) {
      return new Response(`Course already exists: ${name}`, { status: 409 });
    }

    const result = await coursesCollection.insertOne({
      name,
      slug,
      modules: modules || [],
      students: students || [],
      difficulty,
      description,
      createdAt: new Date(),
      adminOrg: admin.adminOrg,
    });

    return new Response(
      JSON.stringify({ message: "Course created", id: result.insertedId }),
      { status: 201 },
    );
  },
  async PATCH(req) {
    const admin = await requireAdmin(req);
    if (admin instanceof Response) return admin;

    const { _id, slug, name, modules, students, difficulty, description } =
      await req.json();

    // Need either _id or slug to identify the course
    if (!_id && !slug) {
      return new Response("Missing course identifier (_id or slug)", {
        status: 400,
      });
    }

    // Build the query based on what identifier is provided
    let query;
    if (_id) {
      try {
        // Convert string _id to ObjectId
        query = { _id: new ObjectId(_id) };
      } catch (error) {
        console.error("Invalid ObjectId format:", _id, error);
        return new Response("Invalid _id format", { status: 400 });
      }
    } else {
      query = { slug };
    }

    const course = await coursesCollection.findOne(query);

    if (!course) {
      return new Response(`Course not found`, { status: 404 });
    }

    // Build update object with only provided fields
    const updateFields: Partial<Course> = {};
    if (name) updateFields.name = name;
    if (slug) updateFields.slug = slug;
    if (modules) updateFields.modules = modules;
    if (students) updateFields.students = students;
    if (difficulty) updateFields.difficulty = difficulty;
    if (description) updateFields.description = description;

    await coursesCollection.updateOne(query, {
      $set: updateFields,
    });

    return new Response("Course updated", { status: 200 });
  },

  async GET(req) {
    const url = new URL(req.url);
    const adminOrg = url.searchParams.get("adminOrg");

    if (!adminOrg) {
      return new Response("Missing adminOrg parameter", { status: 400 });
    }
    try {
      const courses = await coursesCollection.find({
        adminOrg: parseInt(adminOrg),
      })
        .toArray();
      return new Response(JSON.stringify(courses), {
        status: STATUS_CODE.OK,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
