/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";
import { Database, MongoClient } from "mongo/mod.ts";
import "jsr:@std/dotenv/load";
import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";

const uri = Deno.env.get("MONGO");
const DB = "t";

export async function createMongoDbConnection() {
  try {
    const client = new MongoClient();
    await client.connect(uri as string);

    console.log(`Mongo db connection established/.... DB yee : ${DB}`);
    return client.database(DB);
  } catch (error) {
    console.log("error");
    console.log(`Mongo db URI/.... DB : ${uri}`);
    throw new Error(error as any);
  }
}

await createMongoDbConnection();

await start(manifest, config);
