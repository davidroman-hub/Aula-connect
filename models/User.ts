import { db } from "../lib/mongo.ts";

export interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string; // hashed
  type: string; // "admin" | "user"
  courses: any[];
  adminOrg?: number; // ID de la organización del administrador
}

export const Users = db?.collection<UserSchema>("users");
