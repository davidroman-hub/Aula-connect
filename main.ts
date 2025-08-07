/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";
const uri = Deno.env.get("MONGO");
import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";

import { createMongoDbConnection } from "./lib/mongo.ts";

//deno task start
console.log("Starting Fresh server...", uri, "siii david");
await createMongoDbConnection();

await start(manifest, config);
