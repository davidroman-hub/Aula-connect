import { db } from "../lib/mongo.ts";

export interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string; // hashed
}

export const Users = db.collection<UserSchema>("users");
