import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { requireAdmin } from "../../../middleware/auth.ts";
import { db } from "../../../lib/mongo.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const modulesCollection = db.collection("modules");

export type Module = {
  _id?: string;
  id: string;
  name: string;
  course: string;
  isFinished: boolean;
  // Contenido educativo
  content: {
    description: string;
    objectives: string[];
    duration: number; // en minutos
    difficulty: "beginner" | "intermediate" | "advanced";
    videoUrl?: string;
    materials: {
      type: "pdf" | "link" | "code" | "exercise";
      title: string;
      url: string;
      description?: string;
    }[];
    exercises: {
      title: string;
      description: string;
      instructions: string;
      solution?: string;
    }[];
    notes: string; // Rich text content
  };
  // Metadatos
  createdAt: Date;
  updatedAt: Date;
  order: number; // Para ordenar módulos en el curso
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

  async PATCH(req) {
    const admin = await requireAdmin(req);
    if (admin instanceof Response) return admin;

    const moduleData = await req.json();
    const { _id, ...updateFields } = moduleData;

    if (!_id) {
      return new Response("Missing module _id", { status: 400 });
    }

    try {
      // Handle both ObjectId strings (24 hex chars) and custom string IDs
      let query;
      if (_id.length === 24 && /^[0-9a-fA-F]{24}$/.test(_id)) {
        // Valid ObjectId format
        query = { _id: new ObjectId(_id) };
      } else {
        // Custom string ID (like timestamp)
        query = { _id: _id };
      }

      const result = await modulesCollection.updateOne(query, {
        $set: {
          ...updateFields,
          updatedAt: new Date(),
        },
      });

      if (result.matchedCount === 0) {
        return new Response("Module not found", { status: 404 });
      }

      return new Response(
        JSON.stringify({ message: "Module updated successfully" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      console.error("Error updating module:", error);
      return new Response("Error updating module", { status: 500 });
    }
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
