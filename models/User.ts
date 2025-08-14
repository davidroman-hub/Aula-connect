import { db } from "../lib/mongo.ts";

export interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string; // hashed
  type: string; // "admin" | "user"
  courses: any[];
}

export const Users = db.collection<UserSchema>("users");
