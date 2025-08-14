import { Handlers, STATUS_CODE } from "$fresh/server.ts";

import { hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { requireAdmin } from "../../../middleware/auth.ts";

import { db } from "../../../lib/mongo.ts";
const usersCollection = db.collection("users");

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
      type: role || "user",
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
  //   try {
  //     const users = await usersCollection.find({}).toArray();
  //     return new Response(JSON.stringify(users), {
  //       status: STATUS_CODE.OK,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   } catch (error: any) {
  //     return new Response(error?.message ?? "Internal Server Error", {
  //       status: STATUS_CODE.InternalServerError,
  //     });
  //   }
  // },
};

// export const handler: Handlers = {
//   async POST(req, ctx) {
//     try {
//       const { username, password, role } = await req.json();

//       const exists = await orderCollection.findOne({ username });
//       if (exists) {
//         return new Response("User already exists", { status: 409 });
//       }

//       const hashed = await hash(password);

//       const randomThreeDigits = Math.floor(Math.random() * 900) + 100;
//       await orderCollection.insertOne({
//         username,
//         password,
//         role: role || "user",
//       });

//       return new Response(null, {
//         status: STATUS_CODE.Created,
//         statusText: "user Created",
//       });
//     } catch (error: any) {
//       return new Response(error, {
//         status: STATUS_CODE.InternalServerError,
//       });
//     }
//   },
// };
