#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import "$std/dotenv/load.ts";
import { createMongoDbConnection } from "./lib/mongo.ts";

// Try to connect to MongoDB, but don't fail if it's not available
try {
  await createMongoDbConnection();
  console.log("✅ MongoDB connection successful");
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.warn(
    "⚠️  MongoDB connection failed, continuing without database:",
    errorMessage,
  );
}

await dev(import.meta.url, "./main.ts", config);
